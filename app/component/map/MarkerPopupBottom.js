import PropTypes from 'prop-types';
import React from 'react';
import { routerShape, locationShape } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { setEndpoint } from '../../action/EndpointActions';
import { withCurrentTime } from '../../util/searchUtils';
import { locationToOTP } from '../../util/otpStrings';

class MarkerPopupBottom extends React.Component {
  static displayName = 'MarkerPopupBottom';

  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    router: routerShape.isRequired,
    location: locationShape.isRequired,
    getStore: PropTypes.func.isRequired,
  };

  routeFrom = () => {
    const locationWithTime = withCurrentTime(
      this.context.getStore,
      this.context.location,
    );

    const destinationString = locationToOTP(this.props.location);
    const url = `/${destinationString}`;
    console.log('replacing url', url);
    this.context.router.replace(url);
  };

  routeTo = () => {
    console.log('this.context.router', this.context.router);
    console.log('locationToOtp', locationToOtp);
    const locationWithTime = withCurrentTime(
      this.context.getStore,
      this.context.location,
    );
    this.context.executeAction(setEndpoint, {
      target: 'destination',
      endpoint: this.props.location,
      router: this.context.router,
      location: locationWithTime,
    });
  };

  render() {
    return (
      <div className="bottom location">
        <div onClick={() => this.routeFrom()} className="route cursor-pointer">
          <FormattedMessage
            id="route-from-here"
            defaultMessage="Route from here"
          />
        </div>
        <div onClick={() => this.routeTo()} className="route cursor-pointer">
          <FormattedMessage id="route-here" defaultMessage="Route here" />
        </div>
      </div>
    );
  }
}

export default MarkerPopupBottom;
