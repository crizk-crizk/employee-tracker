--department seeds--
INSERT INTO department (name)
VALUES ("marketing");

INSERT INTO department (name)
VALUES ("graphics");

INSERT INTO department (name)
VALUES ("r&d");

INSERT INTO department (name)
VALUES ("engineering");

--department seeds--
INSERT INTO role (title, salary, department_id)
VALUES ("Copy Writer", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("UX designer", 75000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Analyst", 180000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Eng", 120000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 180000, 4);

--employee seeds--
-- team lead
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ana", "Reese", 5);
-- UX guy
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Max", "Smith", 2, 1);
--analyst
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Bob", "Spoon", 3);
--software eng.
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Kaplan", 4, 1);
