let CANVAS_WIDTH = 1600;
let CANVAS_HEIGHT = 900;




var keyMap = {}; // You could also use an array
onkeydown = function(e){
    e = e || event; // to deal with IE
    keyMap[e.key] = e.type == 'keydown';

    //https://www.construct.net/en/forum/construct-3/how-do-i-8/prevent-scrolling-itch-io-143583
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
 		e.preventDefault();
 	}
}

onkeyup = function(e)
{

    e = e || event; // to deal with IE
    keyMap[e.key] = e.type == 'keydown';


    if (e.key == '1')
    {
    	pickupShit();
    }

    if (e.key == '2')
    {
    	throwBall();
    }

    if (e.key == '3')
    {
    	dropTreat();
    }

    if (gameState == 0 && e.key == ' ')
    {
    	gameState = 1;
    }
    if (gameState == 2 && e.key == ' ')
    {
    	gameState = 0;
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
	return buttonPressed('w') || buttonPressed('ArrowUp');
}

function downPressed()
{
	return buttonPressed('s') || buttonPressed('ArrowDown');
}

function leftPressed()
{
	return buttonPressed('a') || buttonPressed('ArrowLeft');
}

function rightPressed()
{
	return buttonPressed('d') || buttonPressed('ArrowRight');
}

function moveBy(entity, dx, dy)
{
	entity.position.x += dx;

	var box = generateBox(entity.position, entity.width, entity.height);
	var flipBallV = false;
	for (var x = 0; x < Math.abs(dx); x++)
	{
		if (!boxContained(box, canvasBox))
		{
			entity.position.x -= Math.sign(dx);
			box.center.x -= Math.sign(dx);
			if (entity.ballCount !== undefined && !flipBallV)
			{
				entity.v.x *= -1;
				flipBallV = true;
			}
		}
		else
		{
			break;
		}
	}


	entity.position.y += dy;

	box = generateBox(entity.position, entity.width, entity.height);
	flipBallV = false;
	for (var x = 0; x < Math.abs(dy); x++)
	{
		if (!boxContained(box, canvasBox))
		{
			entity.position.y -= Math.sign(dy);
			box.center.y -= Math.sign(dy);
			if (entity.ballCount !== undefined && !flipBallV)
			{
				entity.v.y *= -1;
				flipBallV = true;
			}
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

//https://stackoverflow.com/questions/28389484/convert-float-to-string-with-at-least-one-decimal-place-javascript
function toNumberString(num) { 
  if (Number.isInteger(num)) { 
    return num + ".0"
  } else {
    return num.toString(); 
  }
}




