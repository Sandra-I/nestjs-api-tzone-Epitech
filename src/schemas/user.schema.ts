import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class User {
    @Prop()
    googleId: string;

    @Prop()
    history: {
        text: string,
        date: Date
    }[]

    @Prop()
    settings: {
        langage: string,
        preview: boolean
    }

    @Prop()
    payment: {
        date: Date;
        total: number;
    }[]

    @Prop()
    subscription: {
        plan: {
            type: Types.ObjectId,
            ref: 'Plan'
        },
        startDate: Date,
        endDate: Date,
        automaticRenewal: boolean
    }
}

export const UserSchema = SchemaFactory.createForClass(User);