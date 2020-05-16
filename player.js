var player = {};

function setupPlayer()
{
	player.position = generatePoint(CANVAS_WIDTH / 2 + 100, CANVAS_HEIGHT / 2 + 100);
	player.width = 70;
	player.height = 140;
	player.bbox = generateBox(player.position, player.width, player.height);
	player.heldShit = undefined;
	player.numTreats = 3;
	player.holdingBall = true;
	player.droppedTreat = undefined;
	player.frameCounter = 0;
	player.lastDir = 1;
	setupTrash();
	setupBall();
	//console.log(player.bbox);
}

function setupTrash()
{
	var trash = {};
	trash.position = generatePoint(80, 80);
	trash.width = 80;
	trash.height = 80;
	trash.bbox = generateBox(trash.position, trash.width, trash.height);
	player.trash = trash;
}

function setupBall()
{
	var ball = {};
	ball.position = generatePoint(0, 0);
	ball.width = 40;
	ball.height = 40;
	ball.bbox = generateBox(ball.position, ball.width, ball.height);
	ball.ballCount = 200;
	ball.v = generatePoint(0, 0);
	player.ball = ball;
} 

function throwBall()
{
	if (!player.holdingBall)
	{
		if (boxesIntersect(player.ball.bbox, player.bbox))
		{
			player.holdingBall = true;
		}
	}
	else
	{
		player.holdingBall = false;
		player.ball.ballCount = 200;
		player.ball.position = generatePoint(player.position.x, player.position.y);
		player.ball.bbox.center = generatePoint(player.position.x, player.position.y);
		player.ball.v = mult(10, norm(generatePoint(Math.random() - 0.5, Math.random() - 0.5)));
		lily.notifyBallThrown = 1;
	}
}

function pickupShit()
{
	if (player.heldShit === undefined)
	{
    	for (var x = 0; x < shitList.length; x++)
    	{
    		if (boxesIntersect(shitList[x].bbox, player.bbox))
    		{
    			player.heldShit = shitList[x];
    			shitList.splice(x, 1);
    			lily.notifyShitPickedUp = 1;
    			break;
    		}
    	}
	}
	else
	{
		if (boxesIntersect(player.trash.bbox, player.bbox))
		{
			player.heldShit = undefined;
		}
	}
}	

function dropTreat()
{
	if (player.numTreats > 0)
	{
		if (player.droppedTreat === undefined)
		{
			player.dropTreat = generateTreat();
			player.numTreats--;
		}
	}
}

function getPlayerSprite()
{
	var str = "player2";


	var n = player.frameCounter % 60;

	if (n < 15)
	{
		str = "player1";
	}
	else if (n < 30 || n > 45)
	{
		str = "player2";
	}
	else
	{
		str = "player3";
	}

	if (player.idle == 1)
	{
		str = "player2";
	}

	if (player.lastDir == -1)
	{
		str += "F";
	}


	return str;
}


function updatePlayer()
{
	player.idle = 1;
	var dx = 0;
	var dy = 0;
	if (upPressed())
	{
		dy = -1;
		player.idle = 0;
	}

	if (downPressed())
	{
		dy = 1;
		player.idle = 0;
	}

	if (leftPressed())
	{		
		player.lastDir = 1;
		dx = -1;
		player.idle = 0;
	}

	if (rightPressed())
	{
		player.lastDir = -1;
		dx = 1;
		player.idle = 0;
	}

	moveBy(player, dx * 3, dy * 3);


	if (!player.holdingBall && player.ball.ballCount > 0)
	{
		player.ball.ballCount--;
		var percent = Math.sqrt(player.ball.ballCount / 200);
		moveBy(player.ball, player.ball.v.x * percent, player.ball.v.y * percent);
	}

	player.frameCounter++;



	//player.bbox.center = generatePoint(player.position.x, player.position.y);
}










