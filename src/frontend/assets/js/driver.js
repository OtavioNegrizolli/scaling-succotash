import { applyErrorMsg, showModal } from './helpers.js';
/**
 * @param {Event} e 
 */
async function onSubmit(e) {
    e.preventDefault();
    try {
        const data = {};
        document.querySelectorAll('.help-text').forEach( ht => ht.innerHTML = '');
        document.querySelectorAll('.form-group input').forEach(input => {
            data[input.id] = input.value;
        });
        document.querySelectorAll('.form-group select').forEach(input => {
            data[input.id] = input.value;
        });
        // update
        console.log(data);
        if (Number(data.id) > 0) {
            const responseData = await fetch(`/api/motoristas/${data['id']}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (responseData.status === 200)
                showModal({
                    message: 'Atualizado com sucesso',
                    title: 'Feito'
                }).then(() => {
                    window.location.reload();
                });
        } // create
        else {
            const responseData = await fetch('/api/motoristas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            switch (responseData.status) {
                case 201: await onCreated(responseData); break;
                case 400: await onBadRequest(responseData); break;
                case 401: onUnathourized(responseData); break;
                case 403: break;
                case 500: break;
                default: console.log(responseData);
            }
        }
    }  // errors da aplicação web
    catch (error) {
        console.error(error);
    }
}

async function onBadRequest(response) {
    const { errors } = await response.json();
    if (errors.error) {
        showModal({ title: 'Erro', message: errors.error });
    }
    else
        Object.keys(errors).forEach(k => applyErrorMsg(k, errors[k]));
}

function onUnathourized() {
    // forçar page reload
    const a = document.createElement('a');
    a.href = '/login';
    a.click();
}

/**
 * @param {Response} response 
 */
async function onCreated(response) {
    const location = response.headers.get('location');
    if (location) {
        showModal({
            title: 'Criado com sucesso',
            message: `Criado o motorista com id ${location.split('/')[3]}`,
        }).then(e => {
            const a = document.createElement('a');
            a.href = location;
            a.click();
        });
    }
}

async function checkForEditing() {
    const path = window.location.pathname.split('/');
    if (path.length == 3) {
        const id = Number(path.pop());
        if (id > 0) {
            const data = await fetch(`/api/motoristas/${id}`);
            if (data.status == 200) {
                const body = await data.json();
                Object.keys(body).forEach(k => {
                    console.log(k, body[k])
                    const inpt = document.querySelector(`#${k}`);
                    if (inpt)
                        inpt.value = body[k];
                });
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector('form').addEventListener('submit', onSubmit);
    await checkForEditing();
});
