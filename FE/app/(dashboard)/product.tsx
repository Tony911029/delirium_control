import { useState, useEffect } from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Patient, PatientStatus, RoomPatientStatus } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export function PatientRow({
  patient,
  activeTab,
  currentIndex
}: {
  patient: Patient;
  activeTab: string;
  currentIndex: number;
}) {
  const router = useRouter();
  const patient_status = patient.patient_status;
  const statusColors: Record<PatientStatus, string> = {
    'Discharged - No Delirium': 'bg-blue-200 text-blue-800',
    'Discharged - Delirium Incident': 'bg-orange-200 text-orange-800',
    'Program Exclusion': 'bg-gray-300 text-gray-700',
    'Active Monitoring': 'bg-purple-200 text-purple-800'
  };
  const room_status = patient.room_status;
  const roomstatusColors: Record<RoomPatientStatus, string> = {
    'Vacant': 'bg-blue-200 text-blue-800',
    'Occupied': 'bg-orange-200 text-orange-800'
  };

  const [selectedStatus, setSelectedStatus] =
    useState<PatientStatus>(patient_status);
  const [selectedRoomStatus, setSelectedRoomStatus] = 
    useState<RoomPatientStatus>(room_status);
  const statuses: PatientStatus[] = Object.keys(
    statusColors
  ) as PatientStatus[];
  const roomstatuses: RoomPatientStatus[] = Object.keys(
    roomstatusColors
  ) as RoomPatientStatus[];

const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as PatientStatus;
    setSelectedStatus(newStatus);
  };

  const handleRoomStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRoomStatus = event.target.value as RoomPatientStatus;
    setSelectedRoomStatus(newRoomStatus);
  };
  return (
    <TableRow
      onClick={() => router.push(`/patient/${patient.id}`)}
      className="cursor-pointer"
    >
      <TableCell className="hidden sm:table-cell">{patient.id}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {patient.first_name}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {patient.last_name}
      </TableCell>
      <TableCell className="hidden sm:table-cell">{patient.age}</TableCell>
      <TableCell className="hidden sm:table-cell">{patient.gender}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {format(new Date(patient.admitted_at), 'MMM d, HH:mm')}
      </TableCell>

      {activeTab === 'all' && (
        <>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.temperature[currentIndex]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.pulse_rate[currentIndex]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.respiration_rate[currentIndex]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.blood_pressure[currentIndex]}
          </TableCell>
          <TableCell className="hidden sm:table-cell text-black font-bold cursor-pointer">
            {patient.overall_vitals_score[currentIndex]}
          </TableCell>
          <TableCell className="hidden sm:table-cell text-black font-bold cursor-pointer">
            {patient.patient_score[currentIndex]}
          </TableCell>
          <TableCell className="hidden sm:table-cell text-black font-bold cursor-pointer">
            {patient.env_score[currentIndex]}
          </TableCell>
          <TableCell className="hidden sm:table-cell text-black font-bold cursor-pointer">
            {patient.pre_condition_score}
          </TableCell>
          <TableCell className="hidden sm:table-cell text-black font-bold">
            {patient.overall_score[currentIndex]}
          </TableCell>
        </>
      )}

      {activeTab === 'vitals' && (
        <>
          <TableCell className="hidden sm:table-cell text-black font-bold cursor-pointer">
            {patient.overall_vitals_score[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.temperature[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.pulse_rate[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.respiration_rate[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.blood_pressure[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.bgl[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.hrv[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.vitals.blood_oxygen_saturation[0]}
          </TableCell>
        </>
      )}

      {activeTab === 'active' && (
        <>
          <TableCell className="hidden sm:table-cell text-black font-bold cursor-pointer">
            {patient.patient_score[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.patient_score_fields.time_since_last_visitor[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.patient_score_fields.time_since_last_cam_test[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.patient_score_fields.sleep_deprivation[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.patient_score_fields.body_weight_change[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.patient_score_fields.hydration_levels[0]}
          </TableCell>
        </>
      )}

      {activeTab === 'environment' && (
        <>
          <TableCell className="hidden sm:table-cell text-black font-bold cursor-pointer">
            {patient.env_score[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.env_score_fields.lighting_levels[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.env_score_fields.noise_levels[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.env_score_fields.time_in_hallway[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.env_score_fields.room_change_frequency[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.env_score_fields.number_of_patients_in_room[0]}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.room_number}
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            {patient.room_cleanliness}
          </TableCell>
          <TableCell
            className="hidden sm:table-cell"
            onClick={(event) => event.stopPropagation()} // added to exclude this cell from row click logic
          >
            <div className="w-[120px]">
              <select
                value={selectedRoomStatus}
                onChange={(event) => {
                  event.stopPropagation();
                  handleRoomStatusChange(event);
                }}
                className={`px-2 py-1 w-full rounded-lg text-xs font-medium border-0 focus:outline-none truncate ${roomstatusColors[selectedRoomStatus]}`}
              >
                {roomstatuses.map((roomstatus) => (
                  <option key={roomstatus} value={roomstatus} className="text-black whitespace-normal">
                    {roomstatus}
                  </option>
                ))}
              </select>
            </div>
          </TableCell>
        </>
      )}

      {activeTab === 'precon' && (
        <>
          <TableCell className="hidden sm:table-cell text-black font-bold cursor-pointer">
            {patient.pre_condition_score}
          </TableCell>
        </>
      )}

      <TableCell
        className="hidden sm:table-cell"
        onClick={(event) => event.stopPropagation()} // added to exclude this cell from row click logic
      >
        <div className="w-[120px]">
          <select
            value={selectedStatus}
            onChange={(event) => {
              event.stopPropagation();
              handleStatusChange(event);
            }}
            className={`px-2 py-1 w-full rounded-lg text-xs font-medium border-0 focus:outline-none truncate ${statusColors[selectedStatus]}`}
          >
            {statuses.map((status) => (
              <option key={status} value={status} className="text-black whitespace-normal">
                {status}
              </option>
            ))}
          </select>
        </div>
      </TableCell>
    </TableRow>
  );
}
