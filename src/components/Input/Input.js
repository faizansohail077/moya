import React from 'react'
import './Input.css'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'

const Input = ({ placeholder, onKeyDown, type, Component, icon, onPlusClick, onMinusClick ,value,onChange}) => {
    return (
        <div className="input__containerTop">
            <div style={{ paddingRight: 10 }}>
                {Component}
            </div>
            <input  onKeyDown={onKeyDown} type={type} className="input__" placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)} />
            {icon ? <FaPlusCircle cursor="pointer" onClick={onPlusClick} size="25" color="var(--bg)" /> : null}
            {icon ? <FaMinusCircle cursor="pointer" onClick={onMinusClick} size="25" color="var(--bg)" /> : null}

        </div>
    )
}

export default Input
