import React from 'react'

import { Route } from 'react-router-dom'

import News from '../News'
import Index from '../Index'
import List from '../list'
import Profile from '../profile'

import { TabBar } from 'antd-mobile-v2'

import './index.css'



const tabs = [
    {
        title: '首页',
        icon: 'icon-ind',
        path: '/home'
    },
    {
        title: '找房',
        icon: 'icon-findHouse',
        path: '/home/list'
    },
    {
        title: '资讯',
        icon: 'icon-infom',
        path: '/home/news'
    },
    {
        title: '我的',
        icon: 'icon-my',
        path: '/home/profile'
    },
]

export default class Home extends React.Component {
    state = {
        selectedTab: this.props.location.pathname,
    }

    renderTabItems () {
        return tabs.map(tab =>
            <TabBar.Item
                key={tab.title}
                title={tab.title}
                icon={<i className={`iconfont ${tab.icon}`} />}
                selectedIcon={< i className={`iconfont ${tab.icon}`} ></i>}
                selected={this.state.selectedTab === tab.path}
                onPress={() => {
                    this.setState({
                        selectedTab: tab.path,
                    })
                    // console.log(this.props.history)
                    this.props.history.push(tab.path)
                    this.props.history.go(0)
                }}
            ></TabBar.Item >
        )
    }
    render () {
        return (
            <div className="home">
                <Route path="/home/news" component={News} />
                <Route exact path="/home" component={Index} />
                <Route path="/home/list" component={List} />
                <Route path="/home/profile" component={Profile} />

                {/* TabBar */}
                <div>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#21b91a"
                        barTintColor="white"
                        noRenderContent={true}
                    >
                        {this.renderTabItems()}
                    </TabBar>
                </div>
            </div>
        )
    }
}
