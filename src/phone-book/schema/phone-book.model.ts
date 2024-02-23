import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PhoneBook extends Document {
    @Prop({ type: String  , required : true})
    fullName: string;

    @Prop({ type: String, unique: true })
    phoneNumber: string;
}

export const PhoneBookSchema = SchemaFactory.createForClass(PhoneBook);