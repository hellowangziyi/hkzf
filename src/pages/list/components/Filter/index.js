import React, { Component } from 'react'
import FilterTitle from '../FilterTitle'
import FilterMore from '../FilterMore'
import FilterPicker from '../FilterPicker'

export default class Filter extends Component {
    render () {
        return (
            <div className='root'>
                <div className='mask'></div>
                <div className='content'>
                    <FilterTitle></FilterTitle>
                </div>

            </div>
        )
    }
}