async function handleBlogUpdate(event){
    event.preventDefault();
    console.log('update');

    //Get the title and content from the form and id of the post from the URL
    const title = document.querySelector('textarea[name="blog-title"]').value.trim();
    const content = document.querySelector('textarea[name="blog-content"]').value.trim();
    const id = document.location.toString().split('/')[document.location.toString().split('/').length - 1];

    //If the title and content have been written, send the update request to the server
    if(title && content){
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'}
        })

        //If the response is ok, got to the dashboard, otherwise alert the user on the error.
        if(response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText);
        }
    }
    else{
        alert('Must enter a title and content for your blog.');
    }
}

async function handleBlogDelete(event){
    event.preventDefault();

    //Get the id of the post from the URL
    const id = document.location.toString().split('/')[document.location.toString().split('/').length - 1];

    //Send a delete request to the server
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    //Go to the dashboard if the delete request went through otherwise alert the user on the error
    if(response.ok){
        document.location.replace('/dashboard');
    }
    else{
        alert(response.statusText);
        document.location.replace('/login');
    }
}

document.querySelector('.blog-form').addEventListener('submit', handleBlogUpdate);
document.querySelector('.delete-btn').addEventListener('click', handleBlogDelete);