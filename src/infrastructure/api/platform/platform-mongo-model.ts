import mongoose from 'mongoose';

export interface PlatformAttrs {
  icon: string;
  title: string;
}

export interface PlatformDoc extends mongoose.Document {
  icon: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PlatformModel extends mongoose.Model<PlatformDoc> {
  build(attrs: PlatformAttrs): PlatformDoc;
}

const platformSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

platformSchema.statics.build = (attrs: PlatformAttrs) => {
  return new Platform(attrs);
};

const Platform = mongoose.model<PlatformDoc, PlatformModel>(
  'Platform',
  platformSchema
);

export { Platform as PlatformMongo };
