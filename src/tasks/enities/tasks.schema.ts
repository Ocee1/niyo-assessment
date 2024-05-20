import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/users/entities/user.entity";
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TaskDocument = HydratedDocument<User>

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

export class Task {
    @Prop({ unique: true})
    title: string;

    @Prop()
    description: string;

    @Prop()
    status: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: User;

}

export const TaskSchema = SchemaFactory.createForClass(Task);