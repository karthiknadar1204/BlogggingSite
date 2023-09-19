import { Link } from "react-router-dom"
import "../App.css"
import { useEffect } from "react";
import axios from 'axios';

const Header = () => {

  useEffect(() => {
    async function fetchData() {
      // try {
        const response = await axios.get('http://localhost:4001/profile', {
          withCredentials: true
        });
        console.log(response.data);
      // } catch (error) {
      //   console.error(error);
      // }
    }
    fetchData();
  }, []);

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