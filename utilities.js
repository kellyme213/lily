let CANVAS_WIDTH = 1600;
let CANVAS_HEIGHT = 900;




var keyMap = {}; // You could also use an array
onkeydown = function(e){
    e = e || event; // to deal with IE
    keyMap[e.key] = e.type == 'keydown';
    //print(keyMap);
}

onkeyup = function(e)
{
	
    e = e || event; // to deal with IE
    keyMap[e.key] = e.type == 'keydown';


    if (e.key == 'q')
    {
    	if (!player.holdingBall)
    	{
    		if (len(player.ball.position, player.position) < 20)  //change
    		{
    			player.holdingBall = true;
    		}
    	}
    	else
    	{
    		player.holdingBall = false;
    		player.ball.position = generatePoint(player.position.x, player.position.y);
    	}
    }

    if (e.key == 'e')
    {
    	if (player.heldShit === undefined)
    	{
	    	for (var x = 0; x < shitList.length; x++)
	    	{
	    		if (boxesIntersect(shitList[x].bbox, player.bbox))
	    		{
	    			player.heldShit = shitList[x];
	    			shitList.splice(x, 1);
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
}

function buttonPressed(button)
{
	if (keyMap[button] === undefined)
	{
		return false;
	}
	return keyMap[button];
}

function upPressed()
{
	return buttonPressed('w');
}

function downPressed()
{
	return buttonPressed('s');
}

function leftPressed()
{
	return buttonPressed('a');
}

function rightPressed()
{
	return buttonPressed('d');
}

function moveBy(entity, dx, dy)
{
	entity.position.x += dx;

	var box = generateBox(entity.position, entity.width, entity.height);
	for (var x = 0; x < Math.abs(dx); x++)
	{
		if (!boxContained(box, canvasBox))
		{
			entity.position.x -= Math.sign(dx);
			box.center.x -= Math.sign(dx);
		}
		else
		{
			break;
		}
	}


	entity.position.y += dy;

	box = generateBox(entity.position, entity.width, entity.height);
	for (var x = 0; x < Math.abs(dy); x++)
	{
		if (!boxContained(box, canvasBox))
		{
			entity.position.y -= Math.sign(dy);
			box.center.y -= Math.sign(dy);
		}
		else
		{
			break;
		}
	}

	entity.bbox.center = generatePoint(entity.position.x, entity.position.y);
}

function getRand(n)
{
	return Math.floor(Math.random() * n);
}




