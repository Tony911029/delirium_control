# The four main vital signs are body temperature, pulse rate, respiration rate, and blood pressure.
patient_1 = {
    "id": "1",
    "first_name": "Linda",
    "last_name": "K",
    "age": 76,
    "gender": "F",
    "admitted_at": "2021-01-01T08:00:00",
    "physician_name": "Dr. John Doe",
    "nursing_name": "Nurse Jane Doe",
    "is_included": True,
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
        "sleep_deprivation": [False, False, False, False, False, False, False, False, False, False, False, False, False, False, False, False, False, False, False, False],
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

    "notes:": {
        "paramedic": "Patient found sitting on the floor near her bed, unable to recall how long she had been there. No visible head trauma, but bruising noted on left hip. Home cluttered, with outdated food in the fridge. Glasses found but patient unable to read medication labels clearly. Neighbors state she rarely leaves the house. Assisted to stretcher and transported for evaluation.",
        "nursing": "Patient alert but disoriented to time and date. Reports hip pain (4/10) but denies recent falls, despite visible bruising. Mucous membranes dry; dehydration suspected. No signs of acute distress. Glasgow Coma Scale: 13. Initiated fall precautions, IV fluids, and hydration monitoring. Awaiting imaging for suspected orthopedic injury.",
        "physician": "76-year-old female presenting with acute confusion, dehydration, and suspected fall-related injury. No acute fractures on X-ray. Orthostatic hypotension present, contributing to fall risk. Plan includes IV fluids, hydration monitoring, pain management, and physical therapy consultation. Will monitor cognitive status for potential delirium.",
        "social_work": "Patient lives alone with no immediate family nearby. Home environment described as cluttered and unsafe by EMS. Reports increased forgetfulness but no formal dementia diagnosis. Referral placed for in-home safety evaluation and community support services."
    },
    "enriched_notes": 
    {
        "Age (≥65)": {
            "classification": True,
            "enrichment_text": "76 years old"
        },
        "Drug and alcohol withdrawal": {
            "classification": False,
            "enrichment_text": ''
        },
        "Pre-hospital sleep deprivation": {
            "classification": False,
            "enrichment_text": ''
        },
        "Glasgow coma scale": {
            "classification": 13,
            "enrichment_text": "GCS: 13 (E4, V4, M5), disoriented to time and date"
        },
        "Threat alert": {
            "classification": False,
            "enrichment_text": ''
        },
        "Droplet precaution": {
            "classification": False,
            "enrichment_text": ''
        },
        "Active infections (UTIs, pneumonia, other ongoing infections)": {
            "classification": False,
            "enrichment_text": "No signs of UTI or pneumonia"
        },
        "Fever or abnormal temperature fluctuations at admission": {
            "classification": False,
            "enrichment_text": "Temperature 36.7°C; no fever detected"
        },
        "Pre-existing dehydration or malnutrition": {
            "classification": True,
            "enrichment_text": "Dehydration suspected; mucous membranes dry; IV fluids initiated"
        },
        "Limited mobility (recent hip fracture, wheelchair use, difficulty walking)": {
            "classification": True,
            "enrichment_text": "Reports hip pain; bruising on left hip; fall precautions initiated"
        },
        "Cognitive impairment (dementia, mild cognitive impairment, prior stroke, Parkinson’s, severe TBI history)": {
            "classification": True,
            "enrichment_text": "Disoriented to time and date; increased forgetfulness reported"
        },
        "Recent major surgery (especially orthopedic or cardiac, where anesthesia exposure was significant)": {
            "classification": False,
            "enrichment_text": ''
        },
        "Chronic pain conditions (patients on long-term narcotics, opioids, or sedatives before admission)": {
            "classification": False,
            "enrichment_text": ''
        },
        "Sensory impairments (glasses, hearing aids, etc)": {
            "classification": True,
            "enrichment_text": "Wears glasses but struggles to read medication labels"
        }
    },
    "pre_condition_score": 7,

    "overall_score": [7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10],
}



