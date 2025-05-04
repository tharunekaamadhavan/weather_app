import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          WeatherWise
        </div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <div className="navbar-button">
          <button>Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
