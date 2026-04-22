import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { ucs } from "../algorithms/ucs";
import { greedyBestFirst } from "../algorithms/greedy";
import { aStar } from "../algorithms/astar";
import { buildScenarioGraph, calculateRouteCost, explainRouteDecision } from "./riskCalculator";

const algorithms = [
  { name: "BFS", fn: bfs },
  { name: "DFS", fn: dfs },
  { name: "UCS", fn: ucs },
  { name: "Greedy Best-First", fn: greedyBestFirst },
  { name: "A*", fn: aStar }
];

export const scenarioDefinitions = [
  { key: "baseline", label: "No active filter", useProfile: false, useIncidents: false },
  { key: "profileOnly", label: "Existing UI risk filters only", useProfile: true, useIncidents: false },
  { key: "incidentsOnly", label: "Hardcoded incidents active in cost model", useProfile: false, useIncidents: true },
  { key: "combined", label: "Existing UI filters + hardcoded incidents", useProfile: true, useIncidents: true }
];

export function runScenarioComparison(baseGraph, start, goal, alpha, beta, userProfile) {
  return scenarioDefinitions.map((scenario) => {
    const scenarioGraph = buildScenarioGraph(baseGraph, userProfile, scenario);

    const results = algorithms.map((algo) => {
      const startTime = performance.now();
      const raw = algo.fn(scenarioGraph, start, goal, alpha, beta);
      const endTime = performance.now();
      const pathFound = Boolean(raw.path && raw.path.length > 1);
      const routeData = pathFound ? calculateRouteCost(raw.path, scenarioGraph, alpha, beta) : {
        totalCost: Infinity,
        totalDistance: 0,
        totalRisk: 0,
        baseRisk: 0,
        incidentPenaltyTotal: 0,
        details: []
      };

      return {
        algorithm: raw.algorithm || algo.name,
        path: raw.path || [],
        pathFound,
        cost: pathFound ? routeData.totalCost : Infinity,
        nodesExpanded: raw.nodesExpanded || 0,
        nodesExplored: raw.nodesExplored || 0,
        time: endTime - startTime,
        routeData,
        rawExplanation: raw.explanation || "",
        exploredOrder: raw.exploredOrder || [],
        scenarioKey: scenario.key,
        scenarioLabel: scenario.label
      };
    });

    const explained = results.map((result) => ({
      ...result,
      explanation: explainRouteDecision(result, results, scenario.label)
    }));

    const ranked = [...explained].sort((a, b) => {
      if (!a.pathFound && !b.pathFound) return a.algorithm.localeCompare(b.algorithm);
      if (!a.pathFound) return 1;
      if (!b.pathFound) return -1;
      return a.cost - b.cost;
    });

    return {
      ...scenario,
      graph: scenarioGraph,
      results: ranked
    };
  });
}
