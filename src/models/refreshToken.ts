import { Schema, model, Document, Model } from 'mongoose';
import { generateRefreshToken } from 'src/util/generateRefreshToken';
import { REFRESH_TOKEN_LENGTH, REFRESH_TOKEN_DAYS_TO_EXPIRE } from 'src/configuration';
import { UserModelProps } from './user';

export interface RefreshTokenProps {
  token: string;
  expire: number;
  isInvalidated: boolean;
  userEmail: UserModelProps['email'];
}

type IsValidStaticFuncType = () => boolean;
type InvalidateTokenStaticFuncType = () => Promise<undefined>;

export interface RefreshTokenModelProps extends RefreshTokenProps, Document {
  isValid: IsValidStaticFuncType;
  invalidateToken: InvalidateTokenStaticFuncType;
}

export interface RefreshTokenModel extends Model<RefreshTokenModelProps> {}

const refreshTokenSchema: Schema = new Schema({
  token: { type: Schema.Types.String, unique: true },
  expire: { type: Schema.Types.Number },
  isInvalidated: { type: Schema.Types.Boolean },
  userEmail: { type: Schema.Types.String, required: true },
});

refreshTokenSchema.pre<RefreshTokenModelProps>('save', function(next) {
  if (this.isModified('userEmail')) {
    const { token, expire } = generateRefreshToken(REFRESH_TOKEN_LENGTH, REFRESH_TOKEN_DAYS_TO_EXPIRE);
    this.token = token;
    this.expire = expire;
    this.isInvalidated = false;
  }
  next();
});

refreshTokenSchema.methods.isValid = function isValid() {
  return this.expire > Math.round(+new Date() / 1000);
} as IsValidStaticFuncType;

refreshTokenSchema.methods.invalidateToken = async function invalidateToken() {
  if (!this.isInvalidated) {
    this.expire = Math.round(+new Date() / 1000) + 60;
    this.isInvalidated = true;
    await this.save();
  }
} as InvalidateTokenStaticFuncType;

const RefreshToken = model('RefreshToken', refreshTokenSchema) as RefreshTokenModel;

export default RefreshToken;
