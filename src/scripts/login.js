import { toast } from "./toast.js";

const token = localStorage.getItem('@petInfo:token');
const baseUrl = 'http://localhost:3333';
const green = '#168821';
const red = '#df1545';

function authentication(){
    if(token){
        location.replace('./src/pages/dashboard.html');
    }
}

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

            toast('Login realizado com sucesso, redirecionando para dash board ! :D', green);
            setTimeout(() =>{
                location.replace('./src/pages/dashboard.html');
            },3000)
            return resJson;
        }else{
            throw new Error(resJson.message);
        }
    }).catch(err => toast(err.message, red))
    return token;
}

function handleLogin(){
    const inputs = document.querySelectorAll('.input__login');
    const button = document.querySelector('.login__user');
    let loginBody = {};
    let count = 0 ;

    button.addEventListener('click', (event)=>{
        event.preventDefault();

        inputs.forEach(input => {
            if(input.value.trim() === ''){
                count++;
            }
            loginBody[input.name] = input.value.trim();
        })

        if(count != 0){
            count = 0;
            return toast('Por favor, preencha todos os campos !',red);
        }else{
            loginRequest(loginBody);
        }
    })
}


authentication();
handleLogin();