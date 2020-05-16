function generateTreat()
{
	var treat = {};
	treat.position = generatePoint(player.position.x, player.position.y);
	treat.width = 70;
	treat.height = 24;
	treat.health = 100;
	treat.bbox = generateBox(treat.position, treat.width, treat.height);

	player.droppedTreat = treat;
}

function updateTreat()
{
	if (lily.state == LILY_EATING_TREAT && player.droppedTreat !== undefined)
	{
		if (boxesIntersect(player.droppedTreat.bbox, lily.bbox))
		{
			player.droppedTreat.health--;
			if (player.droppedTreat.health > 0)
			{
				player.droppedTreat = undefined;
				lily.notifyTreatEaten = 1;
			}
		}
	}
}