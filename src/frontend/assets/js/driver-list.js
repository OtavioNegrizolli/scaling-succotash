import { showModal } from "./helpers.js";

function onDelete(id) {
    return async function onDeleteFn() {
        showModal({
            message: `Você tem certeza que quer excluir o veículo [${id}]`,
            title: 'Deseja Excluir',
            type: 'warning',
            hasCancelButton: true
        }).then( async v => {
            const res = await fetch(`/api/motoristas/${id}`, {
                method: 'DELETE'
            });
            if (res.status == 204) {
                await showModal({ message: 'Deletedo com sucesso ', title: 'Foi-se', type: 'info' });
                loadList();
            }
            else {
                showModal({ title: res.statusText, message: 'Bad' });
            }
        }).catch( e = {});
    }
}

document.addEventListener('DOMContentLoaded', loadList);
function loadList() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    fetch('/api/motoristas').then(response => {
        if (response.status == 200) {
            response.json().then(drivers => {
                for (let i = 0; i < drivers.length; i++) {
                    const id = document.createElement('td');
                    id.innerText = drivers[i].id;

                    const name = document.createElement('td');
                    name.innerText = drivers[i].name;

                    const cpf = document.createElement('td');
                    cpf.innerText = drivers[i].cpf?.replace(/(\d{3})(\d{3})(\d{3})(.{2})/, '$1.$2.$3-$4');
                    
                    const cnh = document.createElement('td');
                    cnh.innerText = drivers[i].cnh;

                    const edit = document.createElement('a');
                    edit.href = `/motoristas/${drivers[i].id}`;
                    edit.innerHTML = '<i class="fas fa-pencil"></i>';

                    const del = document.createElement('a');
                    del.href = 'javascript:void(0)';
                    del.innerHTML = '<i class="fas fa-trash"></i>';
                    del.addEventListener('click', onDelete(drivers[i].id));

                    const actions = document.createElement('td');
                    actions.append(edit, del);
                    const tr = document.createElement('tr');
                    tr.append(id, name, cpf, cnh, actions);
                    tbody.append(tr);
                }
            });
        }
    })//
        .catch(e => {

        });
}
