import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ChartView({ data = [] }) {
  const chartData = data.map((item) => ({
    algorithm: item.algorithm,
    cost: item.pathFound ? Number(item.cost.toFixed(2)) : 0,
    explored: item.pathFound ? item.path.length : 0,
    time: Number(item.time.toFixed(2)),
    risk: Number(item.routeData.totalRisk.toFixed(2))
  }));

  return (
    <div style={{ background: "white", borderRadius: 12, padding: 16, marginTop: 16 }}>
      <h3 style={{ marginTop: 0 }}>Scenario analytics</h3>
      <div style={{ width: "100%", height: 340 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="algorithm" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cost" name="Weighted cost" />
            <Bar dataKey="explored" name="Nodes explored" />
            <Bar dataKey="risk" name="Adjusted risk" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
