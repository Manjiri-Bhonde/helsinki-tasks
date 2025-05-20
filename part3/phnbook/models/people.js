const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  id: String,
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    minLength: 3,
    validate: {
      validator: (v) => {
        if (v.length < 8) return false;

        const regex = /^\d{2,3}-\d+$/;
        return regex.test(v);
      },
      message: "Number is not valid ",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
