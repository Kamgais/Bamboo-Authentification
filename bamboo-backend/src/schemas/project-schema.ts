import {z} from 'zod';

export const ProjectSchema = z.object({
    title: z.string({required_error: 'title is required', invalid_type_error: 'title must be string'}),
    description: z.string({required_error: 'description is required', invalid_type_error: 'description must be string'}).optional(),
    startDate: z.string({required_error: 'start date is required'}),
    endDate: z.string({required_error: 'end date is required'}),
    statusId: z.number({required_error: 'status id is required'}),
    authorId: z.number({required_error: 'author id is required'})

})