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
// import { SelectProduct } from '@/lib/db';
// import { SelectPatient } from '@/lib/db';
import { Patient } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <CardTitle>Patients</CardTitle>
        <CardDescription>
          Manage your patients and view their delirium index.
        </CardDescription>
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
                    Time Since Last Visitor (hr)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Time Since Last CAM Test (hr)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Sleep Deprivation 
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Body Weight Change (kg)
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Hydration Levels (USG)
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
            {patients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                activeTab={activeTab}
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
                  {totalPatients}
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
