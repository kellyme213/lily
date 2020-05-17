let LILY_IDLE = 0;
let LILY_EATING_SHIT = 1;
let LILY_EATING_TREAT = 2;
let LILY_GOING_TO_SHIT = 3;
let LILY_GOING_TO_TREAT = 4;
let LILY_GOING_TO_BALL = 5;
let LILY_RUNNING_AWAY = 6;
let LILY_COMING = 7;
let LILY_WANDER = 8;

let RUN_DISTANCE = 100;
let STOP_RUN_DISTANCE = 300;


var lily = {};

function generateLily()
{
	lily.position = generatePoint(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
	lily.width = 140;
	lily.height = 70;
	lily.bbox = generateBox(lily.position, lily.width, lily.height);
	lily.state = LILY_IDLE;
	lily.target = generatePoint(0, 0);
	lily.v = generatePoint(0, 0);
	lily.notifyShitEaten = 0;
	lily.notifyBallThrown = 0;
	lily.notifyShitPickedUp = 0;
	lily.notifyTreatEaten = 0;
	lily.frameCounter = 0;
	lily.amountEaten = 0;
}

function lilyIdle()
{
	lily.v = generatePoint(0, 0);
	if (lily.notifyBallThrown == 1)
	{
		lily.notifyBallThrown = 0;
		lily.state = LILY_GOING_TO_BALL;
		return;
	}

	if (len(sub(player.position, lily.position)) < RUN_DISTANCE)
	{
		lily.state = LILY_RUNNING_AWAY;
	}

	if (getRand(100) == 0)
	{
		//console.log("hi");
		if (shitList.length != 0)
		{
			lily.target = shitList[getRand(shitList.length)].position;
			lily.state = LILY_GOING_TO_SHIT;
			lily.v = mult(3, norm(sub(lily.target, lily.position)));
		}
		else
		{
			lily.state = LILY_WANDER;
		}
	}
}

function lilyEatingShit()
{
	if (lily.notifyBallThrown == 1)
	{
		lily.notifyBallThrown = 0;
		if (getRand(3) == 0)
		{
			lily.state = LILY_GOING_TO_BALL;
			return;
		}
	}

	if (len(sub(player.position, lily.position)) < RUN_DISTANCE)
	{
		lily.state = LILY_RUNNING_AWAY;
	}

	if (lily.notifyShitEaten == 1)
	{
		lily.notifyShitEaten = 0;
		lily.state = LILY_IDLE;
	}

	lily.v = {x: 0, y: 0};
}

function lilyRunningAway()
{
	if (lily.notifyBallThrown == 1)
	{
		lily.notifyBallThrown = 0;
		lily.state = LILY_GOING_TO_BALL;
		return;
	}

	if (len(sub(player.position, lily.position)) > STOP_RUN_DISTANCE)
	{
		lily.state = LILY_IDLE;
	}
	lily.v = mult(5, norm(sub(lily.position, player.position)));
}

function lilyGoingToShit()
{
	//console.log(len(sub(lily.target, lily.position)));
	if (lily.notifyBallThrown == 1)
	{
		lily.notifyBallThrown = 0;
		if (getRand(5) > 0)
		{
			lily.state = LILY_GOING_TO_BALL;
			return;
		}
	}

	if (len(sub(lily.position, lily.target)) < 5)
	{
		lily.state = LILY_EATING_SHIT;
	}

	if (len(sub(player.position, lily.position)) < RUN_DISTANCE)
	{
		lily.state = LILY_RUNNING_AWAY;
	}

	lily.v = mult(3, norm(sub(lily.target, lily.position)));
}

function lilyWander()
{
	if (lily.notifyBallThrown == 1)
	{
		lily.notifyBallThrown = 0;
		lily.state = LILY_GOING_TO_BALL;
		return;
	}

	if (len(sub(player.position, lily.position)) < RUN_DISTANCE)
	{
		lily.state = LILY_RUNNING_AWAY;
	}

	if (getRand(70) == 0)
	{
		lily.v = mult(3, norm(generatePoint(Math.random() - 0.5, Math.random() - 0.5)));
	}
}

function lilyGoingToBall()
{
	lily.v = mult(6, norm(sub(player.ball.position, lily.position)));

	if (len(sub(lily.position, player.ball.position)) < 10)
	{
		lily.state = LILY_IDLE;
		lily.v = generatePoint(0, 0);
	}
}

function lilyGoingToTreat()
{
	lily.v = mult(3, norm(sub(player.ball.position, lily.position)));

	if (len(sub(lily.position, player.ball.position)) < 10)
	{
		lily.state = LILY_IDLE;
		lily.v = generatePoint(0, 0);
	}
}

function updateLily()
{
	//console.log(lily.state);
	if (lily.state == LILY_IDLE)
	{
		lilyIdle();
	}
	else if (lily.state == LILY_GOING_TO_SHIT)
	{
		lilyGoingToShit();
	}
	else if (lily.state == LILY_EATING_SHIT)
	{
		lilyEatingShit();
	}
	else if (lily.state == LILY_RUNNING_AWAY)
	{
		lilyRunningAway();
	}
	else if (lily.state == LILY_WANDER)
	{
		lilyWander();
	}
	else if (lily.state == LILY_GOING_TO_BALL)
	{
		lilyGoingToBall();
	}


	moveBy(lily, lily.v.x, lily.v.y);
	lily.frameCounter++;
}

function getLilySprite()
{
	var str = "lily1";

	if (lily.state == LILY_EATING_SHIT || lily.state == LILY_EATING_TREAT)
	{
		var c = lily.frameCounter % 100;
		if (c < 80)
		{
			str = "lily3";
		}
		else
		{
			str = "lily4";
		}
	}

	if (lily.state == LILY_RUNNING_AWAY || lily.state == LILY_GOING_TO_BALL)
	{
		var c = lily.frameCounter % 10;
		if (c < 5)
		{
			str = "lily1";
		}
		else
		{
			str = "lily2";
		}
	}

	if (lily.state == LILY_IDLE)
	{
		str = "lily4";
	}

	if (lily.state == LILY_GOING_TO_SHIT || lily.state == LILY_WANDER)
	{
		var c = lily.frameCounter % 16;
		if (c < 8)
		{
			str = "lily1";
		}
		else
		{
			str = "lily2";
		}
	}

	if (lily.v.x > 0)
	{
		str += "F";
	}
	return str;
}






