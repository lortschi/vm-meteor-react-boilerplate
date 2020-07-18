import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Button, Image } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import langaugeSwitcher from '../lib/LanguageSwitcher';
// an instance of a translate component with the top-level context
const T = i18n.createComponent();

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container>
        <Grid textAlign='center' style={{ height: '100vh' }} centered verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='/images/vajda-media-logo-square.png' /><T _locale={langaugeSwitcher()}>signup.title</T>
              </Header>
              <Form size='large' onSubmit={this.submit}>
                <Segment stacked>
                  <Form.Input
                    label="Email"
                    fluid icon='user'
                    iconPosition='left'
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label={<T _locale={langaugeSwitcher()}>signup.password</T>}
                    fluid icon='lock'
                    iconPosition='left'
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Button color='teal' fluid size='large'>
                    <i className="add user icon"></i>
                    <T _locale={langaugeSwitcher()}>signup.submit</T>
                  </Button>
              </Segment>
            </Form>
            <Message>
            <T _locale={langaugeSwitcher()}>signup.new</T><Link to="/signin"><i className="sign-in icon"></i> <T _locale={langaugeSwitcher()}>signin.here</T></Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
