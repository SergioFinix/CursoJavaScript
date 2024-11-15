document.addEventListener("DOMContentLoaded", () => {
  const listaUsuarios = document.getElementById("usuarios");
  const tarjetaContenedor = document.getElementById("tarjeta-container");
  const panelPersonalizacion = document.getElementById("panel-personalizacion");

  //json de los usuarios
  const usuarios = [
    {
      id: 1,
      nombre: "Leanne Graham",
      username: "Bret",
      direccion: "Gwenborough",
      edad: 31,
      email: "Sincere@april.biz",
      nacionalidad: "Colombiana",
      telefono: "1-770-736-8031",
      urlfotoperil: "img/perfil.jpg",
      website: "hildegard.org",
      compania: "Romaguera-Crona",
    },
    {
      id: 2,
      nombre: "Ervin Howell",
      username: "Antonette",
      direccion: "Wisokyburgh",
      edad: 42,
      email: "Shanna@melissa.tv",
      nacionalidad: "Mexicana",
      telefono: "010-692-6593",
      urlfotoperil: "img/perfil.jpg",
      website: "anastasia.net",
      compania: "Deckow-Crist",
    },
    {
      id: 3,
      nombre: "Clementine Bauch",
      username: "Samantha",
      direccion: "McKenziehaven",
      edad: 21,
      email: "Nathan@yesenia.net",
      nacionalidad: "Francesa",
      telefono: "1-463-123-4447",
      urlfotoperil: "img/perfil.jpg",
      website: "ramiro.info",
      compania: "Romaguera-Jacobson",
    },
    {
      id: 4,
      nombre: "Patricia Lebsack",
      username: "Karianne",
      direccion: "South Elvis",
      edad: 44,
      email: "Julianne.OConne@kory.org",
      nacionalidad: "Peruana",
      telefono: "493-170-9623",
      urlfotoperil: "img/perfil.jpg",
      website: "kale.biz",
      compania: "Robel-Corkery",
    },
    {
      id: 5,
      nombre: "Chelsey Dietrich",
      username: "Karianne",
      direccion: "Kamren",
      edad: 50,
      email: "Lucio_Hettiger@annie.ca",
      nacionalidad: "Chilena",
      telefono: "(254)954-1289",
      urlfotoperil: "img/perfil.jpg",
      website: "demarco.info",
      compania: "Keebler LLC",
    },
    {
      id: 6,
      nombre: "Mrs. Dennis Schulist",
      username: "Leopoldo_Corkery",
      direccion: "South Christy",
      edad: 51,
      email: "Karley_Dach@jasper.info",
      nacionalidad: "Australiana",
      telefono: "1-477-935-84-78",
      urlfotoperil: "img/perfil.jpg",
      website: "ola.org",
      compania: "Considine-Lockman",
    },
    {
      id: 7,
      nombre: "Kurtis Weissnat",
      username: "Elwyn.Skiles",
      direccion: "Howemouth",
      edad: 80,
      email: "Telly.Hoeger@billy.biz",
      nacionalidad: "Argentina",
      telefono: "210.067.6132",
      urlfotoperil: "img/perfil.jpg",
      website: "elvis.io",
      compania: "Jonhs Group",
    },
    {
      id: 8,
      nombre: "Nicholas Runolfsdottir V",
      username: "Maxime_Nienow",
      direccion: "Aliyaview",
      edad: 37,
      email: "Sherwood@rosamond.me",
      nacionalidad: "Japonesa",
      telefono: "586.493.6943",
      urlfotoperil: "img/perfil.jpg",
      website: "jacynthe.com",
      compania: "Abernathy Group",
    },
    {
      id: 9,
      nombre: "Glenna Reichert",
      username: "Delphine",
      direccion: "Bartholomebury",
      edad: 50,
      email: "Chaim_McDermott@dana.io",
      nacionalidad: "China",
      telefono: "(775)976-6794",
      urlfotoperil: "img/perfil.jpg",
      website: "conrad.com",
      compania: "Yost and Sons",
    },
    {
      id: 10,
      nombre: "Clementina DuBuque",
      username: "Moriah.Stanton",
      direccion: "Lebsackbury",
      edad: 22,
      email: "Rey.Padberg@karina.biz",
      nacionalidad: "Rusa",
      telefono: "024-648-3804",
      urlfotoperil: "img/perfil.jpg",
      website: "ambrose.net",
      compania: "Hoeger LLC",
    },
  ];


  function mostrarTarjeta(usuario) {
    // Limpiar contenedor y restablecer estilos antes de cargar otra tarjeta
    tarjetaContenedor.innerHTML = ""; 
    tarjetaContenedor.style.backgroundColor = "#722F37";
    tarjetaContenedor.style.color = "#ffffff";
    tarjetaContenedor.style.fontFamily = "Arial";
    tarjetaContenedor.style.fontSize = "16px";

    // Crear la tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.classList.add("tarjeta-container2");

    // Foto
    const fotoDiv = document.createElement("div");
    fotoDiv.classList.add("div-foto");
    fotoDiv.classList.add("box");
    const foto = document.createElement("img");
    foto.src = usuario.urlfotoperil;
    foto.alt = `Foto de perfil de ${usuario.nombre}`;
    foto.className = 'foto-1';
    foto.classList.add("foto-perfil");

    // Información del usuario
    const info = document.createElement("div");
    info.classList.add("informacion");
    info.classList.add("box");

    const nombre = document.createElement("h3");
    nombre.textContent = usuario.nombre;

    const nacionalidad = document.createElement("p");
    nacionalidad.textContent = `Nacionalidad: ${usuario.nacionalidad}`;

    const website = document.createElement("p");
    website.textContent = `Sitio web: ${usuario.website}`;

    const email = document.createElement("p");
    email.textContent = `Email: ${usuario.email}`;

    const telefono = document.createElement("p");
    telefono.textContent = `Teléfono: ${usuario.telefono}`;

    const direccion = document.createElement("p");
    direccion.textContent = `Dirección: ${usuario.direccion}`;

    const edad = document.createElement("p");
    edad.textContent = `Edad: ${usuario.edad}`;

    const compania = document.createElement("p");
    compania.textContent = `Compañía: ${usuario.compania}`;

    // Agregar todo a la tarjeta
    
    info.appendChild(nacionalidad);
    info.appendChild(email);
    info.appendChild(telefono);
    info.appendChild(direccion);
    info.appendChild(website);
    info.appendChild(compania);
    fotoDiv.appendChild(foto);
    fotoDiv.appendChild(nombre);
    fotoDiv.appendChild(edad);
    tarjeta.appendChild(fotoDiv);   
    tarjeta.appendChild(info);

    tarjetaContenedor.appendChild(tarjeta);

    // Mostrar el panel de personalización
    mostrarPanelPersonalizacion();
  }

  // Función que muestra el panel de personalización
  function mostrarPanelPersonalizacion() {
    // Limpiar panel
    panelPersonalizacion.innerHTML = "";

    // Crear controles de personalización
    const titulo = document.createElement("h3");
    titulo.textContent = "Personalizar Tarjeta";

    // Selector de color de fondo
    const colorFondoLabel = document.createElement("h4");
    colorFondoLabel.textContent = "Color de fondo:";
    const colorFondoInput = document.createElement("input");
    colorFondoInput.type = "color";
    colorFondoInput.value = "#722F37"; // valor predeterminado
    
    
    // Selector de color de texto
    const colorTextoLabel = document.createElement("h4");
    colorTextoLabel.textContent = "Color de texto:";
    const colorTextoInput = document.createElement("input");
    colorTextoInput.type = "color";
    colorTextoInput.value = "#ffffff "; // valor predeterminado

    // Selector de tamaño de texto
    const tamanoTextoLabel = document.createElement("h4");
    tamanoTextoLabel.textContent = "Tamaño de Fuente:";
    const tamanoTextoSelect = document.createElement("select");
    const tamanos = ["16px", "8px", "12px", "20px", "24px"];
    tamanos.forEach((tamano ="16 px") => {
      const option = document.createElement("option");
      option.value = tamano;
      option.textContent = tamano;
      tamanoTextoSelect.appendChild(option);
    });

    // Selector de tipo de fuente
    const fuenteLabel = document.createElement("h4");
    fuenteLabel.textContent = "Tipo de fuente:";
    const fuenteSelect = document.createElement("select");
    const fuentes = ["Arial", "Verdana", "Helvetica", "Times New Roman", "Georgia"];
    fuentes.forEach((fuente) => {
      const option = document.createElement("option");
      option.value = fuente;
      option.textContent = fuente;
      fuenteSelect.appendChild(option);
    });

    // Cambiar los estilos
    colorFondoInput.addEventListener("input", (e) => {
      tarjetaContenedor.style.backgroundColor = e.target.value;
    });

    colorTextoInput.addEventListener("input", (e) => {
      tarjetaContenedor.style.color = e.target.value;
    });

    fuenteSelect.addEventListener("change", (e) => {
      tarjetaContenedor.style.fontFamily = e.target.value;
    });

    tamanoTextoSelect.addEventListener("change", (e) => {
      tarjetaContenedor.style.fontSize = e.target.value;
    });

    // Agregar los controles al panel (Dar formato)
    panelPersonalizacion.appendChild(titulo);
    panelPersonalizacion.appendChild(colorFondoLabel);
    panelPersonalizacion.appendChild(colorFondoInput);
    panelPersonalizacion.appendChild(colorTextoLabel);
    panelPersonalizacion.appendChild(colorTextoInput);
    panelPersonalizacion.appendChild(tamanoTextoLabel);
    panelPersonalizacion.appendChild(tamanoTextoSelect);
    panelPersonalizacion.appendChild(fuenteLabel);
    panelPersonalizacion.appendChild(fuenteSelect);
  }

  // Función para crear la lista de usuarios
  usuarios.forEach((usuario) => {
    const li = document.createElement("li");
    li.textContent = usuario.nombre;
    li.addEventListener("click", () => mostrarTarjeta(usuario));
    listaUsuarios.appendChild(li);
  });
});