'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { LineChart, Line } from 'recharts';
import { getPatients } from '@/lib/db';
import { useParams } from 'next/navigation';
import Vitals from '@/components/ui/vitals';
import EnvironmentalFactors from '@/components/ui/env_factors';
import PatientCondition from '@/components/ui/patient_condition';
import Predispositions from '@/components/ui/predispositions';
import RiskFactorScores from '@/components/ui/risk-factor-scores';

// Placeholder data for patient

export default function PatientPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(
    getPatients().find((p) => p.id === id)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!patient) return;
      setPatient((prev) => {
        if (prev) {
          return {
            ...prev,
            vitals: {
              ...prev.vitals,
              temperature: [
                ...prev.vitals.temperature.slice(1),
                36.3 + Math.random()
              ],
              pulse_rate: [
                ...prev.vitals.pulse_rate.slice(1),
                70 + Math.floor(Math.random() * 7)
              ],
              respiration_rate: [
                ...prev.vitals.respiration_rate.slice(1),
                12 + Math.floor(Math.random() * 8)
              ],
              blood_pressure: [
                ...prev.vitals.blood_pressure.slice(1),
                120 + Math.floor(Math.random() * 10)
              ]
            }
          };
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {patient && (
        <div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{`${patient.first_name} ${patient.last_name}`}</CardTitle>
              <CardDescription>
                Age: {patient.age}, Gender: {patient.gender}
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-2 gap-4">
			<RiskFactorScores patient={patient} />
            <Predispositions patient={patient} />
            <Vitals patient={patient} />
            <EnvironmentalFactors patient={patient} />
            <PatientCondition patient={patient} />
          </div>
        </div>
      )}
	  {!patient && <div>Invalid Patient ID</div>}
    </div>
  );
}
