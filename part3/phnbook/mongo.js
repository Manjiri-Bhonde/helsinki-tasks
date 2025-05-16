const mongoose = require("mongoose");

// if (process.argv.length < 5) {
//   console.log("give password,name and phone to add as argument");
//   process.exit(1);
// }

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://manjiribhonde:${password}@full-stack-project.ctevk6e.mongodb.net/phnbookApp?retryWrites=true&w=majority&appName=full-stack-project`;

mongoose.set("strictQuery", false);

mongoose.connect(url);
console.log("connected");
const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
      mongoose.connection.close();
    });
  });
} else if (process.argv.length > 2) {
  const name = process.argv[3];
  const phn = process.argv[4];
  const person = new Person({
    name: name,
    number: phn,
  });

  person.save().then((result) => {
    console.log("person phn saved!");
    mongoose.connection.close();
  });
}
