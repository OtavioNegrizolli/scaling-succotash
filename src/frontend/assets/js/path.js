import { applyErrorMsg, showModal } from './helpers.js';
import api from './api.js';
/**
 * @param {Event} e 
 */
async function onSubmit(e) {
    e.preventDefault();
    try {
        document.querySelectorAll('.help-text').forEach(ht => ht.innerHTML = '');
        const data = {};

        document.querySelectorAll('.form-group input').forEach(input => {
            data[input.id] = input.value;
        });
        // update
        if (Number(data.id) > 0) {
            console.log(data);
            const responseData = await api.put(`/api/trajetos/${data['id']}`, data);
            if (responseData.status === 200)
                showModal({
                    message: 'Atualizado com sucesso',
                    title: 'Feito'
                }).then(e => {
                    window.location.reload();
                });
        } // create
        else {
            const responseData = await api.post('/api/trajetos', data);
            switch (responseData.status) {
                case 201: await onCreated(responseData); break;
                case 400: await onBadRequest(responseData); break;
                case 401: api.redirect('/login'); break;
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
            message: `Criado o veiculo com id ${location.split('/')[3]}`,
        }).then(e => {
            api.redirect(location);
        });
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
                    console.log(k, body[k])
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
                    message: 'Não encontrei o trajeto passado, redirecinando para o cadastro'
                }).then(() => {
                    api.redirect('/trajetos/0');
                });
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
    document.querySelector('#avaregeTime').addEventListener('keyup', (e) => { console.log('up');} )
    document.querySelector('#avaregeTime').addEventListener('input', (e) => {
        console.log('in');
        const v = e.target.value;

        const parts = v.split(',');
        console.log(parts);
        if (parts[1] != null) {

            let asNum = Number(parts[1]);
            let minutes = asNum;
            if (asNum > 99) {
                console.log(asNum);
                minutes = asNum - Math.floor(asNum / 100) * 100;
                asNum = Math.floor(asNum / 100);
                console.log(minutes, asNum);
            }
            if (minutes > 59) {
                e.target.value = `${parts[0]},${asNum}00`
            }
        }
    });
    await checkForEditing();
});
