const likePostEl = document.querySelector("#like-post");

/**
 * Listen for like post button click and triger a dispatch to submit like
 */
likePostEl.addEventListener("click", function(){
    likePost()
});