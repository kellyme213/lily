var canvas = document.getElementById("myCanvas");
let debug = false;

function renderImage(ctx, img, x, y, w, h)
{
	ctx.drawImage(img, x - w / 2, y - h / 2, w, h);

	if (debug)
	{
		ctx.beginPath();
		ctx.rect(x - w / 2, y - h / 2, w, h);
		ctx.stroke();
	}
}

function renderImage2(ctx, img, o)
{
	renderImage(ctx, img, o.position.x, o.position.y, o.width, o.height);
}

function renderBackground(ctx)
{
	ctx.fillStyle = "#CACACA";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	ctx.drawImage(document.getElementById("background"), 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderPlayer(ctx)
{
	var str = getPlayerSprite();
	var img = document.getElementById(str);
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
	var str = getLilySprite();
	var img = document.getElementById(str);
	renderImage2(ctx, img, lily);
}

function renderUI(ctx)
{
	ctx.font = "40px serif";
	ctx.fillStyle = "#000000";
	if (player.heldShit !== undefined)
	{
		ctx.fillText('💩', 20, CANVAS_HEIGHT - 20);
	}
	if (player.holdingBall)
	{
		ctx.fillText('🎾', 80, CANVAS_HEIGHT - 20);
	}

	if (player.numTreats > 0)
	{
		ctx.fillText('🍪', 160, CANVAS_HEIGHT - 20);
	}
	if (player.numTreats > 1)
	{
		ctx.fillText('🍪', 200, CANVAS_HEIGHT - 20);
	}
	if (player.numTreats > 2)
	{
		ctx.fillText('🍪', 240, CANVAS_HEIGHT - 20);
	}

	//ctx.fillText((100 * (lily.amountEaten / (100 * numShits))).toString(), 300, CANVAS_HEIGHT - 20);
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

function renderTreat(ctx)
{
	if (player.droppedTreat !== undefined)
	{
		var img = document.getElementById("treat");
		renderImage2(ctx, img, player.droppedTreat);
	}
}

function gameRenderLoop()
{
	var ctx = canvas.getContext("2d");
	ctx.textAlign = 'left';
	renderBackground(ctx);
	renderTreat(ctx);
	renderOther(ctx);
	renderShits(ctx);
	renderPlayer(ctx);
	renderLily(ctx);
	renderUI(ctx);
}

function renderMainTextRect(ctx)
{
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect(15, 15, 615, CANVAS_HEIGHT - 110);
}

function renderMainText(ctx)
{
	ctx.font = 'bold 40pt Avenir';
	ctx.fillStyle = '#FFFFFF';
	var vA = 25; //verticalAlign
	ctx.fillText("DON'T LET LILY EAT SHIT", vA, CANVAS_HEIGHT - 20);

	ctx.font = '500 28pt Avenir';
	ctx.fillText("This is Lily the corgi.", vA, 60);
	ctx.fillText("Lily likes to eat shit.", vA, 120);
	ctx.fillText("It is gross.", vA, 180);
	ctx.fillText("Please stop Lily from eating shit.", vA, 240);
	ctx.fillText("Pick up the shit before she eats it.", vA, 300);

	ctx.fillText("Press WASD to move.", vA, 420);
	ctx.fillText("Press 1 to pick up shit and drop it", vA, 480);
	ctx.fillText("in the trash.", vA, 520);
	ctx.fillText("Press 2 to throw and pick up a ball.", vA, 580);
	ctx.fillText("Press 3 to drop a treat.", vA, 640);
	//ctx.fillText("Press 4 to tell Lily to come.", vA, 700);

	ctx.fillText("Press Space to start the game.", vA, 780);

}

function renderMainLily(ctx)
{
	var img = document.getElementById("mainLily");
	ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}


function mainMenuRenderLoop()
{
	var ctx = canvas.getContext("2d");
	ctx.textAlign = 'left';
	renderMainLily(ctx);
	renderMainTextRect(ctx);
	renderMainText(ctx);
}

function renderEndMenuBackground(ctx)
{
	ctx.fillStyle = "#AAAAAA";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderEndMenuShits(ctx)
{
	for (var x = 0; x < shitLocations.length; x++)
	{
		ctx.font = 'bold 40pt Avenir';
		ctx.fillText('💩', shitLocations[x].x, shitLocations[x].y);
	}
}

function renderEndMenuUI(ctx)
{
	ctx.fillStyle = "#FFFFFF";
	ctx.font = 'bold 40pt Avenir';
	ctx.fillText('Congratulations.', CANVAS_WIDTH / 2, 70);
	var percent = Math.floor((lily.amountEaten / (numShits * 100)) * 10000) / 100;
	ctx.fillText("Lily ate " + toNumberString(percent) + "% of the available shit.", CANVAS_WIDTH / 2, 150);
	ctx.fillText("DON'T LET LILY EAT SHIT", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 150);

	ctx.font = 'bold 35pt Avenir';
	ctx.fillText("Michael Kelly", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
	ctx.fillText("Maddy Kelly",  CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 130);

	ctx.font = '500 28pt Avenir';
	ctx.fillText("made by",  CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 110);

	ctx.fillText("everything but the art", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
	ctx.fillText("the art",  CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 170);

	ctx.fillText("Press Space to replay.", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);
}

function endMenuRenderLoop()
{	
	var ctx = canvas.getContext("2d");
	ctx.textAlign = 'center';
	renderEndMenuBackground(ctx);
	renderEndMenuShits(ctx);
	renderEndMenuUI(ctx);
}







