import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import Editor from '../Editor';
import { useEffect } from 'react';



const EditPost = () => {
    const {id}=useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState(''); 
    const [content, setContent] = useState('');
    const [files,setFiles]=useState('');
    const [cover,setCover]=useState('')

    useEffect(() => {
      axios.get(`http://localhost:4001/post/${id}`)
          .then(response => {
              // Use response.data instead of response.json()
              setTitle(response.data.title);
              setSummary(response.data.summary);
              setContent(response.data.content);
              setFiles(response.data.files);
          })
          .catch(error => {
              console.error("Error fetching data:", error);
          });
  }, []);
  
    
    

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean'],
        ],
      };
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];

    const updatePost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', title);
        data.append('summary', summary);
        data.append('content', content);
        data.append('file', files);
        if (files) {
            data.set('file', files?.[0]);
        }
        try {
            const response=await axios.put(`http://localhost:4001/post`, data); // Use the correct endpoint and pass the data
            if(response.ok){
              console.log('ok')
                // setRedirect(true)
            }
            // navigate(`/post-details/${id}`);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
      };
    
      const handleSummaryChange = (e) => {
        setSummary(e.target.value);
      };
    
  return (
    <div>
      <form action="" onSubmit={updatePost} encType="multipart/form-data" >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={handleSummaryChange}
        />
        <input type="file" onChange={e => setFiles(e.target.files[0])} />
        <ReactQuill value={content} onChange={newValue=>setContent(newValue)} modules={modules} formats={formats} />
        {/* <Editor onChange={setContent} value={content} /> */}
        <button style={{ marginTop: '5px' }}>Update post</button>
      </form>
    </div>
  )
}

export default EditPost