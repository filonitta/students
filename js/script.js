// @ts-nocheck
import Server from './db.js';
import { addStudent, fillEditForm } from './functions.js';

const server = new Server('https://frontend-lectures.firebaseio.com', 1);

server.getStudentsList().then(response => {
	const students = Object.entries(response).map(value => {
		const [id, student] = value;

		student.id = id;

		return student;
	});

	students.forEach(addStudent);
});

$('#students-list').on('click', '[data-id]', function(event) {
	event.preventDefault();

	const id = $(this).attr('data-id');

	server.getStudentById(id).then(response => fillEditForm(response, id));
});

$('#form-edit-student').on('submit', function(event) {
	event.preventDefault();

	const student = {};

	for (let element of $(this).find('[name]')) {
		student[ $(element).attr('name') ] = $(element).val();
	}

	server.updateStudentById(student.id, student).then(response => {
		$('#students-list')
			.find(`[data-id="${student.id}"]`)
			.text(`${response.firstname} ${response.lastname}`);
	});
});