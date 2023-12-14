import { showModal } from "./helpers.js";

function onDelete(id) {
    return async function onDeleteFn() {
        const res = await fetch(`/api/veiculos/${id}`, {
            method: 'DELETE'
        });
        if (res.status == 204) {
            await showModal({ message: 'Deletedo com sucesso ', title: 'Foi-se', type: 'info' });
            loadList();
        }
        else {
            showModal({ title: res.statusText, message: 'Bad' });
        }
    }
}

document.addEventListener('DOMContentLoaded', loadList);
function loadList() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    fetch('/api/veiculos').then(response => {
        if (response.status == 200) {
            response.json().then(vehicle => {
                for (let i = 0; i < vehicle.length; i++) {
                    const id = document.createElement('td');
                    id.innerText = vehicle[i].id;
                    const licensePlate = document.createElement('td');
                    licensePlate.innerText = vehicle[i].licensePlate;
                    const maxWeight = document.createElement('td');
                    maxWeight.innerText = vehicle[i].maxWeight;
                    const maxWidth = document.createElement('td');
                    maxWidth.innerText = vehicle[i].maxWidth;
                    const maxHeight = document.createElement('td');
                    maxHeight.innerText = vehicle[i].maxHeight;
                    const maxLength = document.createElement('td');
                    maxLength.innerText = vehicle[i].maxLength;

                    const edit = document.createElement('a');
                    edit.href = `/veiculos/${vehicle[i].id}`;
                    edit.innerHTML = '<i class="fas fa-pencil"></i>';

                    const del = document.createElement('a');
                    del.href = 'javascript:void(0)';
                    del.innerHTML = '<i class="fas fa-trash"></i>';
                    del.addEventListener('click', onDelete(vehicle[i].id));

                    const actions = document.createElement('td');
                    actions.append(edit, del);
                    const tr = document.createElement('tr');
                    tr.append(id, licensePlate, maxWeight, maxWidth, maxHeight, maxLength, actions);
                    tbody.append(tr);
                }
            });
        }
    })//
        .catch(e => {

        });
}
