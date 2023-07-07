const baseUrl = 'http://localhost:3333';

async function loginRequest(loginBody){
    const token = await fetch(`${baseUrl}/login`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(loginBody)
    }).then(async(res)=>{
        const resJson = await res.json();
        if(res.ok){
            localStorage.setItem('@petInfo:token', resJson.token)
            return resJson;
        }else{
            throw new Error(resJson.message);
        }
    }).catch(err => alert(err))
    return token;
}

function handleLogin(){
    const inputs = document.querySelectorAll('.input__login');
    const button = document.querySelector('.login__user');
    let loginBody = {};

    button.addEventListener('click', (event)=>{
        event.preventDefault();
        inputs.forEach(input => {
            loginBody[input.name] = input.value;
        })
        console.log(loginBody);
        loginRequest(loginBody);
    })
}
handleLogin();