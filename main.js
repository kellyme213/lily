
function print(a)
{
	console.log(a);
}

function main()
{
    setupPlayer();
	canvas.addEventListener("mousedown", clickFunction);

    setInterval(update, 16);
}

function update()
{
    updatePlayer();
    renderLoop();
}

function clickFunction()
{
    var rect = canvas.getBoundingClientRect();
    var svgx = rect.x;
    var svgy = rect.y;

    var point = {};
    point.x = Number(window.event.clientX - svgx) * (CANVAS_WIDTH / rect.width);
    point.y = Number(window.event.clientY - svgy) * (CANVAS_HEIGHT / rect.height);

    print(point);
}

