import express from "express";

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
const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};
const deleteUser = (id) => {
    users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);
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
    addUser(userToAdd);
    res.send();
});
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    deleteUser(id);
    res.send();
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});