patient_2 = {
 "id": "2",
    "first_name": "Alex",
    "last_name": "Huang",
    "age": 84, 
    "gender": "M",
    "admitted_at": "2024-02-01T02:00:00",
    "physician_name": "Dr. John Doe",
    "nursing_name": "Nurse Jane Doe",
    "is_included": True,
    "vitals": {
        "temperature": [36.7, 36.8, 36.9, 37.1, 37.3, 37.5, 37.8, 38.1, 38.3, 38.2, 38.0, 37.9, 37.7, 37.5, 37.3, 37.2, 37.0, 36.9, 36.8, 36.7],
        "pulse_rate": [85, 88, 90, 92, 95, 98, 102, 105, 108, 110, 108, 105, 102, 100, 98, 95, 92, 90, 88, 85],
        "respiration_rate": [18, 18, 19, 20, 20, 22, 22, 24, 24, 23, 22, 21, 20, 20, 19, 19, 18, 18, 18, 18],
        "blood_pressure": [132, 135, 138, 140, 142, 145, 148, 150, 152, 150, 148, 145, 142, 140, 138, 135, 132, 130, 128, 125],
        "bgl": [5.5, 5.6, 5.8, 5.9, 6.0, 6.2, 6.3, 6.4, 6.5, 6.4, 6.2, 6.0, 5.8, 5.7, 5.6, 5.5, 5.4, 5.3, 5.2, 5.1],
        "hrv": [25, 24, 23, 22, 21, 20, 19, 18, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        "blood_oxygen_saturation": [96, 95, 95, 94, 94, 93, 93, 92, 92, 93, 94, 95, 95, 96, 96, 97, 97, 98, 98, 98]
    },
    "overall_vitals_score": [2, 2, 3, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 4, 3, 3, 2, 2, 2, 2],
    
    "patient_score_fields": {
        "time_since_last_visitor": [24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 12, 36, 60, 84, 108, 132, 156, 180, 204, 228],
        "time_since_last_cam_test": [4, 8, 12, 16, 20, 24, 4, 8, 12, 16, 4, 8, 12, 16, 20, 24, 4, 8, 12, 16],
        "sleep_deprivation": [False, True, True, True, True, True, True, True, True, True, False, False, False, True, True, True, True, False, False, False],
        "body_weight_change": [-0.2, -0.4, -0.6, -0.8, -1.0, -1.2, -1.4, -1.6, -1.8, -1.6, -1.4, -1.2, -1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4],
        "hydration_levels": [-1, -1, -2, -2, -2, -3, -3, -3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 0, 0, 0]
    },
    "patient_score": [3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 4, 3, 3, 2, 2],
    
    "env_score_fields": {
        "lighting_levels": [2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        "noise_levels": [3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        "time_in_hallway": [30, 35, 40, 45, 50, 55, 60, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5],
        "room_change_frequency": [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "number_of_patients_in_room": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    "env_score": [4, 4, 5, 6, 7, 8, 8, 9, 8, 7, 6, 5, 4, 4, 3, 3, 3, 3, 2, 2],

    "notes:": {
        "paramedic": "Called by staff at assisted living facility due to acute confusion and increased agitation. Patient found pacing the hallways, repeatedly asking where he is despite being redirected multiple times. Refusing to eat for two days. Hearing aids present but appear non-functional. No signs of trauma. No fever noted, but patient is visibly anxious and restless. Transported for further evaluation due to concern for worsening cognitive impairment and possible infection.",
        "nursing": "Patient restless, requiring frequent redirection. Repeatedly asking about the date and location, unable to retain information. Glasgow Coma Scale: 12 (E4, V3, M5). Mild tachycardia (HR: 102). Staff reports decline in oral intake over the past 48 hours. Mucous membranes dry; mild dehydration suspected. Placed on fall precautions. Droplet precautions initiated due to persistent non-productive cough; respiratory viral panel pending.",
        "physician": "84-year-old male with known dementia, presenting with acute worsening of confusion, agitation, and decreased oral intake. No acute distress. Mild leukocytosis noted on labs; urine dipstick positive for leukocytes and nitrates, suspicious for UTI. Chest X-ray unremarkable. No overt respiratory distress. IV fluids initiated. Empiric antibiotics started for suspected UTI. Continued behavioral monitoring for possible delirium. If agitation worsens, consider low-dose haloperidol PRN.",
        "social_work": "Patient previously engaged in facility activities but has withdrawn in recent weeks. Family visits described as infrequent. Staff struggling with de-escalation strategies due to increased agitation. Referral placed for cognitive therapy, caregiver education on dementia management, and social work follow-up for possible advanced care planning discussions."
    },
    "enriched_notes": {
        "Age (≥65)": {
            "classification": True,
            "enrichment_text": "84 years old"
        },
        "Drug and alcohol withdrawal": {
            "classification": False,
            "enrichment_text": ''
        },
        "Pre-hospital sleep deprivation": {
            "classification": False,
            "enrichment_text": ''
        },
        "Glasgow coma scale": {
            "classification": 12,
            "enrichment_text": "GCS: 12 (E4, V3, M5), requiring frequent redirection, unable to retain information"
        },
        "Threat alert": {
            "classification": False,
            "enrichment_text": ''
        },
        "Droplet precaution": {
            "classification": True,
            "enrichment_text": "Droplet precautions initiated due to persistent non-productive cough; respiratory viral panel pending"
        },
        "Active infections (UTIs, pneumonia, other ongoing infections)": {
            "classification": True,
            "enrichment_text": "Urine dipstick positive for leukocytes and nitrates, suspicious for UTI"
        },
        "Fever or abnormal temperature fluctuations at admission": {
            "classification": False,
            "enrichment_text": "No fever noted; temperature not reported"
        },
        "Pre-existing dehydration or malnutrition": {
            "classification": True,
            "enrichment_text": "Mucous membranes dry; mild dehydration suspected"
        },
        "Limited mobility (recent hip fracture, wheelchair use, difficulty walking)": {
            "classification": False,
            "enrichment_text": ''
        },
        "Cognitive impairment (dementia, mild cognitive impairment, prior stroke, Parkinson’s, severe TBI history)": {
            "classification": True,
            "enrichment_text": "Known dementia; acute worsening of confusion and agitation"
        },
        "Recent major surgery (especially orthopedic or cardiac, where anesthesia exposure was significant)": {
            "classification": False,
            "enrichment_text": ''
        },
        "Chronic pain conditions (patients on long-term narcotics, opioids, or sedatives before admission)": {
            "classification": False,
            "enrichment_text": ''
        },
        "Sensory impairments (glasses, hearing aids, etc)": {
            "classification": True,
            "enrichment_text": "Hearing aids present but appear non-functional"
        }
    },
    "pre_condition_score": 7,

    "overall_score": [4, 4, 5, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3, 3],
}



patient_3 = {
    "id": "3",
    "first_name": "Alex",
    "last_name": "Huang",
    "age": 84,
    "gender": "M",
    "admitted_at": "2024-02-01T02:00:00",
    "physician_name": "Dr. John Doe",
    "nursing_name": "Nurse Jane Doe",
    "is_included": True,
    "vitals": {
        "temperature": [36.8, 37.0, 37.2, 37.4, 37.6, 37.9, 38.2, 38.4, 38.5, 38.3, 38.1, 37.8, 37.6, 37.4, 37.2, 37.0, 36.9, 36.8, 36.8, 36.7],
        "pulse_rate": [88, 92, 95, 98, 102, 105, 108, 112, 115, 110, 105, 100, 98, 95, 92, 90, 88, 85, 82, 80],
        "respiration_rate": [20, 21, 22, 23, 24, 25, 26, 26, 25, 24, 23, 22, 21, 20, 19, 19, 18, 18, 18, 18],
        "blood_pressure": [135, 138, 142, 145, 148, 152, 155, 158, 160, 155, 150, 145, 142, 138, 135, 132, 130, 128, 125, 122],
        "bgl": [5.8, 6.0, 6.2, 6.4, 6.6, 6.8, 7.0, 7.1, 7.0, 6.8, 6.6, 6.4, 6.2, 6.0, 5.8, 5.6, 5.4, 5.3, 5.2, 5.1],
        "hrv": [22, 21, 20, 19, 18, 17, 16, 15, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        "blood_oxygen_saturation": [95, 94, 93, 92, 91, 90, 90, 89, 89, 90, 91, 92, 93, 94, 95, 96, 96, 97, 97, 98]
    },
    "overall_vitals_score": [3, 3, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 3, 3, 2, 2, 2, 2],
    
    "patient_score_fields": {
        "time_since_last_visitor": [36, 60, 84, 108, 132, 156, 180, 204, 228, 12, 36, 60, 84, 108, 132, 156, 180, 204, 228, 252],
        "time_since_last_cam_test": [6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24, 6, 12, 18, 24],
        "sleep_deprivation": [False, False, True, True, True, True, True, True, True, True, True, False, False, False, True, True, False, False, False, False],
        "body_weight_change": [-0.3, -0.6, -0.9, -1.2, -1.5, -1.8, -2.0, -2.2, -2.0, -1.8, -1.5, -1.2, -0.9, -0.6, -0.3, -0.1, 0, 0.2, 0.3, 0.4],
        "hydration_levels": [-1, -2, -2, -3, -3, -3, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 0, 0, 0, 0]
    },
    "patient_score": [4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 4, 3, 3, 2, 2, 2],
    
    "env_score_fields": {
        "lighting_levels": [3, 3, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        "noise_levels": [4, 4, 5, 5, 5, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        "time_in_hallway": [40, 45, 50, 55, 60, 65, 70, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15],
        "room_change_frequency": [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "number_of_patients_in_room": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    "env_score": [5, 5, 6, 7, 8, 9, 9, 9, 8, 7, 6, 5, 4, 4, 3, 3, 3, 2, 2, 2],

    "notes:": {
      "paramedic": "Family reports worsening confusion over the past 24 hours. Found sitting in recliner, appearing lethargic with slurred speech. Home environment cluttered with unopened food containers, empty alcohol bottles noted near bedside. EMS glucometer reads blood glucose 410 mg/dL. Strong odor of alcohol present. Transported for further assessment due to altered mental status and concern for metabolic imbalance.",
      "nurse":"Patient lethargic but rousable to verbal stimuli. Glasgow Coma Scale: 14 (E4, V4, M6). Family confirms history of alcohol use and inconsistent diabetes management. Reports nausea, headache, and mild abdominal discomfort. IV fluids and insulin drip initiated for hyperglycemia. Monitoring for signs of alcohol withdrawal (CIWA protocol initiated). Dehydration suspected due to dry mucous membranes and tachycardia (HR: 98).",
      "physician": "72-year-old male presenting with altered mental status, hyperglycemia, and suspected alcohol withdrawal. Labs show metabolic acidosis, consistent with early diabetic ketoacidosis (DKA). Initiated aggressive IV hydration, insulin therapy, and close neurological monitoring. Liver function tests mildly elevated. Plan includes monitoring for withdrawal symptoms, CIWA assessment every 4 hours, and nutritional consult for poor diet adherence.",
      "social_work": "Family expresses ongoing concerns regarding patient’s alcohol use and difficulty managing diabetes. Reports frequent skipping of meals and non-adherence to medication regimen. Referral placed for outpatient addiction counseling, diabetes education, and nutritional support."
    },
    "enriched_notes": {
        "Age (≥65)": {
            "classification": True,
            "enrichment_text": "72 years old"
        },
    "Drug and alcohol withdrawal": {
        "classification": True,
        "enrichment_text": "Family confirms history of alcohol use; strong odor of alcohol noted; CIWA protocol initiated for withdrawal monitoring"
    },
    "Pre-hospital sleep deprivation": {
        "classification": False,
        "enrichment_text": ''
    },
    "Glasgow coma scale": {
        "classification": 14,
        "enrichment_text": "GCS: 14 (E4, V4, M6), lethargic but rousable to verbal stimuli"
    },
    "Threat alert": {
        "classification": True,
        "enrichment_text": "Patient reported as agitated and aggressive during withdrawal; requires close monitoring"
    },
    "Droplet precaution": {
        "classification": False,
        "enrichment_text": ''
    },
    "Active infections (UTIs, pneumonia, other ongoing infections)": {
        "classification": False,
        "enrichment_text": ''
    },
    "Fever or abnormal temperature fluctuations at admission": {
        "classification": False,
        "enrichment_text": "No fever noted; temperature not reported"
    },
    "Pre-existing dehydration or malnutrition": {
        "classification": True,
        "enrichment_text": "Dehydration suspected; dry mucous membranes; tachycardia (HR: 98)"
    },
    "Limited mobility (recent hip fracture, wheelchair use, difficulty walking)": {
        "classification": False,
        "enrichment_text": ''
    },
    "Cognitive impairment (dementia, mild cognitive impairment, prior stroke, Parkinson’s, severe TBI history)": {
        "classification": False,
        "enrichment_text": ''
    },
    "Recent major surgery (especially orthopedic or cardiac, where anesthesia exposure was significant)": {
        "classification": False,
        "enrichment_text": ''
    },
    "Chronic pain conditions (patients on long-term narcotics, opioids, or sedatives before admission)": {
        "classification": False,
        "enrichment_text": ''
    },
    "Sensory impairments (glasses, hearing aids, etc)": {
        "classification": False,
        "enrichment_text": ''
    }
    },
    "pre_condition_score": 7,

    "overall_score": [5, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 4, 3, 3, 2, 2, 2],
}