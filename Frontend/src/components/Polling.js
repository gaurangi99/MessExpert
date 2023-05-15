import React, { Component } from 'react';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import {
    Route,
    withRouter,
    Switch
  } from 'react-router-dom';
  
import PollList from '../poll/PollList';
import NewPoll from '../poll/NewPoll';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { Layout, notification } from 'antd';
const { Content } = Layout;
class Polling extends Component{
    constructor(props) {
        super(props);
        this.state = {
          currentUser: null,
          isAuthenticated: false,
          isLoading: true
        }
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
          }); 
}

loadCurrentUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }
  componentDidMount() {
    this.loadCurrentUser();
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }

    return(
        <PollList isAuthenticated={this.state.isAuthenticated} 
                      currentUser={this.state.currentUser} />
    );
  }

}

// export default withRouter(Polling);

export default Polling;