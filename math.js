function add(p1, p2)
{
	return generatePoint(p1.x + p2.x, p1.y + p2.y);
}

function sub(p1, p2)
{
	return generatePoint(p1.x - p2.x, p1.y - p2.y);
}

function len(p)
{
	return Math.sqrt(p.x * p.x + p.y * p.y);
}

function norm(p)
{
	var d = len(p);
	return generatePoint(p.x / d, p.y / d);
}

function mult(s, p)
{
	return generatePoint(s * p.x, s * p.y);
}