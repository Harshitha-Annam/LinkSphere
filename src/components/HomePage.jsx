import { Link } from 'react-router-dom';


export const HomePage = () => {
    return (
        <>
            <div className='landing-content'>
                <h1>Welcome to LinkSphere!</h1>
                <p>Create your own custom public profile and share your social links with the world.</p>
                <Link to='/signup'>Get Started - SignUp</Link>
                <div className='steps'>
                    <div><img src='address.svg'/><h2>Build Your Profile</h2></div>
                    <div><img src='link.svg' /><h2>Connect Your Socials</h2></div>
                    <div><img src='world.svg' /><h2>Share with the world</h2></div>
                </div>
            </div>
        </>
    )
}