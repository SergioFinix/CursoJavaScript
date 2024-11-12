document.addEventListener("DOMContentLoaded", () => {
  const listaUsuarios = document.getElementById("usuarios");
  const tarjetaContenedor = document.getElementById("tarjeta-container");

  //json de los usuarios
  const usuarios = [
    {
      nombre: "Axel",
      descripcion: "",
      edad: 0,
      email: "",
      nacionalidad: "",
      telefono: "",
      urlfotoperil: "",
    },
    {
      nombre: "Axel",
      descripcion: "",
      edad: 0,
      email: "",
      nacionalidad: "",
      telefono: "",
      urlfotoperil: "",
    },
    {
      nombre: "Axel",
      descripcion: "",
      edad: 0,
      email: "",
      nacionalidad: "",
      telefono: "",
      urlfotoperil: "",
    },
    {
      nombre: "Axel",
      descripcion: "",
      edad: 0,
      email: "",
      nacionalidad: "",
      telefono: "",
      urlfotoperil: "",
    },
    {
      nombre: "Axel",
      descripcion: "",
      edad: 0,
      email: "",
      nacionalidad: "",
      telefono: "",
      urlfotoperil: "",
    },
    {
      nombre: "Axel",
      descripcion: "",
      edad: 0,
      email: "",
      nacionalidad: "",
      telefono: "",
      urlfotoperil: "",
    },
    {
      nombre: "Axel",
      descripcion: "",
      edad: 0,
      email: "",
      nacionalidad: "",
      telefono: "",
      urlfotoperil: "",
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
