import { Schema, model, Document, Model } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { UserRole } from 'src/generated/graphql';

export interface UserProps {
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserModelProps extends UserProps, Document {
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface UserModel extends Model<UserModelProps> {}

const userSchema: Schema = new Schema({
  email: { type: Schema.Types.String, required: true, unique: true },
  password: { type: Schema.Types.String, required: true, select: false },
  role: {
    type: Schema.Types.String,
    required: true,
    enum: [UserRole.Client, UserRole.Internal, UserRole.Admin],
    default: UserRole.Client,
  },
  isActive: { type: Schema.Types.Boolean, required: true, default: true },
});

userSchema.pre<UserModelProps>('save', function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);

    // override the cleartext password with the hashed one
    this.password = passwordHash;
    next();
  });
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

const User = model('User', userSchema) as UserModel;

export default User;
