import { toast } from "./toast.js";

/* Desenvolva seu código aqui */
const baseUrl = 'http://localhost:3333';
const green = '#168821';
const red = '#df1545';

async function createUser(requestBody){
    const newUser = await fetch(`${baseUrl}/users/create`, {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(async (res) => {
        const resJson = await res.json();
        if(res.ok){
            toast('Cadastro realizado com sucesso', green)
            setTimeout(() =>{
                location.replace('../../index.html');
            },3000)
            return resJson;
        }else{
            throw new Error (resJson.message);
        }
    })
    .catch(err => toast(err.message, red));
}

function handleNewUser (){
    const inputs = document.querySelectorAll('.input__register');
    const button = document.querySelector('.submit__user');
    let newUser = {};
    let count = 0;

    button.addEventListener('click', (event) => {
        event.preventDefault();

        inputs.forEach(input => {
            if(input.value.trim() === ''){
                count++;
            }
            newUser[input.name] = input.value;
        })
        if(count != 0){
            count = 0;
            return toast('Por favor, preencha todos os campos !',red);
        }else{
            createUser(newUser);
        }
        console.log(newUser);
    })
}

handleNewUser();