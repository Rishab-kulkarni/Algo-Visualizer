const startNode = grid[startRow][startCol];
const finishNode = grid[finishRow][finishCol];


const astar = (grid, startNode, finishNode) => {
  if(!startNode || !finishNode || startNode === finishNode){           
    return false;
  }

  const visitedNodesInOrder = [];
  
  
  startNode.distance = 0;
  const unVisitedNodes = getAllNodes(grid);

  while(!!unVisitedNodes.length){
    sortNodesByDistance(unVisitedNodes);
    const closestNode = unVisitedNodes.shift();

    if(closestNode.isWall) continue;
    if(closestNode.distance === Infinity) return visitedNodesInOrder;


    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if(closestNode === finishNode) return visitedNodesInOrder;
    updateNeighbors(closestNode, grid);
  }
}

const sortNodesByDistance = (unVisitedNodes) => {
  unVisitedNodes.sort((a,b) => a.distance - b.distance);
}

const updateNeighbors = (node, grid) => {
  const neighbors = getUnvisitedNeighbors(node, grid);
  for(const neighbor of neighbors){
    neighbor.distance = node.distance + 1;
    neighbor.distanceToFinishNode = Math.abs(neighbor.row - finishRow) + Math.abs( neighbor.col - finishCol);
    neighbor.previousNode = node;
  } 
}

const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const {col, row} = node;

  if(row > 0) neighbors.push(grid[row - 1][col]);
  if(row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if(col > 0) neighbors.push(grid[row][col - 1]);
  if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}


const getAllNodes = (grid) => {
  const nodes = [];
  for(const row of grid){
    for(const node of row){
      nodes.push(node);
    }
  }
  return nodes;
}

const astarBtn = document.getElementById('astar');
astarBtn.addEventListener('click', async () => {
  
  
  // clearBoard();

  disableDijkstraBtn();
  disablebfsBtn();
  disabledfsBtn();
  
  const visitedeNodesInOrder = astar(grid, startNode, finishNode);
  await animateAlgorithm(visitedeNodesInOrder, "astar");
  await animatePath(getPath(finishNode));
  
  enableDijkstraBtn();
  enablebfsBtn();
  enabledfsBtn();
})