/*
 * name: echarts 的 react 实现
 * designer: heyunjiang
 * time: 2018.6.12
 */
import React from 'react'
import PropTypes from 'prop-types'
import { objectEquals } from 'hyj-func'
import echarts from 'echarts'

class chart extends React.Component {
  constructor(props) {
    super(props)
    this.echartsElement = null
  }
  componentDidMount() {
    this.rerender();
  }
  componentWillUnmount() {
    this.dispose();
  }
  componentDidUpdate(prevProps) {
    const echartObj = this.getEchartsInstance()
    //对象判等
    if (objectEquals(prevProps.option, this.props.option)) {
      setTimeout(()=>{
        if(this.echartsElement === null){return ;}
        echartObj.resize({
          width: this.echartsElement.parentNode.clientWidth
        })
      }, 400);//这里设置一个延迟，是保证其他动画执行完成后，获取到真实的宽度
    } else {
      //这里rerender 调用了echarts.setOption来重新绘制pie
      this.rerender()
    }
  }

  getEchartsInstance() {
    return echarts.getInstanceByDom(this.echartsElement) ||
    echarts.init(this.echartsElement);
  }
  renderEchartDom() {
    const echartObj = this.getEchartsInstance();
    echartObj.setOption(this.props.option);
    /* bind events */
    if (this.props.events && Array.isArray(this.props.events)) {
      this.props.events.forEach(item => {
        echartObj.off(item.name) // 需要先解绑，再绑定，免得重复绑定
        echartObj.on(item.name, function (params) {
          item.func(params)
        })
      })
    }
    return echartObj;
  }
  rerender() {
    try {
      setTimeout(()=>{
        if(this.echartsElement === null){return ;}
        const echartObj = this.renderEchartDom();
      }, 100);//这里设置一个延迟，是保证其他动画执行完成后，获取到真实的宽度
    } catch (_) {}
  }
  dispose() {
    if (this.echartsElement) {
      echarts.dispose(this.echartsElement);
    }
  }
  render(){
    return (<div 
      ref={(echartsElement) => { this.echartsElement = echartsElement; }} 
      style={{width: '100%', height: '300px'}}
      className={this.props.className || ''}></div>)
  }
}

chart.propTypes = {
  option: PropTypes.object
}
chart.defaultProps = {
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
  }
}


export default chart
