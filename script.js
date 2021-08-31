function generateGrid(size = 16){
	let cellNumber = size * size;
	let container = document.querySelector(".container");
	container.style = `grid-template-columns: repeat(${size}, auto)`;
   for (let i=0; i < cellNumber; i++) {
	  let cell = document.createElement("div");
	  cell.className = "cell";
	  cell.textContent = i;
	  container.appendChild(cell);
	}
	console.log(size);
  }
  
  generateGrid();
// Set up a “hover” effect so that the grid divs change color when your mouse passes over them