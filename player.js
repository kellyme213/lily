var player = {};

function setupPlayer()
{
	player.position = generatePoint(CANVAS_WIDTH / 2 + 100, CANVAS_HEIGHT / 2 + 100);
	player.width = 80;
	player.height = 80;
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
}