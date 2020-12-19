DROP DATABASE IF EXISTS employee_systemDB;
CREATE database employee_systemDB;

USE employee_systemDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL
);

INSERT INTO department (department)
VALUES ("cat cafe"), ("dog store"), ("horse farm");

INSERT INTO role (title, salary, department_id)
VALUES ("cat dad", 20000.00, 0276), ("dog mom", 300000.00, 0353);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("lindsay", "bordelon", 75, 0001), ("tubby", "krordelon", 0001, 00002);

SELECT * FROM employee;