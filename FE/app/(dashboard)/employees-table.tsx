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
import { EmployeeRow } from './employee';
import { Patient } from '@/lib/db';
import { Employee } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmployeesTable({
  employees,
  offset,
  totalStaff,
  activeTab = "all"
}: {
  employees: Employee[];
  offset: number;
  totalStaff: number;
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

  const units = ['°C', 'bpm', 'bpm', 'mmHg'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Staff</CardTitle>
        <CardDescription>
          Manage your active staff and view their availability.
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
              <TableHead>Time Shift Started</TableHead>
              <TableHead>Time Shift Ends</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <EmployeeRow key={employee.id} employee={employee} activeTab={activeTab} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            {totalStaff > 0 ? (
              <>
                Showing{' '}
                <strong>
                  {totalStaff}
                </strong>{' '}
                of <strong>{totalStaff}</strong> staff
              </>
            ) : (
              <span>Loading staff...</span>
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
              disabled={offset + productsPerPage > totalStaff}
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
