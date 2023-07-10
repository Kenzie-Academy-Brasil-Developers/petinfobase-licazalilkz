import { toast } from "./toast.js";

const baseUrl = 'http://localhost:3333';
const token = localStorage.getItem('@petInfo:token');
const green = '#168821';
const red = '#df1545';



export async function createPost(postBody){
    const newPost = await fetch(`${baseUrl}/posts/create`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postBody),
    })
    .then(async (res)=>{
        const resJson = await res.json();

        if(res.ok){
            toast('Post criado com sucesso !', green);
            return resJson;
        }else{
            throw new Error(resJson.message);
        }
    })
    .catch(err => toast(err.message, red));
    return createPost;
}

export async function readAllPost(){
    const allPost = await fetch (`${baseUrl}/posts`,{
        method: 'GET',
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then(res => {
        if(res.ok){
            return res.json()
        }else{
            throw new Error ('Problemas no server, tente mais tarde !')
        }
    })
    .catch(err => toast(err.message, red))

    return allPost;
}

export async function readPostById(postId, requestBody){
    const post = await fetch(`${baseUrl}/posts/${postId}`,
    {
        method:"PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(async (res) => {
        const resJson = await res.json();

        if(res.ok){
            toast('Publicacao atualizada com sucesso!', green)
            return resJson;
        }else{
            throw new Error (resJson.message);
        }
    })
    .catch(err => toast(err.message, red))

    return post;
}

export async function deletePostById(postId){
    const deletePost = await fetch(`${baseUrl}/posts/${postId}`,{
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then(async (res) => {
        const resJson = await res.json();

        if(res.ok){
            toast('Publicacao deletada com sucesso', green);
            return resJson;
        }else{
            throw new Error (resJson.message);
        }
    }).catch(err => toast(err.message, red))
    return deletePost;
}