// import img from "../assets/karthik.jpeg"
// import "../App.css"
// const Post = () => {
//   return (
//     <div className="post">
//     <div className="image">
//         <img src={img} alt="" />
//       </div>
//       <div className="contents">
//         <h2>Full house battery fokn;of ofvhwi o;fivhjobi fovuh</h2>
//         <p className="info">
//           <a href="" className="author">karthik</a>
//           <time>2023-01-06 16:45</time>
//         </p>
//         <p className="summary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse maxime cupiditate labore accusantium doloribus repellat itaque numquam ab obcaecati natus. Nesciunt ex assumenda ab praesentium ipsam amet animi rerum numquam.</p>
//       </div>
//     </div>
//   )
// }

// export default Post


// import img from "../assets/eruchitanda.jpg"
import "../App.css";
import {formatISO9075} from 'date-fns';
import {Link} from 'react-router-dom'
const post = ({_id,title,summary,cover,content,createdAt}) => {
  const parts = cover.split('/');
  const fileName = parts[parts.length - 1];

  // Construct the new image source with only the file name
  const newCoverSrc = `http://localhost:4001/uploads/${fileName}`;
  return (
    <div>
        <div className="post">
        <div className="image">
          
          <Link to={`/post/${_id}`} >
            <img src={`${newCoverSrc}`} alt="image" />
            {/* <img src={`/uploads/${cover}`} alt="image" /> */}
          </Link>

          </div>
          <div className="texts">
            <Link to={`/post/${_id}`} >
              <h2>{title}</h2>
            </Link>
          <p className="info">
            {/* <span className="author">
              Karthik Nadar
            </span> */}
            <span className="time">
              {formatISO9075(new Date(createdAt))}
            </span>
          </p>
          <p className="summary" >{summary}</p>
          </div>
        </div>
    </div>
  )
}

export default post