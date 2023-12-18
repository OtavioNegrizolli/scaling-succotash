import { showModal } from "./helpers.js";
import api from "./api.js";

function onDelete(id) {
    return async function onDeleteFn() {
        showModal({
            message: `Você tem certeza que quer excluir o veículo [${id}]`,
            title: 'Deseja Excluir',
            type: 'warning',
            hasCancelButton: true
        }).then(async v => {
            const res = await api.delete(`/api/trajetos/${id}`);
            if (res.status == 204) {
                await showModal({ message: 'Deletedo com sucesso ', title: 'Foi-se', type: 'info' });
                loadList();
            }
            else {
                showModal({ title: res.statusText, message: 'Bad' });
            }
        }).catch(e = {});
    }
}

document.addEventListener('DOMContentLoaded', loadList);
function loadList() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    fetch('/api/trajetos').then(response => {
        if (response.status == 200) {
            response.json().then(vehicle => {
                for (let i = 0; i < vehicle.length; i++) {
                    const id = document.createElement('td');
                    id.innerText = vehicle[i].id;
                    const name = document.createElement('td');
                    name.innerText = vehicle[i].name;
                    const origin = document.createElement('td');
                    origin.innerText = vehicle[i].origin;
                    const destinantion = document.createElement('td');
                    destinantion.innerText = vehicle[i].destination;
                    const distance = document.createElement('td');
                    distance.innerText = Intl.NumberFormat('pt-BR').format(vehicle[i].distance);
                    const avaregeTime = document.createElement('td');
                    avaregeTime.innerText = Intl.NumberFormat('pt-BR').format(vehicle[i].avaregeTime);

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
                    tr.append(id, name, origin, destinantion, distance, avaregeTime, actions);
                    tbody.append(tr);
                }
            });
        }
    })//
        .catch(e => {

        });
}
