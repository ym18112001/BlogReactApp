
import { useState, useEffect } from "react";
import Post from "../types/Post";
import axios, { AxiosError } from "axios";

import PageEmpty from "./PageEmpty";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";


const PostsList = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<AxiosError | null>(null);

  const navigate = useNavigate();
  const DeleteSuccess = (postId: number) => { toast.success(`Deleted Post with Id ${postId} Succesfully`) };
  const DeleteFail = (err: AxiosError) => { toast.error(" Delete Error : " + err.response?.data) };

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

  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }

  const deletePost = async (post: Post) => {
    const orginalPosts = [...posts];
    setPosts(posts.filter((itm) => itm.id !== post.id));

    await axios
      .delete<Post>(`http://localhost:8000/posts/${post.id}`, config)
      .then(({ data: post }) => {
        DeleteSuccess(post.id);
      })
      .catch((err: AxiosError) => {
        setErr(err);
        DeleteFail(err);
        setPosts(orginalPosts);
      });
  }

  // const editPost = async (post: Post) => {
  //   const orginalPosts = [...posts];
  //   setPosts(posts.filter((itm) => itm.id !== post.id));
  //   const config = {headers:{Authorization: `Bearer ${localStorage.getItem('accessToken')}`}}

  //   await axios
  //     .patch<Post>(`http://localhost:8000/posts/${post.id}`,config)
  //     .then(({ data: post }) => {
  //       DeleteSuccess(post.id);
  //     })
  //     .catch((err: AxiosError) => {
  //       setErr(err);
  //       DeleteFail(err);
  //       setPosts(orginalPosts);
  //     });
  //   }
  return (<>
    <ToastContainer />
    {isLoading && <div className="spinner-border"></div>}
    {err && <h1 className="text-danger">Error: {err.message}</h1>}

    {(posts.length > 0) ? (<ul className="px-0">

      {posts.map((post) => (
        <PostCard key={post.id} post={post} editPost={(e: Post) => { navigate(`/edit-post/${e.id}`); }} deletePost={(post: Post) => { deletePost(post) }} />
      ))}

    </ul>) : <PageEmpty />}

  </>)


}

export default PostsList;