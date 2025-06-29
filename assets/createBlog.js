async function submit() {
    let title = document.getElementById('title').value
    let content = document.getElementById('content').innerHTML

    content = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: ['strong', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br','img'],
        ALLOWED_ATTR: []
    });

    let response = await axios.post(`${BACKEND_URL}/create-blogs`,
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
        window.location.href = "/all-blogs"
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