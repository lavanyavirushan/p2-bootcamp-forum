$( document ).ready( function() {

    const avatar = document.querySelector('#avatar');
    const upload = document.querySelector('#formFile');
    const errorNameModal = new bootstrap.Modal(document.getElementById('modalCookie1'));
    const errorMessageModal = new bootstrap.Modal(document.getElementById('modalCookie2'));
    const errorAvatarModal = new bootstrap.Modal(document.getElementById('modalCookie3'));
    let base64 = "";
    let error = 0;
    const edit = async() => {
        const username = document.querySelector('#username').value.trim();
        const message = document.querySelector('#message').value.trim();

        let errors = 0;
        const image = base64;
        if (username.length > 0){
            try {
                const nameResponse = await fetch('/api/user/edit-name', {
                    method: 'POST',
                    body: JSON.stringify({username}),
                    headers: { 'Content-Type': 'application/json' },            
                }); 
                
                if(!nameResponse.ok){
                    error++;
                    errorNameModal.show();
                    return;
                }
                
            } catch (error) {
                console.warn(error);
                return;
            } 
        }

        if (message.length > 0){

            try {
                const messageResponse = await fetch('/api/user/edit-message', {
                    method: 'POST',
                    body: JSON.stringify({ message}),
                    headers: { 'Content-Type': 'application/json' },
                });
                
                if(!messageResponse.ok){
                    error++;
                    errorMessageModal.show();
                    return;
                }
            } catch (error) {
                console.warn(error);
                return;
            }

        }
        if (image.length > 0){  

            try {
                const avatarResponse = await fetch('/api/user/edit-avatar', {
                    method: 'POST',
                    body:  JSON.stringify({image}),
                    headers: { 'Content-Type': 'application/json' },
                });
                
                if(!avatarResponse.ok){
                    error++;
                    errorAvatarModal.show();
                    return;
                }
            } catch (error) {
                console.warn(error);
                return;
            }
        }
        if (errors == 0){
            window.location = "/profile/account";
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

});