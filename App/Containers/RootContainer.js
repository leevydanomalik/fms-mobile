import React, { Component } from 'react';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import { connect } from 'react-redux';
import ReduxPersist from '../Config/ReduxPersist';
import { Root, StyleProvider, Toast, ActionSheet } from 'native-base';

// Styles

import getTheme from '../Themes/native-base-theme/components';
import platform from '../Themes/native-base-theme/variables/platform';

class RootContainer extends Component {
	componentDidMount() {
		// if redux persist is not active fire startup action
	}

	UNSAFE_componentWillMount() {
		Toast.toastInstance = null;
		ActionSheet.actionsheetInstance = null;
	}
	render() {
		return (
			<Root>
				<StyleProvider style={getTheme(platform)}>
					<ReduxNavigation />
				</StyleProvider>
			</Root>
		);
	}
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({

});

export default connect(null, mapDispatchToProps)(RootContainer);
