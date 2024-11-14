//consulta a la api para extraer los nombres de las personas
personas();

function personas(){
    let url = 'https://jsonplaceholder.typicode.com/users'
    fetch(url)
        .then(response => response.json())
        .then(data => nombres(data))
        .catch(error => console.log(error))
        
    const nombres = (data)  => {
        console.log(data)
        let tabla=``;
        let fun="";
        let i =0, c=1;
        for(i;i<10;i++){
            fun= "cal"+c+"()";
            tabla+=`<tr> <td> ${c} </td> <td> ${data[i].name} </td> <td> <button onclick="${fun}"> Calculadora</button> </td> </tr>`
            c++;
        }
        document.getElementById("nom").innerHTML = tabla
    }

}

//Muestra funciones de la Calculadora de la Primera Persona
function cal1(){
    console.log("llega aqui")
    let calculo =4+2;
    document.getElementById("cambio")
    

}

