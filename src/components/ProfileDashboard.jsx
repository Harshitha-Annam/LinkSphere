import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDoc, setDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { doc } from "firebase/firestore";
import { Link } from "react-router";
// import {navigator}
const height = "50px";
const width = "50px";
export const ProfileDashboard = ({isSignedIn}) => {

    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [github, setGithub] = useState('');
    const [isSubmitting, setISubmitting] = useState(false);
    const [sharableLink, setSharableLink] = useState('');
    const [username, setUsername] = useState('');
    const [userbio, setUserbio] = useState('');
    // const [userProfileCard, setUserProfileCard] = useState(null);
    // const navigate = useNavigate();

    const fetchUserProfileCard = async () => {
        try{
            const docRef = doc(db,"userProfileCards", auth?.currentUser?.uid );
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            const userProfile = docSnap.data();
            setEmail(userProfile.email);
            setInstagram(userProfile.instagram);
            setTwitter(userProfile.twitter);
            setLinkedin(userProfile.linkedin);
            setGithub(userProfile.github);
            setUsername(userProfile.userName);
            setUserbio(userProfile.userBio);
        }
        catch(err)
        {
            console.log("Unsuccessful Fetch: ", err);
        }
    }


    const copyLink = () => {
    navigator.clipboard.writeText(`link-sphere-pink.vercel.app${sharableLink}`)
      .then(() => alert("Link copied to clipboard!"))
      .catch(err => console.error("Failed to copy: ", err));
  };

    useEffect(() => {
        fetchUserProfileCard();
    }, [isSignedIn])

    const handleSubmit = async () => {
            try{
                console.log(auth.currentUser.uid);
                const newDocRef = doc(db, "userProfileCards", auth.currentUser.uid);
                console.log(newDocRef.id);
                const newData = {
                    userId : auth.currentUser.uid,
                    email : email, instagram: instagram, twitter:twitter, linkedin:linkedin, github:github, userName:username, userBio:userbio
                }
                // console.log(auth.currentUser.uid);
                // console.log(newData);
                const variable = await setDoc(newDocRef, newData, { merge:true } );
                console.log(variable);
                console.log("Successfully uploaded data");
                // setEmail('');
                // setInstagram('');
                // setTwitter('');
                // setLinkedin('');
                // setGithub('');
                // setUsername('');
                // setUserbio('');
                console.log(newDocRef);
                // const navigate = useNavigate();
                setISubmitting(true);
                setSharableLink(`/profile/${newDocRef.id}`);
                // navigate(`/profile/${newDocRef.id}`);


               

            }
            catch(err)
            {
                console.log("Error uploading data",err);
            }

    }
    return (
        <>
            <div className="profile-page">
                <section className="profile-container">
                <div className="profile-header"><h1 style={{color:"rgb(16, 135, 220)"}}>Build Your Public Profile!</h1>
                <p style={{color: "rgb(221, 117, 14)",}}>Add your social links and share with the world.</p>
                </div>
                <div className="user-details">
                    
                    <div className="profile-name">
                        <label htmlFor="username"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height={height} width={width}><path d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z"/></svg></label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="John Doe" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="profile-bio">
                        <label htmlFor="userbio"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height={height} width={width}><path d="M96 96C60.7 96 32 124.7 32 160L32 480C32 515.3 60.7 544 96 544L544 544C579.3 544 608 515.3 608 480L608 160C608 124.7 579.3 96 544 96L96 96zM176 352L240 352C284.2 352 320 387.8 320 432C320 440.8 312.8 448 304 448L112 448C103.2 448 96 440.8 96 432C96 387.8 131.8 352 176 352zM152 256C152 225.1 177.1 200 208 200C238.9 200 264 225.1 264 256C264 286.9 238.9 312 208 312C177.1 312 152 286.9 152 256zM392 208L504 208C517.3 208 528 218.7 528 232C528 245.3 517.3 256 504 256L392 256C378.7 256 368 245.3 368 232C368 218.7 378.7 208 392 208zM392 304L504 304C517.3 304 528 314.7 528 328C528 341.3 517.3 352 504 352L392 352C378.7 352 368 341.3 368 328C368 314.7 378.7 304 392 304z"/></svg></label>
                        <input 
                            type="text" 
                            name="userbio" 
                            id="userbio" 
                            placeholder="I am a Software Engineer." 
                            value={userbio}
                            onChange={(e) => setUserbio(e.target.value)}
                        />
                    </div>
                </div>
                <div className="profile-links">
                    <h2>Social Links</h2>
                    <div className="profile-email">
                        <label htmlFor="email"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="50px" width="50px"><path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/></svg>
                   Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="abc123@gmail.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="profile-instagram">
                        <label htmlFor="instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height="50px" width="50px"><path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"/></svg>Instagram profile URL</label>
                        <input 
                            type="url"
                            name="instagram" 
                            id="instagram" 
                            placeholder="www.instagram.com/" 
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                        />
                    </div>
                    <div className="profile-twitter">
                        <label htmlFor="twitter"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height={height} width={width}><path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM457.1 180L353.3 298.6L475.4 460L379.8 460L305 362.1L219.3 460L171.8 460L282.8 333.1L165.7 180L263.7 180L331.4 269.5L409.6 180L457.1 180zM419.3 431.6L249.4 206.9L221.1 206.9L392.9 431.6L419.3 431.6z"/></svg>Twitter profile URL</label>
                        <input 
                            type="url" 
                            name="twitter" 
                            id="twitter" 
                            placeholder="www.twitter.com/"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                        />
                    </div>
                    <div className="profile-linkedin">
                        <label htmlFor="linkedin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height={height} width={width}><path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"/></svg>LinkedIn profile URL</label>
                        <input 
                            type="url" 
                            name="linkedin" 
                            id="linkedin" 
                            placeholder="www.linkedin.com/"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                        />
                    </div>
                    <div className="profile-github">
                        <label htmlFor="github"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height={height} width={width}><path d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z"/></svg>GitHub profile URL</label>
                        <input 
                            type="url" 
                            name="github" 
                            id="github" 
                            placeholder="www.github.com/" 
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                        />
                    </div>
                    
                </div>
                {!isSubmitting && <button onClick={handleSubmit} className="profile-submit">Submit</button>}

                {sharableLink && <><div className="generated-link"><p>Your Public Profile Link has been Generated! Share it with your friends now!</p>
                <div><Link to={sharableLink}>Go to your public Profile</Link>
                <div><button onClick={copyLink}>Copy Link</button></div></div></div></>}
            </section>
            </div>
        </>
    );
}