import { applyErrorMsg, showModal, redirect, getFormInputData } from './helpers.js';
import api from './api.js';
/**
 * @param {Event} e 
 */
async function onSubmit(e) {
    e.preventDefault();
    try {
        resetErrorMsg();
        const data = getFormInputData();

        const responseData = await (
            Number(data.id) > 0 ?
                // update
                api.put(`/api/trajetos/${data['id']}`, data) :
                // create
                api.post('/api/trajetos', data)
        );

        switch (responseData.status) {
            case 201: await onCreated(responseData); break;
            case 200: onUpdate(); break;
            case 400: await onBadRequest(responseData); break;
            case 401: redirect('/login'); break;
            case 403: break;
            case 500: break;
            default: console.log(responseData);
        }
    }  // errors da aplicação web
    catch (error) {
        showModal({ title: 'Erro', message: error.message || error.error || error, type: 'error' });
    }
}

function onUpdate() {
    showModal({ title: 'Feito', message: 'Atualizado com sucesso', }).then(e => {
        window.location.reload();
    });
}

async function onBadRequest(response) {
    const { errors } = await response.json();
    if (typeof errors == 'string' || errors.errors) {
        showModal({
            title: 'Error',
            message: errors.errors || errors,
            type: 'error'
        });
    }
    else
        Object.keys(errors).forEach(k => applyErrorMsg(k, errors[k]));
}


/**
 * @param {Response} response 
 */
async function onCreated(response) {
    const location = response.headers.get('location');
    if (location) {
        showModal({
            title: 'Criado com sucesso',
            message: `Criado o veiculo com id ${location.split('/')[2]}`,
        }).then(
            () => redirect(location)
        );
    }
}

async function checkForEditing() {
    const path = window.location.pathname.split('/');
    if (path.length == 3) {
        const id = Number(path.pop());
        if (id > 0) {
            const data = await api.get(`/api/trajetos/${id}`);
            if (data.status == 200) {
                const body = await data.json();
                Object.keys(body).forEach(k => {
                    const inpt = document.querySelector(`#${k}`);
                    if (inpt) {
                        inpt.value = body[k];
                        inpt.dispatchEvent(new Event('input'));
                    }
                });
            }
            else if (data.status === 404) {
                showModal({
                    title: '404',
                    message: 'Trajeto não encontrado, redirecinando para o cadastro'
                }).then(() =>
                    redirect('/trajetos/0')
                );
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector('form').addEventListener('submit', onSubmit);
    VMasker(document.querySelectorAll('[inputmode=numeric]')).maskMoney({
        separator: ',',
        precision: 2,
        delimiter: '.',
        unit: '',
        suffixUnit: ''
    });
    await checkForEditing();
});
