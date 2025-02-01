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
      <CardContent>{patient.env_score_fields.lighting_levels[0]}</CardContent>
    </Card>
  );
}

// "env_score_fields": {
//   "lighting_levels": [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
//   "noise_levels": [6,7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
//   "time_in_hallway": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] ,
//   "room_change_frequency": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   "number_of_patients_in_room": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
// },
// "env_score": [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 10, 10],
