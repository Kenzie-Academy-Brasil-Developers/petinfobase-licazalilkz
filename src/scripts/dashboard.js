import { renderPosts } from "./render.js";
import { toast } from "./toast.js";
import { createPost, deletePostById, readAllPost, readPostById } from "./usersPosts.js";
import { getProfile } from "./profile.js";

const green = '#168821';
const red = '#df1545';

function handleModal(){
    const button = document.querySelector('.new__pub');
    const imgUser = document.querySelector('.user__img');
    const modalController = document.querySelector('.modal__userPost');
    const modalLogout = document.querySelector('.modal__userLogout');

    button.addEventListener('click', ()=>{
        modalController.showModal();
        // closeModal();   
    })

    imgUser.addEventListener('click', ()=>{
        modalLogout.showModal();
        // closeModal();   
    })
}

function handleNewPost(){
    const inputs = document.querySelectorAll('.create__post');
    const button = document.querySelector('.create__post-button');
    const buttonClose = document.querySelector('.modal__close');
    const modalController = document.querySelector('.modal__userPost');

    const newPost = {};

    button.addEventListener('click', (event)=>{
        event.preventDefault();

        inputs.forEach(input => {
            newPost[input.name] = input.value;
        })

        createPost(newPost);
        location.reload();
        modalController.close();
    })

    buttonClose.addEventListener('click',() => {
        modalController.close();
    })
}



async function logout(){
    const buttonLogout = document.querySelector('.button__logout');
    const userName = document.querySelector('.user__name');
    const userProfile = await getProfile();
    console.log('--------------------------------------------')
    console.log(userProfile);
    userName.innerHTML = `@ ${userProfile.username}`;
    buttonLogout.addEventListener('click', () => {
        localStorage.clear();
        location.replace('../../index.html');
    })
}

// createPost({
//     title: "Testando Post",
//     content: "Testando o post novamente do app kkkk"
// })

// console.log(await readAllPost());

// console.log(await readPostById("e7063f0e-252c-490b-b4a6-bd4bac1b7482",{
//     title: "Primeiro teste editado",
//     content: "Editando o primeiro teste da app"
// }));

// console.log(await deletePostById("8946caa1-ac3a-43bc-9bd5-254fd8af3a60"))

handleNewPost();
handleModal();
logout();