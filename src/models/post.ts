import { Schema, model, Document, Model } from 'mongoose';

export interface PostProps {
  title: string;
  body: string;
  isPublished: boolean;
}

export interface PostModelProps extends PostProps, Document {}

export interface PostModel extends Model<PostModelProps> {}

const postSchema: Schema = new Schema({
  title: { type: Schema.Types.String, required: true, minlength: 1 },
  body: { type: Schema.Types.String, required: true, minlength: 1 },
  isPublished: { type: Schema.Types.Boolean, required: true, default: false },
});

const Post = model('Post', postSchema) as PostModel;

export default Post;
