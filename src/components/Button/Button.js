import React from 'react'

const Button = ({ justifyContent,textAlign, loader, onClick, children, borderRadius, height, width, padding, fontSize, Component, paddingLeft, paddingLeftIcon, paddingRight, paddingRightIcon, paddingTop, paddingBotttom }) => {
    return (
        <>{
            loader ? <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <div class="spinner-border text-dark"></div>
            </div> :
                <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent:justifyContent?justifyContent: 'center', backgroundColor: "var(--bg)", width: width, borderRadius: borderRadius, padding: padding, height: height, cursor: "pointer", paddingLeft: paddingLeft, paddingRight: paddingRight, paddingBottom: paddingBotttom, paddingTop: paddingTop }}>
                    {Component ?
                        <>
                            <p style={{ margin: 0, color: 'white', textAlign: 'center', fontSize: fontSize }}>{children}</p>
                            <div style={{ paddingLeft: paddingLeftIcon, paddingRight: paddingRightIcon }}>{Component}</div></>
                        :
                        <p style={{ margin: 0, color: 'white', textAlign: textAlign ? textAlign : 'center', fontSize: fontSize }}>{children}</p>
                    }
                </div>
        }
        </>
    )
}

export default Button
