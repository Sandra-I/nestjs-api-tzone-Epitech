import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Plan {

    @Prop()
    name: string;

    @Prop()
    selection: boolean;

    @Prop()
    preview: boolean;

    @Prop()
    quickCopy: boolean;
    
    @Prop()
    fontRecuperation: boolean;
    
    @Prop()
    history: boolean;

    @Prop()
    translation: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);