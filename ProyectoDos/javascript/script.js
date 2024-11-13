document.addEventListener("DOMContentLoaded", () => {
  const listaUsuarios = document.getElementById("usuarios");
  const tarjetaContenedor = document.getElementById("tarjeta-container");

  //json de los usuarios
  const usuarios = [
    {
      id: 1,
      nombre: "Leanne Graham",
      username: "Bret",
      direccion:"Gwenborough",
      edad: 31,
      email: "Sincere@april.biz",
      nacionalidad: "Colombiana",
      telefono: "1-770-736-8031",
      urlfotoperil: "",
      website:"hildegard.org",
      compania:"Romaguera-Crona",
    },
    {
      id: 2,
      nombre: "Ervin Howell",
      username: "Antonette",
      direccion:"Wisokyburgh",
      edad: 42,
      email: "Shanna@melissa.tv",
      nacionalidad: "Mexicana",
      telefono: "010-692-6593",
      urlfotoperil: "",
      website:"anastasia.net",
      compania:"Deckow-Crist",
    },
    {
      id: 3,
      nombre: "Clementine Bauch",
      username: "Samantha",
      direccion:"McKenziehaven",
      edad: 21,
      email: "Nathan@yesenia.net",
      nacionalidad: "Francesa",
      telefono: "1-463-123-4447",
      urlfotoperil: "",
      website:"ramiro.info",
      compania:"Romaguera-Jacobson",
    },
    {
      id: 4,
      nombre: "Patricia Lebsack",
      username: "Karianne",
      direccion:"South Elvis",
      edad: 44,
      email: "Julianne.OConne@kory.org",
      nacionalidad: "Peruana",
      telefono: "493-170-9623",
      urlfotoperil: "",
      website:"kale.biz",
      compania:"Robel-Corkery",
    },
    {
      id: 5,
      nombre: "Chelsey Dietrich",
      username: "Karianne",
      direccion:"Kamren",
      edad: 50,
      email: "Lucio_Hettiger@annie.ca",
      nacionalidad: "Chilena",
      telefono: "(254)954-1289",
      urlfotoperil: "",
      website:"demarco.info",
      compania:"Keebler LLC",
    },
    {
      id: 6,
      nombre: "Mrs. Dennis Schulist",
      username: "Leopoldo_Corkery",
      direccion:"South Christy",
      edad: 51,
      email: "Karley_Dach@jasper.info",
      nacionalidad: "Australiana",
      telefono: "1-477-935-84-78",
      urlfotoperil: "",
      website:"ola.org",
      compania:"Considine-Lockman",
    },
    {
      id: 7,
      nombre: "Kurtis Weissnat",
      username: "Elwyn.Skiles",
      direccion:"Howemouth",
      edad: 80,
      email: "Telly.Hoeger@billy.biz",
      nacionalidad: "Argentina",
      telefono: "210.067.6132",
      urlfotoperil: "",
      website:"elvis.io",
      compania:"Jonhs Group",
    },
    {
      id: 8,
      nombre: "Nicholas Runolfsdottir V",
      username: "Maxime_Nienow",
      direccion:"Aliyaview",
      edad: 37,
      email: "Sherwood@rosamond.me",
      nacionalidad: "Japonesa",
      telefono: "586.493.6943",
      urlfotoperil: "",
      website:"jacynthe.com",
      compania:"Abernathy Group",
    },
    {
      id: 9,
      nombre: "Glenna Reichert",
      username: "Delphine",
      direccion:"Bartholomebury",
      edad: 50,
      email: "Chaim_McDermott@dana.io",
      nacionalidad: "China",
      telefono: "(775)976-6794",
      urlfotoperil: "",
      website:"conrad.com",
      compania:"Yost and Sons",
    },
    {
      id: 10,
      nombre: "Clementina DuBuque",
      username: "Moriah.Stanton",
      direccion:"Lebsackbury",
      edad: 22,
      email: "Rey.Padberg@karina.biz",
      nacionalidad: "Rusa",
      telefono: "024-648-3804",
      urlfotoperil: "",
      website:"ambrose.net",
      compania:"Hoeger LLC",
    },
  ];
  //Funcion que va a mostrar la lista de los nombres de los usuarios
  usuarios.forEach((usuario, index) => {
    const li = document.createElement("li");
    li.textContent = usuario.nombre;
    li.addEventListener("click", () => mostrarTarjeta(usuarios));
    listaUsuarios.appendChild(li);
  });
  //Funcion para mostrar las tarjetas con otros diseños
  function mostrarTarjeta(usuario) {
    tarjetaContenedor.innerHTML = "";
  }
});
