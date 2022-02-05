import logo from "./mypic.jpeg";
import "./App.css";
import ProjectsTable from "./components/ProjectsTable";
import { Nav, Navbar, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

function App() {
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" fixed="top">
        <Navbar.Brand className="navbar-brand" href="#home">
          <FontAwesomeIcon icon={faCode} size="1x" color="white" /> Byron
          Blank's Portfolio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#portfolio">Portfolio</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <header className="jumbotron text-black text-center">
        <h1 className="heading-text">Byron Blank's Portfolio</h1>
        <Image src={logo} alt="" className="portfolio-img rounded-circle" />
        <p className="jumbotron-subheading font-weight-light mb-0">
          Web Developer
        </p>
      </header>
      <section className="page-section" id="about">
        <h2 className="page-section-header">About</h2>
        <p className="about-text">
          Hello, my name is Byron Blank and I am a web developer. You can find
          the projects in my portfolio below along with links to a demo and the
          source on GitHub.
        </p>
      </section>

      <section className="page-section" id="portfolio">
        <h2 className="page-section-header">Portfolio</h2>
        <div className="portDiv">
          <ProjectsTable />
        </div>
      </section>

      <section className="page-section" id="contact">
        <div className="container">
          <h2 className="page-section-header">Contact Me</h2>
          <div>
            <a
              href="https://www.linkedin.com/in/byron-blank-aa942015/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="social-icon"
                icon={faLinkedin}
                size="5x"
                color="lightblue"
              />
            </a>
            <a
              href="https://github.com/ByronCoder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="social-icon"
                icon={faGithub}
                size="5x"
                color="lightblue"
              />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer text-center text-white">
        <div className="container">
          <small>Copyright &copy; Byron Blank 2021</small>
        </div>
      </footer>
    </div>
  );
}
export default App;
