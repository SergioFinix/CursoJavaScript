const api = 'http://localhost:3000/api';
const app = document.getElementById('app');
const navbar = document.getElementById('navbar');

const generateHTMLUserForms = (forms) => {
  return `
    <div class="userForms">
      <h2 class="title">Tus formularios</h2>
      <div class="forms">
        ${forms.map((form, index) => `
          <div class="nameForm">
            <a 
              href="/formulario/${form.formId._id}"
              onclick="${event => navigate(event, `/formulario/${form.formId._id}`)}"
            >
              ${index + 1}. ${form.formId.title}
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function generateFormHTML(form) {
  return `
    <div class="answerForm">
      <h2 class="title">${form.title}</h2>
      <form class="form" id="form-${form._id}">
        ${form.questions.map((question, index) => `
        <div class="question">
          <label class="textQuestion">${question.name}</label>
          ${question.type === 'number' ? `<input id='${question._id}' class="number" type="${question.type}" name="question-${index}" />` : ''}
          ${question.type === 'select' ? `
            <select id='${question._id}' class="select">
              <option value="" selected disabled>-- Elige una opción --</option>
              ${question.options.map((option) => `
                <option value="${option}">${option}</option>
              `).join('')}
            </select>
          ` : ''}
          ${question.type === 'check' ? `
            ${question.options.map((option) => `
              <label class="check">
                <input type="checkbox" name="${question._id}" value="${option}" />${option}
              </label>
            `).join('')}
          ` : ''}
        </div>
        `).join('')}
      </form>
      <div class="btnSubmit">
        <button onclick='sendForm(${JSON.stringify(form)})' type="submit">Enviar</button>
      </div>
    </div>
  `;
}

const getUserWithForms = async (callback) => {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    const response = await fetch(`${api}/users/get/user/with/forms/${user.userId}`);
    const data = await response.json();

    if (data.forms.length > 0) {
      return callback(data.forms);
    } else {
      return `
        <div class="userForms">
          <h2 class="title">Tus formularios</h2>
          <div class="forms">
            <div class="nameForm">
              <p>Aún no tienes formularios asignados</p>
            </div>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error al cargar los formularios:', error);
    return `<h2>Error</h2><p>Hubo un problema al cargar los formularios.</p>`;
  }
}

const viewGetFormByUser = async (formId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    const response = await fetch(`${api}/forms/get/${formId}/user/${user.userId}`);
    const data = await response.json();

    if (data.hasAnswered) {
      return `
        <div class="formByUser">
          <h2 class="title">Formulario respondido</h2>
          <div class="form">
            <p class="success">Ya has respondido este formulario.</p>
          </div>
        </div>
      `;
    } else if (data.form) {
      return generateFormHTML(data.form);
    } else {
      return `
        <div class="formByUser">
          <h2 class="title">Error</h2>
          <div class="form">
            <p class="success">No se pudo cargar el formulario.</p>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error al cargar el formulario:', error);
    return `<h2>Error</h2><p>Hubo un problema al cargar el formulario.</p>`;
  }
}

const viewLogin = () => {
  return `
    <div class="login">
      <div class="content">
        <h2 class="title">Login</h2>
        <form id="loginForm">
          <label>Usuario</label>
          <input type="text" id="loginUsername" placeholder="Nombre de usuario">
          <label>Contraseña</label>
          <input type="password" id="loginPassword" placeholder="Contraseña">
          <div class="button">
            <button onclick="loginUser()">Login</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

const viewGetAllForms = async () => {
  try {
    const response = await fetch(`${api}/forms/get`);
    const data = await response.json();

    if (data.length === 0) {
      return `
        <div class="allForms">
          <h2 class="title">Formularios</h2>
          <div class="forms">
            <p class="success">No hay formularios en base de datos.</p>
          </div>
        </div>
      `;
    } else if (data.length > 0) {
      return `
        <div class="allForms">
          <h2 class="title">Formularios</h2>
          <div class="forms">
            ${data.map((form, index) => `
            <div class="nameForm">
              <a 
                href="/admin/formulario/${form._id}"
                onclick="${event => navigate(event, `/admin/formulario/${form._id}`)}"
              >
                ${index + 1}. ${form.title}
              </a>
            </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      return `
        <div class="allForms">
          <h2 class="title">Error</h2>
          <div class="forms">
            <p class="success">No se pudieron cargar los formularios.</p>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error al cargar los formularios:', error);
    return `<h2>Error</h2><p>Hubo un problema al cargar los formularios.</p>`;
  }
}

const configChart = (form, stats) => {
  let configs = form.questions.map((question, index) => {
    let config = {};
    let data = [];
    switch (question.type) {
      case 'select':
      case 'check':
        data = question.options.map((option) => (stats[index].stats[option] ? stats[index].stats[option] : 0));
        config = {
          type: 'bar',
          data: {
            labels: question.options,
            datasets: [{
              label: 'Número',
              data: data,
              backgroundColor: ['rgba(199, 19, 43, 1)'],
              borderColor: ['rgba(199, 19, 43, 1)'],
              borderWidth: 1
            }]
          },
          options: {plugins: {legend: {labels: {color: 'white'}}},
            scales: {
              x: {grid: {color: 'white'}, ticks: {color: 'white'}},
              y: {grid: {color: 'white'}, ticks: {color: 'white'}, beginAtZero: true}
            }
          }
        }
        break;
      case 'number':
        const claves = Object.keys(stats[index].stats);
        const valores = Object.values(stats[index].stats).map(Number);
        config = {
          type: 'bar',
          data: {
            labels: claves,
            datasets: [{
              label: 'Número',
              data: valores,
              backgroundColor: ['rgba(199, 19, 43, 1)'],
              borderColor: ['rgba(199, 19, 43, 1)'],
              borderWidth: 1
            }]
          },
          options: {plugins: {legend: {labels: {color: 'white'}}},
            scales: {
              x: {grid: {color: 'white'}, ticks: {color: 'white'}},
              y: {grid: {color: 'white'}, ticks: {color: 'white'}, beginAtZero: true}
            }
          }
        }
        break;
      default:
        break;
    }

    return { id: question._id, config};
  });

  const config = {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{
        label: 'Número',
        data: [30, 50, 40, 60, 70],
        backgroundColor: ['rgba(199, 19, 43, 1)'],
        borderColor: ['rgba(199, 19, 43, 1)'],
        borderWidth: 1
      }]
    },
    options: {plugins: {legend: {labels: {color: 'white'}}},
      scales: {
        x: {grid: {color: 'white'}, ticks: {color: 'white'}},
        y: {grid: {color: 'white'}, ticks: {color: 'white'}, beginAtZero: true}
      }
    }
  }

  return configs;
}

