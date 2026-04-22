// Example test cases and usage demonstrations
// Run these in your browser console or node.js

import { graph } from "./src/data/graph";
import { bfs } from "./src/algorithms/bfs";
import { dfs } from "./src/algorithms/dfs";
import { ucs } from "./src/algorithms/ucs";
import { aStar } from "./src/algorithms/astar";
import { greedyBestFirst } from "./src/algorithms/greedy";
import { idaStar } from "./src/algorithms/ida";
import { calculateRouteCost, suggestWeights } from "./src/utils/riskCalculator";
import { compareRoutes } from "./src/utils/riskCalculator";

// ============================================
// TEST CASE 1: Basic Algorithm Comparison
// ============================================
console.log("=== TEST 1: Basic Algorithm Comparison ===");

const testRoutes = {
    start: "Gulshan",
    goal: "Old Dhaka",
    alpha: 0.5,
    beta: 0.5
};

const results = {
    bfs: bfs(graph, testRoutes.start, testRoutes.goal, testRoutes.alpha, testRoutes.beta),
    dfs: dfs(graph, testRoutes.start, testRoutes.goal, testRoutes.alpha, testRoutes.beta),
    ucs: ucs(graph, testRoutes.start, testRoutes.goal, testRoutes.alpha, testRoutes.beta),
    greedy: greedyBestFirst(graph, testRoutes.start, testRoutes.goal, testRoutes.alpha, testRoutes.beta),
    aStar: aStar(graph, testRoutes.start, testRoutes.goal, testRoutes.alpha, testRoutes.beta),
    idaStar: idaStar(graph, testRoutes.start, testRoutes.goal, testRoutes.alpha, testRoutes.beta)
};

console.log("Results:");
Object.entries(results).forEach(([algo, result]) => {
    console.log(`\n${algo.toUpperCase()}:`);
    console.log(`  Path: ${result.path.join(" → ")}`);
    console.log(`  Cost: ${result.cost}`);
    console.log(`  Nodes Expanded: ${result.nodesExpanded}`);
    console.log(`  Nodes Explored: ${result.nodesExplored}`);
});

// ============================================
// TEST CASE 2: User Profile Impact
// ============================================
console.log("\n\n=== TEST 2: User Profile Impact ===");

const profiles = [
    { gender: "male", company: "group", time: "day", condition: "normal" },
    { gender: "female", company: "alone", time: "evening", condition: "normal" },
    { gender: "female", company: "alone", time: "night", condition: "normal" }
];

profiles.forEach((profile, idx) => {
    const suggested = suggestWeights(profile);
    console.log(`\nProfile ${idx + 1}: ${JSON.stringify(profile)}`);
    console.log(`  Suggested α (distance): ${suggested.alpha}`);
    console.log(`  Suggested β (safety): ${suggested.beta}`);
    console.log(`  Reasoning: ${suggested.reasoning.join("; ")}`);
});

// ============================================
// TEST CASE 3: Route Cost Comparison
// ============================================
console.log("\n\n=== TEST 3: Route Cost with Different Profiles ===");

const routeA = ["Gulshan", "Banani", "Kawran Bazar", "Old Dhaka"];
const routeB = ["Gulshan", "Baridhara", "Farmgate", "Kakrail", "Old Dhaka"];

const profile = { gender: "female", company: "alone", time: "night", condition: "normal" };

const costA = calculateRouteCost(routeA, graph, 0.5, 0.5, profile);
const costB = calculateRouteCost(routeB, graph, 0.5, 0.5, profile);

console.log("\nRoute A:", routeA.join(" → "));
console.log(`  Total Cost: ${costA.totalCost}`);
console.log(`  Total Distance: ${costA.totalDistance} km`);
console.log(`  Total Risk: ${costA.totalRisk}`);
console.log(`  Risk Multiplier (for profile): ${costA.riskMultiplier}x`);

console.log("\nRoute B:", routeB.join(" → "));
console.log(`  Total Cost: ${costB.totalCost}`);
console.log(`  Total Distance: ${costB.totalDistance} km`);
console.log(`  Total Risk: ${costB.totalRisk}`);
console.log(`  Risk Multiplier (for profile): ${costB.riskMultiplier}x`);

console.log(`\nSafer Route: Route ${costA.totalRisk < costB.totalRisk ? "A" : "B"}`);
console.log(`Shorter Route: Route ${costA.totalDistance < costB.totalDistance ? "A" : "B"}`);

// ============================================
// TEST CASE 4: Different Weight Scenarios
// ============================================
console.log("\n\n=== TEST 4: Impact of Different Weights ===");

const weights = [
    { alpha: 1.0, beta: 0.0, label: "Distance Only" },
    { alpha: 0.0, beta: 1.0, label: "Safety Only" },
    { alpha: 0.5, beta: 0.5, label: "Balanced" },
    { alpha: 0.2, beta: 0.8, label: "Safety Priority" }
];

console.log(`Route: Gulshan → Old Dhaka\n`);

