const api = 'http://localhost:3000/api';
const app = document.getElementById('app');
const navbar = document.getElementById('navbar');

const generateHTML = () => {
  
}

function generateFormHTML(form) {
  return `
    <h2>${form.title}</h2>
    <form id="form-${form._id}">
      ${form.questions.map((question, index) => `
        <div>
          <label>${question.name}</label>
          ${question.type === 'number' ? `<input type="${question.type}" name="question-${index}" />` : ''}
          ${question.type === 'select'
      ? `
              <select>
                <option value="" selected disabled>-- Elige una opción --</option>
                ${question.options.map((option) => `
                  <option value="${option}">${option}</option>
                `).join('')}
              </select>
            `
      : ''
    }
          ${question.type === 'check'
      ? `
              ${question.options.map((option) => `
                <label>
                  <input type="checkbox" name="${question._id}" value="${option}" />${option}
                </label>
              `).join('')}
            `
      : ''
    }
        </div>
      `).join('')}
      <button type="submit">Enviar</button>
    </form>
  `;
}

const getUserWithForms = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    const response = await fetch(`${api}/users/get/user/with/forms/${user.userId}`);
    const data = await response.json();
    console.log(data.forms);

    if (data.forms.lenght > 0) {
      return generateFormHTML(data.form);
      
    } else if (data.form) {
      return `<h2>Formulario</h2><p>Ya has respondido este formulario.</p>`;
    } else {
      return `<h2>Error</h2><p>No se pudo cargar el formulario.</p>`;
    }
  } catch (error) {
    console.error('Error al cargar el formulario:', error);
    return `<h2>Error</h2><p>Hubo un problema al cargar el formulario.</p>`;
  }
}

const viewGetFormByUser = async (formId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    const response = await fetch(`${api}/forms/get/${formId}/user/${user.userId}`);
    const data = await response.json();

    if (data.hasAnswered) {
      return `<h2>Formulario</h2><p>Ya has respondido este formulario.</p>`;
    } else if (data.form) {
      return generateFormHTML(data.form);
    } else {
      return `<h2>Error</h2><p>No se pudo cargar el formulario.</p>`;
    }
  } catch (error) {
    console.error('Error al cargar el formulario:', error);
    return `<h2>Error</h2><p>Hubo un problema al cargar el formulario.</p>`;
  }
}

const routes = {
  '/': {
    view: getUserWithForms,
    auth: true,
    roles: ['respondent']
  },
  '/formulario/:formId': {
    view: viewGetFormByUser,
    auth: true,
    roles: ['respondent']
  },
  '/admin': {
    view: `<h2>Inicio</h2><p>Bienvenido al dashboard</p>`,
    auth: true,
    roles: ['admin']
  },
  '/login': {
    view: `<h2>Login</h2><input type="text" id="loginUsername" placeholder="Username"><input type="password" id="loginPassword" placeholder="Password"><button onclick="loginUser()">Login</button>`,
    auth: false,
    roles: []
  }
};

async function render(path) {
  const user = JSON.parse(localStorage.getItem('user'));

  const routeKey = Object.keys(routes).find(route => {
    const regex = new RegExp(`^${route.replace(/:\w+/g, '\\w+')}$`);
    return regex.test(path);
  });

  const route = routes[routeKey];

  // Redirección si la ruta no existe
  if (!route) {
    app.innerHTML = `<h2>404</h2><p>Página no encontrada</p>`;
    return;
  }

  // Verificación de autenticación
  if (route.auth && !user) {
    window.history.pushState({}, '', '/login');
    render('/login');
    return;
  }

  // Verificación de permisos
  if (route.auth && !route.roles.includes(user.typeuser)) {
    app.innerHTML = `<h2>Acceso Denegado</h2><p>No tienes permiso para ver esta página.</p>`;
    return;
  }

  // Procesar vista con función o string
  if (typeof route.view === 'function') {
    // Extraer formId de la ruta
    const formId = path.split('/').pop();
    app.innerHTML = await route.view(formId);
  } else {
    app.innerHTML = route.view;
  }

  if (route.auth) updateNavbar();
}

// Navegación dinámica
function navigate(event, path) {
  event.preventDefault();
  window.history.pushState({}, '', path);
  render(path);
}

// Actualiza la barra de navegación
function updateNavbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  navbar.innerHTML = '';

  Object.keys(routes).forEach(path => {
    const route = routes[path];
    if (!route.auth || (user && route.roles.includes(user.typeuser))) {
      const link = document.createElement('a');
      link.href = path;
      link.innerText = path.replace('/', '').toUpperCase() || 'INICIO';
      link.onclick = event => navigate(event, path);
      navbar.appendChild(link);
    }
  });
  const btnLogOut = document.createElement('button');
  btnLogOut.onclick = () => logout();
  btnLogOut.textContent = 'Cerrar sesión';
  navbar.appendChild(btnLogOut);
}

async function loginUser() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

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

// Manejar retroceso en el historial
window.onpopstate = () => render(window.location.pathname);

// Cargar la vista actual
render(window.location.pathname);