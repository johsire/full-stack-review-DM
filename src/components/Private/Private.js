import React, { Component } from 'react';
import axios from 'axios';
import { getUserData } from './../../ducks/users';
import { connect } from 'react-redux';

class Private extends Component {

 async componentDidMount() {
   let res = axios.get('/api/user-data'); {
     // use action creator to update store:
     getUserData
   }
 }

 render() {
  return (
   <div>
    <h1>Account Summary</h1>
    <hr /><hr /><hr />
   </div>
  )
 }
};

// the entire redux state store is passed in to this component thru connect n mapstatetoprops:
function mapStateToProps(state) {
  return {
   user: state.user
  }
};

// let mapStateToProps = ({ user }) => { user }
// Object.assign(this.props, { user: state.user });
// this.props = { user: state.user };

export default connect(mapStateToProps, { getUserData })(Private);
