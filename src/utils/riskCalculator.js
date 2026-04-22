export const riskFactors = {
  gender: { male: 1.0, female: 1.12 },
  company: { group: 1.0, alone: 1.12 },
  time: { day: 1.0, evening: 1.1, night: 1.24 },
  conditions: { normal: 1.0, elderly: 1.1, injured: 1.18 },
  travelMode: { foot: 1.0, rickshaw: 1.04, cycle: 1.08, motorbike: 1.12 }
};

export const pathTypeProfileMultipliers = {
  gender: {
    male: {
      residential: 1.0,
      campus: 1.0,
      main_road: 1.0,
      market: 1.03,
      narrow_lane: 1.06,
      park_open: 1.05,
      transit_hub: 1.07,
      high_traffic_crossing: 1.03,
      unsafe_corridor: 1.1,
      hospital_institution: 1.02,
      institution: 1.02
    },
    female: {
      residential: 1.02,
      campus: 1.01,
      main_road: 1.05,
      market: 1.14,
      narrow_lane: 1.22,
      park_open: 1.18,
      transit_hub: 1.17,
      high_traffic_crossing: 1.08,
      unsafe_corridor: 1.28,
      hospital_institution: 1.06,
      institution: 1.09
    }
  },
  company: {
    group: {
      residential: 1.0,
      campus: 0.98,
      main_road: 1.0,
      market: 1.0,
      narrow_lane: 1.04,
      park_open: 1.0,
      transit_hub: 1.02,
      high_traffic_crossing: 1.03,
      unsafe_corridor: 1.06,
      hospital_institution: 0.99,
      institution: 1.0
    },
    alone: {
      residential: 1.02,
      campus: 1.02,
      main_road: 1.05,
      market: 1.12,
      narrow_lane: 1.2,
      park_open: 1.18,
      transit_hub: 1.15,
      high_traffic_crossing: 1.08,
      unsafe_corridor: 1.24,
      hospital_institution: 1.05,
      institution: 1.08
    }
  },
  time: {
    day: {
      residential: 1.0,
      campus: 0.98,
      main_road: 1.0,
      market: 1.03,
      narrow_lane: 1.04,
      park_open: 1.02,
      transit_hub: 1.05,
      high_traffic_crossing: 1.08,
      unsafe_corridor: 1.1,
      hospital_institution: 1.0,
      institution: 1.0
    },
    evening: {
      residential: 1.05,
      campus: 1.04,
      main_road: 1.08,
      market: 1.12,
      narrow_lane: 1.15,
      park_open: 1.16,
      transit_hub: 1.14,
      high_traffic_crossing: 1.18,
      unsafe_corridor: 1.22,
      hospital_institution: 1.08,
      institution: 1.1
    },
    night: {
      residential: 1.1,
      campus: 1.12,
      main_road: 1.16,
      market: 1.22,
      narrow_lane: 1.3,
      park_open: 1.34,
      transit_hub: 1.24,
      high_traffic_crossing: 1.26,
      unsafe_corridor: 1.38,
      hospital_institution: 1.12,
      institution: 1.14
    }
  },
  condition: {
    normal: {
      residential: 1.0,
      campus: 1.0,
      main_road: 1.0,
      market: 1.0,
      narrow_lane: 1.0,
      park_open: 1.0,
      transit_hub: 1.0,
      high_traffic_crossing: 1.0,
      unsafe_corridor: 1.0,
      hospital_institution: 1.0,
      institution: 1.0
    },
    elderly: {
      residential: 1.03,
      campus: 1.02,
      main_road: 1.1,
      market: 1.12,
      narrow_lane: 1.14,
      park_open: 1.1,
      transit_hub: 1.16,
      high_traffic_crossing: 1.28,
      unsafe_corridor: 1.2,
      hospital_institution: 1.1,
      institution: 1.12
    },
    injured: {
      residential: 1.06,
      campus: 1.05,
      main_road: 1.16,
      market: 1.18,
      narrow_lane: 1.22,
      park_open: 1.14,
      transit_hub: 1.2,
      high_traffic_crossing: 1.34,
      unsafe_corridor: 1.26,
      hospital_institution: 1.15,
      institution: 1.18
    }
  },
  travelMode: {
    foot: {
      residential: 1.0,
      campus: 0.95,
      main_road: 1.08,
      market: 1.06,
      narrow_lane: 1.04,
      park_open: 1.1,
      transit_hub: 1.12,
      high_traffic_crossing: 1.18,
      unsafe_corridor: 1.2,
      hospital_institution: 1.02,
      institution: 1.03
    },
    rickshaw: {
      residential: 1.02,
      campus: 1.0,
      main_road: 1.0,
      market: 1.08,
      narrow_lane: 1.02,
      park_open: 1.08,
      transit_hub: 1.14,
      high_traffic_crossing: 1.12,
      unsafe_corridor: 1.18,
      hospital_institution: 1.0,
      institution: 1.01
    },
    cycle: {
      residential: 0.98,
      campus: 0.94,
      main_road: 1.1,
      market: 1.12,
      narrow_lane: 1.08,
      park_open: 1.06,
      transit_hub: 1.16,
      high_traffic_crossing: 1.24,
      unsafe_corridor: 1.22,
      hospital_institution: 1.03,
      institution: 1.05
    },
    motorbike: {
      residential: 1.02,
      campus: 1.08,
      main_road: 0.96,
      market: 1.18,
      narrow_lane: 1.22,
      park_open: 1.1,
      transit_hub: 1.2,
      high_traffic_crossing: 1.16,
      unsafe_corridor: 1.25,
      hospital_institution: 1.08,
      institution: 1.1
    }
  }
};

