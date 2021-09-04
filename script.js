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
	let cell = event.target;
	if (cell.className === "cell"){
		if (opacityButton.hasAttribute("disabled")) { // Events don't stack !
			cell.style.backgroundColor = updateOpacity(cell);
		}
		else if (randomButton.hasAttribute("disabled")) {
			cell.style.backgroundColor = 
			`rgba(${randomColor()},${randomColor()},${randomColor()},0.1)`;
			cell.style.backgroundColor = updateOpacity(cell);
		}
		else {
			cell.style.backgroundColor = "rgba(0,0,0,0.1)";
		}
	}
}

// refactor to return only opacity
// add function getColor(element) => used to change only color
// can be used to stack opacity and random if selected
function updateOpacity(element) {
	let newColor;
	let newOpacity = Number(getColor(element, "a")) + 0.1;
	newColor = `rgba(${getColor(element, "hue")},${newOpacity})`;
	return newColor;
}

function getColor(element, colorValue) {
	let color = element.style.backgroundColor;
	let reg = /(?<=\().+(?=\))/g; // captures only the rgba values
	let colorArray;
	if (color !== "") {
		colorArray = color.match(reg).toString().split(",");
	}
	switch (colorValue) {
		case "r": return colorArray[0];
		case "g": return colorArray[1];
		case "b": return colorArray[2];
		case "a": return colorArray[3];
		case "hue": return `${colorArray[0]},${colorArray[1]},${colorArray[2]}`;
		default: return "0,0,0,0";
	}
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

container.addEventListener("mouseover", draw);

colorButtons.forEach(button => {
	button.addEventListener("click", event => {
		enableButtons(colorButtons);
		event.target.setAttribute("disabled", "");
	});
});

clearButton.addEventListener("click", newGrid);

generateGrid();
