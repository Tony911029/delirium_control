import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VitalsCharts = () => {
  const vitals = {
    temperature: [36.8, 37.0, 37.2, 37.4, 37.6, 37.9, 38.2, 38.4, 38.5, 38.3, 38.1, 37.8, 37.6, 37.4, 37.2, 37.0, 36.9, 36.8, 36.8, 36.7],
    pulse_rate: [88, 92, 95, 98, 102, 105, 108, 112, 115, 110, 105, 100, 98, 95, 92, 90, 88, 85, 82, 80],
    respiration_rate: [20, 21, 22, 23, 24, 25, 26, 26, 25, 24, 23, 22, 21, 20, 19, 19, 18, 18, 18, 18],
    blood_pressure: [135, 138, 142, 145, 148, 152, 155, 158, 160, 155, 150, 145, 142, 138, 135, 132, 130, 128, 125, 122],
    bgl: [5.8, 6.0, 6.2, 6.4, 6.6, 6.8, 7.0, 7.1, 7.0, 6.8, 6.6, 6.4, 6.2, 6.0, 5.8, 5.6, 5.4, 5.3, 5.2, 5.1],
    hrv: [22, 21, 20, 19, 18, 17, 16, 15, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    blood_oxygen_saturation: [95, 94, 93, 92, 91, 90, 90, 89, 89, 90, 91, 92, 93, 94, 95, 96, 96, 97, 97, 98]
  };

  const overall_vitals_score = [3, 3, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 3, 3, 2, 2, 2, 2];

  // Convert the data into the format Recharts expects
  const createChartData = (values) => {
    return values.map((value, index) => ({
      timestep: index + 1,
      value: value
    }));
  };

  const vitalConfigs = {
    // overall_vitals_score: {
    //     name: 'Overall Vitals Score',
    //     unit: '',
    //     color: '#000000',
    //     domain: [0, 10]
    // },  
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
      color: '#purple',
      domain: [4, 8]
    },
    hrv: {
      name: 'Heart Rate Variability',
      unit: 'ms',
      color: '#pink',
      domain: [10, 30]
    },
    blood_oxygen_saturation: {
      name: 'Blood Oxygen Saturation',
      unit: '%',
      color: '#cyan',
      domain: [85, 100]
    }
  };

  return (
    <div className="space-y-4">
      {Object.entries(vitals).map(([key, values]) => {
        const config = vitalConfigs[key as keyof typeof vitalConfigs];
        return (
          <Card key={key} className="w-full">
            <CardHeader>
              <CardTitle>{config.name} - {values[0]} {config.unit}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={createChartData(values)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            </CardContent>
          </Card>
        );
      })}
    </div>
    );
};

export default VitalsCharts;