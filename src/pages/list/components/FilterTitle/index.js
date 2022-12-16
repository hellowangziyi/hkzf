import React from 'react'
import { Flex } from 'antd-mobile-v2'
import './index.scss'

const filter_title = [
    {
        name: "区域",
        type: 'area'
    },
    {
        name: "方式",
        type: 'mode'
    },
    {
        name: "租金",
        type: 'price'
    },
    {
        name: "筛选",
        type: 'more'
    },

]
export default function FilterTitle (props) {
    const { titleSelectedStatus, onTitleClick } = props
    return (
        <Flex className='root' align='center'>
           {
            filter_title.map(item=>{
                const isSelected = titleSelectedStatus[item.type]
               
                return ( <Flex.Item onClick={()=>onTitleClick(item.type)} key={item.type}>
                    <span className={['dropdown',isSelected?'selected':''].join(" ")}>
                        <span>{item.name}</span>
                        <i className='iconfont icon-arrow'></i>
                    </span>
                </Flex.Item>)
            })
           } 
            {/* <Flex.Item>
                <span>
                    <span>区域</span>
                    <i className='iconfont icon-arrow'></i>
                </span>
            </Flex.Item> */}

        </Flex>
    )
}