const loginFormEl = document.querySelector('#login-form');
const signupFormEl = document.querySelector('#signup-form');

const showError = (parentEl, errorText) => {
    const errorEl = document.createElement('p');
    errorEl.classList.add('error-element');
    errorEl.textContent = errorText;
    parentEl.appendChild(errorEl);
};

const removeAllErrors = () => {
    const allErrors = document.querySelectorAll('.error-element');
    allErrors.forEach((el) => el.remove());
};

const loginFormHandler = async (event) => {
    event.preventDefault();
    removeAllErrors();

    const emailOrUsername = document.querySelector('#emailOrUsername-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (!emailOrUsername || !password) {
        showError(loginFormEl, "Please provide both an email/username and password.")
        return;
    }

    const userInfo = {
        email_or_username: emailOrUsername,
        password
    }

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-Type': 'application/json'},
        });

        if (!response.ok) {
            const res = await response.json();
            console.log(res);
            const errorMsg = res.message;
            showError(loginFormEl, errorMsg);
            return;
        }

        document.location.replace('/home');
    } catch (err) {
        console.log(err);
        showError(loginFormEl, "A login error has ocurred")
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
    removeAllErrors();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const userInfo = {
        username,
        email,
        password
    }

    if (!username || !email || !password) {
        console.log(userInfo)
        showError(signupFormEl, "Please fill out all of the listed fields.");
        return;
    }

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const res = await response.json();
            console.log(res);
            const errorMsg = res.errors[0].message;
            showError(signupFormEl, errorMsg);
            return;
        }

        document.location.replace('/home');
    } catch (err) {
        console.log(err);
        showError(signupFormEl, "A login error has ocurred")
    }
};

loginFormEl.addEventListener('submit', loginFormHandler);