import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username."],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address."],
    unique: true,
    match: [
      /.+\@.+\..+/,
      "Please enter a valid email address (e.g., example@mail.com).",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
  },
  verifyCode: {
    type: String,
    required: [true, "Verification code is missing. Please try again."],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verification code expiry date is required."],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
