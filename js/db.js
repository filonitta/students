export default class DB {
	constructor(serverUrl, version) {
		this.url = serverUrl;
		this.version = version;
	}

	getStudentsList() {
		return fetch(`${this.url}/api/v${this.version}/students.json`)
				.then(result => result.json());
	}

	getStudentById(id) {
		return fetch(`${this.url}/api/v${this.version}/students/${id}.json`)
				.then(result => result.json());
	}

	updateStudentById(id, body) {
		return fetch(`${this.url}/api/v${this.version}/students/${id}.json`, {
			method: 'PUT',
			body: JSON.stringify(body)
		}).then(result => result.json());
	}

	deleteStudentById(id) {
		return fetch(`${this.url}/api/v${this.version}/students/${id}.json`, {
			method: 'DELETE'
		}).then(result => result.json());
	}

	createStudent(body) {
		fetch(`${this.url}/api/v${this.version}/students.json`, {
			method: 'POST',
			body: JSON.stringify(body)
		}).then(result => result.json());
	}
}