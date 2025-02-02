// import 'server-only';

// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import {
//   pgTable,
//   text,
//   numeric,
//   integer,
//   timestamp,
//   pgEnum,
//   serial
// } from 'drizzle-orm/pg-core';
// import { count, eq, ilike } from 'drizzle-orm';
// import { createInsertSchema } from 'drizzle-zod';

// export const db = drizzle(neon(process.env.POSTGRES_URL!));

// export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

// export const products = pgTable('products', {
//   id: serial('id').primaryKey(),
//   imageUrl: text('image_url').notNull(),
//   name: text('name').notNull(),
//   status: statusEnum('status').notNull(),
//   price: numeric('price', { precision: 10, scale: 2 }).notNull(),
//   stock: integer('stock').notNull(),
//   availableAt: timestamp('available_at').notNull()
// });

// export type SelectProduct = typeof products.$inferSelect;
// export const insertProductSchema = createInsertSchema(products);

// export async function getProducts(
//   search: string,
//   offset: number
// ): Promise<{
//   products: SelectProduct[];
//   newOffset: number | null;
//   totalProducts: number;
// }> {
//   // Always search the full table, not per page
//   if (search) {
//     return {
//       products: await db
//         .select()
//         .from(products)
//         .where(ilike(products.name, `%${search}%`))
//         .limit(1000),
//       newOffset: null,
//       totalProducts: 0
//     };
//   }

//   if (offset === null) {
//     return { products: [], newOffset: null, totalProducts: 0 };
//   }

//   let totalProducts = await db.select({ count: count() }).from(products);
//   let moreProducts = await db.select().from(products).limit(5).offset(offset);
//   let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

//   return {
//     products: moreProducts,
//     newOffset,
//     totalProducts: totalProducts[0].count
//   };
// }

// export async function deleteProductById(id: number) {
//   await db.delete(products).where(eq(products.id, id));
// }

interface PatientNotes {
  paramedic: string;
  nurse: string;
  physician: string;
  social_work: string;
}

interface EnrichedNotes {
  [key: string]: {
    classification: boolean | number;
    enrichment_text: string | null;
    note_source: keyof PatientNotes;
  };
}

export type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  admitted_at: string; // ISO date string
  physician_name: string;
  nursing_name: string;
  is_included: boolean;
  vitals: {
    temperature: number[];
    pulse_rate: number[];
    respiration_rate: number[];
    blood_pressure: number[];
    bgl: number[];
    hrv: number[];
    blood_oxygen_saturation: number[];
  };
  patient_score_fields: {
    time_since_last_visitor: number[];
    time_since_last_cam_test: number[];
    sleep_deprivation: boolean[];
    body_weight_change: number[];
    hydration_levels: number[];
  };
  patient_score: number[];
  env_score: number[];
  env_score_fields: {
    lighting_levels: number[];
    noise_levels: number[];
    time_in_hallway: number[];
    room_change_frequency: number[];
    number_of_patients_in_room: number[];
  };
  notes: PatientNotes;
  enriched_notes: {
    [key: string]: {
      classification: boolean | number;
      enrichment_text: string | null;
      note_source: keyof EnrichedNotes;
    };
  };
  overall_vitals_score: number[];
  pre_condition_score: number;
  overall_score: number[];
};

