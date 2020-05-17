let canvasBox = generateBox4(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70, CANVAS_WIDTH, CANVAS_HEIGHT - 140);


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
	var p2 = generatePoint(box1.center.x - box1.width / 2, box1.center.y - box1.height / 2);

	var p3 = generatePoint(box2.center.x + box2.width / 2, box2.center.y + box2.height / 2);
	var p4 = generatePoint(box2.center.x - box2.width / 2, box2.center.y - box2.height / 2);

	return intervalIntersects(p2.x, p1.x, p4.x, p3.x) && intervalIntersects(p2.y, p1.y, p4.y, p3.y);

	// return (pointInBox(p1, box2) ||
	// 		pointInBox(p2, box2) ||
	// 		pointInBox(p3, box2) ||
	// 		pointInBox(p4, box2));
}

function generateBox(p, w, h)
{
	return generateBox4(p.x, p.y, w, h);
}

function generateBox4(cx, cy, w, h)
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


function intervalIntersects(p1, p2, p3, p4)
{
	return ((p3 >= p1 && p3 <= p2) || 
			(p2 >= p3 && p2 <= p4) || 
			(p1 >= p3 && p1 <= p4) || 
			(p4 >= p1 && p4 <= p2));
}






