import React, { Component } from "react";
import './index.scss'

// 所有房屋配套数据和图标
const HOUSE_PACKAGE = [
  {
    id: 1,
    name: '衣柜',
    icon: 'icon-wardrobe'
  },
  {
    id: 2,
    name: '洗衣机',
    icon: 'icon-wash'
  },
  {
    id: 3,
    name: '空调',
    icon: 'icon-air'
  },
  {
    id: 4,
    name: '天然气',
    icon: 'icon-gas'
  },
  {
    id: 5,
    name: '冰箱',
    icon: 'icon-ref'
  },
  {
    id: 6,
    name: '暖气',
    icon: 'icon-Heat'
  },
  {
    id: 7,
    name: '电视',
    icon: 'icon-vid'
  },
  {
    id: 8,
    name: '热水器',
    icon: 'icon-heater'
  },
  {
    id: 9,
    name: '宽带',
    icon: 'icon-broadband'
  },
  {
    id: 10,
    name: '沙发',
    icon: 'icon-sofa'
  }
]

/* 
  该组件的两种功能：
  1 根据传入的 list 展示房屋配置列表（房源详情页面）
    <HousePackage list={['衣柜', '洗衣机']} />
  2 从所有配置列表中选择房屋配置（发布房源页面）
    <HousePackage select onSelect={selectedItems => {...}} />
*/
export default class HousePackage extends Component {
  state={
    selectedNames:[]
  }
  renderItems=()=>{
    const { selectedNames } = this.state
    const {select,list }=this.props
    let data
    if(select){
      // 传了select则说明是选择房屋配置
      data=HOUSE_PACKAGE
    }else{
      // 从所有的列表项中过滤出要展示的（list）列表项
      data = HOUSE_PACKAGE.filter(item=>list.includes(item.name))
    }
    return data.map(item=>{
      const isSelected = selectedNames.includes(item.name)
      return (<li
        key={item.id}
        className={["item", isSelected ? "active" : ''].join(' ')}
        onClick={select && (() => this.toggleSelect(item.name))}
      >
        <p>
          <i className={`iconfont ${item.icon} icon`} />
        </p>
        {item.name}
      </li>)
    })
  }
  toggleSelect=(name)=>{
    const {selectedNames} = this.state
    let newSelectedNames = selectedNames
    
    if(selectedNames.includes(name)){
      // 选中：从数组中删除选中项，也就是保留未选中项
      newSelectedNames = selectedNames.filter(item=>item!==name)
    }else{
      newSelectedNames.push(name)
    }
     // 传递给父组件
     this.props.onSelect(newSelectedNames)

     this.setState({
       selectedNames: newSelectedNames
     })
    
  }
  render(){
return ( <ul className="housePackage">{this.renderItems()}</ul>)
  }
}