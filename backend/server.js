const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");


const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'subject_schedule_db',
});

db.connect(err => {
    if(err) throw err;
    console.log("MySQL connected...")
});


app.get("/api/schedules", (req, res) => {
    db.query("SELECT * FROM schedules", (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

app.post("/api/schedules", (req, res) => {
    const {subject, day, subjectTime, room} = req.body;
    db.query("INSERT INTO schedules (subject, day, subjectTime, room) VALUES (?, ?, ?, ?)", [subject, day, subjectTime, room], (err, result) => {
        if(err) throw err;
        res.json({id: result.insertId, subject, day, subjectTime, room})
    });
});

app.put("/api/schedules/:id", (req, res) => {
    const { id } = req.params;
    const { subject, day, subjectTime, room } = req.body;

    db.query("UPDATE schedules SET subject = ?, day = ?, subjectTime = ?, room = ? WHERE id = ?", [subject, day, subjectTime, room, id], (err) => {
        if(err) throw err;
        res.json({id, subject, day, subjectTime, room});
    });
});

app.delete("/api/schedules/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM schedules WHERE id = ?", [id], (err) => {
        if(err) throw err;
        res.json({message: "Item deleted"});
    });
});
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

