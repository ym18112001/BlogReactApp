

import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";

import Post from "../types/Post";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type PostwoId = Omit<Post, 'id'>

function AddPost() {




  const UserSchema = object().shape({
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
  } = useForm<Omit<PostwoId, 'authorId'>>({ mode: "onSubmit", resolver: yupResolver(UserSchema) });

  const [_err, setErr] = useState<AxiosError | null>(null);
  const navigate = useNavigate();
  const HomeNav = () => { navigate('/'); }
  const AddPostSuccess = (postId: number) => { toast.success(` Added Post Succesfully with Id ${postId}`, { onClose: HomeNav }) };
  const AddPostFail = (err: AxiosError) => { setErr(err); toast.error(" Add Post Error : " + err.response?.data) };

  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }

  const addPost = async (post: PostwoId) => {

    await axios
      .post<Post>("http://localhost:8000/posts", post, config)
      .then(({ data: post }) => {
        AddPostSuccess(post.id);
      })
      .catch((err: AxiosError) => {
        setErr(err);
        AddPostFail(err);
      });

  };


  const Submit = (post: Omit<PostwoId, 'authorId'>) => {
    addPost({ title: post.title, content: post.content, image: post.image, authorId: JSON.parse(localStorage.getItem('user')!)['id'] });
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
          Add Post
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

export default AddPost;
