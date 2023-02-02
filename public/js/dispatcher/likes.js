
const likePost = () =>{
    const urlPathArray = window.location.pathname.split('/');
    likePostAPI({
        post_id: urlPathArray[2]
    },function(data){
        location.reload();
    })
}