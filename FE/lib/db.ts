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

export type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  admitted_at: string; // ISO date string
  physician_name: string;
  nursing_name: string;
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
  }
  patient_score: number[];
  env_score: number[];
  env_score_fields: {
    lighting_levels: number[];
    noise_levels: number[];
    time_in_hallway: number[];
    room_change_frequency: number[];
    number_of_patients_in_room: number[];
  };
  notes: {
    paramedic: string;
    nursing: string;
    physician: string;
    social_work: string;
  };
  enriched_notes: {
    [key: string]: {
      classification: boolean | number;
      enrichment_text: string;
    };
  };
  overall_vitals_score: number[];
  pre_condition_score: number;
  overall_score: number[];
};


export const getPatients = () : Patient[] => ([
    {
      "id": "1",
      "first_name": "Linda",
      "last_name": "K",
      "age": 76,
      "gender": "Female",
      "admitted_at": "2021-01-01T08:00:00",
      "physician_name": "Dr. John Doe",
      "nursing_name": "Nurse Jane Doe",

      "vitals": {
          "temperature": [36.5, 36.6, 36.4, 36.7, 36.8, 36.3, 36.9, 36.5, 36.4, 36.6, 36.7, 36.5, 36.8, 36.4, .6, 36.5, 36.7, 36.4, 37.8, 37.6],
          "pulse_rate": [72, 75, 71, 73, 70, 74, 76, 73, 71, 69, 72, 80, 86, 90, 100, 115, 120, 130, 150, 160],
          "respiration_rate": [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],     
          "blood_pressure": [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 145, 157, 150, 140, 170, 150, 150],
          "bgl": [2.5, 2.6, 2.4, 2.7, 2.8, 2.3, 2.9, 2.5, 2.4, 2.6, 2.7, 2.5, 2.8, 3.1, 3.1, 2.5, 2.7, 2.4, 2.8, 2.6],
          "hrv": [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
          "blood_oxygen_saturation": [95, 96, 97, 98, 99, 100, 95, 96, 97, 98, 99, 100, 95, 96, 97, 98, 99, 95, 95, 96],
      },
      "overall_vitals_score": [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 4, 5, 7, 8, 9, 10, 10, 10],

      "patient_score_fields": {
          "time_since_last_visitor": [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125],
          "time_since_last_cam_test": [120, 125, 130, 135, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220],
          "sleep_deprivation": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          "body_weight_change": [1.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          "hydration_levels": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      "patient_score": [6, 7, 8, 9, 10, 6, 7, 8, 9, 10, 6, 7, 8, 9, 10, 6, 7, 8, 9, 10],

      "env_score_fields": {
          "lighting_levels": [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
          "noise_levels": [6,7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
          "time_in_hallway": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] ,
          "room_change_frequency": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          "number_of_patients_in_room": [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      },
      "env_score": [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 10, 10],

      "notes": {
          "paramedic": "Patient found sitting on the floor near her bed, unable to recall how long she had been there. No visible head trauma, but bruising noted on left hip. Home cluttered, with outdated food in the fridge. Glasses found but patient unable to read medication labels clearly. Neighbors state she rarely leaves the house. Assisted to stretcher and transported for evaluation.",
          "nursing": "Patient alert but disoriented to time and date. Reports hip pain (4/10) but denies recent falls, despite visible bruising. Mucous membranes dry; dehydration suspected. No signs of acute distress. Glasgow Coma Scale: 13. Initiated fall precautions, IV fluids, and hydration monitoring. Awaiting imaging for suspected orthopedic injury.",
          "physician": "76-year-old female presenting with acute confusion, dehydration, and suspected fall-related injury. No acute fractures on X-ray. Orthostatic hypotension present, contributing to fall risk. Plan includes IV fluids, hydration monitoring, pain management, and physical therapy consultation. Will monitor cognitive status for potential delirium.",
          "social_work": "Patient lives alone with no immediate family nearby. Home environment described as cluttered and unsafe by EMS. Reports increased forgetfulness but no formal dementia diagnosis. Referral placed for in-home safety evaluation and community support services."
      },
      "enriched_notes": 
      {
          "Age (≥65)": {
              "classification": true,
              "enrichment_text": "76 years old"
          },
          "Drug and alcohol withdrawal": {
              "classification": false,
              "enrichment_text": ''
          },
          "Pre-hospital sleep deprivation": {
              "classification": false,
              "enrichment_text": ''
          },
          "Glasgow coma scale": {
              "classification": 13,
              "enrichment_text": "GCS: 13 (E4, V4, M5), disoriented to time and date"
          },
          "Threat alert": {
              "classification": false,
              "enrichment_text": ''
          },
          "Droplet precaution": {
              "classification": false,
              "enrichment_text": ''
          },
          "Active infections (UTIs, pneumonia, other ongoing infections)": {
              "classification": false,
              "enrichment_text": "No signs of UTI or pneumonia"
          },
          "Fever or abnormal temperature fluctuations at admission": {
              "classification": false,
              "enrichment_text": "Temperature 36.7°C; no fever detected"
          },
          "Pre-existing dehydration or malnutrition": {
              "classification": true,
              "enrichment_text": "Dehydration suspected; mucous membranes dry; IV fluids initiated"
          },
          "Limited mobility (recent hip fracture, wheelchair use, difficulty walking)": {
              "classification": true,
              "enrichment_text": "Reports hip pain; bruising on left hip; fall precautions initiated"
          },
          "Cognitive impairment (dementia, mild cognitive impairment, prior stroke, Parkinson’s, severe TBI history)": {
              "classification": true,
              "enrichment_text": "Disoriented to time and date; increased forgetfulness reported"
          },
          "Recent major surgery (especially orthopedic or cardiac, where anesthesia exposure was significant)": {
              "classification": false,
              "enrichment_text": ''
          },
          "Chronic pain conditions (patients on long-term narcotics, opioids, or sedatives before admission)": {
              "classification": false,
              "enrichment_text": ''
          },
          "Sensory impairments (glasses, hearing aids, etc)": {
              "classification": true,
              "enrichment_text": "Wears glasses but struggles to read medication labels"
          }
      },
      "pre_condition_score": 7,

      "overall_score": [7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10],
  }
]);
