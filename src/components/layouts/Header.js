import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div>
	      <AppBar position="static">
	        <Toolbar className="toolBar">
	        	<div className="containerDiv">
	        		<header className="heading">Find-A-Food</header>
	        	</div>
	        </Toolbar>
	      </AppBar>
	  </div>
    );
  }
}

export default Header;