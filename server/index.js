const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const User=require('./models/User');
const Post=require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const multer=require('multer');
const path = require('path');
const fs=require('fs');


// const uploadMiddleware = multer({ dest: 'uploads/' })
// const uploadMiddleware = multer({ dest: path.join(__dirname, 'uploads') });
const uploadMiddleware = multer({ dest: path.join(__dirname, 'uploads') });

const app = express();

const secret='asdkb8271t87gs817';

const corsOptions = {
  credentials: true,
  origin: 'http://127.0.0.1:5173'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

(async () => {
    try {
      await mongoose.connect('mongodb+srv://karthiknadar1204:IvDQEXLLUkTULW76@cluster0.pwrey3x.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  })();
  

  //Register the User
  app.post('/register', async (req, res) => {
    const { Username, password } = req.body;
  
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const userDoc = new User({ Username, password: hashedPassword });
      await userDoc.save();
  
      // Send a success response
      res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error registering user:', error);
  
      // Send an error response with a meaningful message
      res.status(400).json({ error: 'Registration failed. Please try again.' });
    }
  });
  



  //Login User
  app.post("/login", async function (req, res){
    const { Username, password } = req.body;
    const userDoc = await User.findOne({ Username });
  
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const passwordCorrect = await bcrypt.compare(password, userDoc.password);
  
    if (passwordCorrect) { 
      const token = jwt.sign({
        Username: Username,
        id: userDoc._id
      }, secret);
  
      // Set the JWT token as a cookie
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 86400 * 1000),
        path: '/',
      }).send(); // Sending the cookie response here
  
    } else {
      res.status(401).json({ message: "Login failed. Please check your credentials." });
    }
  });
  


  app.get('/profile',(req,res)=>{
    res.json(req.cookies);
    // const {token}=req.cookies
    // jwt.verify(token,secret,{},(err,info)=>{
    //   if(err){
    //     throw err
    //   }
    //   res.json(info);

    // })

  })
  

  app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1]
    // res.json({files:req.file});
    const newPath=path+'.'+ext;
    fs.renameSync(path,newPath);
  
    const {title,summary,content}=req.body;
    const postDoc=await Post.create({
      title,
      summary,
      content,
      cover:newPath,
  
    })
    res.json(postDoc)
    // res.json({ext});
  });


  app.get('/post',async (req,res)=>{

    const posts=await Post.find().sort({createdAt:-1}).limit(20);
  
    res.json(posts);
  })

  app.get('/post/:id', async (req,res)=>{
    const {id}=req.params;
    const postDoc=await Post.findById(id);
    res.json(postDoc);
  })


  app.put('/post',uploadMiddleware.single('file'), async (req, res)=>{
    // res.json(req.file);
    let newPath=null;
    if(req.file){
      const {originalname,path}=req.file;
      const parts=originalname.split('.');
      const ext=parts[parts.length-1]
      newPath=path+'.'+ext;
      fs.renameSync(path,newPath);
      }
      
    const {id,title,summary,content}=req.body;
    // const postDoc=await Post.findById(id);
    try {
      const postDoc = await Post.findById(id);
  
      if (!postDoc) {
          return res.status(404).json({ error: 'Post not found' });
      }
  
      // Continue with the update logic
      // ...
  } catch (error) {
      console.error('Error while updating post:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
  
  
    await postDoc.update({
      title,
      summary,
      content,
      cover:newPath ? newPath: postDoc.cover
    })
  
  })
  








app.listen(4001, () => {
    console.log('Server is running on port 4001');
  });