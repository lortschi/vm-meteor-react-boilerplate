import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import i18n from 'meteor/universe:i18n';
import langaugeSwitcher from '../lib/LanguageSwitcher';
// an instance of a translate component with the top-level context
const T = i18n.createComponent();

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>
          <Grid.Column width={4}>
            <Image className="c2-logo" size='small' circular src="/images/vajda-media-logo-d.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1><T _locale={langaugeSwitcher()}>landing.page.h1title</T></h1>
            <h2><T _locale={langaugeSwitcher()}>landing.page.h2title</T></h2>
            <h3><T _locale={langaugeSwitcher()}>landing.page.h3title</T></h3>
          </Grid.Column>
          <Grid.Column width={8}>
            <Grid textAlign='center' style={{ height: '50vh' }} centered verticalAlign='middle'>
              <div className="wide column pricing-wrapper">
                <div className="ui raised segments pricing-column">
                    <div className="ui center aligned secondary segment">
                      <div className="ui statistic">
                          <div className="value">
                          <T _locale={langaugeSwitcher()}>landing.page.pricing</T>
                          </div>
                          <div className="label">
                          <T _locale={langaugeSwitcher()}>landing.page.month</T>
                          </div>
                      </div>
                    </div>
                    <div className="ui center aligned segment">
                      <p><T _locale={langaugeSwitcher()}>landing.page.basic</T></p>
                    </div>
                    <div className="ui center aligned segment">
                      <p><T _locale={langaugeSwitcher()}>landing.page.another</T></p>
                    </div>
                </div>
                <div className="ui pricing-btn fluid button">
                <T _locale={langaugeSwitcher()}>landing.page.select</T>
                </div>
              </div>
            </Grid>
          </Grid.Column>
          <Grid.Column width={8}>
            <Grid textAlign='center' style={{ height: '50vh' }} centered verticalAlign='middle'>
              <div className="wide column pricing-wrapper">
                <div className="ui raised segments pricing-column">
                    <div className="ui center aligned secondary segment">
                      <div className="ui statistic">
                          <div className="value">
                          <T _locale={langaugeSwitcher()}>landing.page.higherpricing</T>
                          </div>
                          <div className="label">
                          <T _locale={langaugeSwitcher()}>landing.page.month</T>
                          </div>
                      </div>
                    </div>
                    <div className="ui center aligned segment">
                      <p><T _locale={langaugeSwitcher()}>landing.page.basic</T></p>
                    </div>
                    <div className="ui center aligned segment">
                      <p><T _locale={langaugeSwitcher()}>landing.page.another</T></p>
                    </div>
                </div>
                <div className="ui pricing-btn fluid button">
                <T _locale={langaugeSwitcher()}>landing.page.select</T>
                </div>
              </div>
            </Grid>
          </Grid.Column>
        </Grid>
    );
  }
}
export default Landing;
