// INITIAL STATE:
const initialState = {
  user: {}
}

// ACTION TYPES:
const GET_USER_DATA = 'GET_USER_DATA';

// ACTION CREATORS:
export function getUserData() {
 return {
  type: GET_USER_DATA,
  payload: data
 }
}

// REDUCER:
export default function reducer(state = initialState, action) {
 switch(action.type) {
   case GET_USER_DATA:
     return Object.assign({}, state, {user: action.payload});

 default:
    return state;
 } 
};
