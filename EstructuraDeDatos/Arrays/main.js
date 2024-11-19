const listUser = document.querySelector(".listUser")
const form1 = document.getElementById("form1")
const form2 = document.getElementById("form2")
const form3 = document.getElementById("form3")
const labelNumberForm = document.getElementById("labelNumberForm")
const saveForm = document.getElementById("saveForm")
const grafica1 = document.getElementById("chart_div1")
const grafica2 = document.getElementById("chart_div2")
const grafica3 = document.getElementById("chart_div3")
const nameTitle = document.getElementById("nameTitle")

let numFormulario = 1;
let usuarioSelect = 1;
let respuestasUsuario = []

let respuestasForm1 = [
    ['Gatos o Perros', 'Total',],
    [0,0]
]
let respuestasForm2 = [
    ['Introvertido o Extrovertido', 'Total',],
    [0,0]
]
let respuestasForm3 = [
    ['Frío o calor', 'Total',],
    [0,0]
]

async function peticionUsuario() {
    const url = "https://jsonplaceholder.typicode.com/users"
    try {
        const response = await fetch(url, {
            method: "GET"
        })
        const data = await response.json()
        if (data) {
            return data
        } else {
            alert("Datos vacios")
            return null
        }
    } catch (error) {
        console.error(error)
        alert("No se han podido acceder a los datos de usuario")
    }

}
function seleccionarUsuario(id, name) {
    usuarioSelect = id
    nameTitle.innerText = name
    renderRespuestas(id)
}

function renderRespuestas() {
    const res = respuestasUsuario.find(item => item.idUsuario === usuarioSelect)
    const formSelect1 = document.querySelectorAll("#form1 .selectForm")
    const formSelect2 = document.querySelectorAll("#form2 .selectForm")
    const formSelect3 = document.querySelectorAll("#form3 .selectForm")

    if (Array.isArray(res.respuestas) && res.respuestas.length > 0) {
        for (let i = 0; i < formSelect1.length; i++) {
            formSelect1[i].value = res.respuestas[0].formulario[i].option
            formSelect2[i].value = res.respuestas[1].formulario[i].option
            formSelect3[i].value = res.respuestas[2].formulario[i].option
        }
        renderGraficas()
    } else {
        const valorSelect = [1,2,1,1,2,1,1,2,1]
        for (let i = 0; i < formSelect1.length; i++) {
            formSelect1[i].value = valorSelect[i]
            formSelect2[i].value = valorSelect[i]
            formSelect3[i].value = valorSelect[i]
        }
        renderGraficas(1)
    }

}

function renderUsarios(data) {
    let bodyComponent = ""
    nameTitle.innerText = data[0].username
    data.forEach((user) => {
        bodyComponent += `<button onclick='seleccionarUsuario(${user.id}, "${user.username}")'>${user.username}</button>`
    })
    bodyComponent += ""
    listUser.innerHTML = bodyComponent
}

async function init() {
    const data = await peticionUsuario()
    renderUsarios(data)
    data.forEach(item => {
        respuestasUsuario.push({
            idUsuario: item.id,
            respuestas: {}
        })
    })
}

saveForm.addEventListener('click', () => {
    let i = 1
    let opcion = ""
    let respuestas = [
        {
            id: 1,
            formulario: [
                // respuesta
            ]
        },
        {
            id: 2,
            formulario: [
                // respuesta
            ]
        },
        {
            id: 3,
            formulario: [
                // respuesta
            ]
        }
    ]
    let uno = 0
    let dos = 0
    const preguntasFormText = document.querySelectorAll(".questionForm")
    document.querySelectorAll("#form1 div select").forEach(item => {
        opcion = item.options[item.selectedIndex].text
        respuestas[0].formulario.push(resForm(i, opcion, preguntasFormText[i].textContent, item.value))
        if(item.value == 1) {
            uno++
        } else{
            dos++
        }
        i++
    })
    respuestasForm1 = [
        ['Gatos o Perros', 'Puntos',],
        ['Perros', uno],
        ['Gatos', dos],
    ]
    uno = dos = i = 0

    document.querySelectorAll("#form2 div select").forEach(item => {
        opcion = item.options[item.selectedIndex].text
        respuestas[1].formulario.push(resForm(i, opcion, preguntasFormText[i].textContent, item.value))
        if(item.value == 1) {
            uno++
        } else{
            dos++
        }
        i++
    })
    respuestasForm2 = [
        ['Introvertido o Extrovertido', 'Puntos',],
        ['Extrovertido', uno],
        ['Introvertido', dos],
    ]
    uno = dos = i = 0

    document.querySelectorAll("#form3 div select").forEach(item => {
        opcion = item.options[item.selectedIndex].text
        respuestas[2].formulario.push(resForm(i, opcion, preguntasFormText[i].textContent, item.value))
        if(item.value == 1) {
            uno++
        } else{
            dos++
        }
        i++
        console.log(uno,dos)
    })
    respuestasForm3 = [
        ['Frío o calor', 'Puntos',],
        ['Frío', uno],
        ['Calor', dos],
    ]
    uno, dos, i = 0
    const itemFind = respuestasUsuario.find(item => item.idUsuario === usuarioSelect)
    itemFind.respuestas = respuestas
    drawBasic()
    //alert("Se han guardado los tres formulario")
})

