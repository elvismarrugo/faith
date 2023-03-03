import mongoose from "mongoose"

const { Schema } = mongoose;

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "por favor ingrese el título amigoooooooooaaaaaaaa"],
  },
  plot: {
    type: String,
    required: [true, "por favor ingrese el plot amigoooooooooaaaaaaaa"],
  },
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);


// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const MovieSchema = new Schema({
//   title:  String, // String is shorthand for {type: String}
//   author: String,
//   body:   String,
// });