function loginFormHandler(event){
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    console.log(password, username);
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);