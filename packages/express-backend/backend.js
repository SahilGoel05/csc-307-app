import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

app.use(cors());
app.use(express.json());

const findUsersByJob = (job) => {
    return job ?
        users["users_list"].filter(
            (user) => user["job"] === job) :
        users["users_list"];
}
const findUserByName = (name) => {
    return name ?
        users["users_list"].filter(
            (user) => user["name"] === name) :
        users["users_list"];
};
const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);
const getRandomId = () => {
    return Math.floor(Math.random() * 1000)
}
const addUser = (user) => {
    const userWithId = {...user, id: `${getRandomId()}`}
    users["users_list"].push(userWithId);
    return userWithId;
};
const deleteUser = (id) => {
    const initialLength = users["users_list"].length;
    users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);

    if (users["users_list"].length < initialLength) {
        return 204
    } else {
        return 404
    }
};

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    const nameResult = findUserByName(name)
    const jobResult = findUsersByJob(job)
    const finalResult = nameResult.filter((user) => jobResult.includes(user))
    res.send({ users_list : finalResult});
});
app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const newUser = addUser(userToAdd);
    res.status(201).send(newUser);
});
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    const returnStatus = deleteUser(id);
    res.status(returnStatus).send();
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});