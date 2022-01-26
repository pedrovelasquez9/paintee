//Variables del pincel
let brushColor = "#000";
let brushSize = 5;
const BRUSH_FORM = "round";

//Obtenemos el tamaño del contenedor del elemento canvas
const canvasContainer = document.getElementById("main-canvas-container");
const canvasContainerSize = [canvasContainer.offsetWidth, canvasContainer.offsetHeight]; 

//Asignamos el tamaño del contenedor al elemento canvas
const mainCanvas = document.getElementById("main-canvas");
mainCanvas.setAttribute("width", canvasContainerSize[0]);
mainCanvas.setAttribute("height", canvasContainerSize[1]);

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
const changeBrushSize = (size) => {
    brushSize = size;
}

//Funcion para cambiar el color del pincel
const colorInput = document.getElementById('brush-color');
const setBrushColor = () => {
    brushColor = colorInput.value;
};

//Evita que el form haga un refresh
const toolbarForm = document.getElementById('toolbar-form');
const preventDef = (evt) => {
    evt.preventDefault();
};

mainCanvas.addEventListener('mousedown', mouseClick);
mainCanvas.addEventListener('mouseup', mouseUp);
colorInput.addEventListener('input', setBrushColor);
toolbarForm.addEventListener('submit', preventDef);


/**
 * TODO: agregar colores por defecto ademas del input color
 * TODO: mejorar el handle del color por defecto al hacer refresh, por si el input tiene otro color preseleccionado
 * TODO: agregar cambio de fondo de canvas
 * TODO: indicar al usuario què tamaño de pincel tiene seleccionado actualmente
 */