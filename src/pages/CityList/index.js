import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import axios from 'axios'
import { AutoSizer, List } from 'react-virtualized';
import './index.css'


// cityList: { a: [{}, {}], b: [{}, {}] }
// cityIndex:['a','b']

const handleCityData = (list) => {
    const cityList = {}
    let cityIndex = []
    list.map(item => {
        const index = item.short.substring(0, 1)
        if (!cityList[index]) {
            cityList[index] = [item]
            cityIndex.push(index)
        } else {
            cityList[index].push(item)
        }
    })
    cityIndex = cityIndex.sort()
    console.log('cintyindex', cityIndex)
    console.log('cityList', cityList)
    return {
        cityList,
        cityIndex
    }
}

const list = Array(100).fill("hghghjkhjkhkjh");

// function rowRenderer ({
//     key, // Unique key within array of rows
//     index, // Index of row within collection
//     isScrolling, // The List is currently being scrolled
//     isVisible, // This row is visible within the List (eg it is not an overscanned row)
//     style, // Style object to be applied to row (to position it)
// }) {
//     return (
//         <div key={key} style={style}>
//             {list[index]}
//         </div>
//     );
// }

export default class CityList extends React.Component {
    state = {
        cityList: {},
        cityIndex: [],
        isSwipersLoaded: true
    }
    componentDidMount () {
        this.getAllCity()
    }


    async getAllCity () {
        const res = await axios.get('http://localhost:8080/area/city?level=1')
        console.log('res', res)

        const data = res.data.body
        data.sort((a, b) => a.short - b.short)
        console.log('data', data)
        const { cityList, cityIndex } = handleCityData(data)


        const hotRes = await axios.get('http://localhost:8080/area/hot')

        cityIndex.unshift('hot')
        cityList['hot'] = hotRes.data.body
        console.log(cityList, cityIndex)
        this.setState({
            cityList,
            cityIndex,
        })
    }

    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        const { cityIndex, cityList } = this.state
        return (
            <div key={key} style={style} className='city'>
                <div className='title'> {this.state.cityIndex[index]}</div>
                <div className='name'></div>
            </div>
        );
    }

    render () {
        return (
            <div className="cityList">
                <NavBar
                    mode="light"
                // icon={<Icon type="left" />}
                >城市列表</NavBar>

                {/* 列表 */}
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            height={height}
                            rowCount={this.state.cityIndex.length}
                            rowHeight={20}
                            rowRenderer={this.rowRenderer}
                            width={width}
                        />
                    )}
                </AutoSizer>
                {/* <List
                    width={300}
                    height={300}
                    rowCount={list.length}
                    rowHeight={20}
                    rowRenderer={rowRenderer}
                /> */}
            </div>
        )
    }


}