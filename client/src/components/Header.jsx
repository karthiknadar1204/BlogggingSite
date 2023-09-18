
import { Link } from "react-router-dom"
import "../App.css"
const Header = () => {
  return (
    <header>
    <a href="/" className="logo">BlogHut</a>
    <nav>
      <Link to="/login">login</Link>
      <Link to="/register">register</Link>
    </nav>
  </header>
  )
}

export default Header