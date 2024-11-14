window.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://jsonplaceholder.typicode.com';

    let usersContainer = document.getElementById('users-container');
    let infoUser = document.getElementById('info-user');

    const getAndShowUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw Error('Error al consultar los usuarios');
            }

            const data = await response.json();

            if (data.length <= 0) {
                throw Error('No hay usuarios para mostrar');
            }

            let divList = document.createElement('div');
            divList.classList.add('list-users')

            let tituloListado = document.createElement('h2');
            tituloListado.textContent = 'Listado de Usuarios'
            divList.append(tituloListado);

            let fragmentList = document.createDocumentFragment();

            data.forEach((user, index) => {
                let button = document.createElement('button');
                button.classList.add('btn-user');
                button.id = user.id;
                button.textContent = user.name;

                //Añador evento click a cada botón
                button.addEventListener('click', (e) => {
                    getUserInfo(e.target.id);
                });

                fragmentList.appendChild(button);
            });
            divList.appendChild(fragmentList);
            usersContainer.append(divList);
        } catch (error) {
            alert(error.message);
        }
    }
    //Ejecutar función
    getAndShowUsers();

    const getUserInfo = async (id) => {
        try {
            let div = document.createElement('div');
            div.classList.add('info-container');
            let fragmentUser = document.createDocumentFragment();

            infoUser.innerHTML = '';

            if (!id || id <= 0 || isNaN(id)) {
                throw Error('Parámetro inválido');
            }

            const response = await fetch(`${API_URL}/users/${id}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw Error('Error al obtener la información del usuario');
            }

            const data = await response.json();
            if (typeof data !== 'object' || Object.keys(data).length === 0) {
                throw Error('No se puede procesar la información');
            }

            let h2 = document.createElement('h2');
            h2.textContent = data.name;
            div.append(h2);

            const createDiv = (labelText, valueText) => {
                let infoDiv = document.createElement('div');
                infoDiv.classList.add('info-item');

                let label = document.createElement('span');
                label.classList.add('info-label');
                label.textContent = labelText;

                let value = document.createElement('span');
                value.classList.add('info-value');
                value.textContent = valueText;

                infoDiv.append(label);
                infoDiv.append(value);

                return infoDiv;
            };

            div.append(createDiv('Nombre:', data.name));
            div.append(createDiv('Username:', data.username));
            div.append(createDiv('Email:', data.email));
            div.append(createDiv('Dirección:', `${data.address.street} ${data.address.suite}, ${data.address.city}`));
            div.append(createDiv('Teléfono:', data.phone));
            div.append(createDiv('Sitio Web:', data.website));
            div.append(createDiv('Compañía:', data.company.name));

            fragmentUser.append(div);
            infoUser.append(fragmentUser);
        } catch (error) {
            alert(error.message);
        }
    }
});