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
  vitals: {
    temperature: number[];
    pulse_rate: number[];
    respiration_rate: number[];
    blood_pressure: number[];
  };
  patient_score: number;
  env_score: number;
  pre_condition_score: number;
  overall_score: number;
};


export const getPatients = () : Patient[] => ([
    {
      "id": "1",
      "first_name": "John",
      "last_name": "Doe",
      "age": 30,
      "gender": "Male",
      "admitted_at": "2021-01-01",
      "vitals": {
          "temperature": [36.5, 36.6, 36.4, 36.7, 36.8, 36.3, 36.9, 36.5, 36.4, 36.6, 36.7, 36.5, 36.8, 36.4, 36.6, 36.5, 36.7, 36.4, 36.8, 36.6],
          "pulse_rate": [72, 75, 71, 73, 70, 74, 76, 73, 71, 69, 72, 74, 70, 75, 73, 71, 74, 72, 70, 73],
          "respiration_rate": [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],     
          "blood_pressure": [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139   ],
      },
      "patient_score": 0,
      "env_score": 0,
      "pre_condition_score": 0,
      "overall_score": 0,
  },
]);
