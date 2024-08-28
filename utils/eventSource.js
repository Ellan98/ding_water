class EventSource {
	constructor(url, retryTime = 0) {
		this.url = url;
		this.retryTime = retryTime;
		this.listeners = {};
		this.requestTask = null
		this.connect()
	}

	async connect() {
		this.requestTask = await uni.request({
			url: this.url,
			enableChunked: true,
			responseType: 'text',
			method: 'GET',
			timeout: 300e3,
			success: res => {
				this.emit('success', res)
				if (this.retryTime > 0) {
					setTimeout(() => {
						this.connect()
					}, this.retryTime)
				}
			},
			fail: () => {}
		});
		// 监听流式输出
		this.requestTask.onChunkReceived((res) => {
			console.log("监听流式输出", res);
			const uint8Array = new Uint8Array(res.data);
			let text = String.fromCharCode.apply(null, uint8Array);
			text = decodeURIComponent(escape(text));
			console.log("监听流式输出text",  text);
			// const json = JSON.parse(text);
			this.handleChunk(text)


		})

		this.requestTask.onHeadersReceived(res => {
			this.emit('open', res);
		})
	}

	handleChunk(data) {

		// data = data.toString('utf8')
		const lines = data.split("\n\n")
		// console.log('data', data, lines)
		lines.forEach(line => {
			if (!line.trim()) {
				return
			}
			const [key, value] = line.trim().split(':');
			if (key === 'data') {
				const data = line.substring(5).trim();
				try {
					const json = JSON.parse(data);
					this.emit('message', {
						data: JSON.stringify(json)
					})
				} catch (e) {
					this.emit('error', 'Api.EventSource.ParseError:' + e)
				}
			} else {
				this.emit('error', 'Api.EventSource.ParseFail:' + line)
			}
		})
	}

	addEventListener(event, callback) {
		if (!this.listeners[event]) {
			this.listeners[event] = []
		}
		this.listeners[event].push(callback)
	}

	emit(event, data) {
		if (this.listeners[event]) {
			this.listeners[event].forEach(callback => {
				callback(data)
				console.log("event", event, data)
			});
		}
	}

	close() {
		if (this.requestTask) {
			this.requestTask.abort()
		}
	}
}


export default EventSource