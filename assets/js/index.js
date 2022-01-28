//Variables del pincel
let brushColor = "#000";
let brushSize = 5;
const BRUSH_FORM = "round";

const colorInput = document.getElementById('brush-color');
//Obtenemos el tamaño del contenedor del elemento canvas
const canvasContainer = document.getElementById("main-canvas-container");
const canvasContainerSize = [canvasContainer.offsetWidth, canvasContainer.offsetHeight]; 

//Asignamos el tamaño del contenedor al elemento canvas
const mainCanvas = document.getElementById("main-canvas");

//Inicializamos el contexto del canvas
const context = mainCanvas.getContext("2d");

//Declaramos las variables que almacenaran las ultimas coordenadas del mouse
let initialX;
let initialY;

//Funcion que dibuja
const draw = (cursorX, cursorY) => {
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = brushSize;
    context.strokeStyle = brushColor;
    context.lineCap = BRUSH_FORM; //posibles valores: round, butt y square
    context.lineJoin = BRUSH_FORM; //posibles valores: round, bevel y miter
    context.lineTo(cursorX, cursorY);
    context.stroke();

    initialX = cursorX;
    initialY = cursorY;
} 

const mouseClick = (evt) => {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
    draw(initialX, initialY);
    mainCanvas.addEventListener('mousemove', mouseMoving);
}

const mouseMoving = (evt) => {
    draw(evt.offsetX, evt.offsetY);
}

const mouseUp = (evt) => {
    mainCanvas.removeEventListener('mousemove', mouseMoving);
}

//Funcion para cambiar tamaño del pincel
const changeBrushSize = (elem, size) => {
    const BRUSH_IDS = [
        "big-brush-btn",
        "mid-brush-btn",
        "small-brush-btn"
    ];
    
    BRUSH_IDS.forEach(item => {
        if(item !== elem.id){
            const temp_elem = document.getElementById(item);
            temp_elem.classList.remove('active-brush-size');
        }
    });

    elem.classList.add('active-brush-size');
    brushSize = size;
}

//Funcion para cambiar el color del pincel
const setBrushColor = (val) => {
    brushColor = val;
};

//Evita que el form haga un refresh
const toolbarForm = document.getElementById('toolbar-form');
const preventDef = (evt) => {
    evt.preventDefault();
};

//Funcion para cambiar el color del canvas
const changeCanvasBackground = (color) => {
    context.fillStyle = color;
    context.fillRect(0, 0, canvasContainer.offsetWidth, canvasContainer.offsetHeight)
}

//definir color por defecto en el refresh
colorInput.value = brushColor;


mainCanvas.setAttribute("width", canvasContainerSize[0]);
mainCanvas.setAttribute("height", canvasContainerSize[1]);
mainCanvas.addEventListener('mousedown', mouseClick);
mainCanvas.addEventListener('mouseup', mouseUp);
toolbarForm.addEventListener('submit', preventDef);
changeCanvasBackground("#fff");

/**
 * TODO: agregar borrador
 * TODO: agregar cambio de fondo de canvas
 * TODO: agregar un input numerico para seleccionar un tamaño especifico de pincel
 * TODO: conectar con api de unsplash y crear una modal con lista de imagenes para que el usuario elija una como fondo del canvas
 */