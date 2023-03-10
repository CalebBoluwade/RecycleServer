import { object, string, TypeOf } from 'zod';

export const responseSchema = object({
    Response: object({
        message: string(),
        data: object({}).nullable(),
        accessToken: string().optional(),
        error: object({}).optional().nullish()
    })
});

export type Res = TypeOf<typeof responseSchema>['Response'];
