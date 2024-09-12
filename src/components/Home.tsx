import Header from "./Header";
import PostsList from "./PostsList";
import Footer from "./Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {


    return (<>

        <div className="container d-flex flex-column vh-100">

            <Header />
            <ToastContainer />
            <PostsList />
            <Footer />



        </div>

    </>)

}
export default Home;
