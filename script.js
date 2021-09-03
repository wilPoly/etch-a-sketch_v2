const MAX_SIZE = 100;
const DEFAULT_SIZE = 16;
const container = document.querySelector(".container");
const clearButton = document.querySelector("#clearButton");
const randomButton = document.querySelector("#random");
const opacityButton = document.querySelector("#opacity");
const defaultButton = document.querySelector("#default");
const colorButtons = document.querySelectorAll("#colors > button");


function generateGrid(size = DEFAULT_SIZE){
	if (size > 100) size = MAX_SIZE;
	let cellNumber = size * size;
	container.style = `grid-template-columns: repeat(${size}, auto)`;
	for (let i=0; i < cellNumber; i++) {
		let cell = document.createElement("div");
		cell.className = "cell";
		cell.style.backgroundColor = "rgba(0,0,0,0)";
		container.appendChild(cell);
		}
	console.log(size);
}

function draw(event) {
	if (event.target.className === "cell"){
		if (opacityButton.hasAttribute("disabled")) { // Events don't stack !
			event.target.style.backgroundColor = updateOpacity(event.target);
		}
		else if (randomButton.hasAttribute("disabled")) {
			event.target.style.backgroundColor = 
			`rgba(${randomColor()},${randomColor()},${randomColor()},1)`;
		}
		else {
			event.target.style.backgroundColor = "rgba(0,0,0,0.1)";
		}
	}
}

function updateOpacity(element) {
	let newColor;
	let opacity;
	let color = element.style.backgroundColor;
	let reg = /(?<=\().+(?=\))/g; // captures only the rgba values
	if (color !== "") {
		let tempColor = color.match(reg).toString().split(",");
		opacity = Number(tempColor[3]) + 0.1;
		newColor = `rgba(${tempColor[0]},${tempColor[1]},${tempColor[2]},${opacity})`;
	}
	return newColor;
}

function newGrid() {
	let size = getNewGridSize("Input a number");
	console.log(typeof size);
	clearGrid();
	generateGrid(size);
}

function getNewGridSize(message) {
	let size = prompt("What size ?", message);
	if (size === message) {
		getNewGridSize(message);
	}
	else if (size === "default") {
		return DEFAULT_SIZE;
	}
	else return Number(size);
}

function clearGrid() {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

function randomColor() {
	return Math.floor(Math.random() * 255);
}

function enableButtons (elements) {
	elements.forEach(element => {
		element.removeAttribute("disabled", "");
	})
}

generateGrid();

container.addEventListener("mouseover", draw);

colorButtons.forEach(button => {
	button.addEventListener("click", event => {
		enableButtons(colorButtons);
		event.target.setAttribute("disabled", "");
	});
});

clearButton.addEventListener("click", newGrid);
