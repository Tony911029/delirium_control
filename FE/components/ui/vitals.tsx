import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/lib/db';
import { log } from 'console';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function Vitals({ patient }: { patient: Patient }) {
  const overall_vitals_score = patient.overall_vitals_score;
  const maxTimesteps = patient.overall_vitals_score.length;
  const vitals = patient.vitals;
  const WINDOW_SIZE = 8;

  const [currentTimestep, setCurrentTimestep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestep(prev => prev >= maxTimesteps ? 1 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const createChartData = (values: number[]) => {
    const startIndex = currentTimestep - 1;
    const dataPoints = [];
    
    for (let i = 0; i < WINDOW_SIZE; i++) {
      const index = (startIndex + i) % values.length;
      const actualIndex = index >= 0 ? index : index + values.length;
      dataPoints.push({
        timestep: i + 1,
        value: Number(values[actualIndex].toFixed(1))
      });
    }
    
    return dataPoints;
  };

  const vitalConfigs = {
    temperature: {
      name: 'Temperature',
      unit: '°C',
      color: '#ff7300',
      domain: [36, 39]
    },
    pulse_rate: {
      name: 'Pulse Rate',
      unit: 'bpm',
      color: '#ff0000',
      domain: [70, 120]
    },
    respiration_rate: {
      name: 'Respiration Rate',
      unit: 'breaths/min',
      color: '#00ff00',
      domain: [15, 30]
    },
    blood_pressure: {
      name: 'Blood Pressure',
      unit: 'mmHg',
      color: '#0000ff',
      domain: [120, 165]
    },
    bgl: {
      name: 'Blood Glucose Level',
      unit: 'mmol/L',
      color: '#2f8bbd',
      domain: [4, 8]
    },
    hrv: {
      name: 'Heart Rate Variability',
      unit: 'ms',
      color: '#c400f3',
      domain: [10, 30]
    },
    blood_oxygen_saturation: {
      name: 'Blood Oxygen Saturation',
      unit: '%',
      color: '#a012ff',
      domain: [85, 100]
    }
  };

  return (
    <div className="space-y-4 col-span-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            Overall Vitals Score - {createChartData(overall_vitals_score)[WINDOW_SIZE-1].value}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={createChartData(overall_vitals_score)}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestep" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {Object.entries(vitals).map(([key, values]) => {
            const config = vitalConfigs[key as keyof typeof vitalConfigs];
            return (
              <div key={key} className="w-full c-2">
                <CardHeader>
                  <CardTitle>
                    {config.name} - {createChartData(values)[WINDOW_SIZE-1].value} {config.unit}
                  </CardTitle>
                </CardHeader>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={createChartData(values)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestep" />
                      <YAxis domain={config.domain} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={config.color}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