const viewStatsForm = async (formId) => {
  const response = await fetch(`${api}/forms/stats/${formId}`);
  const { form, stats} = await response.json();
  const configsCharts = configChart(form, stats);

  const viewStatsFormHTML = `
    <div class="statsForm">
      <h2 class="title">Estadísticas formulario: ${form.title}</h2>
      <div class="questions">
        ${form.questions.map((question, index) => `
        <div class="question">
          <h3>${index + 1}. ${question.name}</h3>
          <canvas id="${question._id}"></canvas>
        </div>
        `).join('')}
      </div>
    </div>
  `;

  return {viewStatsFormHTML, configsCharts};
}

const viewGetAllUsers = async () => {
  const response = await fetch(`${api}/users/get/by/type/respondent`);
  const data = await response.json();

  return `
    <div class="adminUsers">
      <h2 class="title">Usuarios</h2>
      <div class="users">
        <div class="user">
          <label>Usuario</label>
          <input type="text" id="newUsername" placeholder="Nombre de usuario">
          <label>Contraseña</label>
          <input type="text" id="newPassword" placeholder="Contraseña">
          <button onclick="createUser()">Crear</button>
        </div>
        ${data.map((user, index) => `
        <div class="user">
          <a 
            href="/admin/user/${user._id}"
            onclick="${event => navigate(event, `/admin/user/${user._id}`)}"
          >
            ${index + 1}. ${user.username}
          </a>
        </div>
        `).join('')}
      </div>
    </div>
  `;
}

