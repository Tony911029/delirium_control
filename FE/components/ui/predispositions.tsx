'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { Patient } from '@/lib/db';

export default function PredispositionWidget({
  patient
}: {
  patient: Patient;
}) {
  const overall_predisposition_score = patient.pre_condition_score;
  const enrichedNotes = Object.entries(patient.enriched_notes)
    .sort(([a], [b]) => a.localeCompare(b)) // Sort alphabetically
    .map(([key, value]) => {
      const noteSource = value.note_source as keyof Patient['notes']; // Assert valid key
      const originalNote =
        patient.notes[noteSource] || 'No relevant note found.'; // Fallback if missing

      return {
        key,
        classification: value.classification,
        enrichmentText: value.enrichment_text
          ? value.enrichment_text.toUpperCase()
          : null, // Capitalize enrichment text
        noteSource,
        originalNote
      };
    });

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Predisposition Factors</span>
          <span
            className={`p-2 w-11 h-11 text-center rounded-full ${overall_predisposition_score < 4 ? 'bg-blue-200' : overall_predisposition_score < 8 ? 'bg-yellow-200' : 'bg-orange-200'}`}
          >
            {overall_predisposition_score}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 p-4">
          {enrichedNotes.map(
            ({
              key,
              classification,
              enrichmentText,
              noteSource,
              originalNote
            }) => (
              <Card
                key={key}
                className={`bg-opacity-10 ${classification ? 'bg-orange-400' : 'bg-blue-400'}`}
              >
                <CardContent className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="text-md my-2 capitalize">
                      {key.replace(/_/g, ' ')}
                    </h2>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-600 hover:text-black cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-sm">
                        <p className="font-semibold">Source: {noteSource}</p>
                        <p className="mt-1">{originalNote}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  {enrichmentText && (
                    <p className="text-sm mt-2">{enrichmentText}</p>
                  )}
                </CardContent>
              </Card>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
