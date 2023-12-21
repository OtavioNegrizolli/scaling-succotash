import { applyErrorMsg, redirect, showModal, resetErrorMsg, getFormInputData } from './helpers.js';
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
                api.put(`/api/motoristas/${data['id']}`, data) :
                // create
                api.post('/api/motoristas', data)
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
    if (errors.error) {
        showModal({ title: 'Erro', message: errors.error });
    }
    else
        Object.keys(errors).forEach(k => applyErrorMsg(k, errors[k]));
}

function onUnathourized() {
    // forçar page reload
    redirect('/login');
}

/**
 * @param {Response} response 
 */
async function onCreated(response) {
    const location = response.headers.get('location');
    if (location) {
        showModal({
            title: 'Criado com sucesso',
            message: `Criado o motorista com id ${location.split('/')[2]}`,
        }).then(() =>
            redirect(location)
        );
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
            } // id not found
            else if (data.status === 404) {
                showModal({
                    title: '404',
                    message: 'Motorista não encontrado, redirecinando para o cadastro'
                }).then(() =>
                    redirect('/motoristas/0')
                );
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector('form').addEventListener('submit', onSubmit);

    document.querySelector('#cpf').addEventListener('input', (evt) => {
        /**@type {string} */
        let v = evt.target.value;
        if (v != null) {
            let pos = evt.target.selectionStart;
            if (v.length > 14) {
                v = v.substring(0, pos - 1) + v.substring(pos);
                evt.target.value = v;
                const newPos = pos - 1;
                evt.target.setSelectionRange(newPos, newPos);
            }
            else {
                // limpa a mascara
                let clear = v.replace(/\D/ig, '');


                // has at least 3 digits
                if (clear.length > 3) {
                    clear = clear.replace(/(\d{3})(.+)/, '$1.$2');
                }
                // has at least 7 digits + mask characeteres
                if (clear.length > 7) {
                    clear = clear.replace(/(.{7})(.+)/, '$1.$2');
                }
                // has at least 10 digits + mask characeteres
                if (clear.length > 11) {
                    clear = clear.replace(/(.{11})(.{1,2}).*/, '$1-$2');
                }

                if ([4, 8, 12].find(p => p == pos))
                    pos++;

                evt.target.value = clear;
                evt.target.setSelectionRange(pos, pos);
            }
        }
    });
    await checkForEditing();
});
