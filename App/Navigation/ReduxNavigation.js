import React from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigation from './AppNavigation';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';

class ReduxNavigation extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		nav: PropTypes.object.isRequired
	};

	_isDrawerOpen = (nav) => nav.routes[0].index === 1;

	_shouldCloseApp = (nav) => {
		if (
			this.props.nav.routes[this.props.nav.index].routeName === 'LoginScreen' ||
			this.props.nav.routes[this.props.nav.index].routeName === 'MainScreen' ||
			this.props.nav.routes[this.props.nav.index].routeName === 'SplashScreen'
		) {
			return true;
		}
		if (nav.routes) {
			return nav.routes.every(this._shouldCloseApp);
		}
		return false;
	};

	_goBack = () => this.props.dispatch(NavigationActions.back());

	_closeDrawer = () =>
		this.props.dispatch(
			NavigationActions.navigate({
				routeName: 'DrawerClose'
			})
		);

	_handleBackPress = () => {
		if (this._isDrawerOpen(this.props.nav)) {
			this._closeDrawer();
			return true;
		}
		if (this._shouldCloseApp(this.props.nav)) {
			return false;
		}
		this._goBack();
		return true;
	};

	UNSAFE_componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
	}

	render() {
		return <AppNavigation state={this.props.nav}  dispatch={this.props.dispatch}/>
	}
}

const mapStateToProps = (state) => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
