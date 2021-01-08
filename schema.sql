DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
);


CREATE TABLE role (
    title VARCHAR(30) NOT NULL,
    salary DEC(10,4) NOT NULL,
    department_id INT NOT NULL
);


CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL
);