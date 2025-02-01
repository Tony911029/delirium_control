import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Patient } from '@/lib/db';

export default function EnvironmentalFactors({
  patient
}: {
  patient: Patient;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Environmental Factors</CardTitle>
      </CardHeader>
      <CardContent>content here</CardContent>
    </Card>
  );
}
