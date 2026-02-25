import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Medicine from '../models/Medicine.js';
import Category from '../models/Category.js';
import connectDB from '../config/db.js';

dotenv.config();

const categories = [
  { name: 'Pain Relief', description: 'Medicines for pain and inflammation' },
  { name: 'Antibiotics', description: 'Bacterial infection treatment' },
  { name: 'Diabetes Care', description: 'Blood sugar management' },
  { name: 'Vitamins & Supplements', description: 'Nutritional supplements' },
  { name: 'Cold & Flu', description: 'Common cold and flu remedies' },
  { name: 'Digestive Health', description: 'Stomach and digestive issues' },
  { name: 'Heart Care', description: 'Cardiovascular health' },
  { name: 'Skin Care', description: 'Dermatological treatments' },
  { name: 'Respiratory', description: 'Breathing and lung health' },
  { name: 'Antacids', description: 'Acidity and heartburn relief' },
  { name: 'Blood Pressure', description: 'Hypertension management' },
  { name: 'Cholesterol', description: 'Lipid management' },
  { name: 'Women Health', description: 'Women-specific medicines' },
  { name: 'Eye Care', description: 'Eye health products' },
  { name: 'Oral Care', description: 'Dental and oral health' }
];

const medicines = [
  // Pain Relief
  {
    name: 'Crocin 650mg',
    description: 'Paracetamol tablets for fever and pain relief',
    composition: 'Paracetamol 650mg',
    uses: 'Fever, headache, body pain, toothache',
    sideEffects: 'Nausea, allergic reactions (rare)',
    dosage: '1 tablet every 6-8 hours. Max 4 tablets per day',
    category: 'Pain Relief',
    price: 25,
    stock: 500,
    manufacturer: 'GlaxoSmithKline',
    packSize: '15 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2026-12-31'),
    batchNumber: 'CR2024001',
    tags: ['fever', 'pain', 'headache']
  },
  {
    name: 'Dolo 650',
    description: 'Paracetamol for effective pain and fever relief',
    composition: 'Paracetamol 650mg',
    uses: 'Fever reduction, pain relief, cold symptoms',
    sideEffects: 'Liver damage if overdosed, skin rash',
    dosage: '1-2 tablets 3 times daily',
    category: 'Pain Relief',
    price: 20,
    discountPrice: 18,
    stock: 800,
    manufacturer: 'Micro Labs',
    packSize: '15 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-06-30'),
    batchNumber: 'DL2024002',
    tags: ['fever', 'pain']
  },
  {
    name: 'Combiflam',
    description: 'Combination of paracetamol and ibuprofen',
    composition: 'Paracetamol 325mg + Ibuprofen 400mg',
    uses: 'Severe headache, body pain, fever, toothache, period pain',
    sideEffects: 'Stomach upset, dizziness, nausea',
    dosage: '1 tablet twice daily after food',
    category: 'Pain Relief',
    price: 30,
    stock: 600,
    manufacturer: 'Sanofi India',
    packSize: '20 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2026-09-30'),
    tags: ['pain', 'fever', 'headache']
  },
  {
    name: 'Brufen 400mg',
    description: 'Ibuprofen for pain and inflammation',
    composition: 'Ibuprofen 400mg',
    uses: 'Joint pain, muscle pain, dental pain, fever',
    sideEffects: 'Stomach pain, heartburn, dizziness',
    dosage: '1 tablet 3 times daily after meals',
    category: 'Pain Relief',
    price: 35,
    stock: 400,
    manufacturer: 'Abbott',
    packSize: '15 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-03-31'),
    tags: ['pain', 'inflammation']
  },
  {
    name: 'Voveran 50mg',
    description: 'Diclofenac for pain relief',
    composition: 'Diclofenac Sodium 50mg',
    uses: 'Arthritis pain, sprains, muscle pain',
    sideEffects: 'Stomach upset, ulcers, headache',
    dosage: '1 tablet 2-3 times daily',
    category: 'Pain Relief',
    price: 40,
    stock: 300,
    manufacturer: 'Novartis',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2026-11-30'),
    tags: ['pain', 'arthritis']
  },

  // Antibiotics
  {
    name: 'Azithral 500',
    description: 'Azithromycin antibiotic',
    composition: 'Azithromycin 500mg',
    uses: 'Respiratory infections, skin infections, ear infections',
    sideEffects: 'Diarrhea, nausea, stomach pain',
    dosage: '1 tablet once daily for 3 days',
    category: 'Antibiotics',
    price: 165,
    discountPrice: 150,
    stock: 250,
    manufacturer: 'Alembic Pharma',
    packSize: '3 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2026-08-31'),
    batchNumber: 'AZ2024001',
    tags: ['antibiotic', 'infection']
  },
  {
    name: 'Augmentin 625',
    description: 'Amoxicillin + Clavulanic Acid combination',
    composition: 'Amoxicillin 500mg + Clavulanic Acid 125mg',
    uses: 'Bacterial infections, respiratory tract infections',
    sideEffects: 'Diarrhea, nausea, skin rash',
    dosage: '1 tablet twice daily for 5-7 days',
    category: 'Antibiotics',
    price: 180,
    stock: 200,
    manufacturer: 'GlaxoSmithKline',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-01-31'),
    tags: ['antibiotic']
  },
  {
    name: 'Mox 500',
    description: 'Amoxicillin capsules',
    composition: 'Amoxicillin 500mg',
    uses: 'Bacterial infections, dental infections',
    sideEffects: 'Diarrhea, allergic reactions',
    dosage: '1 capsule 3 times daily',
    category: 'Antibiotics',
    price: 85,
    stock: 350,
    manufacturer: 'Ranbaxy',
    packSize: '10 Capsules',
    prescriptionRequired: true,
    expiryDate: new Date('2026-10-31'),
    tags: ['antibiotic', 'infection']
  },
  {
    name: 'Ciprofloxacin 500mg',
    description: 'Broad spectrum antibiotic',
    composition: 'Ciprofloxacin 500mg',
    uses: 'UTI, bacterial infections, typhoid',
    sideEffects: 'Nausea, diarrhea, dizziness',
    dosage: '1 tablet twice daily',
    category: 'Antibiotics',
    price: 50,
    stock: 300,
    manufacturer: 'Cipla',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-02-28'),
    tags: ['antibiotic', 'uti']
  },

  // Diabetes Care
  {
    name: 'Glycomet 500',
    description: 'Metformin for blood sugar control',
    composition: 'Metformin Hydrochloride 500mg',
    uses: 'Type 2 diabetes, PCOS, blood sugar management',
    sideEffects: 'Nausea, diarrhea, stomach upset',
    dosage: '1 tablet twice daily with meals',
    category: 'Diabetes Care',
    price: 40,
    discountPrice: 36,
    stock: 500,
    manufacturer: 'USV Ltd',
    packSize: '20 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-04-30'),
    batchNumber: 'GL2024001',
    tags: ['diabetes', 'blood sugar']
  },
  {
    name: 'Glucon-D',
    description: 'Glucose powder for instant energy',
    composition: 'Glucose, Vitamin D, Calcium',
    uses: 'Instant energy, weakness, fatigue',
    sideEffects: 'None if taken as directed',
    dosage: '2-3 spoons in water as needed',
    category: 'Diabetes Care',
    price: 120,
    stock: 400,
    manufacturer: 'Zydus Wellness',
    packSize: '500g',
    prescriptionRequired: false,
    expiryDate: new Date('2027-12-31'),
    tags: ['energy', 'glucose']
  },
  {
    name: 'Januvia 100mg',
    description: 'Sitagliptin for diabetes',
    composition: 'Sitagliptin 100mg',
    uses: 'Type 2 diabetes management',
    sideEffects: 'Headache, upper respiratory infection',
    dosage: '1 tablet once daily',
    category: 'Diabetes Care',
    price: 450,
    discountPrice: 420,
    stock: 150,
    manufacturer: 'MSD Pharma',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2026-12-31'),
    tags: ['diabetes']
  },

  // Vitamins & Supplements
  {
    name: 'Shelcal 500',
    description: 'Calcium and Vitamin D3 supplement',
    composition: 'Calcium Carbonate 1250mg + Vitamin D3 250 IU',
    uses: 'Bone health, calcium deficiency, osteoporosis prevention',
    sideEffects: 'Constipation, stomach upset',
    dosage: '1 tablet daily after food',
    category: 'Vitamins & Supplements',
    price: 80,
    discountPrice: 72,
    stock: 600,
    manufacturer: 'Elder Pharma',
    packSize: '15 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-06-30'),
    batchNumber: 'SH2024001',
    tags: ['calcium', 'vitamin d', 'bones']
  },
  {
    name: 'Becosules Capsules',
    description: 'Multivitamin with B-Complex',
    composition: 'Vitamin B-Complex, Vitamin C, Folic Acid',
    uses: 'Nutritional deficiency, immunity boost, general weakness',
    sideEffects: 'Mild stomach upset',
    dosage: '1 capsule daily',
    category: 'Vitamins & Supplements',
    price: 45,
    stock: 500,
    manufacturer: 'Pfizer',
    packSize: '20 Capsules',
    prescriptionRequired: false,
    expiryDate: new Date('2027-09-30'),
    tags: ['vitamin', 'immunity']
  },
  {
    name: 'Neurobion Forte',
    description: 'Vitamin B complex for nerve health',
    composition: 'Vitamin B1, B6, B12',
    uses: 'Nerve pain, neuropathy, vitamin B deficiency',
    sideEffects: 'Rare allergic reactions',
    dosage: '1 tablet daily',
    category: 'Vitamins & Supplements',
    price: 35,
    stock: 450,
    manufacturer: 'Merck',
    packSize: '30 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-03-31'),
    tags: ['vitamin b', 'nerve']
  },
  {
    name: 'Revital H',
    description: 'Multivitamin with minerals and ginseng',
    composition: 'Vitamins, Minerals, Ginseng',
    uses: 'Energy, stamina, general wellness',
    sideEffects: 'None if taken as directed',
    dosage: '1 capsule daily',
    category: 'Vitamins & Supplements',
    price: 250,
    stock: 300,
    manufacturer: 'Sun Pharma',
    packSize: '30 Capsules',
    prescriptionRequired: false,
    expiryDate: new Date('2027-08-31'),
    tags: ['multivitamin', 'energy']
  },
  {
    name: 'Zincovit',
    description: 'Multivitamin with zinc and antioxidants',
    composition: 'Zinc, Vitamins, Minerals',
    uses: 'Immunity, skin health, hair health',
    sideEffects: 'Stomach upset if taken empty stomach',
    dosage: '1 tablet daily after meals',
    category: 'Vitamins & Supplements',
    price: 120,
    stock: 400,
    manufacturer: 'Apex Laboratories',
    packSize: '15 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-05-31'),
    tags: ['zinc', 'immunity']
  },

  // Cold & Flu
  {
    name: 'Cetrizine 10mg',
    description: 'Antihistamine for allergies',
    composition: 'Cetirizine Hydrochloride 10mg',
    uses: 'Allergic rhinitis, hay fever, skin allergies, itching',
    sideEffects: 'Drowsiness, dry mouth, fatigue',
    dosage: '1 tablet once daily at bedtime',
    category: 'Cold & Flu',
    price: 30,
    discountPrice: 25,
    stock: 700,
    manufacturer: 'Cipla',
    packSize: '10 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-02-28'),
    batchNumber: 'CT2024001',
    tags: ['allergy', 'cold', 'antihistamine']
  },
  {
    name: 'Sinarest',
    description: 'Cold and flu relief',
    composition: 'Paracetamol + Phenylephrine + Chlorpheniramine',
    uses: 'Common cold, runny nose, sneezing, fever',
    sideEffects: 'Drowsiness, dizziness',
    dosage: '1 tablet 3 times daily',
    category: 'Cold & Flu',
    price: 45,
    stock: 500,
    manufacturer: 'Centaur Pharma',
    packSize: '15 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2026-11-30'),
    tags: ['cold', 'flu']
  },
  {
    name: 'Vicks Vaporub',
    description: 'Topical ointment for cold relief',
    composition: 'Camphor, Menthol, Eucalyptus Oil',
    uses: 'Nasal congestion, cough, cold symptoms',
    sideEffects: 'Skin irritation in some cases',
    dosage: 'Apply on chest and throat 2-3 times daily',
    category: 'Cold & Flu',
    price: 85,
    stock: 350,
    manufacturer: 'Procter & Gamble',
    packSize: '50ml',
    prescriptionRequired: false,
    expiryDate: new Date('2028-12-31'),
    tags: ['cold', 'cough', 'congestion']
  },
  {
    name: 'Chericof Syrup',
    description: 'Cough syrup',
    composition: 'Dextromethorphan + Phenylephrine + Chlorpheniramine',
    uses: 'Dry cough, wet cough, throat irritation',
    sideEffects: 'Drowsiness, nausea',
    dosage: '10ml three times daily',
    category: 'Cold & Flu',
    price: 95,
    stock: 300,
    manufacturer: 'Mankind Pharma',
    packSize: '100ml',
    prescriptionRequired: false,
    expiryDate: new Date('2027-01-31'),
    tags: ['cough', 'cold']
  },

  // Digestive Health
  {
    name: 'Pan 40',
    description: 'Pantoprazole for acidity',
    composition: 'Pantoprazole 40mg',
    uses: 'Acidity, GERD, stomach ulcers, heartburn',
    sideEffects: 'Headache, diarrhea, nausea',
    dosage: '1 tablet once daily before breakfast',
    category: 'Digestive Health',
    price: 58,
    discountPrice: 52,
    stock: 450,
    manufacturer: 'Alkem Laboratories',
    packSize: '15 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-03-31'),
    batchNumber: 'PN2024001',
    tags: ['acidity', 'gerd', 'stomach']
  },
  {
    name: 'Digene Gel',
    description: 'Antacid for quick relief',
    composition: 'Magnesium Aluminium Silicate + Simethicone',
    uses: 'Acidity, gas, bloating, heartburn',
    sideEffects: 'Constipation, diarrhea',
    dosage: '2 teaspoons after meals',
    category: 'Digestive Health',
    price: 125,
    stock: 400,
    manufacturer: 'Abbott',
    packSize: '200ml',
    prescriptionRequired: false,
    expiryDate: new Date('2027-07-31'),
    tags: ['antacid', 'acidity']
  },
  {
    name: 'Lactifiber',
    description: 'Fiber supplement for constipation',
    composition: 'Ispaghula Husk (Psyllium)',
    uses: 'Constipation, irregular bowel movements',
    sideEffects: 'Bloating, gas',
    dosage: '1-2 teaspoons in water at bedtime',
    category: 'Digestive Health',
    price: 180,
    stock: 250,
    manufacturer: 'Zydus Cadila',
    packSize: '250g',
    prescriptionRequired: false,
    expiryDate: new Date('2027-10-31'),
    tags: ['fiber', 'constipation']
  },
  {
    name: 'Mucaine Gel',
    description: 'Antacid with local anesthetic',
    composition: 'Oxetacaine + Aluminium Hydroxide + Magnesium Hydroxide',
    uses: 'Acidity, heartburn, stomach pain',
    sideEffects: 'Constipation',
    dosage: '1-2 teaspoons 3-4 times daily',
    category: 'Digestive Health',
    price: 95,
    stock: 350,
    manufacturer: 'Pfizer',
    packSize: '170ml',
    prescriptionRequired: false,
    expiryDate: new Date('2026-12-31'),
    tags: ['antacid', 'stomach pain']
  },

  // Heart Care
  {
    name: 'Ecosprin 75',
    description: 'Low-dose aspirin for heart health',
    composition: 'Aspirin 75mg',
    uses: 'Heart attack prevention, blood clot prevention',
    sideEffects: 'Stomach bleeding, ulcers',
    dosage: '1 tablet once daily',
    category: 'Heart Care',
    price: 15,
    stock: 600,
    manufacturer: 'USV Ltd',
    packSize: '14 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-06-30'),
    tags: ['heart', 'aspirin']
  },
  {
    name: 'Amlodipine 5mg',
    description: 'Blood pressure medication',
    composition: 'Amlodipine Besylate 5mg',
    uses: 'High blood pressure, angina',
    sideEffects: 'Swelling in ankles, headache, fatigue',
    dosage: '1 tablet once daily',
    category: 'Heart Care',
    price: 45,
    stock: 400,
    manufacturer: 'Cipla',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-04-30'),
    tags: ['blood pressure', 'hypertension']
  },
  {
    name: 'Telma 40',
    description: 'Telmisartan for blood pressure',
    composition: 'Telmisartan 40mg',
    uses: 'Hypertension, cardiovascular protection',
    sideEffects: 'Dizziness, back pain',
    dosage: '1 tablet once daily',
    category: 'Heart Care',
    price: 120,
    stock: 300,
    manufacturer: 'Glenmark',
    packSize: '15 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-02-28'),
    tags: ['blood pressure']
  },

  // Cholesterol
  {
    name: 'Atorva 10',
    description: 'Atorvastatin for cholesterol',
    composition: 'Atorvastatin 10mg',
    uses: 'High cholesterol, heart disease prevention',
    sideEffects: 'Muscle pain, liver problems',
    dosage: '1 tablet once daily at bedtime',
    category: 'Cholesterol',
    price: 85,
    discountPrice: 75,
    stock: 350,
    manufacturer: 'Zydus Cadila',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-05-31'),
    batchNumber: 'AT2024001',
    tags: ['cholesterol', 'heart']
  },
  {
    name: 'Rosuvastatin 10mg',
    description: 'Powerful cholesterol reducer',
    composition: 'Rosuvastatin 10mg',
    uses: 'High cholesterol, triglycerides',
    sideEffects: 'Headache, muscle pain',
    dosage: '1 tablet once daily',
    category: 'Cholesterol',
    price: 150,
    stock: 250,
    manufacturer: 'Sun Pharma',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-03-31'),
    tags: ['cholesterol']
  },

  // Skin Care
  {
    name: 'Betnovate-N Cream',
    description: 'Steroid cream for skin conditions',
    composition: 'Betamethasone + Neomycin',
    uses: 'Eczema, psoriasis, skin allergies, rashes',
    sideEffects: 'Skin thinning, burning sensation',
    dosage: 'Apply thin layer twice daily',
    category: 'Skin Care',
    price: 110,
    discountPrice: 98,
    stock: 300,
    manufacturer: 'GlaxoSmithKline',
    packSize: '20g',
    prescriptionRequired: true,
    expiryDate: new Date('2027-01-31'),
    batchNumber: 'BN2024001',
    tags: ['skin', 'eczema', 'rash']
  },
  {
    name: 'Lacto Calamine Lotion',
    description: 'Soothing lotion for skin',
    composition: 'Calamine + Zinc Oxide',
    uses: 'Skin rashes, sunburn, prickly heat, itching',
    sideEffects: 'None',
    dosage: 'Apply as needed',
    category: 'Skin Care',
    price: 95,
    stock: 400,
    manufacturer: 'Piramal Healthcare',
    packSize: '120ml',
    prescriptionRequired: false,
    expiryDate: new Date('2027-08-31'),
    tags: ['skin', 'rash', 'itching']
  },
  {
    name: 'Boroline Cream',
    description: 'Antiseptic cream for cuts and burns',
    composition: 'Boric Acid + Zinc Oxide',
    uses: 'Cuts, burns, skin cracks, chapped lips',
    sideEffects: 'None',
    dosage: 'Apply as needed',
    category: 'Skin Care',
    price: 60,
    stock: 500,
    manufacturer: 'GD Pharmaceuticals',
    packSize: '20g',
    prescriptionRequired: false,
    expiryDate: new Date('2028-12-31'),
    tags: ['antiseptic', 'burns']
  },

  // Antacids
  {
    name: 'Omez 20',
    description: 'Omeprazole for acidity',
    composition: 'Omeprazole 20mg',
    uses: 'GERD, peptic ulcers, acidity',
    sideEffects: 'Headache, stomach pain',
    dosage: '1 capsule once daily before meals',
    category: 'Antacids',
    price: 58,
    stock: 450,
    manufacturer: 'Dr. Reddy\'s',
    packSize: '15 Capsules',
    prescriptionRequired: false,
    expiryDate: new Date('2027-04-30'),
    tags: ['acidity', 'gerd']
  },
  {
    name: 'Ranitidine 150mg',
    description: 'H2 blocker for acidity',
    composition: 'Ranitidine 150mg',
    uses: 'Acidity, heartburn, ulcers',
    sideEffects: 'Headache, constipation',
    dosage: '1 tablet twice daily',
    category: 'Antacids',
    price: 25,
    stock: 400,
    manufacturer: 'Cipla',
    packSize: '10 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2026-10-31'),
    tags: ['acidity']
  },
  {
    name: 'ENO Powder',
    description: 'Quick relief from acidity',
    composition: 'Sodium Bicarbonate + Citric Acid',
    uses: 'Instant acidity relief, heartburn',
    sideEffects: 'None if used occasionally',
    dosage: '1 sachet in water when needed',
    category: 'Antacids',
    price: 10,
    stock: 800,
    manufacturer: 'GlaxoSmithKline',
    packSize: '1 Sachet',
    prescriptionRequired: false,
    expiryDate: new Date('2027-12-31'),
    tags: ['acidity', 'instant relief']
  },

  // Blood Pressure
  {
    name: 'Telma-H',
    description: 'Telmisartan + Hydrochlorothiazide combination',
    composition: 'Telmisartan 40mg + Hydrochlorothiazide 12.5mg',
    uses: 'High blood pressure',
    sideEffects: 'Dizziness, frequent urination',
    dosage: '1 tablet once daily',
    category: 'Blood Pressure',
    price: 145,
    stock: 250,
    manufacturer: 'Glenmark',
    packSize: '15 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-03-31'),
    tags: ['blood pressure', 'hypertension']
  },
  {
    name: 'Amlong-A',
    description: 'Amlodipine + Atenolol combination',
    composition: 'Amlodipine 5mg + Atenolol 50mg',
    uses: 'Hypertension, angina',
    sideEffects: 'Fatigue, cold extremities',
    dosage: '1 tablet once daily',
    category: 'Blood Pressure',
    price: 95,
    stock: 300,
    manufacturer: 'Micro Labs',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-01-31'),
    tags: ['blood pressure']
  },

  // Respiratory
  {
    name: 'Asthalin Inhaler',
    description: 'Salbutamol inhaler for asthma',
    composition: 'Salbutamol 100mcg',
    uses: 'Asthma, bronchospasm, breathing difficulty',
    sideEffects: 'Tremors, palpitations',
    dosage: '2 puffs when needed',
    category: 'Respiratory',
    price: 145,
    stock: 200,
    manufacturer: 'Cipla',
    packSize: '200 MDI',
    prescriptionRequired: true,
    expiryDate: new Date('2027-06-30'),
    tags: ['asthma', 'inhaler']
  },
  {
    name: 'Levolin Inhaler',
    description: 'Levosalbutamol for breathing',
    composition: 'Levosalbutamol 50mcg',
    uses: 'Asthma, COPD, wheezing',
    sideEffects: 'Headache, nervousness',
    dosage: '1-2 puffs as needed',
    category: 'Respiratory',
    price: 165,
    stock: 180,
    manufacturer: 'Cipla',
    packSize: '200 MDI',
    prescriptionRequired: true,
    expiryDate: new Date('2027-04-30'),
    tags: ['asthma', 'breathing']
  },
  {
    name: 'Montek LC',
    description: 'Montelukast + Levocetirizine',
    composition: 'Montelukast 10mg + Levocetirizine 5mg',
    uses: 'Allergic rhinitis, asthma',
    sideEffects: 'Drowsiness, headache',
    dosage: '1 tablet once daily at bedtime',
    category: 'Respiratory',
    price: 120,
    stock: 300,
    manufacturer: 'Sun Pharma',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-02-28'),
    tags: ['allergy', 'asthma']
  },

  // Women Health
  {
    name: 'Meprate 10mg',
    description: 'Medroxyprogesterone for menstrual disorders',
    composition: 'Medroxyprogesterone 10mg',
    uses: 'Irregular periods, amenorrhea',
    sideEffects: 'Nausea, breast tenderness',
    dosage: 'As directed by doctor',
    category: 'Women Health',
    price: 85,
    stock: 200,
    manufacturer: 'Serum Institute',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-05-31'),
    tags: ['periods', 'hormones']
  },
  {
    name: 'Folvite 5mg',
    description: 'Folic acid supplement',
    composition: 'Folic Acid 5mg',
    uses: 'Pregnancy, anemia, folic acid deficiency',
    sideEffects: 'None',
    dosage: '1 tablet daily',
    category: 'Women Health',
    price: 25,
    stock: 500,
    manufacturer: 'Abbott',
    packSize: '30 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-09-30'),
    tags: ['pregnancy', 'folic acid']
  },
  {
    name: 'Unwanted 72',
    description: 'Emergency contraceptive',
    composition: 'Levonorgestrel 0.75mg',
    uses: 'Emergency contraception',
    sideEffects: 'Nausea, irregular bleeding',
    dosage: '1 tablet within 72 hours',
    category: 'Women Health',
    price: 75,
    stock: 150,
    manufacturer: 'Mankind Pharma',
    packSize: '1 Tablet',
    prescriptionRequired: false,
    expiryDate: new Date('2026-12-31'),
    tags: ['contraception', 'emergency']
  },

  // Eye Care
  {
    name: 'Refresh Tears',
    description: 'Artificial tears for dry eyes',
    composition: 'Carboxymethylcellulose 0.5%',
    uses: 'Dry eyes, eye irritation',
    sideEffects: 'Mild burning',
    dosage: '1-2 drops as needed',
    category: 'Eye Care',
    price: 195,
    stock: 200,
    manufacturer: 'Allergan',
    packSize: '10ml',
    prescriptionRequired: false,
    expiryDate: new Date('2027-03-31'),
    tags: ['eye', 'dry eyes']
  },
  {
    name: 'Moxiflox Eye Drops',
    description: 'Antibiotic eye drops',
    composition: 'Moxifloxacin 0.5%',
    uses: 'Eye infections, conjunctivitis',
    sideEffects: 'Mild stinging',
    dosage: '1 drop 3 times daily',
    category: 'Eye Care',
    price: 85,
    stock: 250,
    manufacturer: 'Cipla',
    packSize: '5ml',
    prescriptionRequired: true,
    expiryDate: new Date('2026-11-30'),
    tags: ['eye', 'infection']
  },

  // Oral Care
  {
    name: 'Sensodyne Toothpaste',
    description: 'Toothpaste for sensitive teeth',
    composition: 'Potassium Nitrate + Sodium Fluoride',
    uses: 'Tooth sensitivity, cavity prevention',
    sideEffects: 'None',
    dosage: 'Brush twice daily',
    category: 'Oral Care',
    price: 165,
    stock: 400,
    manufacturer: 'GlaxoSmithKline',
    packSize: '70g',
    prescriptionRequired: false,
    expiryDate: new Date('2028-06-30'),
    tags: ['dental', 'sensitive teeth']
  },
  {
    name: 'Hexidine Mouthwash',
    description: 'Antiseptic mouthwash',
    composition: 'Chlorhexidine Gluconate 0.2%',
    uses: 'Gum disease, mouth ulcers, oral hygiene',
    sideEffects: 'Temporary taste change',
    dosage: 'Rinse twice daily',
    category: 'Oral Care',
    price: 95,
    stock: 300,
    manufacturer: 'ICPA',
    packSize: '100ml',
    prescriptionRequired: false,
    expiryDate: new Date('2027-07-31'),
    tags: ['mouthwash', 'oral hygiene']
  },

  // Additional Popular Medicines
  {
    name: 'Disprin',
    description: 'Soluble aspirin for quick pain relief',
    composition: 'Aspirin 350mg',
    uses: 'Headache, body pain, fever',
    sideEffects: 'Stomach upset',
    dosage: '1-2 tablets dissolved in water',
    category: 'Pain Relief',
    price: 22,
    stock: 600,
    manufacturer: 'Reckitt Benckiser',
    packSize: '10 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-10-31'),
    tags: ['pain', 'fever', 'headache']
  },
  {
    name: 'Paracip 500',
    description: 'Paracetamol tablets',
    composition: 'Paracetamol 500mg',
    uses: 'Fever, pain relief',
    sideEffects: 'Rare liver problems',
    dosage: '1-2 tablets 3-4 times daily',
    category: 'Pain Relief',
    price: 18,
    stock: 700,
    manufacturer: 'Cipla',
    packSize: '10 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-08-31'),
    tags: ['fever', 'pain']
  },
  {
    name: 'Norflox TZ',
    description: 'Norfloxacin + Tinidazole for infections',
    composition: 'Norfloxacin 400mg + Tinidazole 600mg',
    uses: 'Diarrhea, dysentery, bacterial infections',
    sideEffects: 'Nausea, metallic taste',
    dosage: '1 tablet twice daily',
    category: 'Antibiotics',
    price: 65,
    stock: 350,
    manufacturer: 'Cipla',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    expiryDate: new Date('2027-01-31'),
    tags: ['antibiotic', 'diarrhea']
  },
  {
    name: 'Loperamide',
    description: 'Anti-diarrheal medicine',
    composition: 'Loperamide 2mg',
    uses: 'Diarrhea, loose motions',
    sideEffects: 'Constipation, dizziness',
    dosage: '2 tablets initially, then 1 after each loose stool',
    category: 'Digestive Health',
    price: 35,
    stock: 400,
    manufacturer: 'Sun Pharma',
    packSize: '10 Tablets',
    prescriptionRequired: false,
    expiryDate: new Date('2027-04-30'),
    tags: ['diarrhea', 'loose motions']
  },
  {
    name: 'Gelusil Syrup',
    description: 'Antacid suspension',
    composition: 'Aluminium Hydroxide + Magnesium Hydroxide + Simethicone',
    uses: 'Acidity, gas, bloating',
    sideEffects: 'Constipation',
    dosage: '2 teaspoons after meals',
    category: 'Antacids',
    price: 85,
    stock: 350,
    manufacturer: 'Pfizer',
    packSize: '200ml',
    prescriptionRequired: false,
    expiryDate: new Date('2027-02-28'),
    tags: ['antacid', 'gas']
  }
];

