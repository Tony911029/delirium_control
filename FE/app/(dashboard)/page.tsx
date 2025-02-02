import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PatientsTable } from './products-table';
// import { getProducts } from '@/lib/db';
import { getPatients } from '@/lib/db';

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  // const { products, newOffset, totalProducts } = await getProducts(
  //   search,
  //   Number(offset)
  // );
  const patients = getPatients();
  const newOffset = 0;
  const totalPatients = patients.length;

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">Overall Score</TabsTrigger>
          <TabsTrigger value="vitals">Vitals Score</TabsTrigger>
          <TabsTrigger value="active">Patient Score</TabsTrigger>
          <TabsTrigger value="environment">Environment Score</TabsTrigger>
          <TabsTrigger value="precon" className="hidden sm:flex">
            Predisposition Score
          </TabsTrigger>
        </TabsList>
        {/* <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div> */}
      </div>
      <TabsContent value="all">
        <PatientsTable
          patients={patients}
          offset={newOffset ?? 0}
          totalPatients={totalPatients}
        />
      </TabsContent>
      <TabsContent value="vitals">
        <PatientsTable
          patients={patients}
          offset={newOffset ?? 0}
          totalPatients={totalPatients}
          activeTab='vitals'
        />
      </TabsContent>
      <TabsContent value="active">
        <PatientsTable
          patients={patients}
          offset={newOffset ?? 0}
          totalPatients={totalPatients}
          activeTab='active'
        />
      </TabsContent>
      <TabsContent value="environment">
        <PatientsTable
          patients={patients}
          offset={newOffset ?? 0}
          totalPatients={totalPatients}
          activeTab='environment'
        />
      </TabsContent>
      <TabsContent value="precon">
        <PatientsTable
          patients={patients}
          offset={newOffset ?? 0}
          totalPatients={totalPatients}
          activeTab='precon'
        />
      </TabsContent>
    </Tabs>
  );
}
