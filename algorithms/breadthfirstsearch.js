const breadthFirstSearch = (grid, startNode, finishNode) => {

  rowLength = grid.length;
  columnLength = grid[0].length;

  return breadthFirstSearchHelper(startNode, finishNode);

}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const breadthFirstSearchHelper = (startNode, finishNode) => {
  const visitedNodesInOrder = [];
  let queue = [startNode];
  while (queue.length) {
    const currentNode = queue.shift();
    if (currentNode === finishNode) return visitedNodesInOrder;

    if (!currentNode.isWall && (currentNode.isStart || !currentNode.isVisited)) {
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      const { col, row } = currentNode;
      let nextNode;

      for (let i = 0; i < 4; ++i) {
        if (isValid(row + dx[i], col + dy[i])) {
          nextNode = grid[row + dx[i]][col + dy[i]];
          if (!nextNode.isVisited) {
            nextNode.previousNode = currentNode;
            queue.push(nextNode);
          }
        }
      }
    }
  }
  return visitedNodesInOrder;

}

const animateBFS = async (visualizeNodesInOrder) => {
  for (let i = 0; i < visualizeNodesInOrder.length; i++) {
    const { col, row } = visualizeNodesInOrder[i];
    await waitforme(delay);
    document.getElementById(`${row}-${col}`).className = 'node visited';
  }
}


const bfsBtn = document.getElementById('bfs');
bfsBtn.addEventListener('click', async () => {

  clearGrid();
  isRunning = true;
  toggledButtonDisable(isRunning);

  const visitedeNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
  await animateAlgorithm(visitedeNodesInOrder, "bfs");
  // const path =  getPath(finishNode);
  await animatePath(getPath(finishNode));

  isRunning = false;
  toggledButtonDisable(isRunning);
})

