import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

UsersSchema.pre('save', async function (next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this['password'] = await bcrypt.hash(this['password'], 10);
  } catch (err) {
    return next(err);
  }
});
