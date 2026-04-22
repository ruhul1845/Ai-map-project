export const coords = {
  "Ramna Park": { lat: 23.7337, lng: 90.4197, label: "Ramna Park", area: "Ramna" },
  "Suhrawardy Udyan": { lat: 23.7328, lng: 90.4130, label: "Suhrawardy Udyan", area: "Shahbag" },
  "Dhaka University": { lat: 23.7280, lng: 90.4025, label: "Dhaka University", area: "DU" },
  "Shishu Park": { lat: 23.7362, lng: 90.4098, label: "Shishu Park", area: "Shahbag" },
  "Shahbag Metro Station": { lat: 23.7388, lng: 90.3963, label: "Shahbag Metro Station", area: "Shahbag" },
  "Sandhani Eye Hospital": { lat: 23.7310, lng: 90.3855, label: "Sandhani Eye Hospital", area: "Medical" },
  Nilkhet: { lat: 23.7295, lng: 90.3905, label: "Nilkhet", area: "Nilkhet" },
  "Eden Mohila College": { lat: 23.7250, lng: 90.3888, label: "Eden Mohila College", area: "Eden" },
  "BUET Health Complex": { lat: 23.7228, lng: 90.3950, label: "BUET Health Complex", area: "BUET" },
  "Shahbag Intersection": { lat: 23.7388, lng: 90.3950, label: "Shahbag Intersection", area: "Shahbag" },
  Gulistan: { lat: 23.722775, lng: 90.414034, label: "Gulistan", area: "Gulistan" },
  "Dhaka Medical": { lat: 23.726939, lng: 90.397486, label: "Dhaka Medical", area: "Medical" },
  Lalbagh: { lat: 23.717390, lng: 90.387870, label: "Lalbagh", area: "Old Dhaka" },
  Polashi: { lat: 23.727080, lng: 90.389340, label: "Polashi", area: "Polashi" },
  TSC: { lat: 23.732050, lng: 90.395780, label: "TSC", area: "DU" },
  "VC Chattor": { lat: 23.732940, lng: 90.391020, label: "VC Chattor", area: "DU" },
  "Badrunnesa College": {
    lat: 23.723333,
    lng: 90.396111,
    label: "Badrunnesa College",
    area: "Bakshi Bazar"
  }
};

export function getNodePosition(nodeId) {
  return coords[nodeId] || null;
}

export function getAllNodes() {
  return Object.keys(coords);
}

export function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function pathDistanceFromGeometry(geometry = []) {
  if (!geometry || geometry.length < 2) return 0;

  let total = 0;
  for (let i = 0; i < geometry.length - 1; i += 1) {
    const [lat1, lng1] = geometry[i];
    const [lat2, lng2] = geometry[i + 1];
    total += haversineDistance(lat1, lng1, lat2, lng2);
  }
  return parseFloat(total.toFixed(3));
}
