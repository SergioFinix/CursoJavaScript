window.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://jsonplaceholder.typicode.com';
    const API_IMAGES = 'https://rickandmortyapi.com/api/character'

    let usersContainer = document.getElementById('users-container');
    let infoUser = document.getElementById('info-user');

    let styleContainer = document.getElementById('style-container');


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

            styleContainer.classList.add('ocultar');

            let div = document.createElement('div');
            div.id = 'info-container';
            div.classList.add('info-container');
            let fragmentUser = document.createDocumentFragment();

            infoUser.innerHTML = '';

            if (!id || id <= 0 || isNaN(id)) {
                throw Error('Parámetro inválido');
            }

            const responses = await Promise.all([
                fetch(`${API_URL}/users/${id}`, {
                    method: 'GET'
                }),
                fetch(`${API_IMAGES}/${id}`, {
                    method: 'GET'
                })
            ]);

            const [dataUser, dataAvatar] = await Promise.all(responses.map(response => response.json()));

            let divImage = document.createElement('div');
            divImage.classList.add('avatar-container');
            divImage.id = 'avatar-container';

            let image = document.createElement('img');
            image.src = dataAvatar.image;
            image.classList.add('avatar');
            divImage.append(image);
            div.append(divImage);

            let h2 = document.createElement('h2');
            h2.textContent = dataUser.name;
            div.append(h2);

            const createDiv = (labelText, valueText) => {
                let infoDiv = document.createElement('div');
                infoDiv.classList.add('info-item');

                let label = document.createElement('span');
                label.classList.add('info-label');
                label.classList.add('info');
                label.textContent = labelText;

                let value = document.createElement('span');
                value.classList.add('info');
                value.classList.add('info-value');
                value.textContent = valueText;

                infoDiv.append(label);
                infoDiv.append(value);

                return infoDiv;
            };

            //div.append(createDiv('Nombre:', dataUser.name));
            div.append(createDiv('Username:', dataUser.username));
            div.append(createDiv('Email:', dataUser.email));
            div.append(createDiv('Dirección:', `${dataUser.address.street} ${dataUser.address.suite}, ${dataUser.address.city}`));
            div.append(createDiv('Teléfono:', dataUser.phone));
            div.append(createDiv('Sitio Web:', dataUser.website));
            div.append(createDiv('Compañía:', dataUser.company.name));

            fragmentUser.append(div);
            infoUser.append(fragmentUser);

            styleContainer.classList.remove('ocultar');

        } catch (error) {
            alert(error.message);
        }
    }

    //Evento para cambiar el estilo de la tarjeta
    document.getElementById('estiloTarjeta').addEventListener('change', (e) => {
        let value = parseInt(e.target.value);

        let infoContainer = document.getElementById('info-container');
        let avatarContainer = document.getElementById('avatar-container');

        //Tema 1
        if (value === 1) {
            infoContainer.classList.remove('tema2');
            infoContainer.classList.remove('tema1');

            avatarContainer.classList.remove('avatar-background1');
            avatarContainer.classList.remove('avatar-background2');
        }
        else if (value === 2) {
            infoContainer.classList.add('tema1');
            infoContainer.classList.remove('tema2');

            avatarContainer.classList.add('avatar-background1');
            avatarContainer.classList.remove('avatar-background2');
        }
        //Tema 2
        else if (value === 3) {
            infoContainer.classList.add('tema2');
            infoContainer.classList.remove('tema1');

            avatarContainer.classList.remove('avatar-background1');
            avatarContainer.classList.add('avatar-background2');
        }
    });

    document.getElementById('letraTarjeta').addEventListener('change', (e) => {
        let value = parseInt(e.target.value);

        let infoValues = document.getElementsByClassName('info');

        for (let infoValue of infoValues) {
            if (value === 1) {
                infoValue.classList.remove('tipografia1', 'tipografia2');
            } else if (value === 2) {
                infoValue.classList.add('tipografia1');
                infoValue.classList.remove('tipografia2');
            } else if (value === 3) {
                infoValue.classList.add('tipografia2');
                infoValue.classList.remove('tipografia1');
            }
        }
    });

    document.getElementById('tamanoTarjeta').addEventListener('change', (e) => {
        let value = parseInt(e.target.value);

        let infoValues = document.getElementsByClassName('info');

        for (let infoItem of infoValues) {
            if (value === 1) {
                infoItem.classList.remove('letra-mediana', 'letra-grande');
            } else if (value === 2) {
                infoItem.classList.add('letra-mediana');
                infoItem.classList.remove('letra-grande');
            } else if (value === 3) {
                infoItem.classList.add('letra-grande');
                infoItem.classList.remove('letra-mediana');
            }
        }
    });
});