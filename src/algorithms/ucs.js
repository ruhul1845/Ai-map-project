export function ucs(graph, start, goal, alpha = 1, beta = 1) {
  const frontier = [{ node: start, gCost: 0, path: [start] }];
  const bestCost = { [start]: 0 };
  const expanded = new Set();
  const exploredOrder = [];
  let nodesExpanded = 0;
  let nodesExplored = 0;

  while (frontier.length) {
    frontier.sort((a, b) => a.gCost - b.gCost);
    const current = frontier.shift();
    if (expanded.has(current.node)) continue;

    expanded.add(current.node);
    nodesExpanded += 1;
    exploredOrder.push(current.node);

    if (current.node === goal) {
      return {
        path: current.path,
        cost: current.gCost,
        nodesExpanded,
        nodesExplored,
        exploredOrder,
        algorithm: "UCS",
        explanation: "Uniform Cost Search expands the lowest-cost frontier node and guarantees the optimal weighted path."
      };
    }

    for (const neighbor of graph[current.node] || []) {
      const edgeCost = alpha * neighbor.distance + beta * neighbor.risk;
      const newCost = current.gCost + edgeCost;
      if (bestCost[neighbor.node] !== undefined && newCost >= bestCost[neighbor.node]) continue;
      nodesExplored += 1;
      bestCost[neighbor.node] = newCost;
      frontier.push({ node: neighbor.node, gCost: newCost, path: [...current.path, neighbor.node] });
    }
  }

  return { path: [], cost: Infinity, nodesExpanded, nodesExplored, exploredOrder, algorithm: "UCS", explanation: "No feasible path found." };
}
