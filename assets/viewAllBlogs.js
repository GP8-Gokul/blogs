window.onload = async () =>{
    let mainDiv = document.getElementById('main')
    let response = await axios.get('http://localhost:3000/view-all-blogs',{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    if(response.data.blogs){
        let blogs = response.data.blogs
        blogs.forEach(blog => {
            let title = document.createElement('h2')
            let author = document.createElement('h3')
            let content = document.createElement('p')
            let blogDiv = document.createElement('div')
            title.textContent = blog.title
            author.textContent = `Author: ${blog.author}`
            if(blog.content.length > 600){
                content.innerHTML = blog.content.substring(0,600) + '...................................'
            }
            else{
                content.innerHTML = blog.content
            }

            let titleDiv = document.createElement('div')
            titleDiv.appendChild(title)
            titleDiv.appendChild(author)
            titleDiv.classList.add('title')

            let blogTop = document.createElement('div')
            blogTop.classList.add('blog-top')
            blogTop.appendChild(titleDiv)

            blogDiv.id = blog._id
            blogDiv.userId = blog.userId
            blogDiv.classList.add('blog')
            content.classList.add('content')
            blogDiv.appendChild(blogTop)
            blogDiv.appendChild(content)
            blogDiv.onclick = () =>{
                window.location.href = `/blogs/${blog._id}`
            }
            mainDiv.appendChild(blogDiv)
        });
    }
    else{
        mainDiv.innerHTML = `<h1> No Blogs Yet </h1>`
    }
}


function myBlogs(){
    window.location.href = "/user-blogs"
}

function allBlogs(){
    window.location.href = "/all-blogs"
}

function create(){
    window.location.href = "/create-blogs"
}

function logout(){
    localStorage.removeItem('token')
    window.location.href = '/'
}