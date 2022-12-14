import React from 'react'
import { Flex } from 'antd-mobile-v2'
import PropsTypes from 'prop-types'

function FilterFooter ({ cancelText = '取消', okText = '确定', onCancel, onOk, className }) {
    return (
        <Flex>
            {/* 取消按钮 */}
            <span className={['root', className || ''].join(' ')} onClick={onCancel}>
                {cancelText}
            </span>
            {/* 确定按钮 */}
            <span className={['root', className || ''].join(' ')} onClick={onOk}>
                {okText}
            </span>
        </Flex>
    )
}