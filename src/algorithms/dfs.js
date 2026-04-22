export function dfs(graph, start, goal, alpha = 1, beta = 1) {
  const stack = [{ node: start, path: [start], cost: 0 }];
  const visited = new Set();
  const exploredOrder = [];
  let nodesExpanded = 0;
  let nodesExplored = 0;

  while (stack.length) {
    const current = stack.pop();
    if (visited.has(current.node)) continue;

    visited.add(current.node);
    nodesExpanded += 1;
    exploredOrder.push(current.node);

    if (current.node === goal) {
      return {
        path: current.path,
        cost: current.cost,
        nodesExpanded,
        nodesExplored,
        exploredOrder,
        algorithm: "DFS",
        explanation: "Depth-First Search follows one branch deeply before backtracking."
      };
    }

    for (const neighbor of [...(graph[current.node] || [])].reverse()) {
      if (visited.has(neighbor.node)) continue;
      nodesExplored += 1;
      stack.push({
        node: neighbor.node,
        path: [...current.path, neighbor.node],
        cost: current.cost + alpha * neighbor.distance + beta * neighbor.risk
      });
    }
  }

  return { path: [], cost: Infinity, nodesExpanded, nodesExplored, exploredOrder, algorithm: "DFS", explanation: "No feasible path found." };
}
