// api.js
//Uso de async/await
export async function fetchUsers() {
  //Estructuras de control
  try {
    //Uso de promesas
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();// Llamada asíncrona, espera en la cola
    return data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return [];
  }
}
