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
    event.preventDefault();
    const presupuestoing = document.getElementById('presu').value;
    const regex1 = /^\d{3}.\d{2}$/;
    const regex2 = /^\d{3}/;

    if ((regex1.test(presupuestoing)) || (regex2.test(presupuestoing))) {
        window.alert("Presupues Valido")
    } else {
        window.alert("Catidad del Presupuesto es erroneo la estructura en 000.00")
    }
}

function sal(){
    
    let tabla1="";
    tabla1+=`<tr> <td>  </td>       <td>  </td>       <td>  </td><td>  </td> </tr>`
    document.getElementById("mes1").innerHTML = ""
    
    let tabla2="";
    tabla2+=`<tr> <td>  </td>       <td>  </td>       <td>  </td><td>  </td> </tr>`
    document.getElementById("mes2").innerHTML = ""
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
    tabla1+=`<tr> <td> LECHE </td>       <td> 13 </td>       <td> 2 </td><td> 26 </td> </tr>`

    document.getElementById("mes1").innerHTML = tabla1

    console.log("mes numero 2")
    console.log("tama: " + productoscom1p1[2][2])
    let calculo2 =45+20+35+40;
    let tabla2="";
    console.log("calculo "+calculo2)
    tabla2+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo2}</td> </tr>`
    tabla2+=`<tr> <td> AGUA </td>        <td> 15 </td>       <td> 3 </td><td> 45 </td> </tr>`
    tabla2+=`<tr> <td> ARROZ </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla2+=`<tr> <td> CERIAL </td>      <td> 35 </td>       <td> 1 </td><td> 35 </td> </tr>`
    tabla2+=`<tr> <td> HUEVO </td>       <td> 40 </td>       <td> 1 </td><td> 40 </td> </tr>`

    document.getElementById("mes2").innerHTML = tabla2
}

//Muestra para mostrar la tabla de productos y agregar mas de la Segunda Persona
function cal2(){
    console.log("llega aqui")
    let calculo1 =20+50+45+30;
    let tabla1="";
    console.log("calculo "+calculo1)
    tabla1+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo1}</td> </tr>`
    tabla1+=`<tr> <td> AGUA </td>        <td> 10 </td>       <td> 2 </td><td> 10 </td> </tr>`
    tabla1+=`<tr> <td> TE </td>        <td> 10 </td>       <td> 5 </td><td> 50 </td> </tr>`
    tabla1+=`<tr> <td> CERIAL </td>      <td> 45 </td>       <td> 1 </td><td> 45 </td> </tr>`
    tabla1+=`<tr> <td> PAN </td>       <td> 30 </td>       <td> 1 </td><td> 30 </td> </tr>`

    document.getElementById("mes1").innerHTML = tabla1

    console.log("mes numero 2")
    console.log("tama: " + productoscom1p1[2][2])
    let calculo2 =45+20+35+40;
    let tabla2="";
    console.log("calculo "+calculo2)
    tabla2+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo2}</td> </tr>`
    tabla2+=`<tr> <td> AGUA </td>        <td> 15 </td>       <td> 3 </td><td> 45 </td> </tr>`
    tabla2+=`<tr> <td> ARROZ </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla2+=`<tr> <td> CERIAL </td>      <td> 35 </td>       <td> 1 </td><td> 35 </td> </tr>`
    tabla2+=`<tr> <td> HUEVO </td>       <td> 40 </td>       <td> 1 </td><td> 40 </td> </tr>`

    document.getElementById("mes2").innerHTML = tabla2
}

function cal3(){
    console.log("llega aqui")
    let calculo1 =30+20+45+26;
    let tabla1="";
    console.log("calculo "+calculo1)
    tabla1+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo1}</td> </tr>`
    tabla1+=`<tr> <td> AGUA </td>        <td> 15 </td>       <td> 2 </td><td> 30 </td> </tr>`
    tabla1+=`<tr> <td> SOPA </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla1+=`<tr> <td> AZUCAR </td>      <td> 45 </td>       <td> 1 </td><td> 45 </td> </tr>`
    tabla1+=`<tr> <td> LECHE </td>       <td> 13 </td>       <td> 2 </td><td> 26 </td> </tr>`

    document.getElementById("mes1").innerHTML = tabla1

    console.log("mes numero 2")
    console.log("tama: " + productoscom1p1[2][2])
    let calculo2 =45+20+35+40;
    let tabla2="";
    console.log("calculo "+calculo2)
    tabla2+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo2}</td> </tr>`
    tabla2+=`<tr> <td> AGUA </td>        <td> 15 </td>       <td> 3 </td><td> 45 </td> </tr>`
    tabla2+=`<tr> <td> ARROZ </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla2+=`<tr> <td> CERIAL </td>      <td> 35 </td>       <td> 1 </td><td> 35 </td> </tr>`
    tabla2+=`<tr> <td> HUEVO </td>       <td> 40 </td>       <td> 1 </td><td> 40 </td> </tr>`

    document.getElementById("mes2").innerHTML = tabla2
}

//agregar elementos a la 3er tablase agrego un array para almacenar los datos
let productoscom1p1=[
    ["AGUA", 15, 2, 30],
    ["SOPA", 10, 2, 20],
    ["AZUCAR", 45, 1, 45],
    ["LECHE", 13, 2, 26]
];
let productoscom2p1=[
    ["AGUA", 15, 3, 45],
    ["ARROZ", 10, 2, 20],
    ["CERIAL", 35, 1, 35],
    ["HUEVO", 40, 1, 40]
];
let productoscom3p1=[];
let productoscom1p2=[
    ["AGUA", 10, 2, 20],
    ["TE", 10, 5, 50],
    ["CERIAL", 45, 1, 45],
    ["PAN", 30, 1, 30]
];
let productoscom2p2=[
    ["AGUA", 15, 3, 45],
    ["ARROZ", 10, 2, 20],
    ["CERIAL", 35, 1, 35],
    ["HUEVO", 40, 1, 40]
];
let productoscom3p2=[];
let productoscom1p3=[
    ["AGUA", 15, 2, 30],
    ["SOPA", 10, 2, 20],
    ["AZUCAR", 45, 1, 45],
    ["LECHE", 13, 2, 26]];
let productoscom2p3=[
    ["AGUA", 15, 2, 30],
    ["SOPA", 10, 2, 20],
    ["AZUCAR", 45, 1, 45],
    ["LECHE", 23, 2, 26]];
let productoscom3p3=[];

let totalneto=0;

    function agregar(){

        let presupuesto = document.getElementById('presu').value;

        //if(presupuesto>=totalneto){

            let tama;

        const tabla = document.getElementById("mes3").getElementsByTagName("tbody")[0];
        
        event.preventDefault();

        let nom = document.getElementById("produc").value;
        let nombre = nom.toUpperCase();
        let pre = document.getElementById("precio").value;
        let canti = document.getElementById("cantidad").value;
        let total = pre*canti;
        tama=  `[${nombre},${pre},${canti},${total}]`;
        totalneto+=total;
        productoscom3p1.push(tama);
        document.getElementById("toaln").innerHTML = totalneto;

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
        console.log(productoscom3p1)

        //}
        //else{
        //    window.alert("El Total Es Mayor Al Presupuesto")
        //}
        
    }