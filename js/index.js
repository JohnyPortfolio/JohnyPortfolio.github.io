var canvas, canvas2, ctx, ctx2, panelOffSprite, panelOnSprite, panelOffSpriteLoaded, panelOnSpriteLoaded;
var tileSize = 50;
var field = []
var oldField = []
var firstTime = true;
var sizeX = 18;
var sizeY = 22;

var konami = 0;

window.onload = init;




function init() {
    canvas = document.getElementById("index-canvas");
    canvas2 = document.getElementById("index-canvas-2");
    ctx = canvas.getContext("2d");
    ctx2 = canvas2.getContext("2d");
    canvas.width = sizeX * tileSize / 2;
    canvas2.width = sizeX * tileSize / 2;
    canvas.height = sizeY * tileSize;
    canvas2.height = sizeY * tileSize;
    sizeX += 2;
    sizeY += 2;
    panelOffSprite = new Image();
    panelOffSprite.src = "img/panel-off.png";
    panelOffSprite.onload = function () {
        panelOffSpriteLoaded = true;
    }
    panelOnSprite = new Image();
    panelOnSprite.src = "img/panel-on.png";
    panelOnSprite.onload = function () {
        panelOnSpriteLoaded = true;
    }
    
    interval = setInterval(update, 80);

    projectsText = document.getElementById('projects');

    giveAccess(false);
}

function generateField() {
    for (var x = 0; x < sizeX; x++) {
        field[x] = [];
        oldField[x] = [];
        if (x == 0 || x == sizeX - 1) {
            for (var y = 0; y < sizeY; y++) {

                field[x][y] = false;
            }
        }
        else {
            for (var y = 0; y < sizeY; y++) {
                if (y == 0 || y == sizeY - 1) {

                    field[x][y] = false;
                }
                else {

                    field[x][y] = Math.random() > 0.85;
                }
            }
        }
    }
}

//calculates and draws a new frame
function draw() {
    for (var x = 0; x < sizeX; x++) {
        for (var y = 0; y < sizeY; y++) {
            oldField[x][y] = field[x][y];
        }
    }
    for (var x = 1; x < sizeX - 1; x++) {
        for (var y = 1; y < sizeY - 1; y++) {
            var neighbours = 0;
            if (oldField[x - 1][y - 1]) { neighbours++; }
            if (oldField[x][y - 1]) { neighbours++; }
            if (oldField[x + 1][y - 1]) { neighbours++; }
            if (oldField[x - 1][y]) { neighbours++; }
            if (oldField[x + 1][y]) { neighbours++; }
            if (oldField[x - 1][y + 1]) { neighbours++; }
            if (oldField[x][y + 1]) { neighbours++; }
            if (oldField[x + 1][y + 1]) { neighbours++; }
            if (neighbours < 2) { field[x][y] = false; }
            if (neighbours == 3) { field[x][y] = true; }
            if (neighbours > 3) { field[x][y] = false; }
        }
    }

    for (x = 0; x < sizeX; ++x) {
        for (y = 0; y < sizeY; ++y) {
            drawSprite(field[x][y], x, y)
        }
    }

    var isEmpty = true;
    for (x = 0; x < sizeX; ++x) {
        for (y = 0; y < sizeY; ++y) {
            if (field[x][y]) {
                isEmpty = false;
            }
        }
    }

    if (isEmpty)
    {
        generateField();
    }

    for (x = 1; x < sizeX - 1; ++x) {
        for (y = 1; y < sizeY - 1; ++y) {
            if (Math.random() > 0.999) {
                field[x][y] = !field[x][y];
            }
        }
    }
}

function update() {
    if (panelOnSpriteLoaded && panelOffSpriteLoaded) {
        if (firstTime)
        {
            generateField()
            firstTime = false;
        }
        draw();
    }
}

function drawSprite(isOn, x, y)
{
    if (isOn)
    {
        if (x < 10)
        {
            ctx.globalAlpha = 0.5;
            ctx.drawImage(panelOnSprite, x * tileSize - tileSize, y * tileSize - tileSize, tileSize, tileSize);
        }
        else
        {
            ctx2.globalAlpha = 0.5;
            ctx2.drawImage(panelOnSprite, (x - 9) * tileSize - tileSize, y * tileSize - tileSize, tileSize, tileSize);
        }
    }
    else
    {
        if (x < 10)
        {
            ctx.globalAlpha = 0.5;
            ctx.drawImage(panelOffSprite, x * tileSize - tileSize, y * tileSize - tileSize, tileSize, tileSize);
        }
        else
        {
            ctx2.globalAlpha = 0.5;
            ctx2.drawImage(panelOffSprite, (x - 9) * tileSize - tileSize, y * tileSize - tileSize, tileSize, tileSize);
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (konami < 2 && event.key == "ArrowUp")
    {
        konami++;
        console.log("Up!")
    }
    else if (konami < 4 && konami > 1 && event.key == "ArrowDown")
    {
        konami++;
        console.log("Down!")
    }
    else if ((konami == 4 || konami == 6) && event.key == "ArrowLeft")
    {
        konami++;
        console.log("Left!")
    }
    else if ((konami == 5 || konami == 7) && event.key == "ArrowRight")
    {
        konami++;
        console.log("Right!")
    }
    else if (konami == 8 && event.key == "b")
    {
        konami++;
        console.log("B!")
    }
    else if (konami == 9 && event.key == "a")
    {
        konami++;
        console.log("A!")
        alert("Access to beta content granted!")
        giveAccess(true);
    }
    else if (konami > 0)
    {
        konami = 0;
        console.log("Failed...")
        if (konami < 2 && event.key == "ArrowUp")
    {
        konami++;
        console.log("Up!")
    }
    }
    
});

function giveAccess(hasAccess)
{
    var hiddens = document.getElementsByClassName("hidden");
    for (i = 0; i < hiddens.length; i++) {
        if (hasAccess)
        {
            hiddens[i].style.display = "inline-block";
        }
        else
        {
            hiddens[i].style.display = "none";
        }
      } 
}