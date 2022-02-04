import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "./user.schema";

@Schema()
export class Payment {
    @Prop()
    date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    total: number;
}

export const CatSchema = SchemaFactory.createForClass(User);