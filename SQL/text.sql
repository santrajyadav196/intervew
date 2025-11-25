# write create table query in postgresql

CREATE TABLE person (
 id INT,
 name VARCHAR(100),
 city VARCHAR(100)
 );

 INSERT INTO person(id, name, city) VALUES (1, 'John', 'New York');

 SELECT * FROM person;
 UPDATE person SET id=102 where name='Santu2';

 DELETE FROM person where name='Santu5';
ALTER TABLE person ADD COLUMN country VARCHAR(100);
ALTER TABLE person ADD COLUMN age INT DEFAULT 0;
ALTER TABLE person DROP COLUMN age;
ALTER TABLE person RENAME COLUMN country to con;
ALTER TABLE person RENAME COLUMN con to country;
ALTER TABLE person ALTER COLUMN name SET DATA TYPE VARCHAR(150);
ALTER TABLE person ALTER COLUMN name SET DEFAULT "unknow";
ALTER TABLE person ALTER COLUMN name DROP DEFAULT;
ALTER TABLE person ADD COLUMN mob VARCHAR(15) CHECK(LENGTH(mob)>= 10);

ALTER TABLE person DROP CONSTRAINT person_mob_check;
ALTER TABLE person ADD CONSTRAINT mob_no_less_than_10 CHECK(LENGTH(mob)>=10);

 CREATE TABLE emplyees(
emp_id SERIAL PRIMARY KEY,
fnmae VARCHAR(100) NOT NULL,
lname VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
dept VARCHAR(50),
salary DECIMAL(10, 2) DEFAULT 30000.00,
hire_date DATE NOT NULL DEFAULT CURRENT_DATE
);

ALTER TABLE emplyees RENAME TO employees;

ALTER TABLE employees RENAME COLUMN fname TO first_name;

INSERT INTO employees (emp_id, fname, lname, email, dept, salary, hire_date) 

      VALUES

(1, 'Raj', 'Sharma', 'raj.sharma@example.com', 'IT', 50000.00, '2020-01-15'),

(2, 'Priya', 'Singh', 'priya.singh@example.com', 'HR', 45000.00, '2019-03-22'),

(3, 'Arjun', 'Verma', 'arjun.verma@example.com', 'IT', 55000.00, '2021-06-01'),

(4, 'Suman', 'Patel', 'suman.patel@example.com', 'Finance', 60000.00, '2018-07-30'),

(5, 'Kavita', 'Rao', 'kavita.rao@example.com', 'HR', 47000.00, '2020-11-10'),

(6, 'Amit', 'Gupta', 'amit.gupta@example.com', 'Marketing', 52000.00, '2020-09-25'),

(7, 'Neha', 'Desai', 'neha.desai@example.com', 'IT', 48000.00, '2019-05-18'),

(8, 'Rahul', 'Kumar', 'rahul.kumar@example.com', 'IT', 53000.00, '2021-02-14'),

(9, 'Anjali', 'Mehta', 'anjali.mehta@example.com', 'Finance', 61000.00, '2018-12-03'),

(10, 'Vijay', 'Nair', 'vijay.nair@example.com', 'Marketing', 50000.00, '2020-04-19');

SELECT * FROM employees where emp_id=5;
SELECT * FROM employees where dept='HR';
SELECT * FROM employees where salary >= 50000;
SELECT * FROM employees where dept='HR' OR dept='Finance';

\! cls => clear psql shell

SELECT * FROM employees WHERE dept='IT' AND salary <50000;
SELECT * FROM employees WHERE dept='IT' AND salary <=50000;

SELECT * FROM employees WHERE dept IN ('IT', 'HR', 'Finanace');
SELECT * FROM employees WHERE salary BETWEEN 50000 AND 60000;

SELECT DISTINCT dept FROM employees; => to get all diff dept that exists

