const express = require("express");
const app = express();
// TODO: why don't need this?
// const Sequelize = require("sequelize");
const config = require("./config");
const Employee = require("./models/employee");
const Department = require("./models/department");
const sequelize = require("sequelize");

app.use(express.json());

config.authenticate().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

// TODO: what does this do
Department.hasMany(Employee, {
    foreignKey: {
        allowNull: false
    },
    onDelete: "CASCADE"
});

// what does this do
sequelize.sync({force:false}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
// ---------------------------------

// ---------- DEPARTMENTS ---------- //
// Add a new department
app.post("/departments", (req, res) => {
    let data = {
        title: req.body.title
    }

    Department.create(data).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// ---------- EMPLOYEES ----------//
// Add a new employee
app.post("/employees", (req, res) => {
    let data = {
        name: req.body.name,
        gender: req.body.gender,
        salary: req.body.salary,
        department_id: req.body.department_id
    }

    Employee.create(data).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// Retreive all employees
app.get("/employees", (req, res) => {
    Employee.findAll().then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// Retreive a single employee based on id
app.get("/employees/id/:id", (req, res) => {
    Employee.findByPk(req.params.id).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// Filter employees based on gender and department_id
// return only name, gender, and department_id
app.get("/employees/filter", (req, res) => {
    let queries = {};

    if (req.query.gender) {
        queries.gender = req.query.gender;
    }

    if (req.query.department_id) {
        queries.department_id = req.query.department_id;
    }

    let data = {};
    data.where = queries;
    data.attributes = ["name", "gender", "department_id"];
    
    Employee.findAll(data).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});


// Update employee
app.put("/employees/id/:id", (req, res) => {
    Employee.findByPk(req.params.id).then((result) => {
        result.name = req.body.name;
        result.gender = req.body.gender;
        result.salary = req.body.salary;
        result.department_id = req.body.department_id;

        result.save().then(() => {
            res.send(result);
        }).catch((err) => {
            res.status(400).send(err);
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// Delete employee
app.delete("/employees/id/:id", (req, res) => {
    Employee.findByPk(req.params.id).then((result) => {
        result.destroy().then(() => {
            res.send(result);
        }).catch((err) => {
            res.status(400).send(err);
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
