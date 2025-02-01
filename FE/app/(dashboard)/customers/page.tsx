import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function CustomersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardDescription>View all patients and their data.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
