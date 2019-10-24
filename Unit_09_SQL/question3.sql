--List the manager of each department with the following information:
--department number, department name, the manager's employee number,
--last name, first name, and start and end employment dates.

SELECT
	d.dept_no,
	d.dept_name,
	t.title,
	dm.emp_no,
	e.last_name,
	e.first_name
FROM
	departments d
JOIN
	dept_manager dm
	ON d.dept_no = dm.dept_no
JOIN
	employees e
	ON dm.emp_no = e.emp_no
JOIN
	titles t
	ON t.emp_no = e.emp_no
WHERE
	title = 'Manager'
ORDER BY
	d.dept_name ASC;