export const getPatients = (): Patient[] => [
  {
    id: '3',
    first_name: 'Ronald',
    last_name: 'McDonald',
    age: 72,
    gender: 'Male',
    admitted_at: '2024-02-01T02:00:00',
    physician_name: 'Dr. John Doe',
    nursing_name: 'Nurse Jane Doe',
    is_included: true,
    vitals: {
      temperature: [
        36.8, 37.0, 37.2, 37.4, 37.6, 37.9, 38.2, 38.4, 38.5, 38.3, 38.1, 37.8,
        37.6, 37.4, 37.2, 37.0, 36.9, 36.8, 36.8, 36.7
      ],
      pulse_rate: [
        88, 92, 95, 98, 102, 105, 108, 112, 115, 110, 105, 100, 98, 95, 92, 90,
        88, 85, 82, 80
      ],
      respiration_rate: [
        20, 21, 22, 23, 24, 25, 26, 26, 25, 24, 23, 22, 21, 20, 19, 19, 18, 18,
        18, 18
      ],
      blood_pressure: [
        135, 138, 142, 145, 148, 152, 155, 158, 160, 155, 150, 145, 142, 138,
        135, 132, 130, 128, 125, 122
      ],
      bgl: [
        5.8, 6.0, 6.2, 6.4, 6.6, 6.8, 7.0, 7.1, 7.0, 6.8, 6.6, 6.4, 6.2, 6.0,
        5.8, 5.6, 5.4, 5.3, 5.2, 5.1
      ],
      hrv: [
        22, 21, 20, 19, 18, 17, 16, 15, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
        24, 25
      ],
      blood_oxygen_saturation: [
        95, 94, 93, 92, 91, 90, 90, 89, 89, 90, 91, 92, 93, 94, 95, 96, 96, 97,
        97, 98
      ]
    },
    overall_vitals_score: [
      3, 3, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 3, 3, 2, 2, 2, 2
    ],
    patient_score_fields: {
      time_since_last_visitor: [
        36, 60, 84, 108, 132, 156, 180, 204, 228, 12, 36, 60, 84, 108, 132, 156,
        180, 204, 228, 252
      ],
      time_since_last_cam_test: [
        6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18,
        24
      ],
      sleep_deprivation: [
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        false
      ],
      body_weight_change: [
        -0.3, -0.6, -0.9, -1.2, -1.5, -1.8, -2.0, -2.2, -2.0, -1.8, -1.5, -1.2,
        -0.9, -0.6, -0.3, -0.1, 0, 0.2, 0.3, 0.4
      ],
      hydration_levels: [
        -1, -2, -2, -3, -3, -3, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 0, 0, 0, 0
      ]
    },
    patient_score: [
      4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 4, 3, 3, 2, 2, 2
    ],
    env_score_fields: {
      lighting_levels: [
        3, 3, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
      ],
      noise_levels: [
        4, 4, 5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
      ],
      time_in_hallway: [
        40, 45, 50, 55, 60, 65, 70, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25,
        20, 15
      ],
      room_change_frequency: [
        0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      number_of_patients_in_room: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
      ]
    },
    env_score: [5, 5, 6, 7, 8, 9, 9, 9, 8, 7, 6, 5, 4, 4, 3, 3, 3, 2, 2, 2],
    notes: {
      paramedic:
        'Family reports worsening confusion over the past 24 hours. Found sitting in recliner, appearing lethargic with slurred speech. Home environment cluttered with unopened food containers, empty alcohol bottles noted near bedside. EMS glucometer reads blood glucose 410 mg/dL. Strong odor of alcohol present. Transported for further assessment due to altered mental status and concern for metabolic imbalance.',
      nurse:
        'Patient lethargic but rousable to verbal stimuli. Glasgow Coma Scale: 14 (E4, V4, M6). Family confirms history of alcohol use and inconsistent diabetes management. Reports nausea, headache, and mild abdominal discomfort. IV fluids and insulin drip initiated for hyperglycemia. Monitoring for signs of alcohol withdrawal (CIWA protocol initiated). Dehydration suspected due to dry mucous membranes and tachycardia (HR: 98).',
      physician:
        '72-year-old male presenting with altered mental status, hyperglycemia, and suspected alcohol withdrawal. Labs show metabolic acidosis, consistent with early diabetic ketoacidosis. Blood alcohol level elevated at 0.18%. Initiated insulin therapy and fluids to correct hyperglycemia and dehydration. Reassess for any signs of alcohol withdrawal, continue monitoring. Neurologic exam intact, no focal deficits. CT head negative.',
      social_work:
        "Patient's living conditions are concerning with evidence of neglect, alcohol misuse, and lack of proper diabetes management. Recommend referral for social services for home safety evaluation, alcohol use disorder treatment, and caregiver support."
    },
    enriched_notes: {
      age_greater_than_65: {
        classification: true,
        enrichment_text: '76 years old',
        note_source: 'physician'
      },
      drug_and_alcohol_withdrawal: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician' // Mentioned in physician's note: "Blood alcohol level elevated at 0.18%."
      },
      pre_hospital_sleep_deprivation: {
        classification: false,
        enrichment_text: null,
        note_source: 'paramedic' // Paramedic mentions patient found in recliner appearing lethargic.
      },
      glasgow_coma_scale: {
        classification: 13,
        enrichment_text: 'GCS: 13 (E4, V4, M5), disoriented to time and date',
        note_source: 'nurse' // Nurse notes GCS assessment.
      },
      threat_alert: {
        classification: false,
        enrichment_text: null,
        note_source: 'paramedic' // Paramedic does not report any immediate violence or agitation.
      },
      droplet_precaution: {
        classification: false,
        enrichment_text: null,
        note_source: 'nurse' // No mention of respiratory infections or COVID-related symptoms.
      },
      active_infections: {
        classification: false,
        enrichment_text: 'No signs of UTI or pneumonia',
        note_source: 'physician' // Physician notes no acute infections.
      },
      fever_or_abnormal_temperature_fluctuations: {
        classification: false,
        enrichment_text: 'Temperature 36.7°C; no fever detected',
        note_source: 'nurse' // Nurse monitors vitals, including temperature.
      },
      pre_existing_dehydration_or_malnutrition: {
        classification: true,
        enrichment_text:
          'Dehydration suspected; mucous membranes dry; IV fluids initiated',
        note_source: 'nurse' // Nurse notes dehydration signs and intervention.
      },
      limited_mobility: {
        classification: true,
        enrichment_text:
          'Reports hip pain; bruising on left hip; fall precautions initiated',
        note_source: 'nurse' // Nurse assesses pain and initiates fall precautions.
      },
      cognitive_impairment: {
        classification: true,
        enrichment_text:
          'Disoriented to time and date; increased forgetfulness reported',
        note_source: 'social_work' // Social worker mentions cognitive concerns and forgetfulness.
      },
      recent_major_surgery: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician' // No mention of recent surgery in physician's report.
      },
      chronic_pain_conditions: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician' // No long-term narcotic use mentioned in physician's note.
      },
      sensory_impairments: {
        classification: true,
        enrichment_text:
          'Wears glasses but struggles to read medication labels',
        note_source: 'paramedic' // Paramedic reports patient unable to read labels with glasses.
      }
    },
    pre_condition_score: 3,
    overall_score: [
      7, 8, 8, 9, 9, 10, 10, 9, 8, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2
    ]
  }
];
