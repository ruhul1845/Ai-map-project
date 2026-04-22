import { admissibleHeuristic } from "../utils/heuristics";

export function aStar(graph, start, goal, alpha = 1, beta = 1) {
  const openSet = [{ node: start, gCost: 0, fCost: admissibleHeuristic(start, goal, alpha, beta), path: [start] }];
  const bestCost = { [start]: 0 };
  const closed = new Set();
  const exploredOrder = [];
  let nodesExpanded = 0;
  let nodesExplored = 0;

  while (openSet.length) {
    openSet.sort((a, b) => a.fCost - b.fCost);
    const current = openSet.shift();
    if (closed.has(current.node)) continue;

    closed.add(current.node);
    nodesExpanded += 1;
    exploredOrder.push(current.node);

    if (current.node === goal) {
      return {
        path: current.path,
        cost: current.gCost,
        nodesExpanded,
        nodesExplored,
        exploredOrder,
        algorithm: "A*",
        explanation: "A* uses an admissible straight-line distance heuristic, so it stays informed while preserving optimality for this cost model."
      };
    }

    for (const neighbor of graph[current.node] || []) {
      if (closed.has(neighbor.node)) continue;
      const edgeCost = alpha * neighbor.distance + beta * neighbor.risk;
      const gCost = current.gCost + edgeCost;
      if (bestCost[neighbor.node] !== undefined && gCost >= bestCost[neighbor.node]) continue;
      nodesExplored += 1;
      bestCost[neighbor.node] = gCost;
      openSet.push({
        node: neighbor.node,
        gCost,
        fCost: gCost + admissibleHeuristic(neighbor.node, goal, alpha, beta),
        path: [...current.path, neighbor.node]
      });
    }
  }

  return { path: [], cost: Infinity, nodesExpanded, nodesExplored, exploredOrder, algorithm: "A*", explanation: "No feasible path found." };
}
