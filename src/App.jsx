
import './App.css'
import {Auth} from "../src/components/Auth";
import { LogIn } from './components/LogIn';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase';
import { useState } from 'react';
import { ProfileDashboard } from './components/ProfileDashboard';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PublicProfile } from './components/PublicProfile';




function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const LogOut = async() =>{
      try{
        await signOut(auth);
        console.log("Logged out successfully.")
        setIsSignedIn(false);
        navigate('/');
        
      }
      catch(err){
        console.log("Error logging out: ", err);
      }
    }

    const showheader = !location.pathname.startsWith('/LinkSphere/profile/');

  return (
    <>
    
      {/* <div className="app">Hello</div>  */}
      {/* <Auth/> */}
      {/* <LogIn setIsSignedIn = {setIsSignedIn} /> */}
      {/* {isSignedIn && <button onClick={LogOut}>LogOut</button>} */}
      {/* <ProfileDashboard isSignedIn={isSignedIn}/> */}
      {showheader &&
          <header>
            <div className='logo'><span className='logo-blue-part'>Link</span><span className='logo-orange-part'>Sphere</span></div>
            <nav>
              {!isSignedIn && <>
              <li><Link to='/login'>LogIn</Link></li>
              
              <li><Link to='/signup'>SignUp</Link></li></>}
              <li>About Us</li>
              {isSignedIn && <li><button onClick={LogOut}>LogOut</button></li>}
            </nav>
        </header>
      }
        <Routes>
          <Route path='/' element= {<HomePage/>} />
          <Route path='/signup' element= {<Auth/>} />
          <Route path='/login' element= {<LogIn setIsSignedIn={setIsSignedIn}/>} />
          <Route path='/dashboard' element= {<ProfileDashboard isSignedIn={isSignedIn}/>} />
          <Route path='/profile/:uniqueId' element = {<PublicProfile />} />
        </Routes>
      
    
    </>
  )
}

export default App
