const depthFirstSearch = (grid, startNode, finishNode) => {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const visitedNodesInOrder = [];
  const dfsStack = [];

  dfsStack.push(startNode);
  while (dfsStack.length) {
    const currentNode = dfsStack.pop();

    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

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
            dfsStack.push(nextNode);
          }
        }
      }
    }
  }

  return visitedNodesInOrder;
}


const dfsBtn = document.getElementById('dfs');
dfsBtn.addEventListener('click', async () => {
  const startNode = grid[startRow][startCol];
  const finishNode = grid[finishRow][finishCol];

  clearGrid();
  isRunning = true;

  toggledButtonDisable(isRunning);

  const visitedeNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
  await animateAlgorithm(visitedeNodesInOrder, "dfs");
  const path = getPath(finishNode);

  await animatePath(path);
  isRunning = false;

  toggledButtonDisable(isRunning);

})


