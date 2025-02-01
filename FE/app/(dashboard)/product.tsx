import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
// import { SelectProduct } from '@/lib/db';
import { deleteProduct } from './actions';
import { Patient } from '@/lib/db';

export function PatientRow({ patient, activeTab }: { patient: Patient; activeTab: string }) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">{patient.id}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.first_name}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.last_name}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.age}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.gender}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.admitted_at}</TableCell>
      {activeTab === "all" && (
        <>
          <TableCell className="hidden sm:table-cell">{patient.vitals.temperature[0]}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.vitals.pulse_rate[0]}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.vitals.respiration_rate[0]}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.vitals.blood_pressure[0]}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.patient_score}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.env_score}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.pre_condition_score}</TableCell>
          <TableCell className="hidden sm:table-cell">{patient.overall_score}</TableCell>
        </>
      )}
      {activeTab === "active" && (
          <TableCell className="hidden sm:table-cell">{patient.patient_score}</TableCell>
      )}
      {activeTab === "environment" && (
          <TableCell className="hidden sm:table-cell">{patient.env_score}</TableCell>
      )}
      {activeTab === "precon" && (
          <TableCell className="hidden sm:table-cell">{patient.pre_condition_score}</TableCell>
      )}

      {/* <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.imageUrl}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.availableAt.toLocaleDateString("en-US")}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell> */}
    </TableRow>
  );
}
