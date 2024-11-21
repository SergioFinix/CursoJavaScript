//consulta a la api para extraer los nombres de las personas
personas();
let personanumero=0;

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
    document.getElementById("mes2").innerHTML = "";
    
    document.getElementById('per1').style.display = 'none';
    document.getElementById('per2').style.display = 'none';
    document.getElementById('per3').style.display = 'none';
    document.getElementById('vis').style.display = 'table';
}

//Muestra para mostrar la tabla de productos y agregar mas de la Primera Persona
function cal1(){
    personanumero=1;
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
    let calculo2 =45+20+35+40;
    let tabla2="";
    console.log("calculo "+calculo2)
    tabla2+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo2}</td> </tr>`
    tabla2+=`<tr> <td> AGUA </td>        <td> 15 </td>       <td> 3 </td><td> 45 </td> </tr>`
    tabla2+=`<tr> <td> ARROZ </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla2+=`<tr> <td> CERIAL </td>      <td> 35 </td>       <td> 1 </td><td> 35 </td> </tr>`
    tabla2+=`<tr> <td> HUEVO </td>       <td> 40 </td>       <td> 1 </td><td> 40 </td> </tr>`

    document.getElementById("mes2").innerHTML = tabla2

    
    document.getElementById('per1').style.display = 'table';
    document.getElementById('per2').style.display = 'none';
    document.getElementById('per3').style.display = 'none';
    document.getElementById('vis').style.display = 'none';
}

//Muestra para mostrar la tabla de productos y agregar mas de la Segunda Persona
function cal2(){
    personanumero=2;
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
    let calculo2 =45+20+35+40;
    let tabla2="";
    console.log("calculo "+calculo2)
    tabla2+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo2}</td> </tr>`
    tabla2+=`<tr> <td> AGUA </td>        <td> 15 </td>       <td> 3 </td><td> 45 </td> </tr>`
    tabla2+=`<tr> <td> ARROZ </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla2+=`<tr> <td> CERIAL </td>      <td> 35 </td>       <td> 1 </td><td> 35 </td> </tr>`
    tabla2+=`<tr> <td> HUEVO </td>       <td> 40 </td>       <td> 1 </td><td> 40 </td> </tr>`

    document.getElementById("mes2").innerHTML = tabla2
    
    document.getElementById('per1').style.display = 'none';
    document.getElementById('per2').style.display = 'table';
    document.getElementById('per3').style.display = 'none';
    document.getElementById('vis').style.display = 'none';
}

function cal3(){
    personanumero=3;
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
    let calculo2 =45+20+35+40;
    let tabla2="";
    console.log("calculo "+calculo2)
    tabla2+=`<tr> <td> TOTAL </td>       <td>----</td>       <td>---</td><td> ${calculo2}</td> </tr>`
    tabla2+=`<tr> <td> AGUA </td>        <td> 15 </td>       <td> 3 </td><td> 45 </td> </tr>`
    tabla2+=`<tr> <td> ARROZ </td>        <td> 10 </td>       <td> 2 </td><td> 20 </td> </tr>`
    tabla2+=`<tr> <td> CERIAL </td>      <td> 35 </td>       <td> 1 </td><td> 35 </td> </tr>`
    tabla2+=`<tr> <td> HUEVO </td>       <td> 40 </td>       <td> 1 </td><td> 40 </td> </tr>`

    document.getElementById("mes2").innerHTML = tabla2
    
    document.getElementById('per1').style.display = 'none';
    document.getElementById('per2').style.display = 'none';
    document.getElementById('per3').style.display = 'table';
    document.getElementById('vis').style.display = 'none';
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

let totalneto1=0;
let totalneto2=0;
let totalneto3=0;

    function agregar(){
        event.preventDefault();
        let con = personanumero;

        if(con==1){ingreper1();}
        if(con==2){ingreper2();}
        if(con==3){ingreper3();}
        
    }

    //funcion para imprimir el producto mas compreado
    function procom(){
        let procomprado = document.getElementById("masComprado")

        let repite=0;
        let tamanio=productoscom3p1.length;
        
        for(let x=0; x<tamanio; x++){

            repite++;
        }

          
    }

    function ingreper1()
    {
        let nom = document.getElementById("produc").value;
        let nombre = nom.toUpperCase();
        let pre = document.getElementById("precio").value;
        let canti = document.getElementById("cantidad").value;
        let total = pre*canti;

        if((nom!="")&&(pre!="")&&(canti!="")){
            //if((presupuesto>=presu)){

                let tama;

            const tabla = document.getElementById("per1").getElementsByTagName("tbody")[0];
            
            
            tama=  `[${nombre},${pre},${canti},${total}]`;
            totalneto1+=total;
            productoscom3p1.push(tama);
            document.getElementById("toaln1").innerHTML = totalneto1;

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
            console.log("tama: " + productoscom3p1.length)

            window.alert("Producto Ingresado Correctamente")


           // }
           // else{
          //      window.alert("El Total Es Mayor Al Presupuesto")
           // }
           } else{window.alert("Hay un dato vacio en los datos de los productos a ingresar")}
    }


    function ingreper2()
    {
        let nom = document.getElementById("produc").value;
        let nombre = nom.toUpperCase();
        let pre = document.getElementById("precio").value;
        let canti = document.getElementById("cantidad").value;
        let total = pre*canti;

        if((nom!="")&&(pre!="")&&(canti!="")){
            //if((presupuesto>=presu)){

                let tama;

            const tabla = document.getElementById("per2").getElementsByTagName("tbody")[0];
            
            
            tama=  `[${nombre},${pre},${canti},${total}]`;
            totalneto2+=total;
            productoscom3p1.push(tama);
            document.getElementById("toaln2").innerHTML = totalneto2;

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
            console.log(productoscom3p2)
            console.log("tama: " + productoscom3p2.length)

            window.alert("Producto Ingresado Correctamente")


           // }
           // else{
          //      window.alert("El Total Es Mayor Al Presupuesto")
           // }
           } else{window.alert("Hay un dato vacio en los datos de los productos a ingresar")}
        
    }


    function ingreper3()
    {
        let nom = document.getElementById("produc").value;
        let nombre = nom.toUpperCase();
        let pre = document.getElementById("precio").value;
        let canti = document.getElementById("cantidad").value;
        let total = pre*canti;

        if((nom!="")&&(pre!="")&&(canti!="")){
            //if((presupuesto>=presu)){

                let tama;

            const tabla = document.getElementById("per3").getElementsByTagName("tbody")[0];
            
            
            tama=  `[${nombre},${pre},${canti},${total}]`;
            totalneto3+=total;
            productoscom3p1.push(tama);
            document.getElementById("toaln3").innerHTML = totalneto3;

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
            console.log(productoscom3p3)
            console.log("tama: " + productoscom3p3.length)

            window.alert("Producto Ingresado Correctamente")


           // }
           // else{
          //      window.alert("El Total Es Mayor Al Presupuesto")
           // }
           } else{window.alert("Hay un dato vacio en los datos de los productos a ingresar")}
        
    }