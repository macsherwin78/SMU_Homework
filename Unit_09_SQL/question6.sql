--List all employees in the Sales department,
--including their employee number, last name, first name, and department name.

SELECT
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
FROM
	employees e
JOIN
	dept_emp de
	ON de.emp_no = e.emp_no
JOIN
	departments d
	ON d.dept_no = de.dept_no
WHERE
	d.dept_name = 'Sales'
ORDER BY
	e.last_name ASC;