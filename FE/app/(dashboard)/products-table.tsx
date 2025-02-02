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
import { ChevronLeft, ChevronRight, ArrowUpDown, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { log } from 'console';

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

  // Add currentIndex state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const maxTimesteps = patients[0]?.overall_score.length || 0;

  // Add useEffect for cycling through timesteps
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % maxTimesteps);
    }, 5000);

    return () => clearInterval(interval);
  }, [maxTimesteps, isPaused]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Sort patients based on the current timestep
  const sortedPatients = [...patients].sort((a, b) => {
    const aScore = a.overall_score[currentIndex];
    const bScore = b.overall_score[currentIndex];
    return bScore - aScore; // Always descending
  });

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
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
                    <b>Overall Score</b>
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
              <TableHead>
                <span className="sr-only">Actions</span>
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
                Showing <strong>{totalPatients}</strong> of{' '}
                <strong>{totalPatients}</strong> patients
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
              disabled={offset === productsPerPage}
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
