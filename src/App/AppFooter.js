import React, { Component } from 'react';
import { Typography } from '@material-ui/core'


class AppFooter extends Component {

  render() {
    return (
      <div className="App-Footer" >
        <Typography>
          {'Copyright © Ninja Program - Donatella Team ' + new Date().getFullYear() + '.'}
        </Typography>
      </div>
    );
  }
}


export default AppFooter;
