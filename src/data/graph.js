import { coords, pathDistanceFromGeometry } from "./coords";

const nodePoint = (name) => [coords[name].lat, coords[name].lng];

function segment(id, from, to, roadName, category, baseRisk, geometry, pathTypes = []) {
  return {
    id,
    from,
    to,
    roadName,
    category,
    baseRisk,
    geometry,
    pathTypes,
    distance: pathDistanceFromGeometry(geometry)
  };
}

export const streetSegments = [
  segment("ramna-suhrawardy", "Ramna Park", "Suhrawardy Udyan", "Kazi Nazrul Islam Avenue edge road", "park-road", 1.9, [nodePoint("Ramna Park"), [23.7334, 90.4178], [23.7330, 90.4155], nodePoint("Suhrawardy Udyan")], ["park_open"]),
  segment("ramna-shishu", "Ramna Park", "Shishu Park", "Ramna Park inner road", "park-road", 2.0, [nodePoint("Ramna Park"), [23.7345, 90.4174], [23.7354, 90.4138], nodePoint("Shishu Park")], ["park_open"]),
  segment("ramna-gulistan", "Ramna Park", "Gulistan", "Topkhana Road", "arterial", 3.8, [nodePoint("Ramna Park"), [23.7318, 90.4194], [23.7288, 90.4176], [23.7255, 90.4156], nodePoint("Gulistan")], ["main_road", "market"]),
  segment("suhrawardy-du", "Suhrawardy Udyan", "Dhaka University", "Suhrawardy internal road to DU", "campus-road", 1.7, [nodePoint("Suhrawardy Udyan"), [23.7320, 90.4109], [23.7308, 90.4078], nodePoint("Dhaka University")], ["campus"]),
  segment("suhrawardy-tsc", "Suhrawardy Udyan", "TSC", "Doel Chattar to TSC approach", "campus-road", 1.8, [nodePoint("Suhrawardy Udyan"), [23.7324, 90.4092], [23.7324, 90.4025], [23.7321, 90.3982], nodePoint("TSC")], ["campus"]),
  segment("shishu-metro", "Shishu Park", "Shahbag Metro Station", "Shishu Park road via Shahbag", "arterial", 3.4, [nodePoint("Shishu Park"), [23.7368, 90.4072], [23.7376, 90.4022], nodePoint("Shahbag Metro Station")], ["main_road"]),
  segment("metro-intersection", "Shahbag Metro Station", "Shahbag Intersection", "Shahbag crossing", "intersection", 4.2, [nodePoint("Shahbag Metro Station"), [23.7388, 90.3957], nodePoint("Shahbag Intersection")], ["high_traffic_crossing"]),
  segment("metro-tsc", "Shahbag Metro Station", "TSC", "TSC-Shahbag corridor", "arterial", 2.8, [nodePoint("Shahbag Metro Station"), [23.7370, 90.3960], [23.7347, 90.3959], nodePoint("TSC")], ["campus", "unsafe_corridor"]),
  segment("du-tsc", "Dhaka University", "TSC", "DU central road", "campus-road", 1.9, [nodePoint("Dhaka University"), [23.7293, 90.4003], [23.7307, 90.3980], nodePoint("TSC")], ["campus"]),
  segment("du-nilkhet", "Dhaka University", "Nilkhet", "Nilkhet Road", "market-road", 3.4, [nodePoint("Dhaka University"), [23.7284, 90.3992], [23.7289, 90.3952], nodePoint("Nilkhet")], ["market", "high_traffic_crossing"]),
  segment("nilkhet-polashi", "Nilkhet", "Polashi", "Nilkhet-Polashi link", "market-road", 3.0, [nodePoint("Nilkhet"), [23.7288, 90.3901], nodePoint("Polashi")], ["market", "high_traffic_crossing"]),
  segment("polashi-vc", "Polashi", "VC Chattor", "Polashi to VC Chattor road", "campus-road", 2.2, [nodePoint("Polashi"), [23.7288, 90.3904], [23.7308, 90.3909], nodePoint("VC Chattor")], ["campus"]),
  segment("vc-tsc", "VC Chattor", "TSC", "VC Chattor connector", "campus-road", 2.0, [nodePoint("VC Chattor"), [23.7328, 90.3928], [23.7325, 90.3946], nodePoint("TSC")], ["campus"]),
  segment("tsc-medical", "TSC", "Dhaka Medical", "TSC to Dhaka Medical approach", "hospital-road", 2.7, [nodePoint("TSC"), [23.7310, 90.3961], [23.7290, 90.3968], nodePoint("Dhaka Medical")], ["campus", "hospital_institution"]),
  segment("intersection-medical", "Shahbag Intersection", "Dhaka Medical", "Shahbag medical corridor", "hospital-road", 3.6, [nodePoint("Shahbag Intersection"), [23.7368, 90.3951], [23.7332, 90.3960], [23.7295, 90.3971], nodePoint("Dhaka Medical")], ["high_traffic_crossing", "hospital_institution"]),
  segment("medical-badrunnesa", "Dhaka Medical", "Badrunnesa College", "Dhaka Medical-Bakshi Bazar road", "institutional-road", 2.6, [nodePoint("Dhaka Medical"), [23.7257, 90.3968], [23.7243, 90.3965], nodePoint("Badrunnesa College")], ["hospital_institution", "institution"]),
  segment("badrunnesa-buet", "Badrunnesa College", "BUET Health Complex", "Bakshi Bazar-BUET road", "institutional-road", 2.5, [nodePoint("Badrunnesa College"), [23.7230, 90.3958], nodePoint("BUET Health Complex")], ["institution", "high_traffic_crossing"]),
  segment("polashi-buet", "Polashi", "BUET Health Complex", "Palashi-BUET road", "campus-road", 2.7, [nodePoint("Polashi"), [23.7260, 90.3910], [23.7240, 90.3935], nodePoint("BUET Health Complex")], ["campus"]),
  segment("polashi-sandhani", "Polashi", "Sandhani Eye Hospital", "Medical campus lane", "hospital-road", 2.4, [nodePoint("Polashi"), [23.7282, 90.3882], [23.7296, 90.3865], nodePoint("Sandhani Eye Hospital")], ["hospital_institution"]),
  segment("nilkhet-eden", "Nilkhet", "Eden Mohila College", "Nilkhet-Eden road", "market-road", 2.9, [nodePoint("Nilkhet"), [23.7283, 90.3898], [23.7267, 90.3891], nodePoint("Eden Mohila College")], ["market", "high_traffic_crossing", "institution"]),
  segment("eden-lalbagh", "Eden Mohila College", "Lalbagh", "Eden-Lalbagh road", "old-city-road", 3.1, [nodePoint("Eden Mohila College"), [23.7232, 90.3885], [23.7202, 90.3880], nodePoint("Lalbagh")], ["institution", "narrow_lane"]),
  segment("lalbagh-gulistan", "Lalbagh", "Gulistan", "Old Dhaka connector", "old-city-road", 4.0, [nodePoint("Lalbagh"), [23.7186, 90.3917], [23.7199, 90.3982], [23.7217, 90.4062], nodePoint("Gulistan")], ["narrow_lane", "residential"]),
  segment("gulistan-badrunnesa", "Gulistan", "Badrunnesa College", "Gulistan to Bakshi Bazar arterial", "arterial", 4.3, [nodePoint("Gulistan"), [23.7229, 90.4112], [23.7231, 90.4045], [23.7232, 90.3990], nodePoint("Badrunnesa College")], ["market", "transit_hub", "unsafe_corridor"]),
  segment("gulistan-medical", "Gulistan", "Dhaka Medical", "Gulistan medical route", "arterial", 4.1, [nodePoint("Gulistan"), [23.7237, 90.4108], [23.7248, 90.4050], [23.7260, 90.4008], nodePoint("Dhaka Medical")], ["market", "transit_hub", "unsafe_corridor"]),
  segment("metro-nilkhet", "Shahbag Metro Station", "Nilkhet", "Shahbag-Nilkhet main road", "arterial", 3.8, [nodePoint("Shahbag Metro Station"), [23.7370, 90.3952], [23.7342, 90.3937], [23.7318, 90.3919], nodePoint("Nilkhet")], ["main_road", "market", "high_traffic_crossing"]),
  segment("intersection-vc", "Shahbag Intersection", "VC Chattor", "Shahbag to VC Chattor road", "arterial", 3.5, [nodePoint("Shahbag Intersection"), [23.7370, 90.3940], [23.7350, 90.3924], nodePoint("VC Chattor")], ["high_traffic_crossing", "campus"]),
  segment("sandhani-lalbagh", "Sandhani Eye Hospital", "Lalbagh", "Hospital to Lalbagh road", "old-city-road", 3.3, [nodePoint("Sandhani Eye Hospital"), [23.7285, 90.3855], [23.7244, 90.3867], [23.7208, 90.3875], nodePoint("Lalbagh")], ["hospital_institution", "narrow_lane"])
];

