const canvas = document.querySelector("canvas");
const cxt = canvas.getContext("2d"); // cxt -> context
// console.log(context);

canvas.width = 1280;
canvas.height = 768;

cxt.fillStyle = "white";
cxt.fillRect(0, 0, canvas.width, canvas.height); // (1) this is to draw the canvas borders

const image = new Image(); // make the image object and then passing the source attribute as a reference

image.onload = () => {}; // this is the funciton to  render the image when ever the image is loaded and this the onload function is called where the drawImage function is called.

image.src = "img/game-map.png";

class Enemy {
	constructor({position = {x: 0, y: 0}}) {
		this.position = position
		this.width = 100;
		this.height = 100;
		
	}

	draw() {
		cxt.fillStyle = 'red';
		cxt.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();
		this.position.x += 1;
	}
}

const enemy = new Enemy({position: {x: 200, y: 400}});
const enemy2 = new Enemy({position: {x: 0, y: 400}});

function animate() {
	requestAnimationFrame(animate);
	cxt.drawImage(image, 0, 0);

	enemy.update();
	enemy2.update();
}

animate();