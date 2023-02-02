$( document ).ready(async function() {
    var myModal = new bootstrap.Modal(document.getElementById('modalCookie1'));

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
            myModal.show();
            return;           
        }else{
            createPost(title, description, category_id);
        }
    });
});