export const backendIncidentRules = {
  nodeZones: {
    Gulistan: {
      types: ["murder risk", "traffic risk"],
      penalty: 6,
      affectsNodes: ["Gulistan"],
      affectsEdges: ["gulistan-badrunnesa", "gulistan-medical", "lalbagh-gulistan", "ramna-gulistan"]
    },
    Ramna: {
      types: ["murder risk", "traffic risk"],
      penalty: 6,
      affectsNodes: ["Ramna Park"],
      affectsEdges: ["ramna-suhrawardy", "ramna-shishu", "ramna-gulistan"]
    },
    TSC: {
      types: ["murder risk"],
      penalty: 8,
      affectsNodes: ["TSC"],
      affectsEdges: ["suhrawardy-tsc", "metro-tsc", "du-tsc", "vc-tsc", "tsc-medical"]
    },
    Shahbag: {
      types: ["murder risk"],
      penalty: 10,
      affectsNodes: ["Shahbag Metro Station", "Shahbag Intersection"],
      affectsEdges: ["shishu-metro", "metro-intersection", "metro-tsc", "intersection-medical", "metro-nilkhet", "intersection-vc"]
    },
    Eden: {
      types: ["accident risk"],
      penalty: 3,
      affectsNodes: ["Eden Mohila College"],
      affectsEdges: ["nilkhet-eden", "eden-lalbagh"]
    },
    Nilkhet: {
      types: ["accident risk"],
      penalty: 2,
      affectsNodes: ["Nilkhet"],
      affectsEdges: ["du-nilkhet", "nilkhet-polashi", "nilkhet-eden", "metro-nilkhet"]
    }
  },
  corridors: {
    "TSC-Shahbag corridor": {
      types: ["theft risk"],
      penalty: 5,
      affectsEdges: ["metro-tsc"]
    }
  }
};

