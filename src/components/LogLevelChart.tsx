// components/LogLevelChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface LogEntry {
  level: string;
  // other fields...
}

interface Props {
  logs: LogEntry[];
}

const LogLevelChart: React.FC<Props> = ({ logs }) => {
  // Count logs by level
  const levelCount = logs.reduce<Record<string, number>>((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  // Convert to chart-friendly format
  const chartData = Object.keys(levelCount).map(level => ({
    level,
    count: levelCount[level],
  }));

  return (
    <div className="p-4 rounded-xl shadow-lg bg-white">
      <h2 className="text-lg font-semibold mb-4">Log Count by Level</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#06b178" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LogLevelChart;
