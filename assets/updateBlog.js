window.onload = async () => {
    let pathParts = window.location.pathname.split('/')
    let id = pathParts[pathParts.length - 1]

    console.log(id)

    let response = await axios.get(`http://localhost:3000/blog-by-user/${id}`,{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    if(response.data.blog){
        let blog = response.data.blog

        document.getElementById('title').value = blog.title
        document.getElementById('content').innerHTML = blog.content
        window.blogId = id
    }
}

async function update() {
    let title = document.getElementById('title').value
    let content = document.getElementById('content').innerHTML

    content = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: ['strong', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br','img'],
        ALLOWED_ATTR: []
    });

    let response = await axios.put(`http://localhost:3000/edit-blog/${window.blogId}`,
        {
            title,
            content
        },
        {
            headers: {
                token: localStorage.getItem('token')
            }
        },
    )
    if (response.data.message) {
        const userChoice = confirm(`${response.data.message}\n\nClick OK to go back to your blogs`) 
        if (userChoice) {
            window.location.href = "/user-blogs"
        }
    }
    else {
        alert(response.data.error)
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