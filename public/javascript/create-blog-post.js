async function handleCreateNewBlog(event){
    event.preventDefault();

    const title = document.querySelector('textarea[name="blog-title"]').value.trim();
    const content = document.querySelector('textarea[name="blog-content"]').value.trim();

    console.log(title, content);

    if(title && content){
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText);
        }
    }
}

document.querySelector('.blog-form').addEventListener('submit', handleCreateNewBlog);