function renderGraficas(vacio){
    let i = 1
    let uno = 0
    let dos = 0

    if(vacio) {
        respuestasForm1 = [
            ['Gatos o Perros', 'Puntos',],
            ['Perros', uno],
            ['Gatos', dos],
        ]
        respuestasForm2 = [
            ['Introvertido o Extrovertido', 'Puntos',],
            ['Extrovertido', uno],
            ['Introvertido', dos],
        ]
        respuestasForm3 = [
            ['Frío o calor', 'Puntos',],
            ['Frío', uno],
            ['Calor', dos],
        ]
        drawBasic()
        return;
    }

    document.querySelectorAll("#form1 div select").forEach(item => {
        if(item.value == 1) {
            uno++
        } else{
            dos++
        }
        i++
    })
    respuestasForm1 = [
        ['Gatos o Perros', 'Puntos',],
        ['Perros', uno],
        ['Gatos', dos],
    ]
    uno = dos = i = 0

    document.querySelectorAll("#form2 div select").forEach(item => {
        if(item.value == 1) {
            uno++
        } else{
            dos++
        }
        i++

    })
    respuestasForm2 = [
        ['Introvertido o Extrovertido', 'Puntos',],
        ['Extrovertido', uno],
        ['Introvertido', dos],
    ]
    uno = dos = i = 0
    document.querySelectorAll("#form3 div select").forEach(item => {
        if(item.value == 1) {
            uno++
        } else{
            dos++
        }
        i++

    })
    respuestasForm3 = [
        ['Frío o calor', 'Puntos',],
        ['Frío', uno],
        ['Calor', dos],
    ]
    console.log(uno,dos)
    uno = dos = i = 0
    drawBasic()
}


function mostrarForm(key) {
    if (key <= 0 || key > 3) return
    numFormulario = key
    switch (key) {
        case 1:
            form1.style.display = 'grid'
            form2.style.display = 'none'
            form3.style.display = 'none'
            labelNumberForm.innerText = numFormulario
            break;
        case 2:
            form1.style.display = 'none'
            form2.style.display = 'grid'
            form3.style.display = 'none'
            labelNumberForm.innerText = numFormulario
            break;
        case 3:
            form1.style.display = 'none'
            form2.style.display = 'none'
            form3.style.display = 'grid'
            labelNumberForm.innerText = numFormulario
            break;
        default:
            break;
    }
}

google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawBasic);


function drawBasic() {

    var data1 = google.visualization.arrayToDataTable(respuestasForm1);
    var data2 = google.visualization.arrayToDataTable(respuestasForm2);
    var data3 = google.visualization.arrayToDataTable(respuestasForm3);

    var options1 = {
        title: 'Gatos o Perros',
        chartArea: { width: '50%' },
        colors: ['#b972d4'] 
    };
    var options2 = {
        title: 'Introvertido p Extrovertido',
        chartArea: { width: '50%' },
        colors: ['#b972d4'] 
    };
    var options3 = {
        title: 'Dulce o Amargo',
        chartArea: { width: '50%' },
        colors: ['#b972d4'] 
    };

    var chart = new google.visualization.BarChart(grafica1);
    chart.draw(data1, options1);
    chart = new google.visualization.BarChart(grafica2);
    chart.draw(data2, options2);
    chart = new google.visualization.BarChart(grafica3);
    chart.draw(data3, options3);
}

function resForm(id, pregunta, opcion, valor) {
    return {
        idQuestion: id,
        text: pregunta,
        optionText: opcion,
        option: valor
    }
}

window.addEventListener('load', () => {
    init()
    mostrarForm(1)
})
