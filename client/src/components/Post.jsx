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