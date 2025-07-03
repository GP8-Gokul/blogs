window.onload = async () => {
    let pathParts = window.location.pathname.split('/')
    let id = pathParts[pathParts.length - 1]

    console.log(id)

    let response = await axios.get(`${BACKEND_URL}/blog-by-user/${id}`,{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    if(response.data.blog){
        let blog = response.data.blog
        let mainDiv = document.getElementById('main')
        let title = document.createElement('h2')
        let author = document.createElement('h3')
        let content = document.createElement('p')
        let blogDiv = document.createElement('div')
        title.textContent = blog.title
        author.textContent = `Author: ${blog.author}`

        let titleDiv = document.createElement('div')
        titleDiv.appendChild(title)
        titleDiv.appendChild(author)
        titleDiv.classList.add('title')

        content.innerHTML = blog.content
        blogDiv.id = blog.id
        blogDiv.userId = blog.userId
        blogDiv.appendChild(titleDiv)
        blogDiv.appendChild(content)
        mainDiv.appendChild(blogDiv)
}
}