

import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";

import Post from "../types/Post";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type PostwoId = Omit<Post, 'id'>

function EditPost() {


  let { id } = useParams<string>()
  const UserSchema = object().shape({
    //  id:number().required(),
    title: string().required('title is required'),
    content: string().required("content is required"),
    image: string().required("image is required"),
    //authorId: number().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<post>({ mode: "onSubmit", resolver: yupResolver(UserSchema) });

  const [err, setErr] = useState<AxiosError | null>(null);
  const navigate = useNavigate();
  const HomeNav = () => { navigate('/'); }
  const EditPostSuccess = (postId: number) => { toast.success(` Edited Post Succesfully with Id ${postId}`, { onClose: HomeNav }) };
  const EditPostFail = (err: AxiosError) => { setErr(err); toast.error(" Edit Post Error : " + err.response?.data) };

  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }

  // const deletePost = async (post: Post) => {
  //     const orginalPosts = [...posts];
  //     setPosts(posts.filter((itm) => itm.id !== post.id));
  //     const config = {headers:{Authorization: `Bearer ${localStorage.getItem('accessToken')}`}}

  //     await axios
  //       .delete<Post>(`http://localhost:8000/posts/${post.id}`,config)
  //       .then(({ data: post }) => {
  //         DeleteSuccess(post.id);
  //       })
  //       .catch((err: AxiosError) => {
  //         setErr(err);
  //         DeleteFail(err);
  //         setPosts(orginalPosts);
  //       });
  //     }

  type post = Omit<PostwoId, 'authorId'>

  const editPost = async (post: post) => {
    //const mypost:post={title:post.title,content:post.content,image:post.image};

    await axios
      .patch<Post>(`http://localhost:8000/posts/${id}`, post, config)
      .then(({ data: post }) => {
        EditPostSuccess(post.id);
      })
      .catch((err: AxiosError) => {
        setErr(err);
        EditPostFail(err);
      });

  };


  const Submit = (post: post) => {
    editPost(post);
    reset();

  };

  return (
    <>


      <form className=" container" onSubmit={handleSubmit(Submit)}>
        <br />


        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            name="title"
            type="text"
            className="form-control"
            id="title"
            placeholder="title"
          />
          {errors.title && (
            <p className=" text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <input
            {...register("content")}
            name="content"
            type="text"
            className="form-control"
            id="content"
            placeholder="content"
          />
          {errors.content && (
            <p className=" text-danger">{errors.content.message}</p>
          )}
        </div>


        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            {...register("image")}
            name="image"
            type="text"
            className="form-control"
            id="image"
            placeholder="image"
          />
          {errors.image && (
            <p className=" text-danger">{errors.image.message}</p>
          )}
        </div>


        <button disabled={!isValid} type="submit" className=" mt-4 btn btn-primary">
          Edit Post
        </button>
        <br />
        <button onClick={() => { reset(); navigate('/'); }} type="button" className=" mt-4 btn btn-primary">
          Cancel
        </button>
        <ToastContainer />
        <br />

      </form>

    </>
  )





}

export default EditPost;
