var canvas = document.getElementById("myCanvas");


function renderImage(ctx, img, x, y, w, h)
{
	ctx.drawImage(img, x - w / 2, y - w / 2, w, h);
}

function renderImage2(ctx, img, o)
{
	renderImage(ctx, img, o.position.x, o.position.y, o.width, o.height);
}

function renderBackground(ctx)
{
	ctx.fillStyle = "#CACACA";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderPlayer(ctx)
{
	var img = document.getElementById("player");
	renderImage2(ctx, img, player);
}

function renderShits(ctx)
{
	var img = document.getElementById("shit");
	for (var x = 0; x < shitList.length; x++)
	{
		renderImage2(ctx, img, shitList[x]);
	}
}

function renderLily(ctx)
{
	var img = document.getElementById("lily");
	renderImage2(ctx, img, lily);
}

function renderUI(ctx)
{
	ctx.font = "30px serif";
	ctx.fillStyle = "#000000";
	if (player.heldShit !== undefined)
	{
		ctx.fillText('💩', 20, CANVAS_HEIGHT - 20);
	}
}

function renderOther(ctx)
{
	var img = document.getElementById("trash");
	renderImage2(ctx, img, player.trash);
	if (!player.holdingBall)
	{
		img = document.getElementById("ball");
		renderImage2(ctx, img, player.ball);
	}
}

function renderLoop()
{
	var ctx = canvas.getContext("2d");
	renderBackground(ctx);
	renderShits(ctx);
	renderOther(ctx);
	renderPlayer(ctx);
	renderLily(ctx);
	renderUI(ctx);
}







