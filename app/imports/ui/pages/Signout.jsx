import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { Container, Grid, Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          navigate: false
      }
  }
  componentDidMount(e) {
    setTimeout(() => this.setState({ navigate: true }), 2000);
  }

  render() {
    Meteor.logout();
    if (this.state.navigate) {
      return <Redirect to='/' />
    }
    return (
      <Container>
        <Grid textAlign='center' style={{ height: '100vh' }} centered verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}></Grid.Column>
            <Header as="h2" textAlign="center">
              <p>You are signed out.</p>
            </Header>
          </Grid>
        </Container>
    );
  }
}
