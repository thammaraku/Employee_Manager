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
            loop: false,
            choices: [
                "View All Employee",
                "View All Employee By Department",
                "View All Employee By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "EXIT"
            ]
        })

        .then(answers => {

            switch (answers.userPick) {

                case "View All Employee":
                    viewEmployees();
                    break;

                case "View All Employee By Department":
                    viewByDepartment();
                    break;

                case "View All Employee By Manager":
                    viewByManager();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;

                case "EXIT":
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


async function viewByDepartment() {

    const [departmentList, fields2] = await connection.promise().query("SELECT * FROM department");
    // console.log(departmentList);
    inquirer
        .prompt({
            name: "departmentSelect",
            type: "list",
            message: "Which department would you like to search?",
            choices: departmentList.map(department => department.department),
            loop: false
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

async function viewByManager() {

    const [managerList, fields2] = await connection.promise().query("SELECT * FROM manager");
    // console.log(managerList);
    inquirer
        .prompt({
            name: "managerSelect",
            type: "list",
            message: "Which manager would you like to search?",
            choices: managerList.map(manager => manager.manager),
            loop: false
        })

        .then(async function (answer) {

            const SQL_STATEMENT = `SELECT employee.id, first_name, last_name, title, manager.manager, department.department
            FROM (((employee 
            INNER JOIN role 
            ON employee.role_id = role.id) 
            INNER JOIN department 
            ON role.department_id = department.id) 
            INNER JOIN manager 
            ON employee.manager_id = manager.id) 
            WHERE manager.manager = "${answer.managerSelect}"`;

            const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
            console.log("\t");
            console.table(rows);
            connection.end();
        });
}


async function addEmployee() {

    const [roleList, fields1] = await connection.promise().query("SELECT * FROM role");
    // console.log(roleList);
    const roleWithId = roleList.map(({ id, title }) => ({
        value: id, name: `${title}`
    }));
    // const [managerList, fields2] = await connection.promise().query("SELECT * FROM manager");
    // const managerChoices = managerList.map(manager => manager.manager);
    // console.log(managerList);

    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "what is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "what is the employee's last name?"
            },
            {
                name: "role_id",
                type: "list",
                choices: roleWithId,
                loop: false
            }
            // {
            //     name: "manager_id",
            //     type: "list",
            //     message: "who is the employee's manager?",
            //     choices: managerChoices,
            //     loop: false
            // }
        ])

        .then(async function (answer) {

            // const SQL_STATEMENT = `INSERT INTO employee (first_name, last_name, role_id)
            // VALUES ?`;

            // const newEmployee = {
            //     first_name: "Thamma",
            //     last_name: "Uppa",
            //     role_id: 1,
            // ];

            console.log(answer);

            var query = `INSERT INTO employee SET ?`
            // when finished prompting, insert a new item into the db with that info
            connection.query(query,
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                },
                function (err, res) {
                    if (err) throw err;

                    console.table(res);

                    // console.log("newEmployee " + newEmployee);

                    // const [rows, fields] = await connection.promise().query(SQL_STATEMENT, [newEmployee]);
                    // console.log("\t");
                    // console.table(rows3);
                    // connection.end();



                });



        });
}


async function updateRole() {

                const [employeeList, fields1] = await connection.promise().query("SELECT * FROM employee");
                // console.log(employeeList);
                const employeeIdFirstSecond = employeeList.map(({ id, first_name, last_name }) => ({
                    value: id, name: `${first_name} ${last_name}`
                }));
                // console.log(employeeIdFirstSecond);
                const [roleList, fields2] = await connection.promise().query("SELECT * FROM role");
                // console.log(roleList);
                const roleWithId = roleList.map(({ id, title }) => ({
                    value: id, name: `${title}`
                }));

                inquirer
                    .prompt([
                        {
                            name: "roleChangeEmployee",
                            type: "list",
                            message: "which person would you like to change role?",
                            // choices: employeeList.map(employee => employee.first_name)
                            choices: employeeIdFirstSecond,
                            loop: false
                        },
                        {
                            name: "newRole",
                            type: "list",
                            message: "which role would you like to change to?",
                            choices: roleWithId,
                            loop: false
                        }
                    ])
                    .then(async function (answer) {
                        // console.log("answer.newRole " + answer.newRole);
                        // console.log("answer.roleChangeEmployee " + answer.roleChangeEmployee);

                        const SQL_STATEMENT = `UPDATE employee
            SET role_id = ?
            WHERE id = ?`;

                        const [rows, fields] = await connection.promise().query(SQL_STATEMENT, [answer.newRole, answer.roleChangeEmployee]);

                        switch (answer.newRole) {

                            case 1:
                                var newManagerId = 0;
                                break;
                            case 2:
                                var newManagerId = 1;
                                break;
                            case 3:
                                var newManagerId = 0;
                                break;
                            case 4:
                                var newManagerId = 3;
                                break;
                            case 5:
                                var newManagerId = 0;
                                break;
                            case 6:
                                var newManagerId = 5;
                                break;
                            case 7:
                                var newManagerId = 0;
                                break;
                            case 8:
                                var newManagerId = 7;
                                break;

                        };
                        // console.log("newManagerId " + newManagerId);
                        // console.log("answer.roleChangeEmployee " + answer.roleChangeEmployee);

                        const SQL_STATEMENT_MANAGER = `UPDATE employee
            SET manager_id = "${newManagerId}"
            WHERE id = "${answer.roleChangeEmployee}"`;
                        const [rows2, fields2] = await connection.promise().query(SQL_STATEMENT_MANAGER);
                        console.log("\t");
                        console.log("Updated Employee Role Below");

                        const SQL_STATEMENT_UPDATED = `SELECT employee.id, first_name, last_name, title, department.department, role.salary, manager.manager 
            FROM (((employee 
            INNER JOIN role 
            ON employee.role_id = role.id) 
            INNER JOIN department 
            ON role.department_id = department.id) 
            LEFT JOIN manager 
            ON employee.manager_id = manager.id)
            WHERE employee.id = "${answer.roleChangeEmployee}"`;

                        const [rows3, fields3] = await connection.promise().query(SQL_STATEMENT_UPDATED);
                        console.log("\t");
                        console.table(rows3);
                        connection.end();


                    })





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





