import React from 'react'

import PropTypes from 'prop-types'

import styles from './index.scss'

import { BASE_URL } from '../../utils/url'

const NoHouse = ({ children }) => (
  <div className="nohouse_root">
    <img
      className="img"
      src={BASE_URL + '/img/not-found.png'}
      alt="暂无数据"
    />
    <p className="msg">{children}</p>
  </div>
)

NoHouse.propTypes = {
  children: PropTypes.node.isRequired
}

export default NoHouse