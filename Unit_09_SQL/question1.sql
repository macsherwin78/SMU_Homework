SELECT *
FROM employees;

--List the following details of each employee:
--employee number, last name, first name, gender, and salary.

SELECT
	e.emp_no,
	e.last_name,
	e.first_name,
	e.gender,
	s.salary
FROM
	employees e
LEFT JOIN
	salaries s
	ON e.emp_no = s.emp_no;