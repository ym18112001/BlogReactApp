
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Post from "../types/Post";
import { useEffect, useState } from "react";
import User from "../types/User";
import axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
type u = { id: number };
type U = Omit<User, 'confirmPassword'> & u;
type Props = { post: Post; deletePost?: (post: Post) => void; editPost?: (post: Post) => void; }

const DataFail = (err: AxiosError) => { toast.error(" Failed to grab Data : " + err.response?.data) };



const PostCard = ({ post, deletePost, editPost }: Props) => {




  const [users, setUsers] = useState<U[]>([]);

  const fetchUsers = async () => {

    await axios.get<U[]>(`http://localhost:3000/users`)
      .then(({ data: users }) => { setUsers(users); })
      .catch((err: AxiosError) => { DataFail(err) });

  }

  useEffect(() => {
    fetchUsers();
  }, []
  )

  return (<article className="d-flex gap-4 my-4">
    <ToastContainer />

    <div className=" d-flex flex-column ">
      <a href={``}>
        <img className=" rounded" width={320} height={180} src={post.image} alt="this is post picture" />
      </a>
    </div>

    <div className="d-flex flex-column">
      <a className=" text-decoration-none " href={``}>
        <h1 >{post.title}</h1>
      </a>
      <p>{post.content}</p>
      <small>Posted by: {users.find(user => user.id === post.authorId)?.firstName}</small>

      {(localStorage.getItem('accessToken') && (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!)['id'] === post.authorId) && deletePost) && <FontAwesomeIcon icon={faTrash} className="btn-sm btn text-danger" onClick={() => {
        deletePost(post);
      }} />}
      {(localStorage.getItem('accessToken') && (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!)['id'] === post.authorId) && editPost) && <FontAwesomeIcon icon={faEdit} className="btn btn-sm text-primary" onClick={() => {
        editPost(post);
      }} />}
    </div>

  </article>)


}

export default PostCard;












