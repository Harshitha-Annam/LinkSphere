import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import { useNavigate, Link } from "react-router";



console.log(auth?.currentUser?.uid);
export const Auth = ({setIsSignedIn}) => {
    // state variables required for sign in
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // define a function to handle signin - use try catch for exception handling
    const handleSignUp = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
            console.log('Signed In Successfully with email: ', auth.currentUser.email);
            setIsSignedIn(true);
            navigate('/dashboard');
        }
        catch(err)
        {
            console.log("Something went wrong :", err);
        }
        
    }

    return (
        <>
        <div className="signup-page">
            <section className="signup-container">
                <div className="signup-header"><p>Join <span style={{color:"rgb(19, 113, 168)"}}>LinkSphere</span> to Create Your Custom Profile!</p></div>
                <div className="email-container">
                    <label htmlFor="user-email"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="50px" width="50px"><path fill="#2891e2" d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/></svg></label>
                    <input type="email" id="user-email" name="user-email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="pwd-container">
                    <label htmlFor="user-pwd"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="50px" width="50px"><path fill="#2891e2" d="M400 416C497.2 416 576 337.2 576 240C576 142.8 497.2 64 400 64C302.8 64 224 142.8 224 240C224 258.7 226.9 276.8 232.3 293.7L71 455C66.5 459.5 64 465.6 64 472L64 552C64 565.3 74.7 576 88 576L168 576C181.3 576 192 565.3 192 552L192 512L232 512C245.3 512 256 501.3 256 488L256 448L296 448C302.4 448 308.5 445.5 313 441L346.3 407.7C363.2 413.1 381.3 416 400 416zM440 160C462.1 160 480 177.9 480 200C480 222.1 462.1 240 440 240C417.9 240 400 222.1 400 200C400 177.9 417.9 160 440 160z"/></svg></label>
                    <input type="password" id="user-pwd" name="user-pwd" value={password} onChange = {(e) => setPassword(e.target.value)} />
                </div>
                <div className="signup-button-container">
                    <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
                </div>
                <div className="have-an-account"><p>Already have an account? <Link to="/login">LogIn</Link></p></div>
            </section>
        </div>
        </>
    );
}