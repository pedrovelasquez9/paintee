//Variables del pincel
let brushColor = "#000";
let brushSize = 5;
let eraserSize = 50;
let canvasBackgroundColor = "#fff";
let previousColor = brushColor;

const BRUSH_FORM = "round";
const BRUSH_TYPE = "pincel";
const COLOR_TYPE = "color";
const BRUS_SIZE_ACTIVE_CLASS = "active-brush-size";
const BRUS_COLOR_ACTIVE_CLASS = "active-color";
const BRUSH_IDS = [
    "big-brush-btn",
    "mid-brush-btn",
    "small-brush-btn"
];
const COLOR_IDS = [
    "red-btn",
    "blue-btn",
    "green-btn",
    "yellow-btn",
    "pink-btn",
    "black-btn",
    "brush-color-input"
];

const canvasColorInput = document.getElementById('canvas-color-input');
canvasColorInput.value = "#ffffff";
const brushSizeRange = document.getElementById("brush-size");
const brushSizeInfoElem = document.getElementById("brush-size-info");
const eraserBtn = document.getElementById("eraser");
const colorInput = document.getElementById('brush-color-input');
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
const setActiveBrushSize = (elem, size) => {
    changeBrushSize(size);
    activarElemento(elem, BRUSH_TYPE);
}

const changeBrushSize = (size) => {
    eraserBtn.classList.remove(BRUS_COLOR_ACTIVE_CLASS)
    brushColor = brushColor == canvasBackgroundColor ? previousColor : brushColor;
    brushSizeRange.value = size;
    brushSizeInfoElem.innerText = size;
    brushSize = size;
}

//Funcion para establecer elemento (pincel o color) seleccionado por el usuario
const activarElemento = (elem, type) => {
    const elementsToProcess = type == BRUSH_TYPE ? BRUSH_IDS : COLOR_IDS;
    const classToUse = type == BRUSH_TYPE ? BRUS_SIZE_ACTIVE_CLASS : BRUS_COLOR_ACTIVE_CLASS;

    elementsToProcess.forEach(item => {
        if(item !== elem.id){
            const temp_elem = document.getElementById(item);
            temp_elem.classList.remove(classToUse);
        }
    });

    elem.classList.add(classToUse);
}

//Funcion para cambiar el color del pincel y activar el elemento
const setActiveColor = (elem, val) => {
    setBrushColor(val);
    activarElemento(elem, COLOR_TYPE);
};

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
    canvasBackgroundColor = color;
    context.fillRect(0, 0, canvasContainer.offsetWidth, canvasContainer.offsetHeight)
}

const erase = (e) => {
    brushSize = eraserSize;
    previousColor = brushColor !== canvasBackgroundColor ? brushColor : previousColor;
    setBrushColor(canvasBackgroundColor);
    e.originalTarget.classList.add(BRUS_COLOR_ACTIVE_CLASS);
}

//definir color por defecto en el refresh
colorInput.value = brushColor;


mainCanvas.setAttribute("width", canvasContainerSize[0]);
mainCanvas.setAttribute("height", canvasContainerSize[1]);
mainCanvas.addEventListener('mousedown', mouseClick);
mainCanvas.addEventListener('mouseup', mouseUp);
toolbarForm.addEventListener('submit', preventDef);
eraserBtn.addEventListener('click', erase);
changeCanvasBackground(canvasBackgroundColor);

/**
 * TODO: agregar guardado de imagen 
 * TODO: agregar sync con localStorage
 * TODO: probar app con tableta grafica
 * TODO: agregar musica/efectos de sonido tipo relax 
 * TODO: agregar modo nocturno
 * TODO: agregar logo y titulo de app 
 * TODO: mejorar la distribucion del toolbar
 * TODO: evaluar refactor 
 */