import React, { Component } from 'react';
import { getUserData } from './../../ducks/users';
import { connect } from 'react-redux';
import axios from 'axios';

class Private extends Component {

  async componentDidMount() {
    let res = await axios.get('/api/user-data');
    // use action creator to update redux store
    this.props.getUserData(res.data)
  }

  render() {
    let { user_name, email, picture, auth_id } = this.props.user
    return (
      <div>
        <h1>Account Summary</h1>
        <hr /><hr /><hr />
        {
          user_name ? (
            <div>
              <p>Account Holder: {user_name}</p>
              <p>Email: {email}</p>
              <p>Account #: {auth_id}</p>
              <img src={picture} alt="" />
            </div>
          ) : <p>Please log in</p>
        }
        <a href='http://localhost:3005/logout'>
          <button>Logout</button>
        </a>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
// Object.assign(this.props, {user: state.user})
// this.props = {user: state.user}
// Object.assign(this.props, {getUserData})
// this.props = {user: state.user, getUserData: function() {}}
export default connect(mapStateToProps, { getUserData })(Private);