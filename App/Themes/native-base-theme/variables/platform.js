import color from 'color';
import Colors from '../../Colors';
import Fonts from '../../Fonts';

import { Platform, Dimensions, PixelRatio } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = 'material';
const isIphoneX = platform === 'ios' && deviceHeight === 812 && deviceWidth === 375;

export default {
	platformStyle,
	platform,

	// Android
	androidRipple: true,
	androidRippleColor: 'rgba(256, 256, 256, 0.3)',
	androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
	btnUppercaseAndroidText: true,

	// Badge
	badgeBg: '#ED1727',
	badgeColor: '#fff',
	badgePadding: platform === 'ios' ? 3 : 0,

	// Button
	btnFontFamily: platform === 'ios' ? 'Roboto' : 'Roboto_medium',
	btnDisabledBg: Colors.buttonDisabled,
	buttonPadding: 6,
	get btnPrimaryBg() {
		return this.brandPrimary;
	},
	get btnPrimaryColor() {
		return this.inverseTextColor;
	},
	get btnInfoBg() {
		return this.brandInfo;
	},
	get btnInfoColor() {
		return this.inverseTextColor;
	},
	get btnSuccessBg() {
		return this.brandSuccess;
	},
	get btnSuccessColor() {
		return this.inverseTextColor;
	},
	get btnDangerBg() {
		return this.brandDanger;
	},
	get btnDangerColor() {
		return this.inverseTextColor;
	},
	get btnWarningBg() {
		return this.brandWarning;
	},
	get btnWarningColor() {
		return this.inverseTextColor;
	},
	get btnTextSize() {
		return platform === 'ios' ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
	},
	get btnTextSizeLarge() {
		return this.fontSizeBase * 1.5;
	},
	get btnTextSizeSmall() {
		return this.fontSizeBase * 0.8;
	},
	get borderRadiusLarge() {
		return this.fontSizeBase * 3.8;
	},
	get iconSizeLarge() {
		return this.iconFontSize * 1.5;
	},
	get iconSizeSmall() {
		return this.iconFontSize * 0.6;
	},

	// Card
	cardDefaultBg: '#fff',
	cardBorderColor: '#ccc',

	// CheckBox
	CheckboxRadius: 0,
	CheckboxBorderWidth: 2,
	CheckboxPaddingLeft: 2,
	CheckboxPaddingBottom: platform === 'ios' ? 0 : 5,
	CheckboxIconSize: platform === 'ios' ? 18 : 14,
	CheckboxIconMarginTop: platform === 'ios' ? undefined : 1,
	CheckboxFontSize: platform === 'ios' ? 21 : 18,
	DefaultFontSize: 17,
	checkboxBgColor: Colors.brand,
	checkboxSize: 20,
	checkboxTickColor: '#fff',

	// Color
	brandPrimary: Colors.brand,
	brandInfo: Colors.info,
	brandSuccess: Colors.success,
	brandDanger: '#d9534f',
	brandWarning: Colors.warning,
	brandDark: Colors.buttonDisabled,
	brandLight: '#f4f4f4',

	// Font
	fontFamily: 'Roboto',
	fontSizeBase: 14,
	fontSizeH1: 24,
	fontSizeH2: 20,
	get fontSizeH3() {
		return this.fontSizeBase * 1.4;
	},

	// Footer
	footerHeight: isIphoneX ? 89 : 55,
	footerDefaultBg: Colors.footer,
	footerPaddingBottom: isIphoneX ? 34 : 0,

	// FooterTab
	tabBarTextColor: Colors.footerButton,
	tabBarTextSize: platform === 'ios' ? 14 : 11,
	activeTab: '#fff',
	sTabBarActiveTextColor: '#007aff',
	tabBarActiveTextColor: Colors.footerButtonActive,
	tabActiveBgColor: Colors.footer,

	// Header
	toolbarBtnColor: '#fff',
	toolbarDefaultBg: Colors.brand,
	toolbarHeight: platform === 'ios' ? (isIphoneX ? 88 : 64) : 56,
	toolbarSearchIconSize: platform === 'ios' ? 20 : 23,
	toolbarInputColor: '#fff',
	searchBarHeight: platform === 'ios' ? 30 : 40,
	searchBarInputHeight: platform === 'ios' ? 30 : 50,
	toolbarBtnTextColor: '#fff',
	toolbarDefaultBorder: '#3F51B5',
	iosStatusbar: 'light-content',
	statusBarColor: Colors.statusBar,
	get darkenHeader() {
		return color(this.tabBgColor).darken(0.03).hex();
	},

	// Icon
	iconFamily: 'Ionicons',
	iconFontSize: platform === 'ios' ? 30 : 28,
	iconHeaderSize: platform === 'ios' ? 29 : 24,

	// InputGroup
	inputFontSize: 16,
	inputLabelFontSize: 10,
	inputLineHeight: 18,
	inputBorderColor: Colors.textPlaceholder,
	inputSuccessBorderColor: Colors.brand,
	inputErrorBorderColor: Colors.warning,
	inputHeightBase: 40,
	get inputColor() {
		return this.textColor;
	},
	get inputColorPlaceholder() {
		return Colors.textPlaceholder;
	},

	// Line Height
	btnLineHeight: 19,
	lineHeightH1: 32,
	lineHeightH2: 27,
	lineHeightH3: 22,
	lineHeight: platform === 'ios' ? 20 : 24,

	// List
	listBg: 'transparent',
	listBorderColor: '#c9c9c9',
	listDividerBg: '#f4f4f4',
	listBtnUnderlayColor: '#DDD',
	listItemPadding: platform === 'ios' ? 10 : 12,
	listNoteColor: '#808080',
	listNoteSize: 13,

	// Progress Bar
	defaultProgressColor: '#E4202D',
	inverseProgressColor: '#1A191B',

	// Radio Button
	radioBtnSize: platform === 'ios' ? 25 : 23,
	radioSelectedColorAndroid: Colors.brand,
	radioBtnLineHeight: platform === 'ios' ? 29 : 24,
	radioColor: Colors.brand,

	// Segment
	segmentBackgroundColor: '#3F51B5',
	segmentActiveBackgroundColor: '#fff',
	segmentTextColor: '#fff',
	segmentActiveTextColor: '#3F51B5',
	segmentBorderColor: '#fff',
	segmentBorderColorMain: '#3F51B5',

	// Spinner
	defaultSpinnerColor: '#45D56E',
	inverseSpinnerColor: '#1A191B',

	// Tab
	tabDefaultBg: Colors.brand,
	topTabBarTextColor: '#fff',
	topTabBarActiveTextColor: '#fff',
	topTabBarBorderColor: '#fff',
	topTabBarActiveBorderColor: '#fff',

	// Tabs
	tabBgColor: Colors.brand,
	tabFontSize: 15,

	// Text
	textColor: Colors.text,
	inverseTextColor: '#fff',
	noteFontSize: 14,
	get defaultTextColor() {
		return this.textColor;
	},

	// Title
	titleFontfamily: platform === 'ios' ? 'Roboto' : Fonts.type.bold,
	titleFontSize: 20,
	subTitleFontSize: 14,
	subtitleColor: '#FFF',
	titleFontColor: '#FFF',

	// Other
	borderRadiusBase: 2,
	borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
	contentPadding: 10,
	dropdownLinkColor: '#414142',
	deviceWidth,
	deviceHeight,
	isIphoneX,
	inputGroupRoundedBorderRadius: 30
};
