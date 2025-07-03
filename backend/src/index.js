const express = require("express")
const jwt = require("jsonwebtoken")
const path = require('path')
const mongoose = require('mongoose')
const {Users , Blogs} = require('./db.js')
const dotenv = require("dotenv")

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDB Connection Successful!")
})


const PORT = process.env.PORT || 3000;

app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "../assets")))

const secretkey = "hello"

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../assets/sign.html"))
})

app.get("/all-blogs",(req,res)=>{
    res.sendFile(path.join(__dirname,"../assets/viewAllBlogs.html"))
})

app.get("/user-blogs",(req,res)=>{
    res.sendFile(path.join(__dirname,"../assets/viewAllBlogsByUser.html"))
})

app.get("/create-blogs",(req,res)=>{
    res.sendFile(path.join(__dirname,"../assets/createBlog.html"))
})

app.get("/blogs/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"../assets/viewBlogById.html"))
})

app.get("/update-blog/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"../assets/updateBlog.html"))
})

async function authenticate(req,res,next){
    let token = req.headers.token;
    let username = jwt.verify(token,secretkey)
    let user = await  Users.findOne({username:username})

    if(!user){
        return res.json({
            error:"authentication error"
        })
    }
    req.user = user
    next() 
}

app.post("/signup",async (req,res)=>{
    let userData = req.body
    let exists = await Users.findOne({username:userData.username})
    if(exists){
        return res.json({
            error:"username already exists"
        })
    }

    let newUser = new Users(userData)
    await newUser.save()
    res.json({
        message:"user created successfully"
    })
})

app.post("/signin",async (req,res)=>{
    let userData = req.body
    let user = await Users.findOne({username:userData.username})
    if(!user){
        return res.json({
            error:"user doesn't exists"
        })
    }
    if(user.password === userData.password){
        let token = jwt.sign(user.username,secretkey)
        res.json({
            token:token
        })
    }
    else{
        res.json({
            error:"incorrect password"
        })
    }
})

app.post("/create-blogs",authenticate,async (req,res)=>{
    let user = req.user
    let blogData = req.body
    
    let newBlog = new Blogs({
        title: blogData.title,
        author: user.username,
        content: blogData.content,
        author: user.username,
        userId: user._id
    }) 

    await newBlog.save()

    res.json({
        message:"blog created successfully"
    })
})

app.get("/view-all-blogs",authenticate, async (req,res)=>{
    let blogs = await Blogs.find()
    res.json({
        "blogs":blogs.slice().reverse()
    })
})

app.get("/blogs-by-user",authenticate, async (req,res)=>{
    let user = req.user
    let blogsToBeReturned = await Blogs.find({userId:user._id})
    res.json({
        "blogs":blogsToBeReturned.reverse()
    })
    console.log(blogsToBeReturned)
})

app.get("/blog-by-user/:id",authenticate,async (req,res)=>{
    let id = req.params.id
    let blog = await Blogs.findById(id)
    res.json({
        blog:blog
    })
})

app.put("/edit-blog/:id",authenticate,async (req,res)=>{
    let id = req.params.id
    let blog = await Blogs.findById(id)
    let blogData = req.body
    blog.title = blogData.title
    blog.content = blogData.content

    await blog.save()
    res.json({
        "message":"updated succesfully"
    })
})

app.delete("/delete-blog/:id",authenticate,async(req,res)=>{
    let id = req.params.id
    await Blogs.findByIdAndDelete(id)
    res.json({
        "message": "blog deleted"
    })
})

app.listen(PORT,()=>{
    console.log(`successfully connected to ${PORT}`);
    
})