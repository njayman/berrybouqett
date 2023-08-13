import mongoose from "mongoose";
import mongooseSerial from "mongoose-serial";

const NoteSchema = new mongoose.Schema(
  {
    slNo: {
      type: String,
    },
    customerName: {
      type: String,
      min: 2,
      max: 100,
    },
    category: { type: String },
    orderId: {
      type: String,
    },
    postCode: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    downloaded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

NoteSchema.plugin(mongooseSerial, { field: "slNo" });

NoteSchema.pre("save", function (next) {
  if (typeof this.slNo === "string") {
    this.slNo = parseInt(this.slNo);
  }
  next();
});

NoteSchema.virtual("sl").get(function () {
  return Number(this.slNo);
});

const Note = mongoose.model("Note", NoteSchema);
export default Note;
