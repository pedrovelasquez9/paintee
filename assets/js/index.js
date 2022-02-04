//Función para cargar settings desde localStorage
const initSettings = () => {
  return JSON.parse(localStorage.getItem("painteeSettings"));
};

//Variables del pincel
let settings = initSettings() || {
  brushColor: "#000000",
  brushSize: 5,
  eraserSize: 50,
  canvasBackgroundColor: "#ffffff",
  previousColor: this.brushColor,
  modoNocturno: false,
};

const BRUSH_FORM = "round";
const BRUSH_TYPE = "pincel";
const COLOR_TYPE = "color";
const BRUS_SIZE_ACTIVE_CLASS = "active-brush-size";
const BRUS_COLOR_ACTIVE_CLASS = "active-color";
const BRUSH_IDS = ["big-brush-btn", "mid-brush-btn", "small-brush-btn"];
const COLOR_IDS = [
  "red-btn",
  "blue-btn",
  "green-btn",
  "yellow-btn",
  "pink-btn",
  "black-btn",
  "brush-color-input",
];
const AUDIO_TRACKS = [
  "assets/audio/track1.mp3",
  "assets/audio/track2.mp3",
  "assets/audio/track3.mp3",
];

const toolbarContainer = document.getElementById("toolbar-container");
const nocturnoBtn = document.getElementById("modo-nocturno");
const clearCanvasBtn = document.getElementById("clear-canvas");
const canvasColorInput = document.getElementById("canvas-color-input");
canvasColorInput.value = "#ffffff";
const brushSizeRange = document.getElementById("brush-size");
const brushSizeInfoElem = document.getElementById("brush-size-info");
const eraserBtn = document.getElementById("eraser");
const colorInput = document.getElementById("brush-color-input");
const saveBtn = document.getElementById("save-draw");
const audioTag = document.getElementById("audio-bar");
//Obtenemos el tamaño del contenedor del elemento canvas
const canvasContainer = document.getElementById("main-canvas-container");
const canvasContainerSize = [
  canvasContainer.offsetWidth,
  canvasContainer.offsetHeight,
];

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
  context.lineWidth = settings.brushSize;
  context.strokeStyle = settings.brushColor;
  context.lineCap = BRUSH_FORM; //posibles valores: round, butt y square
  context.lineJoin = BRUSH_FORM; //posibles valores: round, bevel y miter
  context.lineTo(cursorX, cursorY);
  context.stroke();

  initialX = cursorX;
  initialY = cursorY;
};

const mouseClick = (evt) => {
  initialX = evt.offsetX;
  initialY = evt.offsetY;
  draw(initialX, initialY);
  mainCanvas.addEventListener("mousemove", mouseMoving);
};

const mouseMoving = (evt) => {
  draw(evt.offsetX, evt.offsetY);
};

const mouseUp = (evt) => {
  mainCanvas.removeEventListener("mousemove", mouseMoving);
};

//Funcion para cambiar tamaño del pincel
const setActiveBrushSize = (elem, size) => {
  changeBrushSize(size);
  activarElemento(elem, BRUSH_TYPE);
};

const changeBrushSize = (size) => {
  eraserBtn.classList.remove(BRUS_COLOR_ACTIVE_CLASS);
  settings.brushColor =
    settings.brushColor == settings.canvasBackgroundColor
      ? settings.previousColor
      : settings.brushColor;
  brushSizeRange.value = size;
  brushSizeInfoElem.innerText = size;
  settings.brushSize = size;
};

//Funcion para establecer elemento (pincel o color) seleccionado por el usuario
const activarElemento = (elem, type) => {
  const elementsToProcess = type == BRUSH_TYPE ? BRUSH_IDS : COLOR_IDS;
  const classToUse =
    type == BRUSH_TYPE ? BRUS_SIZE_ACTIVE_CLASS : BRUS_COLOR_ACTIVE_CLASS;

  elementsToProcess.forEach((item) => {
    if (item !== elem.id) {
      const temp_elem = document.getElementById(item);
      temp_elem.classList.remove(classToUse);
    }
  });

  elem.classList.add(classToUse);
};

//Funcion para cambiar el color del pincel y activar el elemento
const setActiveColor = (elem, val) => {
  setBrushColor(val);
  activarElemento(elem, COLOR_TYPE);
};

const setBrushColor = (val) => {
  settings.brushColor = val;
};

//Evita que el form haga un refresh
const toolbarForm = document.getElementById("toolbar-form");
const preventDef = (evt) => {
  evt.preventDefault();
};

//Funcion para cambiar el color del canvas
const changeCanvasBackground = (color) => {
  context.fillStyle = color;
  settings.canvasBackgroundColor = color;
  mainCanvas.style.backgroundColor = color;
};

//funcion para limpiar canvas
const clearCanvas = () => {
  context.fillStyle = settings.canvasBackgroundColor;
  context.fillRect(
    0,
    0,
    canvasContainer.offsetWidth,
    canvasContainer.offsetHeight
  );
  context.clearRect(
    0,
    0,
    canvasContainer.offsetWidth,
    canvasContainer.offsetHeight
  );
};

const erase = (e) => {
  settings.brushSize = settings.eraserSize;
  settings.previousColor =
    settings.brushColor !== settings.canvasBackgroundColor
      ? settings.brushColor
      : settings.previousColor;
  setBrushColor(settings.canvasBackgroundColor);
  e.originalTarget
    ? e.originalTarget.classList.add(BRUS_COLOR_ACTIVE_CLASS)
    : null;
};

//Funcion para guardar imagen
const saveDrawing = () => {
  const image = mainCanvas.toDataURL("image/jpeg");
  saveBtn.setAttribute("href", image);
};

//Función para guardar en el localStorage los settings
const saveSettings = () => {
  localStorage.setItem("painteeSettings", JSON.stringify(settings));
};

//habilitar/inhabilitar modo nocturno
const toggleNocturno = () => {
  settings.modoNocturno = !settings.modoNocturno;
  toolbarContainer.dataset.modoNocturno = settings.modoNocturno.toString();
};

//Función de reproducción aleatoria automática
const playRandom = () => {
  let audioToPlay =
    AUDIO_TRACKS[Math.floor(Math.random() * AUDIO_TRACKS.length)];
  audioTag.src = audioToPlay;
};

//Inicializar variables de settings
toolbarContainer.dataset.modoNocturno = settings.modoNocturno.toString();
nocturnoBtn.checked = settings.modoNocturno;
colorInput.value = settings.brushColor;
playRandom();

mainCanvas.setAttribute("width", canvasContainerSize[0]);
mainCanvas.setAttribute("height", canvasContainerSize[1]);
mainCanvas.addEventListener("mousedown", mouseClick);
mainCanvas.addEventListener("mouseup", mouseUp);
toolbarForm.addEventListener("submit", preventDef);
eraserBtn.addEventListener("click", erase);
saveBtn.addEventListener("click", saveDrawing);
window.addEventListener("beforeunload", saveSettings);
changeCanvasBackground(settings.canvasBackgroundColor);
clearCanvasBtn.addEventListener("click", clearCanvas);
nocturnoBtn.addEventListener("click", toggleNocturno);

/**
 * TODO: buscar biblioteca de musica/efectos de sonido tipo relax
 * TODO: buscar una fuente decente
 * TODO: agregar logo y titulo de app
 * TODO: revisar borrador al cambiar color de fondo
 * TODO: mejorar la distribucion del toolbar
 * TODO: evaluar refactor
 */
