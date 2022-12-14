import React from 'react'
import { Flex } from 'antd-mobile-v2'


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
export default function FilterTitle () {
    return (
        <Flex className='root' align='center'>
            <Flex.Item>
                <span>
                    <span>区域</span>
                    <i className='iconfont icon-arrow'></i>
                </span>

            </Flex.Item>

        </Flex>
    )
}