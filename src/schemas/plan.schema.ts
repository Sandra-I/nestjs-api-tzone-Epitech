import * as mongoose from 'mongoose';
import { Plan } from 'src/plan/entities/plan.entity';

export type PlanDocument = Plan & Document;

export const PlanSchema = new mongoose.Schema({
    name: String,
    selection: Boolean,
    preview: Boolean,
    quickCopy: Boolean,
    fontRecuperation: Boolean,
    history: Boolean,
    translation: Boolean
});