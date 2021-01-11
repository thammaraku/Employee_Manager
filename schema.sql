DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DEC(10,0) NOT NULL,
    department_id INT NOT NULL
);


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE manager (
	id INT NOT NULL,
	manager VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);




SELECT *
FROM employee
WHERE manager_id = "3";


-- SELECT artist
-- FROM top1000ude
-- GROUP BY artist
-- HAVING COUNT(*) < 2;


-- SELECT artist
-- FROM top1000
-- -- WHERE position >= 1 AND position <= 1-- 0;
-- WHERE position BETWEEN 1 AND 10;

-- SELECT *
-- FROM top1000
-- WHERE song = "my heart will go on";

-- FIRST REQUIREMENT SHOW ALL
-- SELECT employee.id, first_name, last_name, title, department.department, role.salary, manager.manager department
-- FROM (((employee
-- INNER JOIN role 
-- ON employee.role_id = role.id)
-- INNER JOIN department
-- on role.department_id = department.id)
-- LEFT JOIN manager
-- on employee.manager_id = manager.id)

-- SECOND SEARCH BY DEPARTMENT
SELECT employee.id, first_name, last_name, title, department.department
FROM ((employee
INNER JOIN role 
ON employee.role_id = role.id)
INNER JOIN department
ON role.department_id = department.id)
WHERE department.department = "Engineering"


SELECT employee.id, first_name, last_name, title
FROM employee
INNER JOIN role 
ON employee.role_id = role.id

-- WHERE top_album.artist = "celine dion"
-- WHERE top_album.artist = ? // later on replace with variable here for user to input

-- ORDER BY top_album.year, top_album.position;  
-- ORDER BY top1000.position, top_album.year;  


SELECT employee.id, first_name, last_name, title, manager.manager, department.department
FROM (((employee 
INNER JOIN role 
ON employee.role_id = role.id) 
INNER JOIN department 
ON role.department_id = department.id) 
INNER JOIN manager 
ON employee.manager_id = manager.id)


UPDATE employee
SET role_id = 7
WHERE id = 1

INSERT INTO employee
VALUES


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Toby","Mac",8)
            
DELETE FROM employee
WHERE id = 13

