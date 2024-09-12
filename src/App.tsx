
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  Post  from "./types/Post";
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Home from "./components/Home";
import Regestration from "./components/Registration";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
function App() {
  
  const [_posts, setPosts] = useState<Post[]>([]);
  const [_isLoading, setIsLoading] = useState<boolean>(false);
  const [_err, setErr] = useState<AxiosError | null>(null);



  
  useEffect(() => {
    setIsLoading(true);
    axios
      .get<Post[]>("http://localhost:8000/posts")
      .then(({ data: posts }) => {
        setPosts(posts);
      })
      .catch((err: AxiosError) => {
        setErr(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);



  return (
    <>
 
    <ToastContainer/>
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
    
    <Route path="/" element={<Home/>} ></Route>
    <Route path="/register" element={<Regestration />}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/add-post" element={<AddPost/>}></Route>
    <Route  path="/edit-post/:id" element={<EditPost/>}></Route>
    <Route path="*" element={<PageNotFound/>} ></Route>
    </Routes>
    
    </BrowserRouter>

    </>
  );
}

export default App;
