const URLENDPOINT = "http://localhost:1337/"

const url = `${URLENDPOINT}users`;

const selectUsers = document.getElementById('users');
const contentUsers = document.querySelector('.content-users');

const titleSurvey = document.querySelector('.title-survey');

let user = '';

document.addEventListener('DOMContentLoaded', function(){
    GetUsers()
    .then( (data) => {
        loadUsers(data);
    })
    .catch( (error) => {
        console.log(error);
    })
});

function GetUsers() {
    return new Promise( (resolve, reject ) => {
        fetch(url)
        .then( (response) => {
            if(response.ok){
                return response.json();
            }else{
                reject(new Error('Error al obtener usuarios'));
            }
        })
        .then((data) => resolve(data))
        .catch( () => reject(new Error('Error al conectar con API')));
    })
};

function loadUsers(data){
    data.forEach(element => {
        let option = document.createElement('option');
        option.innerHTML = `${element.name}`;
        option.value = `${element.id}`;

        let p = document.createElement('p');
        p.innerHTML = element.name;
        p.onclick = function() {
            GetUser(element.id, element.name);
        };

        selectUsers.appendChild(option);
        contentUsers.appendChild(p);
    });

}

function GetUser(id, name){
    user = id;

    titleSurvey.innerHTML = `Hola ${name}`;
}