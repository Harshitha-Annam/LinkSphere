import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export const PublicProfile = () => {
    const [publicProfile , setPublicProfile] = useState(null);
    const {uniqueId} = useParams();
    console.log(uniqueId);
    const fetchPublicProfile = async () => {
        console.log("api call made")
        try{
            const docSnap = await getDoc(doc(db, "userProfileCards", uniqueId))
            setPublicProfile(docSnap.data());
        }
        catch(err)
        {
            console.log("An Error occured fectching data", err);
        }

    }
    useEffect(() => {
        fetchPublicProfile();
        console.log(publicProfile);
    }, [uniqueId])
    
    if(!publicProfile)
    {
        return (
            <><p>Loading Public Profile</p></>
        )
    }

    return (
        <>
            
            <div className="public-profile">
                <h2 className="public-profile-h2">LinkSphere Profile</h2>
                <div className="user-header">
                    <img src="/user.svg" height={"120px"} width={"120px"} />
                    <div className="user-name-bio"><h3>{publicProfile.userName}</h3>
                    <p>{publicProfile.userBio}</p></div>
                </div>
                {
                    Object.keys(publicProfile).filter((key) => (key !== 'userId' && key !== 'userName' && key !== 'userBio') ).map((key) => {
                        return <><div key={key}><img src={`/${key}.svg`} height={"50px"} width={"50px"} /><a href={publicProfile[key]} target="_blank">{'Find me on ' +key  }</a></div></>
                    })
                }
            </div>
            <footer><p>Custom Profile Made with <a href="/" style={{color:"rgb(236, 125, 22)"}}>LinkSphere</a></p></footer>
        </>
    )
}