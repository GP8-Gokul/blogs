function togglesi(){
    let signup = document.getElementById("signup")
    let signin = document.getElementById("signin")
    signin.classList.remove('hide')
    signup.classList.add('hide')
}

function togglesu(){
    let signup = document.getElementById("signup")
    let signin = document.getElementById("signin")
    signin.classList.add('hide')
    signup.classList.remove('hide')
}

async function signin() {
    let username = document.getElementById('susername').value
    let password = document.getElementById('spassword').value

    let response = await axios.post("http://localhost:3000/signin", {
        username,
        password
    })
    if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        window.location.href = '/all-blogs'
    }
}

async function signup(){
    let name = document.getElementById('name').value
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    let response = await axios.post("http://localhost:3000/signup",{
        name,
        username,
        password
    })
    if(response.data.message){
        document.getElementById('susername').value = username
        document.getElementById('spassword').value = password
        togglesi()
    }
    else if(response.data.error){
        alert(response.data.error)
    }
}