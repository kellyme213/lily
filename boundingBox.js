let canvasBox = generateBox(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);


function pointInBox(point, box)
{
	return (point.x >= box.center.x - box.width  / 2 && 
			point.x <= box.center.x + box.width  / 2 &&
			point.y >= box.center.y - box.height / 2 &&
			point.y <= box.center.y + box.height / 2 );
}

function generatePoint(px, py)
{
	var point = {};
	point.x = px;
	point.y = py;
	return point;
}

function boxesIntersect(box1, box2)
{
	var p1 = generatePoint(box1.center.x + box1.width / 2, box1.center.y + box1.height / 2);
	var p2 = generatePoint(box1.center.x - box1.width / 2, box1.center.y + box1.height / 2);
	var p3 = generatePoint(box1.center.x + box1.width / 2, box1.center.y - box1.height / 2);
	var p4 = generatePoint(box1.center.x - box1.width / 2, box1.center.y - box1.height / 2);

	return (pointInBox(p1, box2) ||
			pointInBox(p2, box2) ||
			pointInBox(p3, box2) ||
			pointInBox(p4, box2));
}

function generateBoxCenter(p, w, h)
{
	return generateBox(p.x, p.y, w, h);
}

function generateBox(cx, cy, w, h)
{
	//console.log(p);
	var box = {};
	box.center = generatePoint(cx, cy);
	box.width = w;
	box.height = h;
	return box;
}



function boxContained(box1, box2)
{
	var p1 = generatePoint(box1.center.x + box1.width / 2, box1.center.y + box1.height / 2);
	var p2 = generatePoint(box1.center.x - box1.width / 2, box1.center.y + box1.height / 2);
	var p3 = generatePoint(box1.center.x + box1.width / 2, box1.center.y - box1.height / 2);
	var p4 = generatePoint(box1.center.x - box1.width / 2, box1.center.y - box1.height / 2);

	return (pointInBox(p1, box2) &&
			pointInBox(p2, box2) &&
			pointInBox(p3, box2) &&
			pointInBox(p4, box2));
}