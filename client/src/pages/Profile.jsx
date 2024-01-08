import { useState } from "react";
import BottomNavBar from "../componetns/bottomNavBar";
import LoginOrSignup from "../componetns/Profile/LoginOrSignup";
import ProfileTab from "../componetns/Profile/ProfileTab";
import EditProfile from "../componetns/Profile/EditProfile";
function Profile(){
    const userExists = localStorage.getItem("DUusername")
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [userData,setUserData] = useState({
        email:"",username:"",avatar:""
    })

    return <>
        {!userExists && <LoginOrSignup/>}
        {(userExists && !isEditOpen) && <ProfileTab setIsEditOpen={setIsEditOpen} setData={setUserData}/>}
        {(userExists && isEditOpen) && <EditProfile setIsEditOpen={setIsEditOpen} userData={userData}/>}
    <BottomNavBar />
    </>

}
export default Profile;