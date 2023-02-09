const canvas = document.querySelector("canvas");
const cxt = canvas.getContext("2d"); // cxt -> context
// console.log(context);

canvas.width = 1280;
canvas.height = 768;

cxt.fillStyle = "white";
cxt.fillRect(0, 0, canvas.width, canvas.height); // (1) this is to draw the canvas borders

const image = new Image();

image.onload = () => {
	animate();
};

 // make the image object and then passing the source attribute as a reference

 // this is the funciton to  render the image when ever the image is loaded and this the onload function is called where the drawImage function is called.

image.src = "img/game-map.png";

class Enemy {
	constructor({position = {x: 0, y: 0}}) {
		this.position = position
		this.width = 100;
		this.height = 100;
		this.waypointIndex = 0;

		// to make the enemies move in the center we have to use the x position + width/2 and y position + height/2

		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}
		
	}

	draw() {
		cxt.fillStyle = 'red';
		cxt.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();

		const waypoint = waypoints[this.waypointIndex];
		const yDistance = waypoint.y - this.center.y; // this gives the y-axis distance
		const xDistance = waypoint.x - this.center.x; // this gives the x-axis distance
		const angle = Math.atan2(yDistance, xDistance); // angle between the enemy and destination point; tan = y/x;

		this.position.x += Math.cos(angle); // +1 is the increment in the angle as cosine represents the x axis
		this.position.y += Math.sin(angle); //+1 is the increment in the angle as sine represents the y axis

		this.center = {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}

		if (Math.round(this.center.x) === Math.round(waypoint.x) && Math.round(this.center.y) === Math.round(waypoint.y) && this.waypointIndex<waypoints.length -1)  {
			this.waypointIndex++;
		}
	}
}

const enemies = [];

for (let i = 1; i < 11; i++){
	const xOffset = i * 150; // this is will create an offset in the x direction for -150px for every i
	enemies.push(
		new Enemy({
			position:{x:waypoints[0].x-xOffset, y:waypoints[0].y}
		})
	)
	console.log(waypoints[0].x-xOffset);
}

function animate() {
	requestAnimationFrame(animate);
	cxt.drawImage(image, 0, 0);

	enemies.forEach((enemy) => {
		enemy.update();
	})

}