export function getBackendIncidentPenalty(segmentId, from, to) {
  let penalty = 0;
  const reasons = [];

  Object.entries(backendIncidentRules.nodeZones).forEach(([zoneName, rule]) => {
    if (rule.affectsEdges.includes(segmentId) || rule.affectsNodes.includes(from) || rule.affectsNodes.includes(to)) {
      penalty += rule.penalty;
      reasons.push(`${zoneName}: ${rule.types.join(", ")}`);
    }
  });

  Object.entries(backendIncidentRules.corridors).forEach(([name, rule]) => {
    if (rule.affectsEdges.includes(segmentId)) {
      penalty += rule.penalty;
      reasons.push(`${name}: ${rule.types.join(", ")}`);
    }
  });

  return {
    penalty: parseFloat(penalty.toFixed(3)),
    reasons
  };
}

export function buildGraphFromSegments(segments = streetSegments) {
  const adjacency = {};

  segments.forEach((current) => {
    const incidentMeta = getBackendIncidentPenalty(current.id, current.from, current.to);

    const forward = {
      node: current.to,
      distance: current.distance,
      risk: current.baseRisk,
      baseRisk: current.baseRisk,
      roadName: current.roadName,
      category: current.category,
      geometry: current.geometry,
      pathTypes: current.pathTypes,
      segmentId: current.id,
      backendIncidentPenalty: incidentMeta.penalty,
      backendIncidentReasons: incidentMeta.reasons,
      travelTime: parseFloat((current.distance * (current.category === "arterial" ? 3.2 : 2.5)).toFixed(3))
    };

    const backward = {
      ...forward,
      node: current.from,
      geometry: [...current.geometry].reverse()
    };

    adjacency[current.from] = [...(adjacency[current.from] || []), forward];
    adjacency[current.to] = [...(adjacency[current.to] || []), backward];
  });

  return adjacency;
}

export const graph = buildGraphFromSegments();

export function getEdgeDetails(from, to, adjacency = graph) {
  return (adjacency[from] || []).find((edge) => edge.node === to) || null;
}

export function getPathGeometry(path = [], adjacency = graph) {
  if (!path || path.length < 2) return [];
  const routePoints = [];

  for (let i = 0; i < path.length - 1; i += 1) {
    const edge = getEdgeDetails(path[i], path[i + 1], adjacency);
    if (!edge) continue;
    if (routePoints.length === 0) routePoints.push(...edge.geometry);
    else routePoints.push(...edge.geometry.slice(1));
  }

  return routePoints;
}

export const riskZones = {
  Ramna: {
    lat: coords["Ramna Park"].lat,
    lng: coords["Ramna Park"].lng,
    radius: 190,
    severityLevel: 8,
    hazards: ["Murder risk", "Traffic pressure"],
    color: "#d62828"
  },
  Gulistan: {
    lat: coords.Gulistan.lat,
    lng: coords.Gulistan.lng,
    radius: 180,
    severityLevel: 9,
    hazards: ["Murder risk", "Heavy traffic"],
    color: "#9d0208"
  },
  Nilkhet: {
    lat: coords.Nilkhet.lat,
    lng: coords.Nilkhet.lng,
    radius: 140,
    severityLevel: 7,
    hazards: ["Accident risk", "Market congestion"],
    color: "#f77f00"
  },
  Eden: {
    lat: coords["Eden Mohila College"].lat,
    lng: coords["Eden Mohila College"].lng,
    radius: 120,
    severityLevel: 6,
    hazards: ["Accident risk"],
    color: "#fcbf49"
  },
  TSC: {
    lat: coords.TSC.lat,
    lng: coords.TSC.lng,
    radius: 110,
    severityLevel: 7,
    hazards: ["Murder risk"],
    color: "#c1121f"
  },
  Shahbag: {
    lat: coords["Shahbag Intersection"].lat,
    lng: coords["Shahbag Intersection"].lng,
    radius: 150,
    severityLevel: 8,
    hazards: ["Murder risk"],
    color: "#d62828"
  },
  "TSC-Shahbag corridor": {
    lat: 23.7354,
    lng: 90.3959,
    radius: 120,
    severityLevel: 6,
    hazards: ["Theft risk"],
    color: "#6a4c93"
  }
};
