import React, { Component } from 'react'
import FilterTitle from '../FilterTitle'
import FilterMore from '../FilterMore'
import FilterPicker from '../FilterPicker'
import {API} from '../../../../utils/api'

const titleSelectedStatus = {
    area:false,
    mode:false,
    price:false,
    more:false
}

export default class Filter extends Component {
    state = {
        titleSelectedStatus,
        // 控制组件展示与隐藏
        openType:'',
        // 筛选项数据
        filterData:{},
    }
    componentDidMount(){
        this.getFilterData()
    }
    onTitleClick = (type)=>{
        //修改state中高亮的值
        this.setState(prevState=>{
            return{
                titleSelectedStatus:{
                    ...prevState.titleSelectedStatus,
                    [type]:true
                },
                openType:type
            }
        })
    }
    onCancel = ()=>{
        this.setState({
            openType:''
        })
    }
    onSave = ()=>{
        this.setState({
            openType:''
        })
    }
     // 获取筛选项的数据
    async getFilterData(){
        const {value} = JSON.parse(localStorage.getItem('hkzf_city'))
        const res = await API.get(`/houses/condition?id=${value}`)
        console.log('res',res);
        this.setState({
            filterData:res.data.body
        })
    }
    render () {
        const {titleSelectedStatus,openType}=this.state
        return (
          <div className="root">
            {openType === "area" ||
            openType === "mode" ||
            openType === "price" ? (
              <div className="mask" onClick={this.onCancel}></div>
            ) : null}

            <div className="content">
              <FilterTitle
                onTitleClick={this.onTitleClick}
                titleSelectedStatus={titleSelectedStatus}
              ></FilterTitle>
              {openType === "area" ||
              openType === "mode" ||
              openType === "price" ? (
                <FilterPicker onCancel={this.onCancel} onSave={this.onSave}></FilterPicker>
              ) : null}

              {/* <FilterMore></FilterMore> */}
            </div>
          </div>
        );
    }
}