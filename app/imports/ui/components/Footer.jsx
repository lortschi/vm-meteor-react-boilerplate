import React from 'react';
import i18n from 'meteor/universe:i18n';
import langaugeSwitcher from '../lib/LanguageSwitcher';

// an instance of a translate component with the top-level context
const T = i18n.createComponent();

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <footer>
      <div style={divStyle} className="ui center aligned container">
        <hr />
        <T _locale={langaugeSwitcher()}>footer.middle.title</T><br />
      </div>
    </footer>
    );
  }
}

export default Footer;

