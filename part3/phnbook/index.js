const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/people");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
// const password = "Manjirihb";


morgan.token("newObj", (request, resposne) => {
  let newPhone = { ...request.body, id: getMaxId() };

  // newPhone.id = getMaxId();
  return JSON.stringify(newPhone);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :newObj"
  )
);

const getMaxId = () => {
  return `${Math.round(Math.random() * 10)}`;
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", morgan("tiny"), (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/info", (request, response) => {
  response.send(
    ` <div>
        <p>PhoneBook has info for ${persons.length + 1} people</p>
        <p>${new Date()}</p>
    </div>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const params = req.params.id;
  const person = persons.find((person) => person.id === params);
  if (person) {
    // res.json(person);
    Person.findById(req.params.id).then((person) => res.json(person));
  } else {
    res.status("404");
    res.send("Person not found ");
    res.end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  }
});

app.post("/api/persons", (request, response) => {
  let body = request.body;
  console.log(body);
  const existingPerson = persons.filter((person) => person.name === body.name);

  // body.id = getMaxId();
  const newPhone = new Person({
    id: getMaxId(),
    name: body.name,
    number: body.number,
  });
  console.log(newPhone);
  
  
    newPhone.save().then((savePerson) => {
      response.json(savePerson);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server started at ", { PORT });
});
