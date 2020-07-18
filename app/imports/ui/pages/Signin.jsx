import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Message, Segment, Button, Image } from 'semantic-ui-react';
import i18n from 'meteor/universe:i18n';
import langaugeSwitcher from '../lib/LanguageSwitcher';
// an instance of a translate component with the top-level context
const T = i18n.createComponent();

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
      <Container>
        <Grid textAlign='center' style={{ height: '100vh' }} centered verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Image src='/images/vajda-media-logo-square.png' /> <T _locale={langaugeSwitcher()}>signin.title</T>
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
                    label={<T _locale={langaugeSwitcher()}>signin.password</T>}
                    fluid icon='lock'
                    iconPosition='left'
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Button color='teal' fluid size='large'>
                    <i className="sign-in icon"></i>
                    <T _locale={langaugeSwitcher()}>signin.submit</T>
                  </Button>
                </Segment>
              </Form>
              <Message>
              <T _locale={langaugeSwitcher()}>signin.new</T><Link to="/signup"><i className="add user icon"></i><T _locale={langaugeSwitcher()}>signup.submit</T></Link>
              </Message>
              {this.state.error === '' ? (
                ''
              ) : (
                <Message
                  error
                  header="Login was not successful"
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
Signin.propTypes = {
  location: PropTypes.object,
};
