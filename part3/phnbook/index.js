const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
app.use(cors()); 
app.use(express.json());
const path = require("path");
app.use(express.static("dist"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
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
  response.json(persons);
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
    res.json(person);
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
  let newPhone = request.body;
  const existingPerson = persons.filter(
    (person) => person.name === newPhone.name
  );

  newPhone.id = getMaxId();
  if (
    !newPhone.number ||
    !newPhone.name ||
    newPhone.name === "" ||
    newPhone.number === 0 ||
    existingPerson.length === 0
  ) {
    return response
      .status(400)
      .json({ error: "Number or name should be unique" });
  } else {
    response.json(persons.concat(newPhone));
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server started at ", { PORT });
});
