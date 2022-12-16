import React from 'react'
import { Flex } from 'antd-mobile-v2'
import PropTypes from 'prop-types'
import './index.scss'

function FilterFooter ({ cancelText = '取消', okText = '确定', onCancel, onOk, className }) {
    return (
        <Flex className={['root',className||''].join(' ')}>
            {/* 取消按钮 */}
            <span className={['btn','cancle'].join(' ')} onClick={onCancel}>
                {cancelText}
            </span>
            {/* 确定按钮 */}
            <span className={['btn','ok'].join(' ')} onClick={onOk}>
                {okText}
            </span>
        </Flex>
    )
}

FilterFooter.propTypes = {
    className: PropTypes.string,
  }

export default FilterFooter