import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  hobbies: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  hobbies: [
    { type: Schema.Types.ObjectId, ref: 'Hobby' }
  ],
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
