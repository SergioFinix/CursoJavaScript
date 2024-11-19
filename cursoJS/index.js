// Variables para evaluar preguntas
const formulario = document.getElementById('formulario');
const navegador = document.getElementsByName('navegador');
const decision = document.getElementById('answer');
const lenguaje = document.getElementById('lenguaje');
const anio = document.getElementById('anio');


//Variables para modal
const promedio = document.getElementById('promedio');
const modal = document.getElementById('modal');
const btnFinalizar = document.getElementById('finalizar');
let ancho = window.innerWidth;

formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const respuestaSeleccionada = [
        Array.from(navegador).filter((netscape)=>{
            if(netscape.checked){
                return netscape.id;
            };
            return;
        })[0]?.id,
        decision.value,
        lenguaje.value.trim(),
        anio.value
    ];
    console.log(respuestaSeleccionada);
    
    const navegadorSeleccionada = Array.from(navegador).map(netscape=>netscape.checked && netscape.id === 'netscape')[0]
    const answerDecision = decision.value === 'cierto';
    const lenguajeProgramacion = lenguaje.value.toLowerCase().trim().includes('javascript');
    const anioCreacion = anio.value === '1995';

    const preguntasCorrectas = [navegadorSeleccionada,answerDecision,lenguajeProgramacion,anioCreacion].filter(pregunta=>{
        return pregunta === true;
    });
    
    const promedioTotal = (preguntasCorrectas.length / 4) * 10;
    
    mostrarModal(promedioTotal, respuestaSeleccionada);

    formulario.reset();
});

function mostrarModal(promedioTotal,respuestaSeleccionada) {
    promedio.textContent = promedioTotal + '/10';
    modal.classList.add('modal--dinamico');
    if(respuestaSeleccionada.length > 0){
        graficaPregunta(respuestaSeleccionada[0],document.getElementById('preguntaUno'),'¿El origen javascript surge a partir de un navegador que actualmente no existe?');
        graficaPregunta(respuestaSeleccionada[1],document.getElementById('preguntaDos'),'¿JavaScript es un lenguaje de  programación crossplatform, se puede usar en S.O. como:  Windows, Unix, Linux?');
        graficaPregunta(respuestaSeleccionada[2],document.getElementById('preguntaTres'),'¿A que lenguaje de programacion pertenece las siglas JS?');
        graficaPregunta(respuestaSeleccionada[3],document.getElementById('preguntaCuatro'),'¿En que fecha se creo JS?');
    }
}

function graficaPregunta(respuesta,elemento,pregunta){

    google.charts.load('current', {'packages':['corechart']});

     google.charts.setOnLoadCallback(drawChart);

    function drawChart(){
        
        var data = new google.visualization.DataTable();
       data.addColumn('string', 'Topping');
       data.addColumn('number', 'Slices');
       data.addRows([
        [respuesta, 1]
       ]);

       var options = {
                'title': pregunta,
                'height': 200,
                'width':ancho-80,
       };

       var chart = new google.visualization.PieChart(elemento);
       chart.draw(data, options);
    }
}

btnFinalizar.addEventListener('click',()=>{
    modal.classList.remove('modal--dinamico');
});
document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState !== 'visible'){
        mostrarModal(0,[]);   
    }
});