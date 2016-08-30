// import React from 'react';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
//
// import {auth} from '../actions/auth.jsx';
//
// class Auth extends React.Component {
//
//   constructor(props) {
//     super(props);
//   }
//
//   componentDidMount() {
//     this.props.auth();
//   }
//
//   render() {
//     return (
//       <div></div>
//     );
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     token: state.auth.token,
//     status: state.auth.status
//   }
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({auth}, dispatch);
// };
//
// //redux mapping
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Auth);
