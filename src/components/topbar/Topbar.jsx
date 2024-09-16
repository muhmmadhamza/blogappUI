import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/authSlice"; // Import the logout action
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import NavDropdown from "react-bootstrap/NavDropdown";
import "./topbar.css";
import blogLogo from './newblog.jpg';


export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());  
    navigate("/login"); 
  };

  return (
    <Navbar expand="lg" bg="light" className="bg-body-tertiary">
      <Container>
        {/* Logo Section */}
        <Navbar.Brand as={Link} to="/">
        <img
            src={blogLogo} // Use the imported logo
            alt="Blog Logo"
            style={{ width: "80px"}} // Set the height and width here
          />
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Home Link */}
            <Nav.Link as={Link} to="/">
              HOME
            </Nav.Link>


            <Nav.Link as={Link} to="/addblog">
              AddNewBlog
            </Nav.Link>

             {user && (
              <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto">
             {user ? (
              <Nav.Link as={Link} to="/settings">
                <img
                  className="topImg"
                  src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt="profile"
                />
              </Nav.Link>
            ) : (
               <>
                <Nav.Link as={Link} to="/login">
                  LOGIN
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  REGISTER
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
