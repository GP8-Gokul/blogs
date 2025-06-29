const express = require("express")
const jwt = require("jsonwebtoken")
const path = require('path')
const mongoose = require('mongoose')
const {Users , Blogs} = require('./db.js')

mongoose.connect('mongodb+srv://gokulpjayan2004:GrJKglYfoAfKCDGz@cluster0.infebp8.mongodb.net/blog-app-database')

app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "../assets")))

// let users = []
// let blogs = []
// let userId = 0
// let blogId = 0

const secretkey = "hello"

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../assets/sign.html"))
})

app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,"../assets/signup.html"))
})

app.get("/signin",(req,res)=>{
    res.sendFile(path.join(__dirname,"../assets/signin.html"))
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

app.post("/signin",(req,res)=>{
    let userData = req.body
    let user = users.find(user => user.username === userData.username)
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

app.post("/create-blogs",authenticate,(req,res)=>{
    let user = req.user
    let blogData = req.body
    blogData.userId = user.id
    blogData.id = blogId++
    blogData.author = user.username
    blogs.push(blogData)
    console.log(blogs)
    res.json({
        message:"blog created successfully"
    })
})

app.get("/view-all-blogs",authenticate,(req,res)=>{
    res.json({
        "blogs":blogs.slice().reverse()
    })
})

app.get("/blogs-by-user",authenticate,(req,res)=>{
    let user = req.user
    let blogsToBeReturned = blogs.filter(blog => blog.userId == user.id)
    res.json({
        "blogs":blogsToBeReturned.reverse()
    })
})

app.get("/blog-by-user/:id",authenticate,(req,res)=>{
    let id = req.params.id
    let blog = blogs.find(blog => blog.id == id)
    res.json({
        blog:blog
    })
})

app.put("/edit-blog/:id",authenticate,(req,res)=>{
    let id = req.params.id
    let blog = blogs.find(blog => blog.id == id)
    let blogData = req.body
    blog.title = blogData.title
    blog.content = blogData.content
    res.json({
        "message":"updated succesfully"
    })
})

app.delete("/delete-blog/:id",authenticate,(req,res)=>{
    let id = req.params.id
    let blogIndex = blogs.findIndex(blog => blog.id == id)
    blogs.splice(blogIndex,1)
    res.json({
        "message": "blog deleted"
    })
})

app.listen(3000)