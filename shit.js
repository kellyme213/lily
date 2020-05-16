var shitList = [];

function spawnShit(x, y)
{
	var shit = {};
	shit.position = generatePoint(x, y);
	shit.width = 40;
	shit.height = 40;
	shit.health = 100;
	shit.bbox = generateBox(shit.position, shit.width, shit.height);
	shitList.push(shit);
}

function updateShits()
{
	//console.log(player.bbox);
	if (lily.state == LILY_EATING_SHIT)
	{
		for (var x = 0; x < shitList.length; x++)
		{
			if (boxesIntersect(shitList[x].bbox, lily.bbox))
			{
				shitList[x].health--;
				if (shitList[x].health <= 0)
				{
					shitList.splice(x, 1);
					lily.notifyShitEaten = 1;
					x--;
				}
				break;
			}
		}
	}
}

function randomShitSpawn(n)
{
	shitList = [];
	for (var i = 0; i < n; i++)
	{
		var x = 40 + Math.floor(Math.random() * (CANVAS_WIDTH - 80));
		var y = 40 + Math.floor(Math.random() * (CANVAS_HEIGHT - 80));
		spawnShit(x, y);
	}
}