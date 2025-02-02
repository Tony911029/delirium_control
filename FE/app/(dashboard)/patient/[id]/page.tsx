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
import { getPatients, Patient, PatientStatus } from '@/lib/db';
import { useParams } from 'next/navigation';
import Vitals from '@/components/ui/vitals';
import EnvironmentalFactors from '@/components/ui/env_factors';
import PatientCondition from '@/components/ui/patient_condition';
import Predispositions from '@/components/ui/predispositions';
import RiskFactorScores from '@/components/ui/risk-factor-scores';
import NotesWidget from '@/components/ui/notes';

// Placeholder data for patient

export default function PatientPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(
    getPatients().find((p) => p.id === id)
  );

  // Mapping for status colors, same as in PatientRow.
  const statusColors: Record<PatientStatus, string> = {
    'Discharged - No Delirium': 'bg-blue-200 text-blue-800',
    'Discharged - Delirium Incident': 'bg-orange-200 text-orange-800',
    'Program Exclusion': 'bg-gray-300 text-gray-700',
    'Active Monitoring': 'bg-purple-200 text-purple-800'
  };

  const [selectedStatus, setSelectedStatus] = useState<PatientStatus>(patient?.patient_status || 'Active Monitoring');
  const statuses: PatientStatus[] = Object.keys(statusColors) as PatientStatus[];

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.stopPropagation();
    setSelectedStatus(event.target.value as PatientStatus);
  };

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
            <CardContent>
              <div className="w-[150px]">
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className={`px-2 py-1 w-full rounded-lg text-xs font-medium border-0 focus:outline-none truncate ${statusColors[selectedStatus]}`}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status} className="text-black whitespace-normal">
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4">
			      <RiskFactorScores patient={patient} />
            <NotesWidget patient={patient} />
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
