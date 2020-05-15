var player = {};

function setupPlayer()
{
	player.position = generatePoint(CANVAS_WIDTH / 2 + 100, CANVAS_HEIGHT / 2 + 100);
	player.width = 80;
	player.height = 80;
	player.bbox = generateBox(player.position, player.width, player.height);
	player.heldShit = undefined;
	player.numTreats = 3;
	player.holdingBall = true;
	setupTrash();
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

function updatePlayer()
{
	var dx = 0;
	var dy = 0;
	if (upPressed())
	{
		dy = -1;
	}

	if (downPressed())
	{
		dy = 1;
	}

	if (leftPressed())
	{		
		dx = -1;
	}

	if (rightPressed())
	{
		dx = 1;
	}

	moveBy(player, dx * 3, dy * 3);
	//player.bbox.center = generatePoint(player.position.x, player.position.y);
}