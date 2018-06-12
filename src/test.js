import React from 'react'
import ReactDOM from 'react-dom'
import Chart from './index'

const options = {
	option: {
		title : {
			text: '下发文档统计',
			subtext: '纯属虚构',
			x:'center'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['中央军委','国务院','全国人民代表大会','最高人民法院','最高检察院']
		},
		series : [
		{
			name: '下发文档统计',
			type: 'pie',
			radius : '55%',
			center: ['50%', '60%'],
			data:[
			{value:335, name:'中央军委'},
			{value:310, name:'国务院'},
			{value:234, name:'全国人民代表大会'},
			{value:135, name:'最高人民法院'},
			{value:1548, name:'最高检察院'}
			],
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
		]
	},
    events: [
      {
        name: 'click',
        func: (params) => {
          console.log(params)
        }
      }
    ]
  }

ReactDOM.render(<div>
	hello react
	<Chart {...options} />
	</div>, document.body);