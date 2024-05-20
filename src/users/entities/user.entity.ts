import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

export class User {
    @Prop({ unique: true})
    email: string;

    @Prop()
    password: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

}

export const UserSchema = SchemaFactory.createForClass(User);