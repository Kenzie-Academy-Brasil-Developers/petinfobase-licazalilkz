/* Desenvolva seu código aqui */
const baseUrl = 'http://localhost:3333';

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
            return resJson;
        }else{
            throw new Error (resJson.message);
        }
    })
    .catch(err => alert(err));
}

function handleNewUser (){
    const inputs = document.querySelectorAll('.input__register');
    const button = document.querySelector('.submit__user');
    let newUser = {};

    button.addEventListener('click', (event) => {
        event.preventDefault();

        inputs.forEach(input => {
            newUser[input.name] = input.value;
        })
        createUser(newUser);
        console.log(newUser);
    })
}

handleNewUser();