async function signupFormHandler(event){
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(username, password){
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert('Account not created. Error: ' + response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', signupFormHandler);