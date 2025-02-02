'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { PatientRow } from './product';
import { Patient } from '@/lib/db';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Pause,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { log } from 'console';

type ScoreField = keyof Pick<
  Patient,
  'overall_score' | 'overall_vitals_score' | 'patient_score' | 'env_score'
>;

export function PatientsTable({
  patients,
  offset,
  totalPatients,
  activeTab = 'all'
}: {
  patients: Patient[];
  offset: number;
  totalPatients: number;
  activeTab?: string;
}) {
  let router = useRouter();
  let productsPerPage = 5;

  const activeTabLookup = {
    all: 'overall_score',
    vitals: 'overall_vitals_score',
    active: 'patient_score',
    environment: 'env_score',
    precon: 'pre_condition_score'
  } as const;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const maxTimesteps = patients[0]?.overall_score.length || 0;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % maxTimesteps);
    }, 5000);

    return () => clearInterval(interval);
  }, [maxTimesteps, isPaused]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const sortedPatients = [...patients].sort((a, b) => {
    const fieldToSort =
      activeTabLookup[activeTab as keyof typeof activeTabLookup];

    // Handle pre_condition_score separately as it's not an array
    if (fieldToSort === 'pre_condition_score') {
      return b.pre_condition_score - a.pre_condition_score;
    }

    // Now TypeScript knows these are array fields
    const aScore = a[fieldToSort as ScoreField][currentIndex];
    const bScore = b[fieldToSort as ScoreField][currentIndex];
    return bScore - aScore;
  });

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset + productsPerPage}`, { scroll: false });
  }

  const units = ['°C', 'bpm', 'bpm', 'mmHg', 'mmol/L', 'ms', '%'];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Patients</CardTitle>
            <CardDescription>
              Manage your patients and view their delirium index.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={togglePause}
            className="ml-2 mr-15 pr-10 px-6 py-3"
          >
            {isPaused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Admitted At</TableHead>

              {activeTab === 'all' && (
                <>
                  <TableHead className="hidden md:table-cell">
                    Temperature ({units[0]})
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Pulse Rate ({units[1]})
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Respiration Rate ({units[2]})
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Blood Pressure ({units[3]})
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-black">
                    <b>Overall Vitals Score</b>
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-black">
                    <b>Patient Score</b>
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-black">
                    <b>Environment Score</b>
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-black">
                    <b>Predisposition Score</b>
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-black">
                    <b>Overall Risk Score</b>
                  </TableHead>
                </>
              )}
              {activeTab === 'vitals' && (
                <>
                  <TableHead className="hidden md:table-cell text-black">
                    <b>Overall Vitals Score</b>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Temperature ({units[0]})
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Pulse Rate ({units[1]})
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Respiration Rate ({units[2]})
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Blood Pressure ({units[3]})
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Blood Glucose Level ({units[4]})
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Heart Rate Variability ({units[5]})
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Blood Oxygen Saturation ({units[6]})
                  </TableHead>
                </>
              )}
              {activeTab === 'active' && (
                <>
                  <TableHead className="hidden md:table-cell text-black">
                    <b>Patient Score</b>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Time Last Visitor (hr)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last CAM Test (hr)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Sleep Time (hr)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Body Weight Change (kg)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Hydration Levels (mL)
                  </TableHead>
                </>
              )}
              {activeTab === 'environment' && (
                <>
                  <TableHead className="hidden md:table-cell text-black">
                    <b>Environment Score</b>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Light Level (lm)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Noise Level (db)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Time in Hallway (min)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Room Change Frequency
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Number of Patients in Room
                  </TableHead>
                </>
              )}
              {activeTab === 'precon' && (
                <TableHead className="hidden md:table-cell text-black">
                  <b>Predisposition Score</b>
                </TableHead>
              )}
              <TableHead className="text-black">
                <b>Status</b>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPatients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                activeTab={activeTab}
                currentIndex={currentIndex}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            {totalPatients > 0 ? (
              <>
                Showing{' '}
                <strong>
                  {patients.length > 0 ? offset + patients.length : 0}
                </strong>{' '}
                of <strong>{totalPatients}</strong> patients
              </>
            ) : (
              <span>Loading patients...</span>
            )}
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalPatients}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
