import * as echarts from 'echarts';
class Echarts {
	constructor(el, opts= {}) {
		this.el = el;
		this.opts = opts;
		this.echarts = this.init()
		


	}
	// 初始化 图表
	init() {
		return echarts.init(this.el,null,this.opts )
	}

	testCharts() {
		this.echarts.setOption({
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				axisTick: {
					alignWithLabel: true
				}
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: 'Direct',
				type: 'bar',
				barWidth: '60%',
				data: [10, 52, 200, 334, 390, 330, 220]
			}]
		})
	}
}


export default Echarts;