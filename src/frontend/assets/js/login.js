const onLogin = async (e) => {
    e.preventDefault();

    const name = document.querySelector("#user-name").value;
    const password = document.querySelector("#user-password").value;

    try {
        const loginReponse = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        });
        console.log(await loginReponse.json());
    } catch (e) {
        console.error(e)
    }
}

document.querySelector("#login-form").addEventListener('submit', onLogin);
