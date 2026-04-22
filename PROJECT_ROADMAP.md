# AI-Powered Route Finder - Complete Project Guide

## 🎯 Assignment Overview
Build an intelligent route finder for Dhaka City that considers both **distance** and **safety** using multiple search algorithms with a dynamic risk assessment system.

---

## 📚 Algorithms You Need to Study & Implement

### 1. **Uninformed Search Algorithms** (Blind Search)
These explore without any heuristic knowledge:

- **Breadth-First Search (BFS)** ✅ Already have basic version
  - Explores all neighbors level by level
  - Guarantees shortest path (in terms of steps, not cost)
  - Time Complexity: O(V + E)
  - **Use Case**: Equal weight edges

- **Depth-First Search (DFS)** ❌ Need to add
  - Explores as far as possible along each branch
  - Memory efficient
  - Does NOT guarantee shortest path
  - Time Complexity: O(V + E)

- **Uniform Cost Search (UCS)** ❌ Need to add
  - Explores nodes in order of cumulative cost
  - Guarantees optimal path
  - Similar to Dijkstra's algorithm
  - Perfect for weighted graphs

### 2. **Informed Search Algorithms** (Heuristic-Based)
These use problem knowledge to guide search:

- **Greedy Best-First Search (GBFS)** ❌ Need to add
  - Expands node closest to goal (by heuristic)
  - Fast but NOT always optimal
  - Time Complexity: O(b^m) where b=branching factor

- **A* Search** ✅ Already have basic version
  - Combines actual cost (g) with heuristic estimate (h)
  - **Formula**: f(n) = g(n) + h(n)
  - Optimal AND complete (if heuristic is admissible)
  - THE BEST for this project!

- **Iterative Deepening A* (IDA*)** ❌ Need to add
  - Combines A* with iterative deepening
  - Memory efficient with optimality guarantee
  - Good for complex graphs

---

## 🗺️ Key Components to Build

### 1. **Graph Data Structure (Dhaka City)**
```
- Nodes: City locations/landmarks
- Edges: Roads with dual weights
  - Weight 1: Distance (km)
  - Weight 2: Safety Risk (0-10 scale)
```

### 2. **Heuristic Function** (The KEY!)
This estimates the cost from any node to the goal.

**For Dhaka Route Finder:**
```javascript
// Straight-line distance heuristic (Euclidean or Haversine for lat/lng)
heuristic(currentNode, goalNode) = 
    alpha * euclideanDistance(current, goal) +
    beta * estimatedRiskHeuristic(current, goal)
```

**Heuristic properties:**
- **Admissible**: h(n) ≤ actual cost (never overestimates)
- **Consistent**: h(n) ≤ cost(n→m) + h(m)
- Better heuristics = fewer nodes explored

### 3. **Risk Assessment System**
```
Total Cost = alpha * Distance + beta * Safety Risk

Where:
- alpha: Distance weight (0-1)
- beta: Safety weight (0-1)
- Distance: Road length in km
- Safety Risk: Composite score from:
  * Crime incidents on route
  * Female vulnerability factor
  * Traffic accidents
  * User's condition (alone/with group)
  * Time of day
```

---

## 💻 Implementation Architecture

### File Structure to Create:
```
src/
├── algorithms/
│   ├── astar.js (IMPROVE - add heuristic tracking)
│   ├── bfs.js (KEEP - already good)
│   ├── dfs.js (NEW)
│   ├── ucs.js (NEW - Dijkstra)
│   ├── greedy.js (NEW)
│   └── ida.js (NEW)
├── components/
│   ├── MapView.js (FIX black portions, add route visualization)
│   ├── ChartView.js (ENHANCE - algorithm comparison)
│   ├── RiskSliders.js (NEW - alpha/beta controls)
│   ├── AlgorithmSelector.js (NEW)
│   └── PerformanceAnalytics.js (NEW)
├── data/
│   ├── graph.js (EXPAND - add Dhaka locations)
│   ├── coords.js (ADD proper lat/lng)
│   ├── riskFactors.js (NEW)
│   └── heuristics.js (NEW)
├── utils/
│   ├── distanceCalculator.js (NEW - Haversine)
│   ├── riskCalculator.js (NEW)
│   └── algorithmComparator.js (NEW)
├── App.js (REFACTOR - add UI controls)
└── index.js
```

---

## 🔑 Implementation Steps

### Phase 1: Core Algorithms (Week 1)
- [ ] Implement DFS
- [ ] Implement UCS/Dijkstra
- [ ] Implement Greedy Best-First
- [ ] Improve A* with heuristic visualization
- [ ] Test all 6 algorithms on sample graph

### Phase 2: Heuristic Function (Week 1)
- [ ] Implement Haversine distance (lat/lng)
- [ ] Create admissible heuristic function
- [ ] Validate heuristic properties
- [ ] Track h(n) values for analysis

### Phase 3: Risk System (Week 2)
- [ ] Define risk factors and weights
- [ ] Create risk calculation engine
- [ ] Add dynamic sliders for alpha/beta
- [ ] Implement reactive updates