const viewUserForms = async (userId) => {
  const response1 = await fetch(`${api}/users/get/user/with/forms/${userId}`);
  const userForms = await response1.json();
  const response2 = await fetch(`${api}/forms/unrelated/${userId}`);
  const formsUnrelated = await response2.json();

  return `
    <div class="adminUserForms">
      <h2 class="title">Usuario: ${userForms.user.username}</h2>
      <div class="forms">
        <div class="form">
          <select id='formsUnrelated' class="select">
            <option value="" selected disabled>${formsUnrelated.length > 0 ? '-- Elige una opción --' : '-- Tiene todos los formularios asignados --'}</option>
            ${formsUnrelated.map((option) => `
              <option value="${option._id}">${option.title}</option>
            `).join('')}
          </select>
          ${formsUnrelated.length > 0 
            ? `
              <button onclick='createUserForm(${JSON.stringify(userForms.user._id)})' class="btnUnrelated">Agregar</button>
            `
            : ``
          }
        </div>
        ${userForms.forms.length > 0 
          ? userForms.forms.map((form, index) => `
            <div class="form">
              <p>${index + 1}. ${form.formId.title}</p>
            </div>
          `).join('') 
          : `
            <div class="form">
              <p class="formsNone">No tiene formularios asignados</p>
            </div>
          `
        }
      </div>
    </div>
  `;
}

const routes = {
  '/': {
    view: getUserWithForms,
    typeView: 'dynamicCallback',
    text: 'Inicio',
    auth: true,
    roles: ['respondent'],
    navbar: true,
  },
  '/formulario/:formId': {
    view: viewGetFormByUser,
    typeView: 'dynamicGetFormByUser',
    text: '',
    auth: true,
    roles: ['respondent'],
    navbar: false,
  },
  '/admin': {
    view: viewGetAllForms,
    typeView: 'dynamic',
    text: 'Panel',
    auth: true,
    roles: ['admin'],
    navbar: true,
  },
  '/admin/formulario/:formId': {
    view: viewStatsForm,
    typeView: 'dynamicStatsForm',
    text: '',
    auth: true,
    roles: ['admin'],
    navbar: true,
  },
  '/admin/users': {
    view: viewGetAllUsers,
    typeView: 'dynamic',
    text: 'Usuarios',
    auth: true,
    roles: ['admin'],
    navbar: true,
  },
  '/admin/user/:userId': {
    view: viewUserForms,
    typeView: 'dynamicUserForm',
    text: '',
    auth: true,
    roles: ['admin'],
    navbar: false,
  },
  '/login': {
    view: viewLogin,
    typeView: 'static',
    text: '',
    auth: false,
    roles: [],
    navbar: false,
  }
};

