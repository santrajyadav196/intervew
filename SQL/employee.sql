
-- create
CREATE TABLE EMPLOYEE (
  empId INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  dept TEXT NOT NULL,
  salary INTEGER NOT NULL
);

-- insert
INSERT INTO EMPLOYEE VALUES (1, 'Clark', 'Sales', 30000);
INSERT INTO EMPLOYEE VALUES (2, 'Dave', 'Accounting', 35000);
INSERT INTO EMPLOYEE VALUES (3, 'Ava', 'Sales', 33000);
INSERT INTO EMPLOYEE VALUES(4, "Developer", "Accounting", 34000);

-- fetch 
-- SELECT e.dept, e.name, e.salary AS highest_salary
-- FROM EMPLOYEE e
-- WHERE e.salary = (
--   SELECT MAX(salary)
--   FROM EMPLOYEE
--   WHERE dept = e.dept
-- );

-- SELECT e.dept, e.name, e.salary AS highest_salary 
-- FROM EMPLOYEE e 
-- WHERE e.salary = (SELECT MAX(salary) FROM EMPLOYEE WHERE dept=e.dept);



-- SELECT * FROM EMPLOYEE;
-- SELECT name, salary, dept FROM EMPLOYEE;
-- SELECT * FROM EMPLOYEE WHERE salary> 33000;
-- SELECT * FROM EMPLOYEE ORDER BY salary;
-- SELECT * FROM EMPLOYEE ORDER BY salary DESC;
-- SELECT dept, AVG(salary) as avg_salary FROM EMPLOYEE GROUP BY dept;
-- SELECT dept, MAX(salary) as highest_salary FROM EMPLOYEE GROUP BY dept;
-- SELECT dept, SUM(salary) as total_salary FROM EMPLOYEE GROUP BY dept;

-- SELECT dept, AVG(salary) AS avg_salary
-- FROM EMPLOYEE
-- GROUP BY dept HAVING AVG(salary)> 30000;