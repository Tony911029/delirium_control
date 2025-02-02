'use client';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/lib/db';

export default function RiskFactorScores({ patient }: { patient: Patient }) {
  const maxPoints = 20;
  const intervalMs = 5000;
  const startTime = Date.now() - (patient.overall_score.length - 1) * intervalMs;

  const formatTime = (timestamp: number) =>
    new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

  // Initialize chart data
  const initialChartData = patient.overall_score.map((_, i) => ({
    time: formatTime(startTime + i * intervalMs),
    overall_score: patient.overall_score[i],
    overall_vitals_score: patient.overall_vitals_score[i],
    patient_score: patient.patient_score[i],
    env_score: patient.env_score[i]
  })).slice(-maxPoints);

  const [index, setIndex] = useState(patient.overall_score.length - 1);
  const [chartData, setChartData] = useState(initialChartData);
  const [currentData, setCurrentData] = useState({
    overall_score: patient.overall_score[index],
    overall_vitals_score: patient.overall_vitals_score[index],
    patient_score: patient.patient_score[index],
    env_score: patient.env_score[index]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % patient.overall_score.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newTime = formatTime(startTime + index * intervalMs);
    
    setCurrentData({
      overall_score: patient.overall_score[index],
      overall_vitals_score: patient.overall_vitals_score[index],
      patient_score: patient.patient_score[index],
      env_score: patient.env_score[index]
    });

    setChartData((prev) => {
      const newChartData = [
        ...prev,
        {
          time: newTime,
          overall_score: patient.overall_score[index],
          overall_vitals_score: patient.overall_vitals_score[index],
          patient_score: patient.patient_score[index],
          env_score: patient.env_score[index]
        }
      ];
      return newChartData.length > maxPoints ? newChartData.slice(1) : newChartData;
    });
  }, [index]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <span>Risk Factor Scores</span>
          <span className={`p-2 w-11 h-11 text-center rounded-full ${currentData.overall_score < 4 ? "bg-green-200" : currentData.overall_score < 8 ? "bg-yellow-200" : "bg-red-200"}`}>{currentData.overall_score}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend />
            <Line type="monotone" dataKey="overall_score" stroke="#8884d8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="overall_vitals_score" stroke="#82ca9d" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="patient_score" stroke="#ff7300" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="env_score" stroke="#ffc658" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
