import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PatientsTable } from './products-table';
import { EmployeesTable } from './employees-table';
// import { getProducts } from '@/lib/db';
import { getPatients } from '@/lib/db';
import { getEmployees } from '@/lib/db';

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  
  const patients = await getPatients();
  const employees = await getEmployees();
  const newOffset = 0;
  const totalPatients = patients.length;
  const totalStaff = employees.length;

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">Overall Risk Score</TabsTrigger>
          <TabsTrigger value="vitals">Vitals Score</TabsTrigger>
          <TabsTrigger value="active">Patient Score</TabsTrigger>
          <TabsTrigger value="environment">Environment Score</TabsTrigger>
          <TabsTrigger value="precon" className="hidden sm:flex">
            Predisposition Score
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="all">
        <PatientsTable patients={patients} offset={newOffset ?? 0} totalPatients={totalPatients} />
        <div className="mt-6">
          <EmployeesTable employees={employees} offset={newOffset ?? 0} totalStaff={totalStaff} />
        </div>
      </TabsContent>

      <TabsContent value="vitals">
        <PatientsTable patients={patients} offset={newOffset ?? 0} totalPatients={totalPatients} activeTab="vitals" />
        <div className="mt-6">
          <EmployeesTable employees={employees} offset={newOffset ?? 0} totalStaff={totalStaff} activeTab="vitals" />
        </div>
      </TabsContent>

      <TabsContent value="active">
        <PatientsTable patients={patients} offset={newOffset ?? 0} totalPatients={totalPatients} activeTab="active" />
        <div className="mt-6">
          <EmployeesTable employees={employees} offset={newOffset ?? 0} totalStaff={totalStaff} activeTab="active" />
        </div>
      </TabsContent>

      <TabsContent value="environment">
        <PatientsTable patients={patients} offset={newOffset ?? 0} totalPatients={totalPatients} activeTab="environment" />
        <div className="mt-6">
          <EmployeesTable employees={employees} offset={newOffset ?? 0} totalStaff={totalStaff} activeTab="environment" />
        </div>
      </TabsContent>

      <TabsContent value="precon">
        <PatientsTable patients={patients} offset={newOffset ?? 0} totalPatients={totalPatients} activeTab="precon" />
        <div className="mt-6">
          <EmployeesTable employees={employees} offset={newOffset ?? 0} totalStaff={totalStaff} activeTab="precon" />
        </div>
      </TabsContent>
      
    </Tabs>
  );
}