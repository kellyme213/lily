var canvas = document.getElementById("myCanvas");

function renderBackground(ctx)
{
	ctx.fillStyle = "#CACACA";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderPlayer(ctx)
{
	ctx.beginPath();
	var img = document.getElementById("player");
	ctx.drawImage(img, player.position.x - player.width / 2, player.position.y - player.height / 2, player.width, player.height);
	ctx.stroke();
}

function renderLoop()
{
	var ctx = canvas.getContext("2d");
	renderBackground(ctx);
	renderPlayer(ctx);
}