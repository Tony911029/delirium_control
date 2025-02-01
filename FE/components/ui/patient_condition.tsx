import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/lib/db';

export default function PatientCondition({ patient }: { patient: Patient }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Condition - {}</CardTitle>
      </CardHeader>
      <CardContent>content here</CardContent>
    </Card>
  );
}
