import React from 'react';

const ScrollBar = (props) => {
	return (
		<div style={
			{ 
				overflowY: 'scroll',
			  	height: '50vh'
			}
			}>
			{props.children}
		</div>
	)
}

export default ScrollBar;