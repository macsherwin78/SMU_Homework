--List employees who were hired in 1986.

SELECT
	emp_no,
	last_name,
	first_name,
	gender,
	hire_date
FROM employees
WHERE
	EXTRACT(YEAR FROM hire_date) = 1986
ORDER by
	last_name ASC;