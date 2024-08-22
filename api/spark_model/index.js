import request from "/utils/request"


export function sparkModelQuestions(data) {
	return request({
		url: "/spark/send",
		method: "post",
		data: data
	})
}