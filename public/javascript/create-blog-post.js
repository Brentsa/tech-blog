async function handleCreateNewBlog(event){
    event.preventDefault();

    //Get the title and content from the form
    const title = document.querySelector('textarea[name="blog-title"]').value.trim();
    const content = document.querySelector('textarea[name="blog-content"]').value.trim();

    //If the title and content have been written, send the update request to the server
    if(title && content){
        const response = await fetch('/api/posts', {
            method: 'POST',
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
}

document.querySelector('.blog-form').addEventListener('submit', handleCreateNewBlog);