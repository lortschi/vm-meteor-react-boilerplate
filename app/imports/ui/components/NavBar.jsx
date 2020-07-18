import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Container, Icon, Image,Menu, Dropdown, Header, Sidebar, Responsive } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import i18n from 'meteor/universe:i18n';
import langaugeSwitcher from '../lib/LanguageSwitcher';

// an instance of a translate component with the top-level context
const T = i18n.createComponent();

const countryOptions = [
  { key: 'de', value: 'de-DE', flag: 'de', text: 'Deutsch' },
  { key: 'en', value: 'en-GB', flag: 'gb', text: 'English' }
];

const DropdownExampleSearchSelection = ( {onSignClick, onChangeLanguage} ) => (
  <Dropdown
    placeholder={i18n.getTranslations('navigation.languageswitch.placeholder', langaugeSwitcher())}
    fluid
    search
    selection
    options={countryOptions}
    onClick={onSignClick}
    onChange={onChangeLanguage}
  />
)

const NavBarMobile = ({
  leftItems,
  onPusherClick,
  onToggle,
  onHiddenCallback,
  onSignClick,
  onChangeLanguage,
  visible,
  currentUser
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      items={leftItems}
      vertical
      onHidden={onHiddenCallback}
      visible={visible}
      width='wide'
    >
    <Menu.Item>
      <Image size="mini" src="/images/vajda-media-logo-square.png" />
    </Menu.Item>
    {currentUser ? (
        [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>,
          <Menu.Item as={NavLink} onClick={onPusherClick} activeClassName="active" text="Sign Out" exact to="/signout" key='signout'>Sign Out</Menu.Item>]
    ) : ''}
    {currentUser === '' ? (
        [<Menu.Item as={NavLink} onClick={onPusherClick} activeClassName="active" exact to="/" key='home'>Home</Menu.Item>,
        <Menu.Item as={NavLink} onClick={onPusherClick} activeClassName="active" text="Sign In" exact to="/signin" key='signin'><T _locale={langaugeSwitcher()}>signin.submit</T></Menu.Item>
        ]
    ) : ''}
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
      <Menu fixed="top" inverted>
        <Menu.Item>
          <Image size="mini" src="/images/vajda-media-logo-square.png" />
        </Menu.Item>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Menu position="right">
          <DropdownExampleSearchSelection
                onSignClick={onSignClick}
                onChangeLanguage={onChangeLanguage}
          />
        </Menu.Menu>
      </Menu>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ leftItems, rightItems, currentUser, onSignClick, onChangeLanguage }) => (
  <Menu fixed="top" inverted>
    <Menu.Item>
      <Image size="mini" src="/images/vajda-media-logo-square.png" />
    </Menu.Item>

    <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h3'><T _locale={langaugeSwitcher()}>navigation.title</T></Header>
        </Menu.Item>
        {currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        {_.map(leftItems, item => <Menu.Item {...item} />)}
    <Menu.Menu position="right">
      {_.map(rightItems, item => <Menu.Item {...item} />)}
    </Menu.Menu>
        <Menu.Item position="right">
        <DropdownExampleSearchSelection
              onSignClick={onSignClick}
              onChangeLanguage={onChangeLanguage}
        />
        {currentUser === '' ? (
          <Dropdown className="login-link" onClick={onSignClick} text="Login" pointing="top right" icon={'user'}>
            <Dropdown.Menu>
              <Dropdown.Item className="sign-in" icon="user" text={<T _locale={langaugeSwitcher()}>signin.submit</T>} as={NavLink} exact to="/signin"/>
              <Dropdown.Item className="sign-up" icon="add user" text={<T _locale={langaugeSwitcher()}>signup.submit</T>} as={NavLink} exact to="/signup"/>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown onClick={onSignClick} text={currentUser} pointing="top right" icon={'user'}>
            <Dropdown.Menu>
              <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
            </Dropdown.Menu>
          </Dropdown>
        )}
        </Menu.Item>
  </Menu>
);


/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends Component {
  state = {
    language: 'de-DE',
    visible: false,
    zindex: 0
  };

  handlePusher = () => {
    const { visible } = this.state;
    if (visible)  {
      this.setState({ visible: false });
    }
  };

  handleToggle = () => {
    this.setState({ visible: !this.state.visible });
    const { visible } = this.state;
    this.setState({ zindex : 1 });
  }

  handleOnHidden = () => {
    this.setState({ zindex : 0 });
  }

  handleSigns = () => {
    this.setState({ zindex : 2 });
  }

  handleLanguage = (event, {value}) => {
    this.setState({ language : value });
    //this.props.dispatch(this.state.language);
    localStorage.setItem('vapp-language', value);
    location.reload();
    //this.props.history.push('/');
    //this.forceUpdate();  
  }

  render() {
    const { leftItems, rightItems, currentUser } = this.props;
    const { visible, zindex } = this.state;

    return (
      <div className="navbarWrapper" style={{zIndex: zindex}}>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            onHiddenCallback={this.handleOnHidden}
            rightItems={leftItems}
            visible={visible}
            leftItems={leftItems}
            currentUser={currentUser}
            onSignClick={this.handleSigns}
            onChangeLanguage={this.handleLanguage}
          >
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop
            leftItems={leftItems}
            rightItems={rightItems}
            currentUser={currentUser}
            onSignClick={this.handleSigns}
            onChangeLanguage={this.handleLanguage}
          />
        </Responsive>
      </div>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
