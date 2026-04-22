import { admissibleHeuristic } from "../utils/heuristics";

export function greedyBestFirst(graph, start, goal, alpha = 1, beta = 1) {
  const frontier = [{ node: start, path: [start], pathCost: 0, hValue: admissibleHeuristic(start, goal, alpha, beta) }];
  const visited = new Set();
  const exploredOrder = [];
  let nodesExpanded = 0;
  let nodesExplored = 0;

  while (frontier.length) {
    frontier.sort((a, b) => a.hValue - b.hValue);
    const current = frontier.shift();
    if (visited.has(current.node)) continue;

    visited.add(current.node);
    nodesExpanded += 1;
    exploredOrder.push(current.node);

    if (current.node === goal) {
      return {
        path: current.path,
        cost: current.pathCost,
        nodesExpanded,
        nodesExplored,
        exploredOrder,
        algorithm: "Greedy Best-First",
        explanation: "Greedy Best-First uses only the heuristic estimate, so it is usually fast but not guaranteed optimal."
      };
    }

    for (const neighbor of graph[current.node] || []) {
      if (visited.has(neighbor.node)) continue;
      nodesExplored += 1;
      const edgeCost = alpha * neighbor.distance + beta * neighbor.risk;
      frontier.push({
        node: neighbor.node,
        path: [...current.path, neighbor.node],
        pathCost: current.pathCost + edgeCost,
        hValue: admissibleHeuristic(neighbor.node, goal, alpha, beta)
      });
    }
  }

  return { path: [], cost: Infinity, nodesExpanded, nodesExplored, exploredOrder, algorithm: "Greedy Best-First", explanation: "No feasible path found." };
}
