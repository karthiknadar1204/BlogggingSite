import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "../src/pages/Login";
// import Register from "./pagess/Register";
import Register from "../src/pages/Register"
import "./App.css"
import IndexPage from "./pages/IndexPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage"
import EditPost from "./pages/EditPost";

const App = () => {
  return (
    <BrowserRouter>
      <main>
          <Header />
        <Routes>
          <Route path="/" element={<IndexPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/create" element={<CreatePost/>} /> 
          <Route path="/post/:id" element={<PostPage/>} />
          <Route path="/edit/:id" element={<EditPost/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
