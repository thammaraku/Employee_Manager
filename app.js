// Import package
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

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

    start();

});

// Inquirer part

function start() {

    console.log(",—--------------------------------------------------------.");
    console.log("|  ###### #    # #####  #       ####  #   # ###### ###### |");
    console.log("|  #      ##  ## #    # #      #    #  # #  #      #      |");
    console.log("|  #####  # ## # #    # #      #    #   #   #####  #####  |");
    console.log("|  #      #    # #####  #      #    #   #   #      #      |");
    console.log("|  #      #    # #      #      #    #   #   #      #      |");
    console.log("|  ###### #    # #      ######  ####    #   ###### ###### |");
    console.log("|                                                         |");
    console.log("|    #    #   ##   #    #   ##    ####  ###### #####      |");
    console.log("|    ##  ##  #  #  ##   #  #  #  #    # #      #    #     |");
    console.log("|    # ## # #    # # #  # #    # #      #####  #    #     |");
    console.log("|    #    # ###### #  # # ###### #  ### #      #####      |");
    console.log("|    #    # #    # #   ## #    # #    # #      #   #      |");
    console.log("|    #    # #    # #    # #    #  ####  ###### #    #     |");
    console.log("‘—--------------------------------------------------------‘");


    inquirer
        .prompt({
            name: "userPick",
            type: "list",
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
                    break;

                case "View All Employee By Department":
                    viewDepartment();
                    break;

                case "View All Employee By Manager":
                    viewEmployees();
                    connection.end();
                    break;

            };
        });
}



// SQL QUERY PART
async function viewEmployees() {
    const SQL_STATEMENT = `SELECT employee.id, first_name, last_name, title, department.department, role.salary, manager.manager 
    FROM (((employee 
    INNER JOIN role 
    ON employee.role_id = role.id) 
    INNER JOIN department 
    ON role.department_id = department.id) 
    LEFT JOIN manager 
    ON employee.manager_id = manager.id)`;

    const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
    console.log("\t");
    console.table(rows);
    connection.end();
}


async function viewDepartment() {

    inquirer
        .prompt({
            name: "departmentSelect",
            type: "list",
            message: "Which department would you like to search?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        })

        .then(async function (answer) {

            const SQL_STATEMENT = `SELECT employee.id, first_name, last_name, title, department.department 
            FROM ((employee 
            INNER JOIN role 
            ON employee.role_id = role.id) 
            INNER JOIN department 
            ON role.department_id = department.id) 
            WHERE department.department = "${answer.departmentSelect}"`;

            const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
            console.log("\t");
            console.table(rows);
            connection.end();
        });
}



// function searchDepartment() {

//     inquirer
//         .prompt({
//             name: "departmentSelect",
//             type: "list",
//             message: "Which department would you like to search?",
//             choices: [
//                 "Sales",
//                 "Engineering",
//                 "Finance",
//                 "Add Employee",
//                 "Legal"
//             ]
//         })

//         .then(function(answer) {
//             console.log(answer);
//             console.log(answer.departmentSelect);
//             const departmentSelect = answer.departmentSelect;
//             viewEmployeesDepartment(departmentSelect)
//         });
// }




// ######### BACKUP CODE ###########

//This line of code runs a synchronous function through the figlet npm that displays the designated text string in the console
// const figlet = require('figlet');
// console.log(figlet.textSync('Employee Management', {
//     font: 'Standard',
//     horizontalLayout: 'default',
//     verticalLayout: 'default'
// }));

// #### OR #####
// console.log(figlet.textSync('Employee Manager', {
//     font: '3D-ASCII',
//     horizontalLayout: 'default',
//     verticalLayout: 'default',
//     width: 100,
//     whitespaceBreak: true
// }))





