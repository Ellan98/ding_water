import request from "/utils/request"


export function getTaskList() {
	return request({
		url:"/task/list",
		method:"get",
		data:{
			userId:"525942275105096080"
		}
	})
}