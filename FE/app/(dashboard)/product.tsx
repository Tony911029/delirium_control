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
import { deleteProduct } from './actions';
import { Patient } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export function PatientRow({
  patient,
  activeTab
}: {
  patient: Patient;
  activeTab: string;
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlight(true);
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % patient.vitals.temperature.length;
      });
      setTimeout(() => setHighlight(false), 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [patient.vitals.temperature.length]);

  return (
    <TableRow onClick={() => router.push(`/patient/${patient.id}`)} className="cursor-pointer">
      <TableCell className="hidden sm:table-cell">{patient.id}</TableCell>
      <TableCell className="hidden sm:table-cell">{patient.first_name}</TableCell>
      <TableCell className="hidden sm:table-cell">{patient.last_name}</TableCell>
      <TableCell className="hidden sm:table-cell">{patient.age}</TableCell>
      <TableCell className="hidden sm:table-cell">{patient.gender}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {format(new Date(patient.admitted_at), 'MMMM d, HH:mm')}
      </TableCell>

      {activeTab === 'all' && (
        <>
          {[patient.vitals.temperature, patient.vitals.pulse_rate, patient.vitals.respiration_rate, patient.vitals.blood_pressure, patient.patient_score, patient.env_score, patient.overall_score].map((dataArray, i) => (
            <TableCell key={i} className={`hidden sm:table-cell transition-all duration-300 ${highlight ? 'font-bold text-gray-800' : ''}`}>
              <motion.div animate={{ opacity: highlight ? 0.8 : 1 }} transition={{ duration: 0.2 }}>
                <CountUp start={dataArray[currentIndex - 1] || 0} end={dataArray[currentIndex]} duration={0.5} />
              </motion.div>
            </TableCell>
          ))}
        </>
      )}

      {activeTab === 'active' && (
        <TableCell className={`hidden sm:table-cell transition-all duration-300 ${highlight ? 'font-semibold text-gray-800' : ''}`}>
          <motion.div animate={{ opacity: highlight ? 0.8 : 1 }} transition={{ duration: 0.2 }}>
            <CountUp start={patient.patient_score[currentIndex - 1] || 0} end={patient.patient_score[currentIndex]} duration={0.5} />
          </motion.div>
        </TableCell>
      )}

      {activeTab === 'environment' && (
        <TableCell className={`hidden sm:table-cell transition-all duration-300 ${highlight ? 'font-semibold text-gray-800' : ''}`}>
          <motion.div animate={{ opacity: highlight ? 0.8 : 1 }} transition={{ duration: 0.2 }}>
            <CountUp start={patient.env_score[currentIndex - 1] || 0} end={patient.env_score[currentIndex]} duration={0.5} />
          </motion.div>
        </TableCell>
      )}

      {activeTab === 'precon' && (
        <TableCell className="hidden sm:table-cell">
          {patient.pre_condition_score}
        </TableCell>
      )}
    </TableRow>
  );
}
