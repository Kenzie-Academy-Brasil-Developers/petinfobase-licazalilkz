const baseUrl = 'http://localhost:3333';
const token = localStorage.getItem('@petInfo:token');
 

async function getProfile(){
    const infos = await fetch(`${baseUrl}/users/profile`,{
        method:'GET',
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(async(res)=>{
        const resJson = await res.json();
        if(res.ok){
            return resJson;
        }else{
            throw new Error(resJson.message);
        }
    })
    .catch(err=>alert(err));

    return infos;
}

async function renderUser(){
    const image = document.querySelector('.user__img');
    const userToken = await getProfile();
    console.log(userToken.avatar)

    image.src = userToken.avatar;
}

renderUser();