
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <footer className="d-flex flex-column align-items-center mt-auto mb-5">
        <div className=" w-100 d-flex justify-content-center ">
          <a href="" className=" display-5 text-decoration-none fw-semibold ">Joe Blog</a>
        </div>
        <div className="d-flex w-25 ">
          <nav className="w-100 ">
            <ul className="list-unstyled w-100 d-flex justify-content-evenly ">
              <li><a className=" nav-link">Home</a></li>
              <li><a className="nav-link">Register</a></li>
              <li><a className="nav-link">Login</a></li>
            </ul>
          </nav>
        </div>

        <div className=" w-25 my-3">
          <div className="d-flex justify-content-evenly">
            <a className="d-flex text-decoration-none " href="https://www.facebook.com/" target="_blank">
              <FontAwesomeIcon icon={faFacebook} size="2xl" />
            </a>
            <a className="d-flex d-flex text-decoration-none" href="https://twitter.com/" target="_blank">
              <FontAwesomeIcon icon={faTwitter} size="2xl" />

            </a>
            <a className="d-flex d-flex text-decoration-none" href="https://www.instagram.com/" target="_blank">
              <FontAwesomeIcon icon={faInstagram} size="2xl" />

            </a>
            <a className="d-flex d-flex text-decoration-none" href="https://www.linkedin.com/" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} size="2xl" />

            </a>

          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;