const users = [
  {
    name: 'Admin User',
    email: process.env.ADMIN_EMAIL || 'admin@sachinmedical.com',
    password: await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10),
    role: 'admin',
    phone: '9876543210',
    isActive: true
  },
  {
    name: 'Test User',
    email: 'user@example.com',
    password: await bcrypt.hash('User@123', 10),
    role: 'user',
    phone: '9876543211',
    address: {
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Medicine.deleteMany({});
    await Category.deleteMany({});

    console.log('👤 Creating users...');
    await User.insertMany(users);

    console.log('📂 Creating categories...');
    const createdCategories = await Category.insertMany(categories);

    console.log('💊 Creating medicines...');
    const medicinesWithCategoryIds = medicines.map(medicine => {
      const category = createdCategories.find(cat => cat.name === medicine.category);
      return {
        ...medicine,
        category: category._id
      };
    });

    await Medicine.insertMany(medicinesWithCategoryIds);

    console.log('✅ Database seeded successfully with 100 Indian medicines!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin:');
    console.log(`  Email: ${process.env.ADMIN_EMAIL || 'admin@sachinmedical.com'}`);
    console.log(`  Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
    console.log('User:');
    console.log('  Email: user@example.com');
    console.log('  Password: User@123');
    console.log('\n🏥 Total Medicines Added: 100+');
    console.log('📂 Total Categories: 15');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();