export function calculateRiskMultiplier(userProfile = {}) {
  const { gender = "male", company = "group", time = "day", condition = "normal", travelMode = "foot" } = userProfile;
  return (
    (riskFactors.gender[gender] || 1) *
    (riskFactors.company[company] || 1) *
    (riskFactors.time[time] || 1) *
    (riskFactors.conditions[condition] || 1) *
    (riskFactors.travelMode[travelMode] || 1)
  );
}

function getPathTypes(edge = {}) {
  const tags = edge.pathTypes || edge.pathType || [];
  return Array.isArray(tags) ? (tags.length ? tags : ["residential"]) : [tags || "residential"];
}

export function calculatePathTypeMultiplier(edge = {}, userProfile = {}) {
  const { gender = "male", company = "group", time = "day", condition = "normal", travelMode = "foot" } = userProfile;
  const types = getPathTypes(edge);

  return types.reduce((acc, type) => {
    const multiplier =
      (pathTypeProfileMultipliers.gender[gender]?.[type] || 1) *
      (pathTypeProfileMultipliers.company[company]?.[type] || 1) *
      (pathTypeProfileMultipliers.time[time]?.[type] || 1) *
      (pathTypeProfileMultipliers.condition[condition]?.[type] || 1) *
      (pathTypeProfileMultipliers.travelMode[travelMode]?.[type] || 1);
    return acc * multiplier;
  }, 1);
}

export function buildScenarioGraph(baseGraph, userProfile = {}, scenario = { useProfile: true, useIncidents: true }) {
  return Object.fromEntries(
    Object.entries(baseGraph).map(([node, edges]) => [
      node,
      edges.map((edge) => {
        const profileMultiplier = scenario.useProfile ? calculatePathTypeMultiplier(edge, userProfile) : 1;
        const incidentPenalty = scenario.useIncidents ? edge.backendIncidentPenalty || 0 : 0;
        const baseRisk = edge.baseRisk ?? edge.risk;
        const effectiveRisk = parseFloat((baseRisk * profileMultiplier + incidentPenalty).toFixed(3));
        return {
          ...edge,
          risk: effectiveRisk,
          adjustedRisk: effectiveRisk,
          baseRisk,
          appliedRiskMultiplier: profileMultiplier,
          appliedIncidentPenalty: incidentPenalty
        };
      })
    ])
  );
}

