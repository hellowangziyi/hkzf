import React from 'react'
import { Flex } from 'antd-mobile-v2'
import SearchHeader from '../../components/SearchHeader'
import "./index.scss";
import Filter from './components/Filter'
export default class List extends React.Component {

    render () {
        const cityName = localStorage.getItem('hkzf_city')
        return (<div>
            <Flex className='header'>
                <i className='iconfont icon-back' onClick={() => this.props.history.go(-1)}></i>
                <SearchHeader cityName={cityName} className='listSearch'></SearchHeader>
            </Flex>
            {/* 
                        筛选框
                    */}

            <div className="filter_list">
                <Filter handleFilterChange={this.handleFilterChange} />
            </div>
        </div>
        )
    }
}