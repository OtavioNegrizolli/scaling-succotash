import { applyErrorMsg, showModal, redirect, resetErrorMsg, getFormInputData } from './helpers.js';
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
                api.put(`/api/veiculos/${data['id']}`, data) :
                // create
                api.post('/api/veiculos', data)
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

async function onBadRequest(response) {
    const { errors } = await response.json();
    console.log(errors);
    if (typeof errors == 'string') {
        showModal({ message: errors.error, title: 'Erro', type: 'warning' });
    }
    else
        Object.keys(errors).forEach(k => applyErrorMsg(k, errors[k]));
}


/**
 * @param {Response} response 
 */
async function onCreated(response) {
    const location = response.headers.get('location');
    console.log(location.split('/'));
    if (location) {
        showModal({
            title: 'Sucesso',
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
            const data = await fetch(`/api/veiculos/${id}`);
            if (data.status == 200) {
                const body = await data.json();
                Object.keys(body).forEach(k => {
                    console.log(k, body[k])
                    /**
                     * @type {HTMLInputElement}
                     */
                    const inpt = document.querySelector(`#${k}`);
                    if (inpt) {
                        inpt.value = body[k];
                        inpt.dispatchEvent(new Event('input'));
                    }
                });
            }  // id not found
            else if (data.status === 404) {
                showModal({
                    title: '404',
                    message: 'Veículo não encontrado, redirecinando para o cadastro'
                }).then(() =>
                    redirect('/veiculos/0')
                );
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector('form').addEventListener('submit', onSubmit);
    VMasker(document.querySelectorAll('[inputmode=numeric]')).maskMoney({
        separator: ',',
        precision: 3,
        delimiter: '.',
        unit: '',
        suffixUnit: ''
    });
    await checkForEditing();
});