async function render(path) {
  const user = JSON.parse(localStorage.getItem('user'));

  const routeKey = Object.keys(routes).find(route => {
    const regex = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}$`);
    return regex.test(path);
  });
  const route = routes[routeKey];

  navbar.innerHTML = '';
  navbar.className = 'none';

  if (!route) {
    app.innerHTML = `<h2>404</h2><p>Página no encontrada</p>`;
    return;
  }

  if (route.auth && !user) {
    window.history.pushState({}, '', '/login');
    render('/login');
    return;
  }

  if (route.auth && !route.roles.includes(user.typeuser)) {
    app.innerHTML = `<h2>Acceso Denegado</h2><p>No tienes permiso para ver esta página.</p>`;
    return;
  }

  let viewId = '';
  switch (route.typeView) {
    case 'dynamicUserForm':
    case 'dynamicGetFormByUser':
      viewId = path.split('/').pop();
      app.innerHTML = await route.view(viewId);
      break;
    case 'dynamicStatsForm':
      viewId = path.split('/').pop();
      const viewSF = await route.view(viewId);
      console.log(viewSF);
      app.innerHTML = viewSF.viewStatsFormHTML;
      viewSF.configsCharts.forEach((element) => {
        const ctx = document.getElementById(element.id).getContext('2d');
        new Chart(ctx, element.config);
      });
      break;
    case 'dynamicCallback':
      app.innerHTML = await route.view(generateHTMLUserForms);
      break;
    case 'dynamic':
      app.innerHTML = await route.view();
      break;
    default:
      app.innerHTML = route.view();
      break;
  }

  if (path === '/login') {
    document.getElementById('loginForm').addEventListener('submit', loginUser);
  }

  if (route.auth) updateNavbar();
}

function navigate(event, path) {
  event.preventDefault();
  window.history.pushState({}, '', path);
  render(path);
}

function updateNavbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const divStart = document.createElement('div');
  divStart.className = 'divStart';
  const divCenter = document.createElement('div');
  divCenter.className = 'divCenter';
  const divEnd = document.createElement('div');
  divEnd.className = 'divEnd';

  const namePlatform = document.createElement('h1');
  namePlatform.textContent = 'Plataforma de Formularios';
  namePlatform.className = 'namePlatform';
  divStart.appendChild(namePlatform);

  Object.keys(routes).forEach(path => {
    const route = routes[path];
    if (user && route.roles.includes(user.typeuser) && route.navbar) {
      const link = document.createElement('a');
      link.href = path;
      link.textContent = route.text;
      link.onclick = event => navigate(event, path);
      link.className = 'linkMenu';
      divCenter.appendChild(link);
    }
  });
  const paragraphUser = document.createElement('p');
  paragraphUser.className = 'paragraphUser';
  paragraphUser.textContent = user.username;
  const btnLogOut = document.createElement('button');
  btnLogOut.className = 'btnLogOut';
  btnLogOut.onclick = () => logout();
  btnLogOut.textContent = 'Cerrar sesión';
  divEnd.appendChild(paragraphUser);
  divEnd.appendChild(btnLogOut);
  navbar.appendChild(divStart);
  navbar.appendChild(divCenter);
  navbar.appendChild(divEnd);
  navbar.className = '';
}

const sendForm = ({_id, questions}) => {
  let answers = [];
  const result = questions.find((question) => {
    switch (question.type) {
      case 'select':
      case 'number':
        const value = document.getElementById(question._id).value.trim();
        if (value === '') return true;
        answers.push(value);
        break;
      case 'check':
        const checkboxes = document.querySelectorAll(`input[name="${question._id}"]:checked`);
        const selectedValues = Array.from(checkboxes).map(checkbox => checkbox.value);
        if (selectedValues.length === 0) return true;
        answers.push(selectedValues);
        break;
      default:
        break;
    }
  });
  if (result) {
    alert('Contesta todas las preguntas');
    return;
  }
  const { userId } = JSON.parse(localStorage.getItem('user'));
  const answeredForm = {
    userId: userId,
    formId: _id,
    answers: answers,
  }
  
  updateForm(answeredForm).then((response) => {
    alert('Se guardaron tus respuestas');
    location.reload(true);
    window.scrollTo(0, 0);
  }).catch((error) => {
    console.error(error.message);
    alert(error.message);
    return;
  });
}

const updateForm = (answeredForm) => {
  return new Promise((resolve, reject) => {
    fetch(`${api}/user-forms/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answeredForm),
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          reject(new Error(error.message || 'Error al enviar el formulario'));
        });
      }
      return response.json();
    }).then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(new Error(`Error al enviar el formulario: ${error.message}`));
    });
  });
}

const createUser = async () => {
  const newUsername = document.getElementById('newUsername').value.trim();
  const newPassword = document.getElementById('newPassword').value.trim();

  if (!newUsername || !newPassword) {
    alert('Todos los campos son obligatorios');
    return;
  }

  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(newUsername) || !alphanumericRegex.test(newPassword)) {
    alert('Solo se permiten letras y números en los campos');
    return;
  }

  try {
    const response = await fetch(`${api}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: newUsername, password: newPassword, typeuser: 'respondent' })
    });
    const data = await response.json();

    if (response.ok) {
      alert('Usuario creado');
      location.reload(true);
      window.scrollTo(0, 0);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    alert('Error al crear el usuario.');
  }
}

const createUserForm = async (userId) => {
  const formId = document.getElementById('formsUnrelated').value;

  if (formId === '') {
    alert('Selecciona un formulario');
    return;
  }

  try {
    const response = await fetch(`${api}/user-forms/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, formId })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Formulario asignado correctamente');
      location.reload(true);
      window.scrollTo(0, 0);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error('Error al asignar formulario:', error);
    alert('Error al asignar formulario');
  }
}

async function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!username || !password) {
    alert('Todos los campos son obligatorios');
    return;
  }

  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(username) || !alphanumericRegex.test(password)) {
    alert('Solo se permiten letras y números en los campos');
    return;
  }

  try {
    const response = await fetch(`${api}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const user = { username: payload.username, typeuser: payload.typeuser, userId: payload.userId };
      localStorage.setItem('user', JSON.stringify(user));

      if (payload.typeuser === 'admin') {
        window.history.pushState({}, '', '/admin');
        render('/admin');
      } else {
        window.history.pushState({}, '', '/');
        render('/');
      }
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Error al iniciar sesión. Intenta de nuevo.');
  }
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.history.pushState({}, '', '/login');
  render('/login');
}

window.onpopstate = () => render(window.location.pathname);

render(window.location.pathname);