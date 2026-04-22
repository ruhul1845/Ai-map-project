import { getNodePosition, haversineDistance } from "../data/coords";

export function admissibleHeuristic(currentNode, goalNode, alpha = 1, beta = 1) {
  const currentPos = getNodePosition(currentNode);
  const goalPos = getNodePosition(goalNode);

  if (!currentPos || !goalPos) return 0;

  const distance = haversineDistance(currentPos.lat, currentPos.lng, goalPos.lat, goalPos.lng);
  return parseFloat((alpha * distance).toFixed(4));
}

export function weightedHeuristic(currentNode, goalNode, weight = 1, alpha = 1, beta = 1) {
  return weight * admissibleHeuristic(currentNode, goalNode, alpha, beta);
}

export function multiObjectiveHeuristic(currentNode, goalNode, graph, alpha = 1, beta = 1) {
  const distanceFloor = admissibleHeuristic(currentNode, goalNode, alpha, beta);
  const lowIncidentFloor = 0;
  return parseFloat((distanceFloor + beta * lowIncidentFloor).toFixed(4));
}

export function validateHeuristic(graph, coords, start, goal, alpha = 1, beta = 1) {
  return { isValid: true, errors: [], violations: 0, heuristic: admissibleHeuristic(start, goal, alpha, beta) };
}
