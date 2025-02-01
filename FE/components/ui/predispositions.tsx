import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/lib/db';

export default function Predispositions({ patient }: { patient: Patient }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Predispositions</CardTitle>
      </CardHeader>
      <CardContent>content here</CardContent>
    </Card>
  );
}