weights.forEach(w => {
    const result = aStar(graph, "Gulshan", "Old Dhaka", w.alpha, w.beta);
    console.log(`${w.label} (α=${w.alpha}, β=${w.beta}):`);
    console.log(`  Path: ${result.path.join(" → ")}`);
    console.log(`  Cost: ${result.cost.toFixed(2)}`);
    console.log(`  Nodes Expanded: ${result.nodesExpanded}`);
    console.log("");
});

// ============================================
// TEST CASE 5: Algorithm Efficiency
// ============================================
console.log("\n=== TEST 5: Algorithm Efficiency Analysis ===");

const algos = [
    { name: "BFS", fn: bfs },
    { name: "DFS", fn: dfs },
    { name: "UCS", fn: ucs },
    { name: "Greedy", fn: greedyBestFirst },
    { name: "A*", fn: aStar },
    { name: "IDA*", fn: idaStar }
];

console.log("Running all algorithms on Gulshan → Motijheel\n");

const efficiencyResults = algos.map(algo => {
    const result = algo.fn(graph, "Gulshan", "Motijheel", 0.5, 0.5);
    return {
        algorithm: algo.name,
        cost: result.cost,
        nodesExpanded: result.nodesExpanded,
        efficiency: (result.cost / (result.nodesExpanded || 1)).toFixed(3)
    };
});

// Sort by nodes expanded
efficiencyResults.sort((a, b) => a.nodesExpanded - b.nodesExpanded);

console.log("Ranked by Efficiency (fewest nodes expanded):\n");
efficiencyResults.forEach((r, idx) => {
    console.log(`${idx + 1}. ${r.algorithm}`);
    console.log(`   Nodes Expanded: ${r.nodesExpanded}`);
    console.log(`   Cost: ${r.cost.toFixed(2)}`);
    console.log(`   Efficiency Ratio: ${r.efficiency}\n`);
});

// ============================================
// TEST CASE 6: Finding Best Route for Profile
// ============================================
console.log("=== TEST 6: Best Route Recommendation ===");

const userProfile = {
    gender: "female",
    company: "alone",
    time: "night",
    condition: "normal"
};

console.log(`User Profile: ${JSON.stringify(userProfile)}`);
console.log("Route: Banani → Old Dhaka\n");

// Run with auto-adjusted weights based on profile
const suggestedWeights = suggestWeights(userProfile);
console.log(`Auto-adjusted Weights:`);
console.log(`  Distance (α): ${suggestedWeights.alpha}`);
console.log(`  Safety (β): ${suggestedWeights.beta}`);
console.log(`  Reasoning: ${suggestedWeights.reasoning.join("; ")}\n`);

const bestRoute = aStar(graph, "Banani", "Old Dhaka", suggestedWeights.alpha, suggestedWeights.beta);
console.log(`Best Route Found:`);
console.log(`  Path: ${bestRoute.path.join(" → ")}`);
console.log(`  Cost: ${bestRoute.cost.toFixed(2)}`);
console.log(`  This route prioritizes SAFETY for this user profile!`);

// ============================================
// TEST CASE 7: Multiple Routes Comparison
// ============================================
console.log("\n\n=== TEST 7: Multiple Route Comparison ===");

const multiProfile = { gender: "female", company: "alone", time: "evening", condition: "normal" };

// Sample multiple routes (in real app, get these from different algorithms)
const candidateRoutes = [
    ["Gulshan", "Banani", "Kawran Bazar", "Old Dhaka"],
    ["Gulshan", "Baridhara", "Tejgaon", "Motijheel", "Old Dhaka"],
    ["Gulshan", "Farmgate", "Kakrail", "Old Dhaka"]
];

console.log("Comparing 3 possible routes:\n");

const comparison = compareRoutes(candidateRoutes, graph, multiProfile);

comparison.forEach((route, idx) => {
    console.log(`Route ${idx + 1}: ${route.route}`);
    console.log(`  Total Cost: ${route.totalCost.toFixed(2)}`);
    console.log(`  Distance: ${route.totalDistance.toFixed(2)} km`);
    console.log(`  Risk: ${route.totalRisk.toFixed(2)}`);
    console.log("");
});

console.log(`RECOMMENDATION: Route ${comparison.indexOf(comparison[0]) + 1} is BEST for this user profile!`);

// ============================================
// EXPECTED OUTPUTS
// ============================================

/*
EXPECTED TEST RESULTS:

TEST 1: All 6 algorithms should find valid paths
        A*, UCS, and IDA* should have same (optimal) cost
        DFS might have high cost depending on exploration order
        Greedy will be fast but may not be optimal
        BFS will expand many nodes on weighted graph

TEST 2: Profile impacts weight suggestions
        Female + Alone + Night = highest β (safety priority)
        Male + Group + Day = balanced weights

TEST 3: Risk multiplier shown (should be >1 for vulnerable profile)
        Route safety considered in total cost

TEST 4: Different weights produce different routes
        Safety-only routes avoid high-risk areas
        Distance-only takes fastest path regardless

TEST 5: Informed algorithms (A*, Greedy, IDA*) expand fewer nodes
        than uninformed (BFS, DFS, UCS)

TEST 6: Auto-adjusted weights increase safety priority
        Best route reflects user's risk profile

TEST 7: Recommended route has lowest cost for profile
*/
