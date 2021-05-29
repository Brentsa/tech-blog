async function handleBlogUpdate(event){
    event.preventDefault();
    console.log('update');
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
    }
}

document.querySelector('.blog-form').addEventListener('submit', handleBlogUpdate);
document.querySelector('.delete-btn').addEventListener('click', handleBlogDelete);