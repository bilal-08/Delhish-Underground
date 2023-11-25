import Navbar from "../componetns/Navbar";
import Buttonbar from "../componetns/Buttonbar";
import Post from "../componetns/Post";
import BottomNavBar from "../componetns/bottomNavBar";
const Home = () => {

    
    return <>
    <Navbar/>
    <Buttonbar/>
    {/* <h3 className="font-inter font-bold text-center w-full text-3xl"> FEED</h3> */}
    <Post/>
    <BottomNavBar/>
    </>
}

export default Home;