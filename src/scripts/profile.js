const baseUrl = 'http://localhost:3333';
 

export async function getProfile(){
    const token = localStorage.getItem('@petInfo:token');
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