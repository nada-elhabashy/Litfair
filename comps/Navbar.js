import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div className="navbar-brand">
            <Link className="nav-link" href="/" passHref>
              <Image
                src="/assets/Landing/logo.png"
                alt="lol ya 7abeby"
                width={122}
                height={33}
              />
            </Link>
          </div>
          <button
            className="navbar-toggler navbar-toggler-right collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" href="/login" passHref>
                  <button
                    className=" btn--global btn--small btn--log"
                    type="submit"
                  >
                    Login
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/register" passHref>
                  <button
                    className="btn btn--global btn--small btn--blue"
                    type="submit"
                  >
                    Join Now
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
