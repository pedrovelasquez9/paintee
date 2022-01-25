/**
 * TODO: refactor to use canvas API instead of p5js
 */

function setup() {
   const parentDom = document.getElementById('main-canvas');
   let w = parentDom.offsetWidth;
   let h = parentDom.offsetHeight;
   const canvasElement = createCanvas(w, h);
   
   canvasElement.parent('main-canvas');
}   
  
function draw(brushW, brushH) {
    if (mouseIsPressed) {
        fill(0);
        ellipse(mouseX, mouseY, brushW, brushH);
    }
}

/**
 * TODO: add a resize event for updating canvas size
*/
