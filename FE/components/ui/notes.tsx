'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Patient, PatientNotes } from '@/lib/db';

export default function NotesWidget({ patient }: { patient: Patient }) {
  const notes: PatientNotes = patient.notes;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Patient Notes</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nurse">
          <TabsList>
            <TabsTrigger value="nurse">Nurse</TabsTrigger>
            <TabsTrigger value="physician">Physician</TabsTrigger>
            <TabsTrigger value="paramedic">Paramedic</TabsTrigger>
            <TabsTrigger value="social_worker">Social Worker</TabsTrigger>
          </TabsList>

          {/* Nurse Notes */}
          <TabsContent value="nurse">
            <MiniTable title="Nurse Notes" note={notes.nurse} />
          </TabsContent>

          {/* Physician Notes */}
          <TabsContent value="physician">
            <MiniTable title="Physician Notes" note={notes.physician} />
          </TabsContent>

          {/* Paramedic Notes */}
          <TabsContent value="paramedic">
            <MiniTable title="Paramedic Notes" note={notes.paramedic} />
          </TabsContent>

          {/* Social Worker Notes */}
          <TabsContent value="social_worker">
            <MiniTable title="Social Worker Notes" note={notes.social_work} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Reusable Mini Table Component
function MiniTable({ title, note }: { title: string; note: string }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{title}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-sm">{note || "No notes available."}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
