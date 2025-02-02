'use client';
import { useState, useEffect } from 'react';
import {
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Bar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/lib/db';

export default function PatientCondition({ patient }: { patient: Patient }) {
  const maxPoints = 20;
  const intervalMs = 5000;
  const startTime = Date.now() - (patient.patient_score.length - 1) * intervalMs;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Initialize trend data
  const initialTrendData = patient.patient_score.map((score, i) => ({
    time: formatTime(startTime + i * intervalMs),
    score
  })).slice(-maxPoints);

  const initialWeightData = patient.patient_score_fields.body_weight_change.map((value, i) => ({
    time: formatTime(startTime + i * intervalMs),
    value
  })).slice(-maxPoints);

  const initialHydrationData = patient.patient_score_fields.hydration_levels.map((value, i) => ({
    time: formatTime(startTime + i * intervalMs),
    value
  })).slice(-maxPoints);

  const initialSleepData = patient.patient_score_fields.sleep_deprivation.map((value, i) => ({
    time: formatTime(startTime + i * intervalMs),
    hours: value
  })).slice(-maxPoints);
  console.log(patient.patient_score_fields.sleep_deprivation)

  const [index, setIndex] = useState(patient.patient_score.length - 1);
  const [trendData, setTrendData] = useState(initialTrendData);
  const [weightData, setWeightData] = useState(initialWeightData);
  const [hydrationData, setHydrationData] = useState(initialHydrationData);
  const [sleepData, setSleepData] = useState(initialSleepData);

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
    const newTime = formatTime(startTime + index * intervalMs);

    setCurrentData({
      time_since_last_visitor: patient.patient_score_fields.time_since_last_visitor[index],
      time_since_last_cam_test: patient.patient_score_fields.time_since_last_cam_test[index],
      sleep_deprivation: patient.patient_score_fields.sleep_deprivation[index],
      body_weight_change: patient.patient_score_fields.body_weight_change[index],
      hydration_levels: patient.patient_score_fields.hydration_levels[index],
      patient_score: patient.patient_score[index]
    });

    setTrendData((prev) => {
      const newTrend = [...prev, { time: newTime, score: patient.patient_score[index] }];
      return newTrend.length > maxPoints ? newTrend.slice(1) : newTrend;
    });

    setWeightData((prev) => {
      const newWeight = [...prev, { time: newTime, value: patient.patient_score_fields.body_weight_change[index] }];
      return newWeight.length > maxPoints ? newWeight.slice(1) : newWeight;
    });

    setHydrationData((prev) => {
      const newHydration = [...prev, { time: newTime, value: patient.patient_score_fields.hydration_levels[index] }];
      return newHydration.length > maxPoints ? newHydration.slice(1) : newHydration;
    });

    setSleepData((prev) => {
      const newSleep = [...prev, { time: newTime, hours: patient.patient_score_fields.sleep_deprivation[index] }];
      return newSleep.length > maxPoints ? newSleep.slice(1) : newSleep;
    });

  }, [index]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex justify-between'>
          <span>Patient Condition</span>
          <span className={`p-2 w-11 h-11 text-center rounded-full ${currentData.patient_score < 4 ? "bg-green-200" : currentData.patient_score < 8 ? "bg-yellow-200" : "bg-red-200"}`}>{currentData.patient_score}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 p-4">
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

          <Card className="col-span-2">
			<CardContent>
				<h2 className="text-md my-2">Hours of Sleep</h2>
				<ResponsiveContainer width="100%" height={250}>
				<BarChart data={sleepData}>
					<XAxis dataKey="time" />
					<YAxis domain={[0, 24]} />
					<Tooltip />
					<CartesianGrid strokeDasharray="3 3" />
					<Bar dataKey="hours" fill={sleepData[sleepData.length - 1].hours < 5 ? '#ef4444' : '#4ade80'} />
				</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>

          {/* Body Weight Change */}
          <Card>
            <CardContent>
              <h2 className="text-md my-2">Body Weight Change</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weightData}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[-3, 3]} />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={weightData[weightData.length - 1]?.value >= 0 ? '#4ade80' : '#ef4444'} 
                    strokeWidth={2} 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hydration Levels */}
          <Card>
            <CardContent>
              <h2 className="text-md my-2">Hydration Levels</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={hydrationData}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[-4,4]} />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={hydrationData[hydrationData.length - 1]?.value >= 0 ? '#4ade80' : '#ef4444'} 
                    strokeWidth={2} 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Patient Score Analysis
          <Card className="col-span-2">
            <CardContent>
              <h2 className="text-md my-2">Patient Score Analysis</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card> */}

        </div>
      </CardContent>
    </Card>
  );
}
