import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/lib/db';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function RiskFactorScores({ patient }: { patient: Patient }) {
  // Accessing all the score data from the patient object
  const overall_vitals_score = patient.overall_vitals_score;
  const patient_score = patient.patient_score;
  const env_score = patient.env_score;
  const overall_score = patient.overall_score;

  const maxTimesteps = overall_vitals_score.length;
  const WINDOW_SIZE = 20;

  const [currentTimestep, setCurrentTimestep] = useState(1);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestep((prev) => (prev >= maxTimesteps ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxTimesteps]);

  const createChartData = (values: number[], startTime: number) => {
    const startIndex = currentTimestep - 1;
    const dataPoints = [];

    for (let i = 0; i < WINDOW_SIZE; i++) {
      const index = (startIndex + i) % values.length;
      const actualIndex = index >= 0 ? index : index + values.length;
      dataPoints.push({
        time: startTime + i * 5000, // Incrementing the timestamp for each data point (in milliseconds)
        value: Number(values[actualIndex].toFixed(1)),
      });
    }

    return dataPoints;
  };

  // Create chart data for each score
  const startTime = Date.now(); // Using current time as the start time
  const overall_vitals_data = createChartData(overall_vitals_score, startTime);
  const patient_score_data = createChartData(patient_score, startTime);
  const env_score_data = createChartData(env_score, startTime);
  const overall_score_data = createChartData(overall_score, startTime);

  return (
    <div className="space-y-4 col-span-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Risk Factor Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer height={300}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tickFormatter={(timestamp) => formatTime(timestamp)} // Format the timestamp for display
              />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />

              {/* Adding all the lines to represent the different scores */}
              <Line
                type="monotone"
                dataKey="value"
                data={overall_vitals_data}
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                name="Overall Vitals"
              />
              <Line
                type="monotone"
                dataKey="value"
                data={patient_score_data}
                stroke="#82ca9d"
                strokeWidth={2}
                dot={false}
                name="Patient Score"
              />
              <Line
                type="monotone"
                dataKey="value"
                data={env_score_data}
                stroke="#ffc658"
                strokeWidth={2}
                dot={false}
                name="Environmental Score"
              />
              <Line
                type="monotone"
                dataKey="value"
                data={overall_score_data}
                stroke="#387908"
                strokeWidth={2}
                dot={false}
                name="Overall Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