SELECT * FROM employees ORDER BY fname;
SELECT * FROM employees ORDER BY fname DESC;
SELECT * FROM employees ORDER BY emp_id DESC;
SELECT * FROM employees ORDER BY fname DESC LIMIT 3;
SELECT * FROM employees WHERE fname LIKE 'A%';=> to get all names that start with A
SELECT * FROM employees WHERE fname LIKE '%A';=> to get all names that ends with A
SELECT * FROM employees WHERE fname LIKE '%a';=> case insensitive
SELECT * FROM employees WHERE fname LIKE '%i%';=> to get all names that have 'i' in it
SELECT * FROM employees WHERE dept LIKE '__';=> to get all dept that has 2 characters
SELECT * FROM employees WHERE fname LIKE '_a%';=> to get all names that have 'a' in the second position
SELECT COUNT(emp_id) from employees;=> to get the count of employees
SELECT SUM(salary) from employees;=> to get the sum of salaries
SELECT AVG(salary) from employees;=> to get the average salary
SELECT MIN(salary) from employees;=> to get the min salary
SELECT MAX(salary) from employees;=> to get the max salary
SELECT dept from employees GROUP BY dept;=> to get the count of employees in each dept
SELECT dept, COUNT(emp_id) from employees GROUP BY dept;=> to get the count of employees in each dept
SELECT dept, SUM(salary) from employees GROUP BY dept;=> to get the sum of salaries in each dept
SELECT CONCAT(fname, lname) as Fullname FROM employees;
SELECT emp_id, CONCAT(fname, lname) as Fullname, dept FROM employees;
SELECT emp_id, CONCAT(fname,' ', lname) as Fullname, dept FROM employees;
SELECT emp_id, CONCAT_WS(' ', fname, lname) as Fullname, dept FROM employees;
SELECT emp_id, CONCAT_WS(' ', fname, lname, email) as Fullname, dept FROM employees;
 SELECT SUBSTR ('hello world', 1, 6);
 SELECT REPLACE('hello world', 'hello', 'hey');
 SELECT REPLACE (dept, 'IT', 'INFORMATION TECH') FROM employees;
SELECT REVERSE('hello');
SELECT LENGTH('hello');
SELECT * FROM employees where LENGTH(fname) > 5;
SELECT UPPER(fname) FROM employees;
SELECT LEFT('hello', 4);
SELECT RIGHT('hello', 4);
SELECT TRIM('  hello ');
SELECT LENGTH(TRIm('   hello   '));

SELECT fname, salary, 
CASE
WHEN salary>=50000 THEN 'HIGH'
WHEN salary>=40000 THEN 'MID'
ELSE 'LOW'
END AS sal_cat
FROM employees;

SELECT fname, salary, 
CASE
WHEN salary>=55000 THEN 'HIGH'
WHEN salary BETWEEN 48000 AND 55000 THEN 'MID'
ELSE 'LOW'
END AS sal_cat
FROM employees;

SELECT fname, salary, 
CASE
WHEN salary>0 THEN ROUND(salary*0.1)
ELSE 0
END AS bonus
FROM employees;

SELECT
CASE
WHEN salary>=55000 THEN 'HIGH'
WHEN salary BETWEEN 48000 AND 55000 THEN 'MID'
ELSE 'LOW'
END AS sal_cat, COUNT(emp_id)
FROM employees GROUP BY sal_cat;


/// new relation ship ///

CREATE TABLE customers(
cust_id SERIAL PRIMARY KEY,
cust_name VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
ord_id SERIAL PRIMARY KEY,
ord_date DATE NOT NULL,
price NUMERIC NOT NULL,
cust_id INTEGER NOT NULL,
FOREIGN KEY(cust_id) REFERENCES
customers(cust_id)
);

INSERT INTO customers (cust_name)

VALUES 
 ('Raju'), ('Sham'), ('Paul'), ('Alex');

INSERT INTO orders(ord_date, cust_id, price)
VALUES ('2024-01-01', 1, 250.00), ('2024-01-15', 1, 300.00),
('2024-02-01', 2, 150.00), ('2024-03-01', 3, 450.00),
('2024-04-04', 2, 550.00);

SELECT * from customers CROSS JOIN orders;

SELECT * from customers c INNER JOIN orders o ON c.cust_id=o.cust_id;
SELECT * from customers INNER JOIN orders ON orders.cust_id=customers.cust_id;

SELECT * from customers 
INNER JOIN orders 
ON orders.cust_id=customers.cust_id
ORDER BY cust_name;

