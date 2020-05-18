var gameState = 0;
var numShits = 20;


function print(a)
{
	console.log(a);
}

function main()
{
    setupPlayer();
    generateLily();
    randomShitSpawn(numShits);
    setInterval(update, 16);
}

function mainMenuUpdate()
{
    mainMenuRenderLoop();
}

function endMenuUpdate()
{
    generateShitLocations();
    endMenuRenderLoop();
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
        endMenuUpdate();
    }
}

function gameUpdate()
{
    updatePlayer();
    updateLily();
    updateShits();
    updateTreat();
    gameRenderLoop();

    if (shitList.length == 0 && player.heldShit === undefined)
    {
        gameState = 2;
    }
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

