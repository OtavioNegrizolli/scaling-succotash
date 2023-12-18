import { applyErrorMsg, showModal } from './helpers.js';
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
            const responseData = await fetch(`/api/veiculos/${data['id']}`, {
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
                }).then(e => {
                    window.location.reload();
                });
        } // create
        else {
            const responseData = await fetch('/api/veiculos', {
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
    console.log(errors);
    if (typeof errors == 'string') {
        showModal({ message: errors.error, title: 'Erro', type: 'warning' });
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
            message: `Criado o veiculo com id ${location.split('/')[3]}`,
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
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector('form').addEventListener('submit', onSubmit);
    document.querySelectorAll('[inputmode=number]')
        .forEach(i => {
            i.addEventListener('input', (evt) => {
                /** @type {string} */
                let v = evt.target.value;
                if (v.lastIndexOf(',') == -1) {
                    v += '00';
                }
                v = v?.replace(/\D/ig, '');
                let pos = evt.target.selectionStart;

                if (v.length < 2)
                    pos = 100000;
                else if (pos % 4 == 3 || pos >= v.length)
                    pos++;

                let value = Number(v);
                value /= 100; // add cents
                evt.target.value = Intl.NumberFormat('pt-BR').format(value);
                evt.target.setSelectionRange(pos, pos);
            });
        });
    await checkForEditing();
});
