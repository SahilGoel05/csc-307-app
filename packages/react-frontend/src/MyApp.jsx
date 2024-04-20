// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    async function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    async function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }

    async function deleteUser(id) {
        const promise = fetch(`Http://localhost:8000/users/${id}`, {
            method: "DELETE",
        });

        return promise;
    }

    function removeOneCharacter(id) {
        deleteUser(id)
            .then((res) => {
               if(res.status == 204) {
                    fetchUsers()
                        .then((res) => res.json())
                        .then((json) => setCharacters(json["users_list"]))
                        .catch((error) => { console.log(error); });
               }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    function updateList(person) {
        postUser(person)
            .then(res => {
                if (res.status === 201) {
                    return res.json();
                } else {
                    throw new Error('Failed to create user');
                }
            })
            .then(data => {
                setCharacters(characters => [...characters, data]);
            })
            .catch(error => {
                console.log(error);
            });
    }


    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
    }, [] );

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;