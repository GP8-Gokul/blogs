window.onload = async () =>{
    let mainDiv = document.getElementById('main')
    let response = await axios.get('http://localhost:3000/blogs-by-user',{
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

            let updateDeleteDiv = document.createElement('div')
            let updateButton = document.createElement('button')
            let deleteButton = document.createElement('button')

            updateButton.textContent = '✏️ Edit'
            deleteButton.textContent = '🗑️ Delete'


            deleteButton.classList.add('delete')
            updateButton.onclick = (event) => {
                event.stopPropagation()
                updateContent(blog.id)
            }

            deleteButton.onclick = (event) => {
                event.stopPropagation()
                deleteContent(blog.id)
            }

            updateDeleteDiv.appendChild(updateButton)
            updateDeleteDiv.appendChild(deleteButton)
            updateDeleteDiv.classList.add('blog-buttons')

            let blogTop = document.createElement('div')
            blogTop.classList.add('blog-top')
            blogTop.appendChild(titleDiv)
            blogTop.appendChild(updateDeleteDiv)

            blogDiv.id = blog.id
            blogDiv.userId = blog.userId
            blogDiv.classList.add('blog')
            content.classList.add('content')
            blogDiv.appendChild(blogTop)
            blogDiv.appendChild(content)
            blogDiv.onclick = () =>{
                window.location.href = `/blogs/${blog.id}`
            }
            mainDiv.appendChild(blogDiv)
        });
    }
    else{
        mainDiv.innerHTML = `<h1> No Blogs Yet </h1>`
    }
}

function create(){
    window.location.href = "/create-blogs"
}

function allBlogs(){
    window.location.href = "/all-blogs"
}

function myBlogs(){
    window.location.href = "/user-blogs"
}

function logout(){
    localStorage.removeItem('token')
    window.location.href = '/'
}

function updateContent(id){
    window.location.href=`/update-blog/${id}`
}

async function deleteContent(id) {
    const userChoice = confirm("Are you sure you want to delete")
    if(userChoice){
        let response = await axios.delete(`http://localhost:3000/delete-blog/${id}`,{
            headers:{
                token:localStorage.getItem('token')
            }
        })
        if(response.data){
            window.location.reload()
        }
    }
    
}