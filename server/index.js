const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const User=require('./models/User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');



const app = express();



const secret='asdkb8271t87gs817';

const corsOptions = {
  credentials: true,
  origin: 'http://127.0.0.1:5173'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

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
  
      // Send a response without including the password
      res.json({ requestData: { Username,password:hashedPassword } });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(400).json({ error: 'Registration failed' });
    }
  });




  //Login User
  // app.post('/login',async (req,res)=>{
  //   const {Username,password}=req.body;
  //   const userDoc = await User.findOne({ Username });

    
  //   if (!userDoc) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  //     const passwordCorrect = await bcrypt.compare(password, userDoc.password);
  //     if (passwordCorrect){
  //       jwt.sign({Username,id:userDoc._id},secret,{},(err,token)=>{
  //         if (err) {
  //           throw err;
  //         }
  //         else{
  //           // res.json(token);
  //           res.cookie('token',token).json('ok')
  //         }

  //       })
  //     }
  // })

  app.post("/login", async function (req, res){
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const passwordCorrect = await bcrypt.compare(password, userDoc.password);
  
    if (passwordCorrect) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          throw err;
        } else {
          // res.json(token); 
          // res.cookie('token',token).json('ok')
          res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 86400 * 1000),
            path: '/',
          }).send();
        }
      });
    } else {
      res.status(401).json({ message: "Login failed. Please check your credentials."});
    }
  })


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
  


app.listen(4001, () => {
    console.log('Server is running on port 4001');
  });