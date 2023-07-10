import { readAllPost, deletePostById, readPostById } from "./usersPosts.js";
import { getProfile } from "./profile.js";

const token = localStorage.getItem('@petInfo:token');
const currentUser = await getProfile();

function authentication(){
    if(!token){
        location.replace('../../index.html');
    }
}

async function renderUser(){
    const image = document.querySelector('.user__img');
    const userProfile = await getProfile();

    image.src = userProfile.avatar;
}

export async function renderPosts(){

    const postList = document.querySelector('.post__list');
    const allPosts = await readAllPost(); 


    console.log(allPosts);


    allPosts.forEach(post => {
        const modalController = document.querySelector('.modal__userPost-edit');
        const cardPost = document.createElement('li');
        cardPost.className = 'card__post';

        const image = document.createElement('img');
        image.className = 'user__img';

        const postUserName = document.createElement('p');
        const postDate = document.createElement('p');
        const postTitle = document.createElement('p');
        const postContent = document.createElement('p');

        const buttonDelete = document.createElement('button');
        buttonDelete.className = 'button__delete';

        const buttonEdit = document.createElement('button');
        buttonEdit.className = 'button__editPost';

        const divUser = document.createElement('div');
        divUser.className = 'card__post-user';

        const divHeaderPost = document.createElement('div');
        divHeaderPost.className = 'card__post-header'

        const divPostContent = document.createElement('div');
        divPostContent.className = 'card_post-content';

        const divButtons = document.createElement('div');
        divButtons.className = 'card__post-div-buttons';

        const readMoreButton = document.createElement('button');
        readMoreButton.className = 'button__read';
        
        image.src = post.user.avatar;
        postUserName.innerHTML = post.user.username;
        postDate.innerHTML = post.createdAt;

        readMoreButton.innerHTML = 'Ver publicacao';

        divUser.appendChild(image);
        divUser.appendChild(postUserName);
        divUser.appendChild(postDate);
        divHeaderPost.appendChild(divUser);


        if(post.user.id === currentUser.id){
            const modalController = document.querySelector('.modal__userPost-edit');

            buttonEdit.innerHTML = "Editar Post";
            buttonDelete.innerHTML = "Deletar Post";

            divButtons.append(buttonEdit);
            divButtons.appendChild(buttonDelete);
            divHeaderPost.appendChild(divButtons)

            // console.log('Id confere');
            buttonDelete.addEventListener('click', () =>{
                deletePostById(post.id);
                setTimeout(() =>{
                    location.reload();                  
                },3000)
            })

            buttonEdit.addEventListener('click', () => {
                modalController.showModal();
            })

            const buttonModalEdit = document.querySelector('.modal__edit');
            const modalInputs = document.querySelectorAll('.edit__post');
            const editedPost = {};
            console.log(modalInputs);

            buttonModalEdit.addEventListener('click',(event)=>{
                event.preventDefault();
                modalInputs.forEach(input => {
                    editedPost[input.name] = input.value ;
                })
                readPostById(post.id, editedPost);
            })
        }

        postTitle.innerHTML = post.title;
        postContent.innerHTML = `${post.content.substring(0,100)} . . .`;

        divPostContent.appendChild(postTitle);
        divPostContent.appendChild(postContent);

        cardPost.appendChild(divHeaderPost);
        cardPost.appendChild(divPostContent);
        cardPost.appendChild(readMoreButton);
        postList.appendChild(cardPost);
        console.log(cardPost);

        const modalReadPost = document.querySelector('.modal__userPost-read');
        const readPost = document.querySelector('.user__currentPost');

        const modalbuttonclose = document.querySelector('.modal__currentPost-Close');
        
        readMoreButton.addEventListener('click',() => {
            modalReadPost.showModal();
            readPost.appendChild(divHeaderPost);
            readPost.appendChild(divPostContent);
        })
        modalbuttonclose.addEventListener('click', () => {
            modalReadPost.close();
            location.reload();
        })
   })
}

// console.log(await deletePostById("2ea34270-e373-4585-8c41-a1b6b1c033e2"))
authentication();
renderUser();
renderPosts();