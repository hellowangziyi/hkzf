import React from 'react'

export default class Map extends React.Component {

    componentDidMount () {
        // const map = new window.BMap.Map('container')
        // const point = new window.BMap.Point(116.404, 39.915)
        // map.centerAndZoom(point)
    }
    render () {
        return (
            <div className='map'>
                <div id='container'></div>
            </div>
        )
    }
}