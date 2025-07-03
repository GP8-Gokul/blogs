const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const UsersSchema = new Schema({
    name: String,
    username: String,
    password: String
})

const blogsSchema = new Schema({
    title: String,
    author : String,
    content: String,
    userId: ObjectID
})

const Users = mongoose.model('users', UsersSchema)
const Blogs = mongoose.model('blogs', blogsSchema)

module.exports = {
    Users,
    Blogs
}