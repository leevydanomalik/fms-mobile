// Prefixes:
// - button... : for specific button label.
// - check... : for checker label.
// - empty... : for empty placeholder message.
// - error... : for specific error message.
// - fab... : for floating action buttons label.
// - form... : for text input, dropdowns, file upload and other forms._404
// - hint... : for hint (below forms).
// - list... : for listview label.
// - modal... : nested modal component.
// - part... : nested screen component.
// - radio... : for radio label.
// - section... : for section or listview title.
// - tab... : for tab label.
// - text... : for label and static text.

const english = {
	button: {
		add: 'Add New',
		approve: 'Approve',
		buy: 'Buy',
		change: 'Change',
		dismiss: 'Dismiss',
		edit: 'Edit',
		login: 'Login',
		next: 'Next',
		previous: 'Prev',
		reset: 'Reset',
		save: 'Save',
		submit: 'Submit',
		confirm: 'Confirm'
	},
	error: {
		_404: 'Object not found',
		_500: 'Server error',
		emptyMandatory: 'Mandatory fields should not be empty',
		forbidden: 'You could not modify this part.' // For user that read-only
	},
	login: {
		formEmployeeId: 'Employee ID',
		formPassword: 'Password',
		buttonLogin: 'Login',
		buttonForgotPassword: 'Forgot password?',
		errorInvalid: 'Invalid employee ID or password', // wrong employee ID and password
		errorNotRegistered: 'Employee ID is not registered' // employee ID is not registered
	},
	forgotPassword: {
		titleLine1: 'Enter your',
		titleLine2: 'email address',
		formEmailAddress: 'Email address',
		hintEmailAddress: 'We will send you a link to reset your password. This link will expire in 24 hours.'
	},
	resetPassword: {
		titleLine1: 'Reset your',
		titleLine2: 'password',
		formNewPassword: 'New password',
		formConfirmNewPassword: 'Confirm new password',
		errorPasswordNotMatch: 'New password did not match'
	},
	homepage: {
		header: 'DDMS',
		sectionMainMenu: 'MAIN MENU',
		menuSales: 'Motorbike Sales',
		menuSpk: 'E-SPK',
		menuDiscount: 'Discount Approval'
	},
	notification: {
		header: 'Notification',
		emptyNotification: 'You do not have any notifications.'
	},
	profile: {
		header: 'Profile',
		sectionAccountSettings: 'ACCOUNT SETTINGS',
		sectionSecuritySettings: 'SECURITY SETTINGS',
		sectionAbout: 'ABOUT DDMS',
		emptyPhone: 'Phone is not set',
		emptyEmail: 'Email is not set',
		listChangePassword: 'Change password',
		listTermsConditions: 'Terms and conditions',
		listPrivacyPolicy: 'Privacy policy',
		listFaq: 'FAQ',
		listLogout: 'Logout'
	},
	editProfile: {
		header: 'Edit Profile',
		formFullName: 'Full name'
	},
	changePassword: {
		header: 'Change Password',
		formOldPassword: 'Old password',
		formNewPassword: 'New password',
		formConfirmNewPassword: 'Confirm new password',
		errorPasswordNotMatch: 'New password did not match'
	},
	sales: {
		header: 'Sales',
		emptySales: 'You do not have any customers.',
		emptySalesAdd: 'ADD NEW',
		modalNewCustomer: {
			header: 'New Customer',
			formFullName: 'Full name',
			formHandphone: 'Handphone',
			formEmailAddress: 'Email address',
			buttonPositive: 'Create New',
			buttonNegative: 'Cancel'
		},
		modalCheckOutConfirmation: {
			header: 'Checkout Confirmation',
			textMessage: 'Are you sure to check out this item?',
			buttonPositive: 'OK',
			buttonNegative: 'Cancel'
		}
	},
	productList: {
		formSearchProduct: 'Search product...',
		sectionNewProducts: 'NEW PRODUCTS',
		sectionBrowseProducts: 'BROWSE PRODUCTS',
		textLoadMore: 'Load more products...'
	},
	productFilter: {
		header: 'Filter Product',
		sectionCategory: 'CATEGORY',
		sectionSortBy: 'SORT BY'
	},
	productDetail: {
		header: 'Product Detail', // Will be replaced by product name
		tabMain: 'MAIN',
		tabSpecifications: 'SPECS',
		tabFeatures: 'FEATURES',
		sectionColor: 'COLOR SELECTION',
		sectionSpecifications: 'FULL SPECIFICATIONS',
		sectionFeatures: 'FEATURES',
		textUsers: 'users', // As a suffix of number of rating
		textSubtotal: 'Subtotal',
		btnBuy: 'BUY',
		modalAddToCart: {
			header: 'Add to Cart',
			textMessage: 'Adjust quantity to add.',
			buttonPositive: 'Add',
			buttonNegative: 'Cancel'
		}
	},
	espkList: {
		header: 'E-SPK List', // Will be replaced by Search SPK.
		formSearchSpk: 'Search e-SPK...',
		emptySpk: 'You do not have any SPK.',
		sectionToday: 'TODAY',
		sectionYesterday: 'YESTERDAY' // Replace with date for orders older than yesterday.
	},
	espkFilter: {
		header: 'Filter E-SPK',
		sectionStatus: 'STATUS',
		sectionSortBy: 'SORT BY'
	},
	espkCheckOut: {
		header: 'Check Out',
		textGrandTotal: 'Grand Total',
		btnSubmit: 'SUBMIT',
		submitDraft: {
			stepper: 'Submit Draft',
			sectionCustomer: 'CUSTOMER',
			sectionProduct: 'PRODUCT',
			sectionApparels: 'APPARELS',
			sectionApparelsAdd: 'ADD NEW',
			sectionOther: 'OTHER INFORMATION',
			sectionPaymentMethod: 'PAYMENT METHOD',
			emptyApparels: 'You do not purchase any apparels.',
			checkTemporaryLicensePlate: 'Temporary license plate',
			textDiscount: 'Discount',
			textGift: 'Customer get direct gift',
			paymentCredit: {
				textDownPayment: 'Down payment',
				textTenure: 'Tenure',
				textMonthlyRepayment: 'Monthly repayment',
				textFincoyPO: 'PO Number'
			},
			paymentCash: {
				textAmount: 'Pay amount'
			},
			emptyPayment: 'Please select payment method',
			partPaymentMethod: {
				header: 'Payment Method',
				sectionOption: 'PAYMENT OPTION',
				sectionFincoy: 'FINANCING COMPANY',
				sectionDownPayment: 'DOWN PAYMENT',
				sectionTenure: 'TENURE',
				textTotalPayment: 'Total payment amount', // Cash
				textMonthlyRepayment: 'Monthly repayment' // Credit
			},
			partDiscount: {
				header: 'Adjust Discount',
				formGlobalDiscount: 'Global dealer discount',
				formAdditionalDiscount: 'Additional discount (require approval)',
				textTotalDiscount: 'Total discount'
			},
			modalSubmitDraftConfirmation: {
				header: 'Submit Draft Confirmation',
				textMessage: 'Are you sure to submit this application? This application still could be edited later.',
				buttonPositive: 'OK',
				buttonNegative: 'Cancel'
			}
		},
		create: {
			stepper: 'Create SPK',
			sectionCustomerForm: 'CUSTOMER FORM',
			sectionStnkForm: 'STNK FORM',
			checkLegalInformation: 'Legal information',
			checkKtpAddress: 'KTP address',
			checkHomeAddress: 'Home address',
			checkBillingAddress: 'Billing address',
			checkPersonalInformation: 'Personal information',
			checkContactInformation: 'Contact information',
			checkOwnershipInformation: 'Ownership information',
			checkSocialMediaIformation: 'Social Media information',
			checkBankAccountInformation: 'Bank Account information',
			checkStnk: 'STNK',
			checkRO: 'Repeat Order Information (RO)',
			modalCreateSpkConfirmation: {
				header: 'Create SPK Confirmation',
				textMessage: 'Are you sure to create SPK for this application? This action could not be undone.',
				buttonPositive: 'OK',
				buttonNegative: 'Cancel'
			},
			partLegalInformation: {
				header: 'Legal Information',
				formFullName: 'Full name (KTP)',
				formKtpNo: 'KTP no.',
				formKkNo: 'KK no.',
				formNpwpNo: 'NPWP no.',
				formKtpImage: 'Photo of KTP',
				formNpwpImage: 'Photo of NPWP',
				formKkImage: 'Photo of KK',
				uploadImage: 'Upload Image'
			},
			partKTPAddress: {
				header: 'KTP Address',
				formStreetAddress: 'Street address, RT, RW',
				formProvince: 'Province',
				formCity: 'City',
				formDistrict: 'District',
				formVillage: 'Village',
				formPostalCode: 'Postal code'
			},
			partPersonalInformation: {
				header: 'Personal Information',
				formReligion: 'Religion',
				formHobby: 'Hobby',
				formOccupation: 'Occupation',
				formMonthlyExpenses: 'Monthly expenses',
				formEducationalBackground: 'Educational background',
				formHomeOwnershipStatus: 'Home ownership status'
			},
			partContactInformation: {
				header: 'Contact Information',
				formHandphone2: 'Handphone 2',
				formHomePhone: 'Home phone',
				formOtherEmailAddress: 'Other email address',
				checkSubscribe: 'I want to receive Daya newsletters'
			},
			partOwnershipInformation: {
				header: 'Ownership Information',
				checkSimilarLegal: 'Similar with Legal Information',
				formFullName: 'Full name',
				formKtpNo: 'KTP no.',
				formKkNo: 'KK no.',
				formNpwpNo: 'NPWP no.',
				formKtpImage: 'Photo of KTP',
				formNpwpImage: 'Photo of NPWP',
				formKkImage: 'Photo of KK',
				uploadImage: 'Upload Photo'
			},
			partSocialMediaInformation: {
				header: 'Social Media Information',
				formFacebook: 'Facebook',
				formTwitter: 'Twitter',
				formInstagram: 'Instagram',
				formYoutube: 'Youtube',
			},
			partBankAccountInformation: {
				header: 'Bank Account Information',
				formAccountName: 'Account Name',
				formAccountNumber: 'Account Number',
				formBankName: 'Bank Name',
				formBankBranch: 'Branch',
			},
			partROInformation: {
				header: 'Repeat Order Information (RO)',
				formBD: 'RO BD ID',
				formReferal: 'Referal ID'
			}
		},
		discard: {
			menuItemDiscard: 'Discard SPK',
			modalDiscardConfirmation: {
				header: 'Discard SPK Confirmation',
				textMessage: 'Are you sure to discard this application? This action could not be undone.',
				buttonPositive: 'OK',
				buttonNegative: 'Cancel'
			}
		},
		discountApproval: {
			stepper: 'Discount Approval',
			formGlobalDiscount: 'Global dealer discount',
			formAdditionalDiscount: 'Additional discount',
			textTotalDiscount: 'Total discount',
			modalDiscountApprovalConfirmation: {
				header: 'Discount Approval Confirmation',
				textMessage: 'Confirm xx discount to yy?', // Replace xx with total discount, and yy with customer name.
				buttonPositive: 'OK',
				buttonNegative: 'Cancel'
			}
		},
		confirm: {
			stepper: 'Confirmation',
			formDeliveryDate: 'Delivery date',
			formMachineNumber: 'Machine number',
			partUpdatePaymentMethod: {
				header: 'Update Payment Method',
				sectionFincoy: 'FINANCING COMPANY',
				sectionDownPayment: 'DOWN PAYMENT',
				sectionTenure: 'TENURE',
				formPoNumber: 'PO number',
				textMonthlyRepayment: 'Monthly repayment' // Credit
			},
			modalFinalConfirmation: {
				header: 'Final Confirmation',
				textMessage: 'Are you sure to confirm this SPK?',
				buttonPositive: 'OK',
				buttonNegative: 'Cancel'
			}
		}
	},
	espkDetail: {
		header: 'SPK Detail',
		sectionCustomer: 'CUSTOMER',
		sectionProduct: 'PRODUCT',
		sectionApparels: 'APPARELS',
		sectionOther: 'OTHER INFORMATION',
		sectionPaymentMethod: 'PAYMENT METHOD',
		sectionForms: 'FORMS',
		textTemporaryLicensePlate: 'Temporary license plate',
		textDiscount: 'Discount',
		textGift: 'Customer get direct gift',
		paymentCredit: {
			textDownPayment: 'Down payment',
			textTenure: 'Tenure',
			textMonthlyRepayment: 'Monthly repayment',
			textFincoyPO: 'PO Number'
		},
		paymentCash: {
			textAmount: 'Pay amount'
		},
		textPaymentSubmitted: 'Payment submitted',
		textCustomerForm: 'Customer form',
		textStnkForm: 'STNK form',
		fabSubmitPayment: 'Submit payment',
		fabIndentUnit: 'Indent unit',
		fabReturnSpk: 'Return SPK',
		fabCancelSpk: 'Cancel SPK',
		modalCancelSpkConfirmation: {
			header: 'Cancel SPK Confirmation',
			formCancelationReason: 'Cancelation reason',
			buttonPositive: 'OK',
			buttonNegative: 'Cancel'
		},
		modalReturnSpkConfirmation: {
			header: 'Return SPK Confirmation',
			formCancelationReason: 'Return reason',
			buttonPositive: 'OK',
			buttonNegative: 'Cancel'
		},
		modalIndentUnitConfirmation: {
			header: 'Indent Unit Confirmation',
			textMessage: 'Set order status to indent and inform user?',
			buttonPositive: 'OK',
			buttonNegative: 'Cancel'
		},
		partSubmitPayment: {
			header: 'Submit Payment',
			formAmount: 'Amount transfered',
			formReceiptImage: 'Photo of receipt'
		},
		uploadImage: {
			imageForm: 'Capture Image',
			uploadImage: 'Upload'
		}
	},
	deliveryOrderList: {
		header: 'Delivery Order List',
		formSearchDO: 'Search Delivery Order',
		emptyDeliveryOrder: 'You do not have any delivery orders.'
	},
	deliveryOrderDetail: {
		header: 'Delivery Order Detail',
		sectionDetail: 'DETAIL',
		sectionItems: 'ITEMS',
		formDeliveryOrderNumber: 'Delivery order no.',
		formInsufficientPayment: 'Insufficient payment.',
		formNotes: 'Notes'
	},
	proofOfDelivery: {
		header: 'Proof of Delivery',
		sectionOther: 'OTHER INFORMATION',
		sectionProofOfDelivery: 'PROOF OF DELIVERY',
		formMachineNumber: 'Machine number',
		formSender: 'Sender',
		uploadImage: 'Upload Photo',
		formConsigneeName: 'Consignee name',
		formProofOfDeliveryPhoto: 'Photo of consignee with object',
		formDigitalSignature: 'Provide digital signature'
	},
	returnOrderList: {
		header: 'Return Order List',
		emptyReturnOrder: 'You do not have any return orders'
	},
	returnOrderDetail: {
		header: 'Return Order Detail',
		sectionDetail: 'DETAIL',
		sectionItems: 'ITEMS',
		formDeliveryOrderNumber: 'Delivery order no.',
		formInsufficientPayment: 'Insufficient payment',
		formNotes: 'Notes'
	},
	proofOfPickUp: {
		header: 'Proof of Pick Up',
		sectionOther: 'OTHER INFORMATION',
		sectionProofOfPickUp: 'PROOF OF PICK UP',
		formMachineNumber: 'Machine number',
		formSender: 'Sender',
		formCustomerName: 'Customer name',
		formReason: 'Pick up reason',
		formProofOfPickUpPhoto: 'Photo of customer with object',
		formDigitalSignature: 'Provide digital signature'
	},

	employeeId: 'Employee ID',
	password: 'Password',
	forgetPassword: 'Forget your password?',
	invalidEmployeeId: 'Invalide Employee ID format',
	invalidPassword: 'Invalid password',
	enterEmailLine1: 'Enter your',
	enterEmailLine2: 'email address',
	emailAddressPlaceholder: 'Email address',
	btnSubmit: 'Submit',
	emailInfoLine1: 'We will send you a link to reset your password.',
	emailInfoLine2: 'This link will expire in 24 hours.',
	resetPasswordLine1: 'Reset your',
	resetPasswordLine2: 'password',
	newPasswordPlaceholder: 'New password',
	newPasswordConfirmPlaceholder: 'Confirm new password',
	homePageTitle: 'DDMS',
	notificationTitle: 'Notification',
	profileTitle: 'Profile'
};

export default english;
