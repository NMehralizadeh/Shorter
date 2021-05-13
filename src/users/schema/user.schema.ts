import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  Username: string;

  @Prop()
  Password: string;

  @Prop()
  Salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
