var gameState = 0;


function print(a)
{
	console.log(a);
}

function main()
{
    setupPlayer();
    generateLily();
    randomShitSpawn(10);
	canvas.addEventListener("mousedown", clickFunction);

    setInterval(update, 16);
}

function mainMenuUpdate()
{
    mainMenuRenderLoop();
    if (buttonPressed(' '))
    {
        gameState = 1;
    }
}

function update()
{
    if (gameState == 0)
    {
        mainMenuUpdate();
    }
    else if (gameState == 1)
    {
        gameUpdate();
    }
    else if (gameState == 2)
    {

    }
}

function gameUpdate()
{
    updatePlayer();
    updateLily();
    updateShits();
    gameRenderLoop();
}

function clickFunction()
{
    var rect = canvas.getBoundingClientRect();
    var svgx = rect.x;
    var svgy = rect.y;

    var point = {};
    point.x = Number(window.event.clientX - svgx) * (CANVAS_WIDTH / rect.width);
    point.y = Number(window.event.clientY - svgy) * (CANVAS_HEIGHT / rect.height);

    //print(point);
}

