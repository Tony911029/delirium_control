interface PatientNotes {
  paramedic: string;
  nurse: string;
  physician: string;
  social_work: string;
}

export interface EnrichedNotes {
  [key: string]: {
    classification: boolean | number;
    enrichment_text: string | null;
    note_source: keyof PatientNotes;
  };
}

export type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;  
  gender: 'Male' | 'Female' | 'Other';
  time_started: string; // ISO date string
  time_ends: string; // ISO date string
}

export type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  admitted_at: string; // ISO date string
  physician_name: string;
  nurse_name: string;
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

export const getEmployees = (): Employee[] => [
  {
    id: '1',
    first_name: 'Jane',
    last_name: 'Doe',
    age: 32,
    gender: "Female",
    time_started: '2024-02-01T02:00:00',
    time_ends: '2024-02-02T02:00:00'
  },
  {
    id: '2',
    first_name: 'John',
    last_name: 'Doe',
    age: 34,
    gender: "Male",
    time_started: '2024-02-01T08:00:00',
    time_ends: '2024-02-02T08:00:00'
  },
];

export const getPatients = (): Patient[] => [
  {
    id: '1',
    first_name: 'Linda',
    last_name: 'Kowalski',
    age: 76,
    gender: 'Female',
    admitted_at: '2021-01-01T08:00:00',
    physician_name: 'Dr. John Doe',
    nurse_name: 'Nurse Jane Doe',
    is_included: true,
    vitals: {
      temperature: [
        36.5, 36.6, 36.4, 36.7, 36.8, 36.3, 36.9, 36.5, 36.4, 36.6, 36.7, 36.5,
        36.8, 36.4, 36.6, 36.5, 36.7, 36.4, 37.8, 37.6
      ],
      pulse_rate: [
        72, 75, 71, 73, 70, 74, 76, 73, 71, 69, 72, 80, 86, 90, 100, 115, 120,
        130, 150, 160
      ],
      respiration_rate: [
        12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31
      ],
      blood_pressure: [
        120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 145,
        157, 150, 140, 170, 150, 150
      ],
      bgl: [
        2.5, 2.6, 2.4, 2.7, 2.8, 2.3, 2.9, 2.5, 2.4, 2.6, 2.7, 2.5, 2.8, 3.1,
        3.1, 2.5, 2.7, 2.4, 2.8, 2.6
      ],
      hrv: [
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
        48, 49
      ],
      blood_oxygen_saturation: [
        95, 96, 97, 98, 99, 100, 95, 96, 97, 98, 99, 100, 95, 96, 97, 98, 99,
        95, 95, 96
      ]
    },
    overall_vitals_score: [
      1, 2, 1, 4, 3, 5, 4, 6, 3, 5, 2, 3, 4, 5, 7, 8, 9, 10, 10, 10
    ],
    patient_score_fields: {
      time_since_last_visitor: [
        30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110,
        115, 120, 125
      ],
      time_since_last_cam_test: [
        120, 125, 130, 135, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190,
        195, 200, 205, 210, 215, 220
      ],
      sleep_deprivation: Array(20).fill(false),
      body_weight_change: [
        1.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      hydration_levels: [
        0, -1, -2, -2, -3, -3, -3, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2
      ]
    },
    patient_score: [
      6, 7, 8, 9, 10, 6, 7, 8, 9, 10, 6, 7, 8, 9, 10, 6, 7, 8, 9, 10
    ],
    env_score_fields: {
      lighting_levels: Array(20).fill(3),
      noise_levels: [
        6, 7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
      ],
      time_in_hallway: Array(20).fill(10),
      room_change_frequency: Array(20).fill(1),
      number_of_patients_in_room: Array(20).fill(2)
    },
    env_score: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 10, 10],
    notes: {
      paramedic:
        'Patient found sitting on the floor near her bed, unable to recall how long she had been there. No visible head trauma, but bruising noted on left hip. Home cluttered, with outdated food in the fridge. Glasses found but patient unable to read medication labels clearly. Neighbors state she rarely leaves the house. Assisted to stretcher and transported for evaluation.',
      nurse:
        'Patient alert but disoriented to time and date. Reports hip pain (4/10) but denies recent falls, despite visible bruising. Mucous membranes dry; dehydration suspected. No signs of acute distress. Glasgow Coma Scale: 13. Initiated fall precautions, IV fluids, and hydration monitoring. Awaiting imaging for suspected orthopedic injury.',
      physician:
        '76-year-old female presenting with acute confusion, dehydration, and suspected fall-related injury. No acute fractures on X-ray. Orthostatic hypotension present, contributing to fall risk. Plan includes IV fluids, hydration monitoring, pain management, and physical therapy consultation. Will monitor cognitive status for potential delirium.',
      social_work:
        'Patient lives alone with no immediate family nearby. Home environment described as cluttered and unsafe by EMS. Reports increased forgetfulness but no formal dementia diagnosis. Referral placed for in-home safety evaluation and community support services.'
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
        note_source: 'physician'
      },
      pre_hospital_sleep_deprivation: {
        classification: false,
        enrichment_text: null,
        note_source: 'paramedic'
      },
      glasgow_coma_scale: {
        classification: 13,
        enrichment_text: 'GCS: 13 (E4, V4, M5), disoriented to time and date',
        note_source: 'nurse'
      },
      threat_alert: {
        classification: false,
        enrichment_text: null,
        note_source: 'paramedic'
      },
      droplet_precaution: {
        classification: false,
        enrichment_text: null,
        note_source: 'nurse'
      },
      active_infections: {
        classification: false,
        enrichment_text: 'No signs of UTI or pneumonia',
        note_source: 'physician'
      },
      pre_existing_dehydration_or_malnutrition: {
        classification: true,
        enrichment_text: 'Dehydration suspected; mucous membranes dry',
        note_source: 'nurse'
      },
      limited_mobility: {
        classification: true,
        enrichment_text:
          'Reports hip pain; bruising on left hip; fall precautions initiated',
        note_source: 'nurse'
      },
      cognitive_impairment: {
        classification: true,
        enrichment_text:
          'Disoriented to time and date; increased forgetfulness reported',
        note_source: 'social_work'
      },
      recent_major_surgery: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician'
      },
      chronic_pain_conditions: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician'
      },
      sensory_impairments: {
        classification: true,
        enrichment_text:
          'Wears glasses but struggles to read medication labels',
        note_source: 'paramedic'
      },
      social_isolation: {
        classification: true,
        enrichment_text:
          'Lives alone, no nearby family; rarely leaves the house',
        note_source: 'social_work'
      },
      neglect_or_unsanitary_living_conditions: {
        classification: true,
        enrichment_text: 'Cluttered home with rotten food; unsafe environment',
        note_source: 'paramedic'
      }
    },
    pre_condition_score: 7,
    overall_score: [
      7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10
    ]
  },
  {
    id: '2',
    first_name: 'Alex',
    last_name: 'Huang',
    age: 84,
    gender: 'Male',
    admitted_at: '2024-03-05T17:00:00',
    physician_name: 'Dr. John Doe',
    nurse_name: 'Nurse Jane Doe',
    is_included: true,
    vitals: {
      temperature: [
        37.0, 36.9, 36.8, 37.2, 37.1, 37.3, 37.5, 37.7, 37.8, 37.6, 37.4, 37.2,
        37.1, 37.0, 36.8, 36.7, 36.8, 36.9, 36.7, 36.6
      ],
      pulse_rate: [
        85, 87, 90, 92, 95, 98, 100, 103, 107, 110, 113, 115, 112, 108, 105,
        102, 98, 96, 92, 90
      ],
      respiration_rate: [
        18, 19, 20, 21, 22, 23, 24, 25, 26, 26, 24, 22, 21, 20, 19, 18, 18, 17,
        17, 16
      ],
      blood_pressure: [
        140, 143, 147, 150, 154, 158, 161, 163, 165, 160, 157, 152, 148, 144,
        140, 137, 134, 130, 128, 126
      ],
      bgl: [
        5.9, 6.1, 6.4, 6.6, 6.9, 7.2, 7.3, 7.5, 7.2, 6.9, 6.6, 6.3, 6.1, 5.9,
        5.8, 5.5, 5.3, 5.1, 5.0, 4.9
      ],
      hrv: [
        19, 18, 17, 16, 15, 14, 13, 14, 15, 16, 18, 20, 22, 24, 23, 21, 20, 19,
        18, 17
      ],
      blood_oxygen_saturation: [
        98, 97, 96, 95, 94, 93, 92, 92, 91, 90, 91, 92, 93, 94, 96, 97, 97, 98,
        98, 99
      ]
    },
    overall_vitals_score: [
      2, 2, 3, 4, 5, 6, 7, 7, 8, 8, 7, 6, 5, 4, 3, 3, 3, 2, 2, 2
    ],
    patient_score_fields: {
      time_since_last_visitor: [
        30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240,
        255, 270, 285, 300, 315
      ],
      time_since_last_cam_test: [
        8, 14, 20, 26, 8, 14, 20, 26, 8, 14, 20, 26, 8, 14, 20, 26, 8, 14, 20,
        26
      ],
      sleep_deprivation: [
        false,
        false,
        true,
        true,
        true,
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false
      ],
      body_weight_change: [
        -0.5, -0.7, -1.0, -1.3, -1.6, -1.9, -2.1, -2.3, -2.2, -2.0, -1.8, -1.5,
        -1.2, -0.9, -0.6, -0.3, -0.1, 0.1, 0.2, 0.3
      ],
      hydration_levels: [
        -1, -2, -3, -3, -4, -4, -4, -3, -3, -2, -2, -1, 0, 0, 1, 1, 1, 2, 2, 3
      ]
    },
    patient_score: [3, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 5, 4, 3, 3, 2, 2, 2, 2],
    env_score_fields: {
      lighting_levels: [
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
      ],
      noise_levels: [
        5, 5, 6, 6, 6, 5, 5, 5, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3
      ],
      time_in_hallway: [
        35, 40, 45, 50, 55, 60, 65, 70, 68, 63, 58, 53, 48, 43, 38, 33, 28, 23,
        18, 13
      ],
      room_change_frequency: Array(20).fill(1),
      number_of_patients_in_room: Array(20).fill(2)
    },
    env_score: [6, 6, 7, 7, 8, 8, 9, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2],
    notes: {
      paramedic:
        'Family reports worsening confusion over the past 24 hours. Found sitting in recliner, appearing lethargic with slurred speech. Home environment cluttered with unopened food containers, empty alcohol bottles noted near bedside. EMS glucometer reads blood glucose 410 mg/dL. Strong odor of alcohol present. Transported for further assessment due to altered mental status and concern for metabolic imbalance.',
      nurse:
        'Patient lethargic but rousable to verbal stimuli. Glasgow Coma Scale: 14 (E4, V4, M6). Family confirms history of alcohol use and inconsistent diabetes management. Reports nausea, headache, and mild abdominal discomfort. IV fluids and insulin drip initiated for hyperglycemia. Monitoring for signs of alcohol withdrawal (CIWA protocol initiated).',
      physician:
        '84-year-old male presenting with altered mental status, hyperglycemia, and suspected alcohol withdrawal. Labs show metabolic acidosis, consistent with early diabetic ketoacidosis. Initiated IV hydration, insulin therapy, and close neurological monitoring.',
      social_work:
        'Family expresses ongoing concerns regarding patient’s alcohol use and difficulty managing diabetes. Reports frequent skipping of meals and non-adherence to medication regimen. Referral placed for outpatient addiction counseling, diabetes education, and nutritional support.'
    },
    enriched_notes: {
      age_greater_than_65: {
        classification: true,
        enrichment_text: '84 years old',
        note_source: 'physician'
      },
      drug_and_alcohol_withdrawal: {
        classification: true,
        enrichment_text:
          'History of alcohol use; CIWA protocol initiated for withdrawal monitoring',
        note_source: 'nurse'
      },
      pre_hospital_sleep_deprivation: {
        classification: false,
        enrichment_text: null,
        note_source: 'paramedic'
      },
      glasgow_coma_scale: {
        classification: 14,
        enrichment_text:
          'GCS: 14 (E4, V4, M6), lethargic but rousable to verbal stimuli',
        note_source: 'nurse'
      },
      threat_alert: {
        classification: true,
        enrichment_text:
          'Agitated and aggressive during withdrawal; requires close monitoring',
        note_source: 'nurse'
      },
      droplet_precaution: {
        classification: false,
        enrichment_text: null,
        note_source: 'nurse'
      },
      active_infections: {
        classification: false,
        enrichment_text:
          'No signs of active infection such as UTI or pneumonia',
        note_source: 'physician'
      },
      pre_existing_dehydration_or_malnutrition: {
        classification: true,
        enrichment_text:
          'Dehydration suspected; dry mucous membranes; tachycardia (HR: 98)',
        note_source: 'nurse'
      },
      limited_mobility: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician'
      },
      cognitive_impairment: {
        classification: true,
        enrichment_text: 'Altered mental status, lethargic, slurred speech',
        note_source: 'paramedic'
      },
      recent_major_surgery: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician'
      },
      chronic_pain_conditions: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician'
      },
      sensory_impairments: {
        classification: false,
        enrichment_text: null,
        note_source: 'paramedic'
      },
      malnutrition_risk: {
        classification: true,
        enrichment_text:
          'Frequent skipping of meals, non-adherence to diabetes medication',
        note_source: 'social_work'
      },
      neglect_or_unsanitary_living_conditions: {
        classification: true,
        enrichment_text:
          'Cluttered home with unopened food containers and alcohol bottles',
        note_source: 'paramedic'
      }
    },
    pre_condition_score: 6,
    overall_score: [6, 7, 7, 8, 9, 9, 9, 9, 8, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2]
  },
  {
    id: '3',
    first_name: 'Ronald',
    last_name: 'McDonald',
    age: 72,
    gender: 'Male',
    admitted_at: '2024-02-01T02:00:00',
    physician_name: 'Dr. John Doe',
    nurse_name: 'Nurse Jane Doe',
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
        enrichment_text: '72 years old',
        note_source: 'physician'
      },
      drug_and_alcohol_withdrawal: {
        classification: true,
        enrichment_text:
          'History of alcohol use; CIWA protocol initiated for withdrawal monitoring',
        note_source: 'nurse'
      },
      pre_hospital_sleep_deprivation: {
        classification: false,
        enrichment_text: null,
        note_source: 'paramedic'
      },
      glasgow_coma_scale: {
        classification: 14,
        enrichment_text:
          'GCS: 14 (E4, V4, M6), lethargic but rousable to verbal stimuli',
        note_source: 'nurse'
      },
      threat_alert: {
        classification: false,
        enrichment_text: null,
        note_source: 'paramedic'
      },
      droplet_precaution: {
        classification: false,
        enrichment_text: null,
        note_source: 'nurse'
      },
      active_infections: {
        classification: false,
        enrichment_text:
          'No signs of active infection such as UTI or pneumonia',
        note_source: 'physician'
      },
      fever_or_abnormal_temperature_fluctuations: {
        classification: false,
        enrichment_text: 'No fever noted; temperature remained stable',
        note_source: 'nurse'
      },
      pre_existing_dehydration_or_malnutrition: {
        classification: true,
        enrichment_text:
          'Dehydration suspected; dry mucous membranes; tachycardia (HR: 98)',
        note_source: 'nurse'
      },
      limited_mobility: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician'
      },
      cognitive_impairment: {
        classification: true,
        enrichment_text:
          'Found lethargic with slurred speech; altered mental status',
        note_source: 'paramedic'
      },
      recent_major_surgery: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician'
      },
      chronic_pain_conditions: {
        classification: false,
        enrichment_text: null,
        note_source: 'physician'
      },
      sensory_impairments: {
        classification: false,
        enrichment_text: null,
        note_source: 'paramedic'
      }
    },
    pre_condition_score: 3,
    overall_score: [
      7, 8, 8, 9, 9, 10, 10, 9, 8, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2
    ]
  }
];
