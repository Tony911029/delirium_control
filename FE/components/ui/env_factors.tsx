"use client";
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

export default function EnvironmentalFactors({ patient }: { patient: Patient; }) {
  const maxPoints = 20;
  const intervalMs = 5000;
  const dataLength = patient.env_score_fields.lighting_levels.length;
  const startTime = Date.now() - (dataLength - 1) * intervalMs;

  const formatTime = (timestamp: number) =>
    new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
  const createTrendDataPoint = (i: number) => ({
    time: formatTime(startTime + i * intervalMs),
    lighting: patient.env_score_fields.lighting_levels[i],
    noise: patient.env_score_fields.noise_levels[i],
    hallway: Math.round(patient.env_score_fields.time_in_hallway[i]/60),
    roomChange: patient.env_score_fields.room_change_frequency[i],
    patients: patient.env_score_fields.number_of_patients_in_room[i],
    env_score: patient.env_score[i]  // new line
  });

  const initialTrendData = Array.from({ length: dataLength }, (_, i) => createTrendDataPoint(i)).slice(-maxPoints);
  const [index, setIndex] = useState(dataLength - 1);
  const [trendData, setTrendData] = useState(initialTrendData);
  const [currentData, setCurrentData] = useState(createTrendDataPoint(dataLength - 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % dataLength);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [dataLength]);

  useEffect(() => {
    const newPoint = createTrendDataPoint(index);
    setCurrentData(newPoint);
    setTrendData(prev => {
      const updated = [...prev, newPoint];
      return updated.length > maxPoints ? updated.slice(1) : updated;
    });
  }, [index]);

  function getBgClass(value: number, low: number, high: number) {
    if (value < low) return "bg-green-400 bg-opacity-10";    // below range
    else if (value > high) return "bg-red-400 bg-opacity-10"; // above range
    else return "bg-yellow-400 bg-opacity-10";                // within range
  }

  function oppgetBgClass(value: number, low: number, high: number) {
    if (value > high) return "bg-green-400 bg-opacity-10";    // below range
    else if (value < low) return "bg-red-400 bg-opacity-10"; // above range
    else return "bg-yellow-400 bg-opacity-10";                // within range
  }

  return (
    <Card>
      <CardHeader>
	  <CardTitle className='flex justify-between'>
		  <span>Environmental Factors</span>
          <span className={`p-2 w-11 h-11 text-center rounded-full ${patient.env_score[patient.env_score.length -1] < 4 ? "bg-green-200" : patient.env_score[patient.env_score.length -1] < 8 ? "bg-yellow-200" : "bg-red-200"}`}>{patient.env_score[patient.env_score.length -1]}</span>
          </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 p-4">
          {/* Display current values */}
          <Card className={getBgClass(currentData.lighting, 10, 20)}>
            <CardContent>
              <h2 className="text-md my-2">Lighting Level</h2>
              <p className="text-4xl font-semibold">{currentData.lighting} lm</p>
            </CardContent>
          </Card>
          <Card className={getBgClass(currentData.noise, 20, 40)}>
            <CardContent>
              <h2 className="text-md my-2">Noise Level</h2>
              <p className="text-4xl font-semibold">{currentData.noise} db</p>
            </CardContent>
          </Card>
          <Card className={getBgClass(currentData.hallway, 1, 2)}>
            <CardContent>
              <h2 className="text-md my-2">Time in Hallway</h2>
              <p className="text-4xl font-semibold">{currentData.hallway} hr</p>
            </CardContent>
          </Card>
          <Card className={getBgClass(currentData.roomChange, 1, 2)}>
            <CardContent>
              <h2 className="text-md my-2">Room Change Frequency</h2>
              <p className="text-4xl font-semibold">{currentData.roomChange}</p>
            </CardContent>
          </Card>
          <Card className={getBgClass(currentData.patients, 1, 3)}>
            <CardContent>
              <h2 className="text-md my-2">Patients in Room</h2>
              <p className="text-4xl font-semibold">{currentData.patients}</p>
            </CardContent>
          </Card>

          {/* Trend Analysis Chart */}
          <Card className="col-span-2">
            <CardContent>
              <h2 className="text-md my-2">Trend Analysis</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <XAxis 
                    dataKey="time" 
                    label={{ value: 'Time', position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    label={{ value: 'Factor Units', angle: -90, position: 'insideLeft', offset: 15 }} 
                  />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="lighting" stroke="#8884d8" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="noise" stroke="#82ca9d" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="hallway" stroke="#ffc658" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="roomChange" name="Room change" stroke="#ff7300" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="patients" stroke="#413ea0" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
