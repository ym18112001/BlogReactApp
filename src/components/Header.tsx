import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";



const Header = () => {


  return (
    <>
      <header>
        <ToastContainer />
        <nav className="container my-4 navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid ">
            <Link to='/' className="navbar-brand">Joe Blog</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to='/' className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={(localStorage.getItem('accessToken')) ? '/' : '/register'} className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">{(localStorage.getItem('accessToken')) ? 'LogOut' : 'LogIn'}</Link>
                </li>
                {<li className="nav-item">
                  <Link to={(localStorage.getItem('accessToken')) ? '/add-post' : '/login'} className="nav-link">AddPost</Link>
                </li>}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
