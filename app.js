// Import package
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'grandkey',
    database: 'employeeDB',
})

// Execution
connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    // viewEmployees();
    // viewRoles();
    // viewDepartments();
  

    start();

});

// Inquirer part

function start() {

    inquirer
        .prompt({
            name: "userPick",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Employee",
                "View All Employee By Department",
                "View All Employee By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                // "EXIT"
            ]
        })

        .then(answers => {

            switch (answers.userPick) {

                case "View All Employee":
                    viewEmployees();
                    connection.end();
                    break;

                default:
                    connection.end();

            };
        });
}



// SQL QUERY PART
async function viewEmployees() {
    const SQL_STATEMENT = "SELECT * FROM employee";
    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.table(rows);
}
