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
        for(i;i<3;i++){
            fun= "cal"+c+"()";
            tabla+=`<tr> <td> ${c} </td> <td> ${data[i].name} </td> <td> <button onclick="${fun}"> Calculadora</button> </td> </tr>`
            c++;
            console.log(c)
            console.log(fun)
        }
        document.getElementById("nom").innerHTML = tabla
    }

}

function presupuesto(){
    let
}

//Muestra para mostrar la tabla de productos y agregar mas de la Primera Persona
function cal1(){
    console.log("llega aqui")
    let calculo1 =30+20+45+26;
    let tabla1="";
    console.log("calculo "+calculo1)
    tabla1+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo1}</td> </tr>`
    tabla1+=`<tr> <td> AGUA </td>        <td> 15 </td>       <td> 2 </td><td> 30 </td> </tr>`
    tabla1+=`<tr> <td> SOPA </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla1+=`<tr> <td> AZUCAR </td>      <td> 45 </td>       <td> 1 </td><td> 45 </td> </tr>`
    tabla1+=`<tr> <td> LECHE </td>       <td> 23 </td>       <td> 2 </td><td> 26 </td> </tr>`

    document.getElementById("mes1").innerHTML = tabla1

    console.log("mes numero 2")
    let calculo2 =20+20+45+26;
    let tabla2="";
    console.log("calculo "+calculo2)
    tabla2+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo2}</td> </tr>`
    tabla2+=`<tr> <td> AGUA </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla2+=`<tr> <td> SOPA </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla2+=`<tr> <td> AZUCAR </td>      <td> 45 </td>       <td> 1 </td><td> 45 </td> </tr>`
    tabla2+=`<tr> <td> LECHE </td>       <td> 23 </td>       <td> 2 </td><td> 26 </td> </tr>`

    document.getElementById("mes2").innerHTML = tabla2
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


//agregar elementos a la 3er tablase agrego un array para almacenar los datos
let productoscom=[];

    function agregar(){

        let presupuesto;
        let tama;

        const tabla = document.getElementById("mes3").getElementsByTagName("tbody")[0];
        
        event.preventDefault();

        let nom = document.getElementById("produc").value;
        let nombre = nom.toUpperCase();
        let pre = document.getElementById("precio").value;
        let canti = document.getElementById("cantidad").value;
        let total = pre*canti;
        tama=  `[${nombre},${pre},${canti},${total}]`;

        productoscom.push(tama);

        console.log(nom);
        console.log(nombre);
        console.log(pre);
        console.log(canti);
            
        let filanu = document.createElement("tr");
        let productoing = document.createElement("td");
        let precioing = document.createElement("td");
        let cantidading = document.createElement("td");
        let totaling = document.createElement("td");

        productoing.textContent = `${nombre}`;
        precioing.textContent = `${pre}`;
        cantidading.textContent = `${canti}`;
        totaling.textContent = `${total}`;

        filanu.appendChild(productoing);
        filanu.appendChild(precioing);
        filanu.appendChild(cantidading);
        filanu.appendChild(totaling);

        tabla.appendChild(filanu);
        console.log(productoscom)
    }