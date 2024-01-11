import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router";
import EventContext from '../context/events/EventContext';


function NavigationMenu() {
  // const context = useContext(EventContext);
  // const { register, checkRegistration } = context;
  const expand = "sm";
  let navigate = useNavigate();
  const handleLogout =()=>{
    console.log("logged out");
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <>
      <Navbar
        key={expand}
        bg="dark"
        variant="dark"
        expand={expand}
        className=""
      >
        <Container fluid>
          <Navbar.Brand href="#">Volunteer</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Volunteer
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-grow-1 pe-3">
                
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/About">
                    <Nav.Link>About</Nav.Link>
                  </LinkContainer>
                 
                  <LinkContainer to="/Host">
                    <Nav.Link>OrganizeEvent</Nav.Link>
                  </LinkContainer>
                  <NavDropdown title="My Events" id="basic-nav-dropdown" bg="dark" variant="dark">
                    <NavDropdown.Item href="/volunteered">Volunteered Events</NavDropdown.Item>
                    <NavDropdown.Item href="/organized">Organized Events</NavDropdown.Item>
                    
                  </NavDropdown>
              </Nav>
              <Form className="d-flex">
  {!localStorage.getItem('token') ? (
    <>
      <LinkContainer to="/Login">
        <Nav.Link>
          <Button variant="outline-success" className="mx-2">
            Login
          </Button>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/Signup">
        <Nav.Link>
          <Button variant="outline-success">Signup</Button>
        </Nav.Link>
      </LinkContainer>
    </>
  ) : (
    
      <Nav.Link>
        <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
      </Nav.Link>
    
  )}
</Form>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationMenu;