### Phase 4: Map & Visualization (Week 2)
- [ ] Create Dhaka city graph with real locations
- [ ] Fix black portions (map issue)
- [ ] Visualize routes for each algorithm
- [ ] Show cost breakdown

### Phase 5: Analytics & UI (Week 3)
- [ ] Track metrics: nodes expanded, nodes explored, memory
- [ ] Create comparison charts
- [ ] Show heuristic impact analysis
- [ ] Add detailed explanations for results

---

## 📊 Algorithm Comparison Metrics to Track

For each algorithm, calculate:
1. **Path Cost**: Total distance + safety cost
2. **Nodes Expanded**: How many nodes were processed
3. **Nodes Explored**: How many neighbors were checked
4. **Heuristic Impact**: (Nodes without heuristic) / (Nodes with heuristic)
5. **Execution Time**: ms
6. **Memory Usage**: Approximate queue size

**Example Output:**
```
Algorithm: A*
- Path Cost: 15.3 units
- Nodes Expanded: 8
- Nodes Explored: 22
- Heuristic Efficiency: 73% (would need 27 nodes without heuristic)
- Time: 2.3ms
- Recommendation: BEST for this condition (high accuracy, few expansions)
```

---

## 🎮 User Interface Controls

### Input Controls:
1. **Start Point**: Dropdown/Map click
2. **End Point**: Dropdown/Map click
3. **Risk Factors** (Sliders):
   - Distance Weight (0-100%)
   - Safety Weight (0-100%)
   - Gender: Male/Female
   - Company: Alone/With Group
   - Time: Day/Night
4. **Algorithm Selector**: Checkboxes for all 6 algorithms
5. **"Find Routes" Button**: Run all selected algorithms

### Output Display:
1. **Top 3 Routes**: Show best routes from different algorithms
2. **Comparison Table**: Side-by-side metrics
3. **Map Visualization**: Draw routes with different colors
4. **Recommendation**: "Best for you: Algorithm X because..."
5. **Analytics Chart**: Bar chart comparing all algorithms

---

## 🧮 Heuristic Function Details

### For A* in Dhaka Route Finder:

```javascript
function admissibleHeuristic(current, goal, riskFactor) {
  // Straight-line distance (never overestimates actual road distance)
  const distance = haversineDistance(current.lat, current.lng, goal.lat, goal.lng);
  
  // Estimated risk from current to goal (should be ≤ actual risk)
  const riskEstimate = estimateRiskBetween(current, goal);
  
  // Weighted combination
  return alpha * distance + beta * riskEstimate;
}

// Haversine formula for lat/lng
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
```

---

## 🐛 Known Issues to Fix

1. **Black Portions on Map**:
   - Likely missing Leaflet CSS or tiles not loading
   - Solution: Add proper tile provider (OpenStreetMap, etc.)
   - Check internet connection and CORS issues

2. **Graph Data**:
   - Current graph is too simple (only 4 nodes)
   - Need realistic Dhaka city data with coordinates
   - Suggest: Capture 20-30 landmarks with real lat/lng

3. **Algorithm Performance**:
   - A* needs proper heuristic to show advantage
   - Need to track more detailed metrics
   - Comparison only works with multiple algorithms running

---

## 📈 Evaluation Criteria (Based on Your Assignment)

Your project will be graded on:

1. **Problem Formulation** (20%):
   - How well you defined the graph structure
   - Quality of heuristic function
   - Risk factor modeling

2. **Search Algorithm Implementation** (30%):
   - Correctness of all 6 algorithms
   - Proper use of data structures
   - Code efficiency

3. **Heuristic Quality** (20%):
   - Is it admissible?
   - How much does it reduce search space?
   - How accurate are estimates?

4. **Real-World Application** (20%):
   - Realistic Dhaka city data
   - Meaningful risk factors
   - Practical UI for adjusting weights

5. **Presentation & Analysis** (10%):
   - Clear explanation of decisions
   - Performance comparison charts
   - Algorithm behavior explanation

---

## 🚀 Quick Start Checklist

- [ ] Expand graph.js with real Dhaka locations (20-30 nodes)
- [ ] Add coordinates to coords.js with lat/lng
- [ ] Implement 4 missing algorithms (DFS, UCS, Greedy, IDA*)
- [ ] Create heuristic function with Haversine distance
- [ ] Add risk factor sliders to UI
- [ ] Fix map black portions issue
- [ ] Add metrics tracking to all algorithms
- [ ] Create comparison visualization
- [ ] Add route explanation/recommendations
- [ ] Test all 6 algorithms end-to-end

---

## 💡 Pro Tips

1. **Start with simple data**: Get 5-10 nodes working perfectly before expanding
2. **Visualize the search**: Show which nodes are expanded (open/closed sets)
3. **Test heuristic**: Verify h(n) ≤ actual cost for your graph
4. **Incremental development**: Each algorithm one by one, test thoroughly
5. **Keep metrics consistent**: Ensure you're measuring the same things for comparison
6. **Document assumptions**: Your risk factors are heuristics - document them!

---

This is a GREAT project for learning AI search algorithms in practice. Focus on getting the fundamentals right first, then add more features! 🎓
