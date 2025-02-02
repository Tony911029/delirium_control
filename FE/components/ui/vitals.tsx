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
      setCurrentTimestep((prev) => (prev >= maxTimesteps ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const createChartData = (values: number[]) => {
    const startIndex = currentTimestep - 1;
    const dataPoints = [];
    const startTime = Date.now(); // Get current time as base

    for (let i = 0; i < WINDOW_SIZE; i++) {
      const index = (startIndex + i) % values.length;
      const actualIndex = index >= 0 ? index : index + values.length;
      dataPoints.push({
        time: new Date(startTime + i * 5000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
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
          <CardTitle className="flex justify-between">
            <span>Patient Vitals</span>
            <span
              className={`p-2 w-11 h-11 text-center rounded-full ${overall_vitals_score[overall_vitals_score.length - 1] < 4 ? 'bg-blue-200' : overall_vitals_score[overall_vitals_score.length - 1] < 8 ? 'bg-yellow-200' : 'bg-orange-200'}`}
            >
              {overall_vitals_score[overall_vitals_score.length - 1]}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(vitals).map(([key, values]) => {
              const config = vitalConfigs[key as keyof typeof vitalConfigs];
              return (
                <details
                  key={key}
                  className="w-full [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer list-none">
                    <Card className="w-full hover:bg-gray-50 transition-colors">
                      <CardHeader className="flex flex-row items-center justify-between text-lg font-medium">
                        <div>
                          {config.name} -{' '}
                          {createChartData(values)[WINDOW_SIZE - 1].value}{' '}
                          {config.unit}
                        </div>
                        <div className="h-4 w-4 transition-transform duration-200 [details[open]>&]:rotate-180">
                          ▼
                        </div>
                      </CardHeader>
                    </Card>
                  </summary>
                  <Card className="w-full mt-2">
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={createChartData(values)}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="time"
                              tick={{ fontSize: 12 }}
                              angle={-45}
                              textAnchor="end"
                              height={60}
                            />
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
                    </CardContent>
                  </Card>
                </details>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
