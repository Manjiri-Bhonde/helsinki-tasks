const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/people");

const app = express();
const cors = require("cors");
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
// const password = "Manjirihb";

morgan.token("newObj", (request) => {
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

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    response.send(
      ` <div>
          <p>PhoneBook has info for ${count} people</p>
          <p>${new Date()}</p>
      </div>`
    );
  });
});

app.get("/api/persons/:id", morgan("tiny"), (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => res.json(person))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  let body = request.body;

  const newPhone = new Person({
    name: body.name,
    number: body.number,
  });

  newPhone
    .save()
    .then((savePerson) => {
      response.json(savePerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) console.log("not found");

      person.name = name;
      person.number = number;
      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server started at ", { PORT }));
