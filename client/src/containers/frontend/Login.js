import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startLogin } from '../../actions/shared/authentication';
import { fetchFeaturedProjects } from '../../actions/shared/collections';

class Login extends Component {

  // TODO: Remove this at some future point
  state = {email: 'admin@manifold.dev', password: 'manifold'};

  updatePassword = (event) => {
    this.setState(Object.assign({}, this.state, {password: event.target.value}));
  }

  updateEmail = (event) => {
    this.setState(Object.assign({}, this.state, {email: event.target.value}));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.startLogin(this.state.email, this.state.password);
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.actions.fetchFeaturedProjects();
  }

  render = () => {
    return (
      <div>
        <section>
          <div className="container">
            <header className="rel">
              <h4 className="section-heading">
                <i className="manicon manicon-lamp"></i>
                {'Login'}
              </h4>
            </header>
            <form method="post" onSubmit={this.handleSubmit}>
              { this.props.authentication.user ? <div style={{marginBottom: 20}}>{`You are logged in as ${this.props.authentication.user.email}`}</div> : ''}
              <label htmlFor="login-email">Email</label><br />
              <input value={this.state.email} onChange={this.updateEmail} id="login-email" type="text" /><br /><br />
              <label htmlFor="login-password">Password</label><br />
              <input value={this.state.password} onChange={this.updatePassword} id="login-password" type="password" /><br /><br />
              <input type="submit" value="Login" />
            </form>
            <br /><br />
            <button onClick={this.handleClick}>Load projects</button>
          </div>

        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({startLogin, fetchFeaturedProjects}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
