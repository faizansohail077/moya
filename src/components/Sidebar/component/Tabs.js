import React from 'react'
import { useHistory } from 'react-router-dom'
import './Tabs.css'

const Tabs = ({ active, title, Component, paddingLeft, route, onPress }) => {
    const history = useHistory()
    
    return (
        <div onClick={onPress ? onPress : () => history.push(route)} className={active ? "tabs__containerSelected shadow1 bg-white rounded" : 'tabs__container'}>
            <div>
                {Component}
            </div>
            <div style={{ paddingLeft: paddingLeft ? paddingLeft : 5 }}>
                <p style={{ marginTop: 13, color: 'var(--bg)', fontSize: 22 }}>{title}</p>
            </div>
        </div>
    )
}

export default Tabs
