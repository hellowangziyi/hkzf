import React from 'react'
import { PickerView } from 'antd-mobile-v2'
import { Component } from 'react'
import FilterFooter from '../../../../components/FilterFooter'

export default class FilterPicker extends Component {
    
    render () {
        const {onCancel,onSave} = this.props
        return (
            <>
                <PickerView></PickerView>
                <FilterFooter onCancel={onCancel} onOk={onSave}></FilterFooter>
            </>
        )
    }
}