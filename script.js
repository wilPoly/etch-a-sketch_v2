const MAX_SIZE = 100;
const container = document.querySelector(".container");
const clearButton = document.querySelector("#clearButton");

container.addEventListener("mouseover", event => {
	if (event.target.className === "cell"){
		event.target.classList.add("drawn");
	}
});

clearButton.addEventListener("click", newGrid);

function generateGrid(size = 16){
	if (size > 100) size = MAX_SIZE;
	let cellNumber = size * size;
	container.style = `grid-template-columns: repeat(${size}, auto)`;
	for (let i=0; i < cellNumber; i++) {
		let cell = document.createElement("div");
		cell.className = "cell";
		container.appendChild(cell);
		}
	console.log(size);
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
	else return Number(size);
}

function clearGrid() {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

generateGrid();
