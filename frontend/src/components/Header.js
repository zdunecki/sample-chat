import React from 'react';

export const Header = ({leftItems, middleItems, rightItems}) => (
    <div className="toolbar">
        <div className="left-items">{leftItems}</div>
        <div className="middle-items">{middleItems}</div>
        <div className="right-items">{rightItems}</div>
    </div>
);