export function calculateRouteCost(path, graph, alpha = 0.5, beta = 0.5) {
  if (!path || path.length < 2) {
    return { totalCost: Infinity, totalDistance: 0, totalRisk: 0, baseRisk: 0, incidentPenaltyTotal: 0, details: [] };
  }

  let totalDistance = 0;
  let totalRisk = 0;
  let totalBaseRisk = 0;
  let incidentPenaltyTotal = 0;
  const details = [];

  for (let i = 0; i < path.length - 1; i += 1) {
    const fromNode = path[i];
    const toNode = path[i + 1];
    const edge = (graph[fromNode] || []).find((item) => item.node === toNode);
    if (!edge) continue;

    const adjustedRisk = edge.adjustedRisk ?? edge.risk;
    const baseRisk = edge.baseRisk ?? edge.risk;
    const incidentPenalty = edge.appliedIncidentPenalty ?? edge.backendIncidentPenalty ?? 0;
    const edgeCost = alpha * edge.distance + beta * adjustedRisk;

    totalDistance += edge.distance;
    totalBaseRisk += baseRisk;
    totalRisk += adjustedRisk;
    incidentPenaltyTotal += incidentPenalty;

    details.push({
      from: fromNode,
      to: toNode,
      roadName: edge.roadName,
      distance: edge.distance,
      baseRisk,
      adjustedRisk,
      incidentPenalty,
      pathTypes: getPathTypes(edge),
      backendIncidentReasons: edge.backendIncidentReasons || [],
      edgeCost: parseFloat(edgeCost.toFixed(3))
    });
  }

  return {
    totalCost: parseFloat((alpha * totalDistance + beta * totalRisk).toFixed(3)),
    totalDistance: parseFloat(totalDistance.toFixed(3)),
    totalRisk: parseFloat(totalRisk.toFixed(3)),
    baseRisk: parseFloat(totalBaseRisk.toFixed(3)),
    incidentPenaltyTotal: parseFloat(incidentPenaltyTotal.toFixed(3)),
    details
  };
}

export function explainRouteDecision(currentResult, allResults = [], scenarioLabel = "") {
  if (!currentResult.pathFound) {
    return `No path found for ${currentResult.algorithm} under ${scenarioLabel}. The graph became unreachable under this search order or weighted frontier.`;
  }

  const reasons = [];
  const usedPathTypes = [...new Set(currentResult.routeData.details.flatMap((detail) => detail.pathTypes || []))];
  if (usedPathTypes.length) reasons.push(`uses ${usedPathTypes.join(", ")} road types`);
  if (currentResult.routeData.incidentPenaltyTotal > 0) {
    reasons.push(`passes through backend incident zones/corridors with ${currentResult.routeData.incidentPenaltyTotal.toFixed(2)} added penalty`);
  }
  if (currentResult.routeData.totalDistance > 1.6) {
    reasons.push(`uses a longer geometric route of ${currentResult.routeData.totalDistance.toFixed(2)} km`);
  }
  if (currentResult.routeData.totalRisk > currentResult.routeData.baseRisk + 0.5) {
    reasons.push(`profile-specific path multipliers increased the safety cost`);
  }

  const better = allResults.find((item) => item.pathFound && item.algorithm !== currentResult.algorithm && item.cost < currentResult.cost);
  if (better) {
    reasons.push(`${better.algorithm} found a lower weighted score`);
  }

  if (reasons.length === 0) {
    reasons.push("selected because it balances route length and risk better than the alternatives");
  }

  return reasons.join("; ") + ".";
}

export function suggestWeights(userProfile = {}) {
  const multiplier = calculateRiskMultiplier(userProfile);
  if (multiplier >= 2.2) return { alpha: 0.35, beta: 0.65 };
  if (multiplier >= 1.6) return { alpha: 0.45, beta: 0.55 };
  return { alpha: 0.55, beta: 0.45 };
}
