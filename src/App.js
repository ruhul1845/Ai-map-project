import React, { useEffect, useMemo, useState } from "react";
import MapView from "./components/MapView";
import ChartView from "./components/ChartView";
import { graph } from "./data/graph";
import { getAllNodes } from "./data/coords";
import { runScenarioComparison } from "./utils/algorithmComparator";
import { suggestWeights } from "./utils/riskCalculator";

function App() {
  const nodes = useMemo(() => getAllNodes(), []);
  const [start, setStart] = useState("Ramna Park");
  const [goal, setGoal] = useState("BUET Health Complex");
  const [alpha, setAlpha] = useState(0.45);
  const [beta, setBeta] = useState(0.55);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [scenarioRuns, setScenarioRuns] = useState([]);
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("combined");

  const [userProfile, setUserProfile] = useState({
    gender: "female",
    company: "alone",
    time: "night",
    condition: "normal",
    travelMode: "foot"
  });

  useEffect(() => {
    const suggested = suggestWeights(userProfile);
    setAlpha(suggested.alpha);
    setBeta(suggested.beta);
  }, [userProfile]);

  const runAllAlgorithms = () => {
    if (start === goal) {
      setScenarioRuns([]);
      return;
    }
    const runs = runScenarioComparison(graph, start, goal, alpha, beta, userProfile);
    setScenarioRuns(runs);
    setSelectedScenarioKey("combined");
  };

  const selectedScenario = scenarioRuns.find((scenario) => scenario.key === selectedScenarioKey) || null;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Dhaka Safe Route Finder</h1>
        <p>
          Updated map with the requested Dhaka nodes, corrected explored-node metric, hardcoded backend incident penalties, and side-by-side algorithm comparison across all required scenarios.
        </p>
      </header>

      <div style={styles.controlPanel}>
        <div style={styles.section}>
          <h3>Route nodes used in the map</h3>
          <div style={styles.rowControl}>
            <div style={styles.formGroup}>
              <label>Start node</label>
              <select value={start} onChange={(e) => setStart(e.target.value)} style={styles.select}>
                {nodes.map((node) => <option key={node} value={node}>{node}</option>)}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label>Goal node</label>
              <select value={goal} onChange={(e) => setGoal(e.target.value)} style={styles.select}>
                {nodes.map((node) => <option key={node} value={node}>{node}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h3>Risk profile</h3>
          <div style={styles.profileGrid}>
            <ProfileSelect label="Gender" value={userProfile.gender} onChange={(value) => setUserProfile({ ...userProfile, gender: value })} options={[["male", "Male"], ["female", "Female"]]} />
            <ProfileSelect label="Traveling" value={userProfile.company} onChange={(value) => setUserProfile({ ...userProfile, company: value })} options={[["group", "With group"], ["alone", "Alone"]]} />
            <ProfileSelect label="Time" value={userProfile.time} onChange={(value) => setUserProfile({ ...userProfile, time: value })} options={[["day", "Day"], ["evening", "Evening"], ["night", "Night"]]} />
            <ProfileSelect label="Condition" value={userProfile.condition} onChange={(value) => setUserProfile({ ...userProfile, condition: value })} options={[["normal", "Normal"], ["elderly", "Elderly"], ["injured", "Injured"]]} />
            <ProfileSelect label="Travel mode" value={userProfile.travelMode} onChange={(value) => setUserProfile({ ...userProfile, travelMode: value })} options={[["foot", "Foot"], ["rickshaw", "Rickshaw"], ["cycle", "Cycle"], ["motorbike", "Motorbike"]]} />
          </div>
        </div>

        <div style={styles.section}>
          <h3>Distance and safety weights</h3>
          <div style={styles.formGroup}>
            <label>Distance weight (α): {alpha.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.05" value={alpha} onChange={(e) => setAlpha(parseFloat(e.target.value))} style={styles.slider} />
          </div>
          <div style={styles.formGroup}>
            <label>Safety weight (β): {beta.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.05" value={beta} onChange={(e) => setBeta(parseFloat(e.target.value))} style={styles.slider} />
          </div>
        </div>

        <button onClick={runAllAlgorithms} style={styles.runButton}>Run all algorithms across all scenarios</button>
      </div>

      <div style={styles.mapSection}>
        <h2>Map with street edges and algorithm routes</h2>
        <p style={styles.helperText}>
          Gray lines are mapped street edges. Colored overlays show every algorithm path, and numbered dots show the exact node expansion order so the map count matches the result cards.
        </p>
        {scenarioRuns.length > 0 && (
          <div style={styles.tabs}>
            {scenarioRuns.map((scenario) => (
              <button key={scenario.key} style={{ ...styles.tab, ...(selectedScenarioKey === scenario.key ? styles.tabActive : {}) }} onClick={() => setSelectedScenarioKey(scenario.key)}>
                {scenario.label}
              </button>
            ))}
          </div>
        )}
        <MapView
          paths={selectedScenario ? selectedScenario.results : []}
          start={start}
          goal={goal}
          graph={selectedScenario ? selectedScenario.graph : graph}
        />
      </div>
      <button onClick={() => setShowAnalytics((prev) => !prev)} style={styles.analyticsButton}>{showAnalytics ? "Hide analytics" : "Show analytics for selected scenario"}</button>


      {scenarioRuns.length > 0 && (
        <div style={styles.resultsSection}>
          <h2>Scenario comparison matrix</h2>
          {scenarioRuns.map((scenario) => (
            <div key={scenario.key} style={styles.scenarioBlock}>
              <div style={styles.scenarioHeader}>
                <h3 style={{ margin: 0 }}>{scenario.label}</h3>
                <span style={styles.scenarioTag}>{scenario.results.filter((item) => item.pathFound).length}/5 path results</span>
              </div>

              <div style={styles.resultsGrid}>
                {scenario.results.map((result, index) => (
                  <div key={`${scenario.key}-${result.algorithm}`} style={styles.resultCard}>
                    <div style={styles.resultTitleRow}>
                      <h4 style={{ margin: 0 }}>{result.algorithm} {index === 0 && result.pathFound ? "🏆" : ""}</h4>
                      <span style={styles.rankBadge}>{result.pathFound ? `#${index + 1}` : "N/A"}</span>
                    </div>
                    <Metric label="Path found" value={result.pathFound ? "Yes" : "No"} />
                    <Metric label="Weighted cost" value={result.pathFound ? result.cost.toFixed(2) : "No path"} />
                    <Metric label="Distance" value={`${result.routeData.totalDistance.toFixed(2)} km`} />
                    <Metric label="Risk-adjusted score" value={result.routeData.totalRisk.toFixed(2)} />
                    <Metric
                      label="Total Explored nodes"
                      value={result.pathFound ? result.path.length : 0}
                    />


                    <Metric label="Route" value={result.pathFound ? result.path.join(" → ") : "Not applicable"} stacked />
                    <Metric label="Expansion order" value={result.exploredOrder.length ? result.exploredOrder.join(" → ") : "No expansions"} stacked />
                    <div style={styles.roadBlock}><strong>Roads used</strong><div>{result.routeData.details.length ? result.routeData.details.map((d) => d.roadName).join(" • ") : "No route"}</div></div>
                    <div style={styles.reasonBox}><strong>Reason selected / rejected</strong><div>{result.explanation}</div></div>
                  </div>
                ))}
              </div>
              {showAnalytics && selectedScenarioKey === scenario.key && <ChartView data={scenario.results} />}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

function ProfileSelect({ label, value, onChange, options }) {
  return (
    <div style={styles.formGroup}>
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={styles.select}>
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </div>
  );
}

function Metric({ label, value, stacked = false }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontWeight: 600, color: "#495057", marginBottom: 3 }}>{label}</div>
      <div style={{ color: "#212529", lineHeight: 1.45, wordBreak: stacked ? "break-word" : "normal" }}>{value}</div>
    </div>
  );
}

const styles = {
  container: { fontFamily: "Arial, sans-serif", background: "#f4f7fb", minHeight: "100vh", color: "#1d3557" },
  header: { background: "linear-gradient(135deg, #1d3557, #457b9d)", color: "white", padding: "24px 28px" },
  controlPanel: { display: "grid", gap: 16, padding: 20 },
  section: { background: "white", borderRadius: 12, padding: 18, boxShadow: "0 10px 24px rgba(0,0,0,0.06)" },
  rowControl: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 },
  profileGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 },
  formGroup: { display: "flex", flexDirection: "column", gap: 6 },
  select: { padding: 10, borderRadius: 8, border: "1px solid #ced4da" },
  slider: { width: "100%" },
  runButton: { margin: "0 20px 20px", padding: "14px 18px", borderRadius: 10, border: 0, background: "#1d3557", color: "white", fontSize: 16, cursor: "pointer" },
  mapSection: { padding: 20 },
  helperText: { marginTop: 0, color: "#5c677d" },
  tabs: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  tab: { padding: "10px 12px", borderRadius: 999, border: "1px solid #cbd5e1", background: "white", cursor: "pointer" },
  tabActive: { background: "#1d3557", color: "white", borderColor: "#1d3557" },
  resultsSection: { padding: 20 },
  scenarioBlock: { marginBottom: 26, background: "#edf2f7", borderRadius: 14, padding: 16 },
  scenarioHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 12 },
  scenarioTag: { background: "#dbeafe", color: "#1d4ed8", padding: "6px 10px", borderRadius: 999, fontWeight: 700 },
  resultsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 16 },
  resultCard: { background: "white", borderRadius: 12, padding: 16, boxShadow: "0 8px 20px rgba(0,0,0,0.06)" },
  resultTitleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  rankBadge: { background: "#e9ecef", borderRadius: 999, padding: "4px 10px", fontWeight: 700, fontSize: 12 },
  roadBlock: { marginTop: 8, padding: 10, background: "#f8f9fa", borderRadius: 8, lineHeight: 1.5 },
  reasonBox: { marginTop: 10, padding: 10, background: "#fff8e1", borderRadius: 8, lineHeight: 1.5 },
  analyticsButton: { marginTop: 8, padding: "12px 16px", borderRadius: 10, border: 0, background: "#457b9d", color: "white", cursor: "pointer" }
};

export default App;
