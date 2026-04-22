import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Circle, Popup, Tooltip, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getNodePosition, getAllNodes } from "../data/coords";
import { riskZones, streetSegments, getPathGeometry } from "../data/graph";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png"
});

const algorithmColors = {
  BFS: "#ef476f",
  DFS: "#118ab2",
  UCS: "#06d6a0",
  "Greedy Best-First": "#f4a261",
  "A*": "#8338ec"
};

const algorithmOffsets = {
  BFS: -0.00018,
  DFS: -0.00009,
  UCS: 0,
  "Greedy Best-First": 0.00009,
  "A*": 0.00018
};

function createMarkerIcon(color, labelText = "") {
  return L.divIcon({
    html: `<div style="background:${color};color:white;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35);font-size:11px;font-weight:700;">${labelText}</div>`,
    iconSize: [26, 26],
    className: "map-node-icon"
  });
}

function createExploredIcon(color, labelText = "") {
  return L.divIcon({
    html: `<div style="background:${color};color:white;min-width:18px;height:18px;padding:0 4px;border-radius:999px;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.28);font-size:10px;font-weight:700;">${labelText}</div>`,
    iconSize: [22, 18],
    className: "map-explored-icon"
  });
}

function offsetGeometry(positions, algorithm) {
  const offset = algorithmOffsets[algorithm] || 0;
  if (!offset) return positions;

  return positions.map(([lat, lng], index) => {
    const wiggle = index % 2 === 0 ? offset : offset * 0.6;
    return [lat + wiggle, lng - wiggle * 0.55];
  });
}

function offsetNodePosition(nodeName, algorithm, stepIndex = 0) {
  const base = getNodePosition(nodeName);
  if (!base) return null;
  const offset = algorithmOffsets[algorithm] || 0;
  const ring = (stepIndex % 3) * 0.00003;
  const latOffset = offset + ring;
  const lngOffset = -offset * 0.55 + (stepIndex % 2 === 0 ? ring : -ring);
  return [base.lat + latOffset, base.lng + lngOffset];
}

export default function MapView({ paths = [], start, goal, graph }) {
  const allNodes = getAllNodes();
  const center = [23.7295, 90.3975];

  const renderedPaths = paths.filter((item) => item.pathFound).map((item) => {
    const basePositions = getPathGeometry(item.path, graph);
    return {
      ...item,
      positions: offsetGeometry(basePositions, item.algorithm),
      color: algorithmColors[item.algorithm] || "#1d3557"
    };
  });

  return (
    <div style={{ height: "760px", width: "100%", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 12, right: 12, zIndex: 1000, background: "rgba(255,255,255,0.95)", padding: "10px 12px", borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.15)", minWidth: 220 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Algorithm route colors</div>
        {Object.entries(algorithmColors).map(([name, color]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 13 }}>
            <span style={{ width: 18, height: 4, background: color, display: "inline-block", borderRadius: 99 }} />
            <span>{name}</span>
          </div>
        ))}
        <div style={{ fontSize: 12, color: "#495057", marginTop: 6 }}>Colored lines are chosen paths. Numbered dots are the exact expansion order for each algorithm.</div>
      </div>

      <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={19}
        />

        {streetSegments.map((segment) => (
          <Polyline key={segment.id} positions={segment.geometry} pathOptions={{ color: "#6c757d", weight: 4, opacity: 0.35 }}>
            <Popup>
              <div>
                <strong>{segment.roadName}</strong><br />
                {segment.from} ↔ {segment.to}<br />
                Distance: {segment.distance.toFixed(2)} km<br />
                Base risk: {segment.baseRisk}<br />
                Path types: {segment.pathTypes.join(", ")}
              </div>
            </Popup>
          </Polyline>
        ))}

        {Object.entries(riskZones).map(([zoneName, zoneData]) => (
          <Circle
            key={zoneName}
            center={[zoneData.lat, zoneData.lng]}
            radius={zoneData.radius}
            pathOptions={{ color: zoneData.color, fillColor: zoneData.color, fillOpacity: 0.12, weight: 2, dashArray: "6 4" }}
          >
            <Popup>
              <strong>{zoneName}</strong><br />
              Risk level: {zoneData.severityLevel}/10<br />
              Hazards: {zoneData.hazards.join(", ")}
            </Popup>
          </Circle>
        ))}

        {renderedPaths.map((pathData, index) => (
          <React.Fragment key={`${pathData.algorithm}-${index}`}>
            <Polyline
              positions={pathData.positions}
              pathOptions={{ color: pathData.color, weight: pathData.algorithm === "UCS" ? 8 : 6, opacity: 0.94 }}
            >
              <Tooltip sticky>{pathData.algorithm}</Tooltip>
              <Popup>
                <strong>{pathData.algorithm}</strong><br />
                Route: {pathData.path.join(" → ")}<br />
                Distance: {pathData.routeData.totalDistance.toFixed(2)} km<br />
                Weighted cost: {pathData.cost.toFixed(2)}
              </Popup>
            </Polyline>


          </React.Fragment>
        ))}

        {allNodes.map((node) => {
          const position = getNodePosition(node);
          const isStart = node === start;
          const isGoal = node === goal;
          const icon = createMarkerIcon(isStart ? "#2a9d8f" : isGoal ? "#e63946" : "#457b9d", isStart ? "S" : isGoal ? "G" : "•");

          return (
            <Marker key={node} position={[position.lat, position.lng]} icon={icon}>
              <Popup>
                <strong>{node}</strong><br />
                Area: {position.area}<br />
                Lat/Lng: {position.lat}, {position.lng}
              </Popup>
              <Tooltip direction="top" offset={[0, -8]} opacity={0.92} permanent={false}>{node}</Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
