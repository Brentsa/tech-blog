async function handleCommentForm(event){
    event.preventDefault();

    const text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = document.location.toString().split('/')[document.location.toString().split('/').length-1];

    console.log(text, post_id);

    if(text && post_id){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                text
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok){
            document.location.reload();
        }
        else{
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', handleCommentForm);