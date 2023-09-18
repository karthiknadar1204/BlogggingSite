import img from "../assets/karthik.jpeg"
import "../App.css"
const Post = () => {
  return (
    <div className="post">
    <div className="image">
        <img src={img} alt="" />
      </div>
      <div className="contents">
        <h2>Full house battery fokn;of ofvhwi o;fivhjobi fovuh</h2>
        <p className="info">
          <a href="" className="author">karthik</a>
          <time>2023-01-06 16:45</time>
        </p>
        <p className="summary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse maxime cupiditate labore accusantium doloribus repellat itaque numquam ab obcaecati natus. Nesciunt ex assumenda ab praesentium ipsam amet animi rerum numquam.</p>
      </div>
    </div>
  )
}

export default Post