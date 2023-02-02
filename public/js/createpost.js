$( document ).ready( function() {
    
    const categoryModal = new bootstrap.Modal(document.getElementById('modalCookie1'));
    const titleModal = new bootstrap.Modal(document.getElementById('modalCookie2'));
    const descriptionModal = new bootstrap.Modal(document.getElementById('modalCookie3'));

    createPost = (title, description, category_id) => {
        const response =  fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({title, description, category_id}),
            headers: { 'Content-Type': 'application/json' },
        });
        window.location = "/profile/account";
    };

    $('#post-button').click( function(event) {
        event.preventDefault(); 
        const title = $('.postTitle').val();
        const description = $('#post-content').val();
        const  category_id = $('.categoryId').val(); 
        if(category_id === "Category"){
            categoryModal.show();
            return;           
        }
        if(!title){
            titleModal.show();
            return;
        }
        if(!description){
            descriptionModal.show();
            return;
        }        
        createPost(title, description, category_id);        
    });
});