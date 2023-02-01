const avatar = document.querySelector('#avatar');
const upload = document.querySelector('#formFile');
let base64 = "";
const edit = async() => {
    const id = document.querySelector('#user-id').textContent;
    const username = document.querySelector('#username').value.trim();
    const message = document.querySelector('#message').value.trim();
    let errors = 0;
    const image = base64;
    if (username.length > 0){ 
        const response = await fetch('/api/user/edit-name', {
            method: 'POST',
            body: JSON.stringify({id, username}),
            headers: { 'Content-Type': 'application/json' },            
        });
        if(!response.ok){
            errors++;
            //Show a modal
            //The username was too small
        }
    }
    if (message.length > 0){
        const messageResponse = await fetch('/api/user/edit-message', {
            method: 'POST',
            body: JSON.stringify({id, message}),
            headers: { 'Content-Type': 'application/json' },
        });
        if(!messageResponse.ok){
            errors++;
            //Show a modal
            //message too large!
        } 
    }
    if (image.length > 0){  
        const avatarResponse = await fetch('/api/user/edit-avatar', {
            method: 'POST',
            body:  JSON.stringify({id, image}),
            headers: { 'Content-Type': 'application/json' },
        });
        if(!avatarResponse.ok){
            //The file was too large
        }
    }
    if (errors == 0){
        window.location = "/account";
    }
};

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const uploadImage = async (event) => {
    const file = event.target.files[0];
    base64 = await convertBase64(file);
    avatar.src = base64;
}

upload.addEventListener("change", (event)=>{
   uploadImage(event);     
});

document.querySelector('.save').addEventListener('click', edit);