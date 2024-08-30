import request from "/utils/request"


export function getTaskList(data) {
	return request({
		url:"/task/list",
		method:"get",
		data
	})
}