import React from "react";
import './index.css'
import { useSpring, animated } from '@react-spring/web'

export default function Mask(props) {
  const [animation] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: props.isHide?0:1 },
    }),
    []
  )

  return <animated.div style={animation} ><div className={props.className} onClick={props.onClick}></div></animated.div>
}