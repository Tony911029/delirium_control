'use client';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/lib/db';

export default function PatientCondition({ patient }: { patient: Patient }) {
  const maxPoints = 20; // Limit graph data points
  const intervalMs = 5000; // Spacing interval (5s per update)
  const startTime = Date.now() - (patient.patient_score.length - 1) * intervalMs; // Base time

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Initialize trend data with proper timestamps
  const initialTrendData = patient.patient_score.map((score, i) => ({
    time: formatTime(startTime + i * intervalMs),
    score
  })).slice(-maxPoints); // Ensure only the last maxPoints are shown

  const [index, setIndex] = useState(patient.patient_score.length - 1);
  const [trendData, setTrendData] = useState(initialTrendData);

  const [currentData, setCurrentData] = useState({
    time_since_last_visitor: patient.patient_score_fields.time_since_last_visitor[index],
    time_since_last_cam_test: patient.patient_score_fields.time_since_last_cam_test[index],
    sleep_deprivation: patient.patient_score_fields.sleep_deprivation[index],
    body_weight_change: patient.patient_score_fields.body_weight_change[index],
    hydration_levels: patient.patient_score_fields.hydration_levels[index],
    patient_score: patient.patient_score[index]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % patient.patient_score.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newScore = patient.patient_score[index];
    const newTime = formatTime(startTime + index * intervalMs); // Generate spaced time

    setCurrentData({
      time_since_last_visitor: patient.patient_score_fields.time_since_last_visitor[index],
      time_since_last_cam_test: patient.patient_score_fields.time_since_last_cam_test[index],
      sleep_deprivation: patient.patient_score_fields.sleep_deprivation[index],
      body_weight_change: patient.patient_score_fields.body_weight_change[index],
      hydration_levels: patient.patient_score_fields.hydration_levels[index],
      patient_score: newScore
    });

    setTrendData((prev) => {
      const newTrend = [...prev, { time: newTime, score: newScore }];
      return newTrend.length > maxPoints ? newTrend.slice(1) : newTrend;
    });
  }, [index]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Condition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 p-4">
          <Card className={`bg-opacity-10 ${ currentData.patient_score > 7 ? 'bg-red-400' : currentData.patient_score > 3 ? 'bg-yellow-400' : 'bg-green-400 '}`}>
            <CardContent>
              <h2 className="text-md my-2">Patient Score</h2>
              <p className="text-4xl font-semibold">
                {currentData.patient_score}/10
              </p>
            </CardContent>
          </Card>

          <Card className={`bg-opacity-10 ${ currentData.time_since_last_visitor > 120 ? 'bg-red-400' : currentData.time_since_last_visitor > 60 ? 'bg-yellow-400' : 'bg-green-400 '}`}>
            <CardContent>
              <h2 className="text-md my-2">
                Time Since Last Visitor
              </h2>
              <p className="text-3xl font-bold">
                {currentData.time_since_last_visitor} min
              </p>
            </CardContent>
          </Card>

          <Card className={`bg-opacity-10 ${ currentData.time_since_last_cam_test > 720 ? 'bg-red-400' : currentData.time_since_last_cam_test > 360 ? 'bg-yellow-400' : 'bg-green-400 '}`}>
            <CardContent>
              <h2 className="text-md my-2">Time Since Last CAM</h2>
              <p className="text-3xl font-bold">{currentData.time_since_last_cam_test} min</p>
            </CardContent>
          </Card>

          <Card className={`bg-opacity-10 ${ currentData.sleep_deprivation < 4 ? 'bg-red-400' : 'bg-green-400 '}`}>
            <CardContent>
              <h2 className="text-md my-2">Sleep Time</h2>
              <p className="text-3xl font-bold">{currentData.sleep_deprivation} hrs</p>
            </CardContent>
          </Card>

          <Card className={`bg-opacity-10 ${ currentData.body_weight_change < -2 ? 'bg-red-400' : currentData.body_weight_change < 0 ? 'bg-yellow-400' : 'bg-green-400 '}`}>
            <CardContent>
              <h2 className="text-md my-2">Body Weight Change</h2>
              <p className="text-3xl font-bold">{currentData.body_weight_change} kg</p>
            </CardContent>
          </Card>

          <Card className={`bg-opacity-10 ${ currentData.hydration_levels > 120 ? 'bg-red-400' : currentData.hydration_levels > 60 ? 'bg-yellow-400' : 'bg-green-400 '}`}>
            <CardContent>
              <h2 className="text-md my-2">Hydration Levels</h2>
              <p className="text-3xl font-bold">{currentData.hydration_levels} mL</p>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardContent>
              <h2 className="text-md my-2">Patient Score Analysis</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
