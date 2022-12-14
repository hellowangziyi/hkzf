import React from 'react'
import { PickerView } from 'antd-mobile-v2'
import { Component } from 'react'
import FilterFoot from '../../../../components/FilterFoot'

export default class FilterPicker extends Component {
    render () {
        return (
            <>
                <PickerView></PickerView>
                {/* <FilterFoot></FilterFoot> */}
            </>
        )
    }
}