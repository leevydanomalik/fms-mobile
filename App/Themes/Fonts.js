const type = {
	base: 'Roboto',
	medium: 'Roboto_medium'
};

const size = {
	headline: 24,
	title: 20,
	subhead: 16,
	body1: 14,
	body2: 14,
	caption: 12
};

const height = {
	headline: 32,
	title: 28,
	subhead: 24,
	body1: 20,
	body2: 24,
	caption: 16
};

const style = {
	headline: {
		fontFamily: type.headline,
		fontSize: size.headline,
		lineHeight: height.headline
	},
	title: {
		fontFamily: type.title,
		fontSize: size.title,
		lineHeight: height.title
	},
	subhead: {
		fontFamily: type.subhead,
		fontSize: size.subhead,
		lineHeight: height.subhead
	},
	body1: {
		fontFamily: type.body1,
		fontSize: size.body1,
		lineHeight: height.body1
	},
	body2: {
		fontFamily: type.body2,
		fontSize: size.body2,
		lineHeight: height.body2
	},
	caption: {
		fontFamily: type.caption,
		fontSize: size.caption,
		lineHeight: height.caption
	}
};

export default {
	type,
	size,
	height,
	style
};
