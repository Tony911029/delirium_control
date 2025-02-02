import { useState, useEffect } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Patient } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Employee } from '@/lib/db';

export function EmployeeRow({
  employee,
  activeTab,
  onTabChange, // new optional prop
}: { 
  employee: Employee; 
  activeTab: string; 
  onTabChange?: (value: string) => void; // new callback
}) {
  const router = useRouter();

  // State for cycling through vitals in "all" tab
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <TableRow className="cursor-pointer">
      <TableCell className="hidden sm:table-cell">{employee.id}</TableCell>
      <TableCell className="hidden sm:table-cell">{employee.first_name}</TableCell>
      <TableCell className="hidden sm:table-cell">{employee.last_name}</TableCell>
      <TableCell className="hidden sm:table-cell">{employee.age}</TableCell>
      <TableCell className="hidden sm:table-cell">{employee.gender}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {format(new Date(employee.time_started), 'MMMM d, HH:mm')}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {format(new Date(employee.time_ends), 'MMMM d, HH:mm')}
      </TableCell>

    </TableRow>
  );
}
