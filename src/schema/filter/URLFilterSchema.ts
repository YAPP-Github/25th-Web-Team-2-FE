import { z } from 'zod';

import { REGIONS, AREAS } from '@/constants/filters';

export type URLFilterSchemaType = z.infer<ReturnType<typeof URLFilterSchema>>;

export const URLFilterSchema = () =>
  z.object({
    gender: z.enum(['MALE', 'FEMALE', 'ALL']).optional(),
    age: z.coerce.number().int().min(1).max(100).optional(),
    region: z.enum(REGIONS).optional(),
    areas: z
      .string()
      .transform((str) => str.split(','))
      .pipe(z.array(z.enum(AREAS)))
      .optional(),
    matchType: z.enum(['ONLINE', 'OFFLINE', 'ALL']).optional(),
    recruitStatus: z.enum(['ALL', 'OPEN']).default('ALL'),
  });
