

/** Animation delay **/
let delay = 10;
const waitforme = (delay) => {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, delay);
  })
}


let cols = Math.round(screen.width / 30);
let rows = Math.round(screen.height / 45);

const renderTable = (rows, cols) => {

  /** render on screen **/

  const table = document.getElementsByClassName('mytable')
  for (let i = 0; i < rows; ++i) {

    const ele = document.createElement('tr');
    ele.id = `row-${i}`

    for (let j = 0; j < cols; ++j) {
      const node = document.createElement('th');
      node.id = `${i}-${j}`
      node.classList.add('node')
      node.classList.add('unvisited')
      node.onmousedown =  () => clicked(node);
      ele.append(node);
    }
    table[0].append(ele);
  }
}


renderTable(rows, cols);

// set start ,finish node coordinates 
let [startRow, startCol, finishRow, finishCol] = [rows - 1, cols-1, 0, 0];

document.getElementById(`${startRow}-${startCol}`).className = 'node start';
document.getElementById(`${finishRow}-${finishCol}`).className = 'node finish';



/**  
 *  All algorithms run on grid 2d array of objects.
 *  Nodes marked as walls on screen, are blocked on the grid. (impenetrable)
 *  Each node on grid has a bunch of different properties - check createNode()
 *  After running then animation is rendered on the screen
**/

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === startRow && col === startCol,
    isFinish: row === finishRow && col === finishCol,
    distance: Infinity,
    distanceToFinishNode: Math.abs(finishRow - row) + Math.abs(finishCol - col),
    isVisited: false,
    isWall: false,
    previousNode: null,
  }
}

const createGrid = () => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

const getNewGridWithWalls = (grid, row, col) => {
  
  /* isWall property of node is set to true */

  if(!isRunning) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];

    const newNode = {
      ...node,
      isWall: !node.isWall,
    }
    newGrid[row][col] = newNode;
    grid = newGrid;
  }  
  return grid;
}



let grid = createGrid();

let isRunning = false;
const clicked = (node) => {

  /** Mark walls, change pos of start and finish node **/

  let nodeClass = node.className;
  const [row, col] = node.id.split('-');


  if (!isRunning) {
    if (nodeClass !== 'node start' && nodeClass !== 'node finish') {
      if (nodeClass === 'node unvisited') node.className = 'node wall';
      else if (nodeClass === 'node wall') node.className = 'node unvisited';
      else if (nodeClass === 'node shortest-path') node.className = 'node wall';
      else if(nodeClass === 'node visited') node.className = 'node wall';
      
      grid = getNewGridWithWalls(grid, row, col);
    }

    if(nodeClass === 'node start') {
      alert(`Can't move this :( `);
      alert('Will add it in the future tho :) ')
      
    }

    if(nodeClass === 'node finish') {
      alert(`Can't move this :( `);
      alert('Will add it in the future tho :) ')
    }
  }
}

const clearGrid = () => {

  if (!isRunning) {
    const newGrid = grid.slice();
    for (const row of newGrid) {
      for (const node of row) {
        let nodeClassName = document.getElementById(`${node.row}-${node.col}`).className;
        if(
          nodeClassName !== 'node start' &&
          nodeClassName !== 'node finish' &&
          nodeClassName !== 'node wall'
        ) {
          document.getElementById(`${node.row}-${node.col}`).className =
            'node unvisited';
          node.isVisited = false;
          node.distance = Infinity;
        }
        if (nodeClassName === 'node finish') {
          node.isVisited = false;
          node.distance = Infinity;
          node.distanceToFinishNode = 0;
        }
        if (nodeClassName === 'node start') {
          node.isVisited = false;
          node.distance = Infinity;
          node.isStart = true;
          node.isWall = false;
          node.previousNode = null;
          node.isNode = true;
        }
      }
    }
  }
}


/** check whether node coordinates within table bounds */
const isValid = (currentNodeRow, currentNodeCol) => {

  if (currentNodeRow >= 0 && currentNodeRow <= rows - 1 && currentNodeCol >= 0 && currentNodeCol <= cols - 1) {
    if (grid[currentNodeRow][currentNodeCol].isVisited) {
      return false;
    }
    else {
      return true;
    }
  }
  return false;
}


/** Recover path (if exists) by backtracking */
const getPath = (finishNode) => {

  const path = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return path;
}


const animatePath = async (path) => {
  for (let i = 0; i < path.length; ++i) {
    const { row, col } = path[i];
    await waitforme(delay);

    const node = document.getElementById(`${row}-${col}`);

    if (node.className !== 'node start' && node.className !== 'node finish') {
      node.className = 'node shortest-path';
    }
  }
}


/** Animate the algorithm **/
const animateAlgorithm = async (visualizeNodesInOrder) => {
  for (let i = 0; i < visualizeNodesInOrder.length; ++i) {
    await waitforme(delay);
    const { col, row } = visualizeNodesInOrder[i];
    const node = document.getElementById(`${row}-${col}`);

    if (node.className === 'node unvisited') {
      node.className = 'node visited';
    }
  }
}



const toggledButtonDisable = (isRunning) => {

  /* Disable all the buttons while algo is running*/

  if(isRunning) {
    document.getElementById('clear').disabled = true;
    document.getElementById('dfs').disabled = true;
    document.getElementById('bfs').disabled = true;
    document.getElementById('dijkstra').disabled = true;
    document.getElementById('astar').disabled = true;
  }

  else {
    document.getElementById('clear').disabled = false;
    document.getElementById('dfs').disabled = false;
    document.getElementById('bfs').disabled = false;
    document.getElementById('dijkstra').disabled = false;
    document.getElementById('astar').disabled = false;

  }
}

const clearGridBtn = document.getElementById('clear');
clearGridBtn.addEventListener('click', () => {
  clearGrid();
})



document.getElementById('astar').addEventListener('click', () => {
  alert(`This doesn't work for now :'( `);
  alert(`Understood how astar works, but haven't implemented it myself`);
  alert('But will add it soon with a bunch of other cool stuff, so hooray !');
})