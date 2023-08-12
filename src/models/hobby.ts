import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IHobby extends Document {
  passionLevel: string;
  name: string;
  year: number;
}

const hobbySchema: Schema = new Schema({
  passionLevel: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
});

export const Hobby: Model<IHobby> = mongoose.model<IHobby>('Hobby', hobbySchema);
