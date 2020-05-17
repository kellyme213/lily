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
				lily.amountEaten++;
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
		var x = 75 + Math.floor(Math.random() * (CANVAS_WIDTH - 150));
		var y = 180 + Math.floor(Math.random() * (CANVAS_HEIGHT - 270));
		spawnShit(x, y);
	}
}



var shitLocations = [];

function generateShitLocations()
{
	if (shitLocations.length > 0)
	{
		return;
	}

	//lily.amountEaten = 2000;
	for (var x = 0; x < lily.amountEaten; x++)
	{
		var p = add(generatePoint(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2), mult(1.0 + 0.6 * x, norm(generatePoint(Math.random() - 0.5, Math.random() - 0.5))));
		shitLocations.push(p);
	}
}

