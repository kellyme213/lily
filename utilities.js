let CANVAS_WIDTH = 1600;
let CANVAS_HEIGHT = 900;




var keyMap = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keyMap[e.key] = e.type == 'keydown';
    //print(keyMap);
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
	return buttonPressed('ArrowUp');
}

function downPressed()
{
	return buttonPressed('ArrowDown');
}

function leftPressed()
{
	return buttonPressed('ArrowLeft');
}

function rightPressed()
{
	return buttonPressed('ArrowRight');
}

function moveBy(entity, dx, dy)
{
	entity.position.x += dx;

	var box = generateBoxCenter(entity.position, entity.width, entity.height);
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

	box = generateBoxCenter(entity.position, entity.width, entity.height);
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
}




