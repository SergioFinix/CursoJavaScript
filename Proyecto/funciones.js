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

//Muestra para mostrar la tabla de productos y agregar mas de la Primera Persona
function cal1(){
    console.log("llega aqui")
    let calculo =20+20+45+26;
    let tabla="";
    console.log("calculo "+calculo)
    tabla+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo}</td> </tr>`
    tabla+=`<tr> <td> SOPA </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla+=`<tr> <td> SOPA </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla+=`<tr> <td> AZUCAR </td>      <td> 45 </td>       <td> 1 </td><td> 45 </td> </tr>`
    tabla+=`<tr> <td> LECHE </td>       <td> 23 </td>       <td> 2 </td><td> 26 </td> </tr>`

    document.getElementById("mes1").innerHTML = tabla
}


//Muestra para mostrar la tabla de productos y agregar mas de la Segunda Persona
function cal2(){
    console.log("llega aqui")
    let calculo =4+2;
    let tabla="";
    console.log("calculo "+calculo)
    tabla+=`<tr> <td>  </td> <td>  </td> <td>  </td><td>  </td> </tr>`

    document.getElementById("mes1").innerHTML = tabla
}

