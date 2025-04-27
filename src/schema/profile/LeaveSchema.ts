import { z } from 'zod';

export type LeaveSchemaType = z.infer<ReturnType<typeof LeaveSchema>>;

const LeaveSchema = () => {
  const reasonSchema = z.object({
    reasonType: z.enum([
      'RESEARCH_STOPPED',
      'SECURITY_CONCERN',
      'NO_NECESSARY_FUNCTION',
      'TOO_MANY_EMAILS',
      'INCONVENIENT_SITE',
    ]),
    reason: z.string().optional(),
  });

  const otherReasonSchema = z.object({
    reasonType: z.literal('OTHER'),
    reason: z
      .string()
      .min(1, { message: '최소 1자 이상 입력해 주세요' })
      .max(300, { message: '최대 300자 이하로 입력해 주세요' }),
  });

  return z.discriminatedUnion('reasonType', [reasonSchema, otherReasonSchema]);
};

export default LeaveSchema;
