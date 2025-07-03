import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
        validator: function(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
    },
    message: props => `${props.value} is not a valid email`
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password must be at least 6 characters"],
    max: 50,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export const User = model("User", userSchema);
