import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {users} from '../../actions/users.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Users extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.users();
  }

  showUsers() {
    return this.props.info.users.map((user, i) => {
        return (
          <TableRow key={i}>
            <TableRowColumn>{user.email}</TableRowColumn>
            <TableRowColumn>{user.username}</TableRowColumn>
          </TableRow>
        )
      }
    )
  }

  render() {
    return (

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Username</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody>
          {this.showUsers()}
        </TableBody>
      </Table>

    );
  }

}

const mapStateToProps = (state) => {
  return {
    info: state.users
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    users
  }, dispatch);
};

//redux mapping
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