SELECT cust_name FROM customers 
INNER JOIN orders 
ON orders.cust_id=customers.cust_id
GROUP BY cust_name;

SELECT cust_name, COUNT(ord_id) as total_orders FROM customers
INNER JOIN orders 
ON orders.cust_id=customers.cust_id
GROUP BY cust_name;

SELECT cust_name, COUNT(ord_id) as total_orders, SUM(price) FROM customers
INNER JOIN orders 
ON orders.cust_id=customers.cust_id
GROUP BY cust_name;

SELECT * FROM customers
LEFT JOIN orders 
ON orders.cust_id=customers.cust_id;

SELECT * FROM customers
RIGHT JOIN orders 
ON orders.cust_id=customers.cust_id;

// many to many relation ///

CREATE TABLE students (
s_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
c_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
fee NUMERIC NOT NULL
);

CREATE TABLE enrollment (
enrollment_id SERIAL PRIMARY KEY,
s_id INT NOT NULL,
c_id INT NOT NULL,
enrollment_date DATE NOT NULL,
FOREIGN KEY (s_id) REFERENCES
students(s_id),
FOREIGN KEY (c_id) REFERENCES
courses(c_id)

);

INSERT INTO students(name)
VALUES
('Raju'),
('Sham'),
('Alex);

INSERT INTO courses(name, fee)
VALUES
('MAths', 500.00),
('Physics', 600.00),
('Chemistry', 700.00);

INSERT INTO enrollment(s_id, c_id, enrollment_date)
VALUES
(1, 1, '2024-01-01'),
(1, 2, '2024-01-15'),
(2, 1, '2024-02-01'),
(2, 3, '2024-02-15'),
(3, 3, '2024-01-25');

SELECT s.name, c.name FROM enrollment e
JOIN 
students s
ON 
s.s_id=e.s_id
JOIN
courses c
ON
c.c_id = e.c_id;

SELECT s.name, c.name, c.fee FROM enrollment e
JOIN 
students s
ON 
s.s_id=e.s_id
JOIN
courses c
ON
c.c_id = e.c_id;

SELECT 
s.name, c.name, c.fee, e.enrollment_date
FROM enrollment e
JOIN 
students s
ON 
s.s_id=e.s_id
JOIN
courses c
ON
c.c_id = e.c_id;

// task to be practice//

CREATE TABLE customers (
    cust_id SERIAL PRIMARY KEY,
    cust_name VARCHAR(100) NOT NULL
);

INSERT INTO customers (cust_name)
VALUES
    ('Raju'), ('Sham'), ('Paul'), ('Alex');

    CREATE TABLE orders (
    ord_id SERIAL PRIMARY KEY,
    ord_date DATE NOT NULL,
    cust_id INTEGER NOT NULL,
    FOREIGN KEY (cust_id) REFERENCES customers(cust_id)
);

INSERT INTO orders (ord_date, cust_id)
VALUES
    ('2024-01-01', 1),  -- Raju first order
    ('2024-02-01', 2),  -- Sham first order
    ('2024-03-01', 3),  -- Paul first order
    ('2024-04-04', 2);  -- Sham second order

CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    ord_id INTEGER NOT NULL,
    p_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (ord_id) REFERENCES orders(ord_id),
    FOREIGN KEY (p_id) REFERENCES products(p_id)
);

INSERT INTO order_items (ord_id, p_id, quantity)
VALUES
    (1, 1, 1),  -- Raju ordered 1 Laptop
    (1, 4, 2),  -- Raju ordered 2 Cables
    (2, 1, 1),  -- Sham ordered 1 Laptop
    (3, 2, 1),  -- Paul ordered 1 Mouse
    (3, 4, 5),  -- Paul ordered 5 Cables
    (4, 3, 1);  -- Sham ordered 1 Keyboard

        p_id SERIAL PRIMARY KEY,
    p_name VARCHAR(100) NOT NULL,
    price NUMERIC NOT NULL
);

INSERT INTO products (p_name, price)
VALUES
    ('Laptop', 55000.00),
    ('Mouse', 500),
    ('Keyboard', 800.00),
    ('Cable', 250.00)
;










