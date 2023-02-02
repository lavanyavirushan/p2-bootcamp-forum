const likeURL = `${window.location.protocol}//${window.location.host}/api/`;

/**
 * Create a comment for the post
 * User MUST BE Signed in
 * @param { "comment": string, "post_id": string } queryParam
 */
function likePostAPI(queryPram, callback){
    $.ajax({
        method: 'POST',
        url: `${likeURL}/posts/${queryPram.post_id}/like`,
        contentType: 'application/json',
        success: function(result) {
            callback(result);
        },
        error: function ajaxError(jqXHR) {
            callback([]);
        }
    });
}