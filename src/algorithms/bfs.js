export function bfs(graph, start, goal, alpha = 1, beta = 1) {
  const queue = [{ node: start, path: [start], cost: 0 }];
  const visited = new Set([start]);
  const exploredOrder = [];
  let nodesExpanded = 0;
  let nodesExplored = 0;

  while (queue.length) {
    const current = queue.shift();
    nodesExpanded += 1;
    exploredOrder.push(current.node);

    if (current.node === goal) {
      return {
        path: current.path,
        cost: current.cost,
        nodesExpanded,
        nodesExplored,
        exploredOrder,
        algorithm: "BFS",
        explanation: "Breadth-First Search expands nodes level by level without using a heuristic."
      };
    }

    for (const neighbor of graph[current.node] || []) {
      if (visited.has(neighbor.node)) continue;
      nodesExplored += 1;
      visited.add(neighbor.node);
      const edgeCost = alpha * neighbor.distance + beta * neighbor.risk;
      queue.push({
        node: neighbor.node,
        path: [...current.path, neighbor.node],
        cost: current.cost + edgeCost
      });
    }
  }

  return { path: [], cost: Infinity, nodesExpanded, nodesExplored, exploredOrder, algorithm: "BFS", explanation: "No feasible path found." };
}
