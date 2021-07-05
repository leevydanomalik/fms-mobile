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

const indonesian = {
	button: {
		add: 'Tambah',
		approve: 'Setuju',
		buy: 'Beli',
		change: 'Ubah',
		dismiss: 'Tutup',
		edit: 'Ubah',
		login: 'Masuk',
		next: 'Lanjut',
		previous: 'Kembali',
		reset: 'Set Ulang',
		save: 'Simpan',
		submit: 'Kirim',
		confirm: 'Setuju'
	},
	error: {
		_404: 'Object not found',
		_500: 'Server error',
		emptyMandatory: 'Mandatory fields should not be empty',
		forbidden: 'You could not modify this part.' // For user that read-only
	},
	login: {
		formEmployeeId: 'ID karyawan',
		formPassword: 'Kata sandi',
		buttonLogin: 'Masuk',
		buttonForgotPassword: 'Lupa kata sandi?',
		errorInvalid: 'ID karyawan dan kata sandi tidak cocok', // wrong employee ID and password
		errorNotRegistered: 'ID karyawan tidak terdaftar' // employee ID is not registered
	},
	forgotPassword: {
		titleLine1: 'Masukkan',
		titleLine2: 'alamat email',
		formEmailAddress: 'Alamat email',
		hintEmailAddress:
			'Kami akan mengirimkan tautan untuk menyetel ulang kata sandi Anda. Tautan akan terhapus dalam waktu 24 jam.'
	},
	resetPassword: {
		titleLine1: 'Setel ulang',
		titleLine2: 'kata sandi',
		formNewPassword: 'Kata sandi baru',
		formConfirmNewPassword: 'Konfirmasi kata sandi baru',
		errorPasswordNotMatch: 'Kata sandi baru tidak sama'
	},
	homepage: {
		header: 'DDMS',
		sectionMainMenu: 'MENU UTAMA',
		menuSales: 'Penjualan Motor',
		menuSpk: 'E-SPK',
		menuDiscount: 'Persetujuan Diskon'
	},
	notification: {
		header: 'Notifikasi',
		emptyNotification: 'Anda tidak memiliki notifikasi.'
	},
	profile: {
		header: 'Profil',
		sectionAccountSettings: 'PENGATURAN AKUN',
		sectionSecuritySettings: 'PENGATURAN KEAMANAN',
		sectionAbout: 'TENTANG DDMS',
		emptyPhone: 'Handphone belum disetel',
		emptyEmail: 'Email belum disetel',
		listChangePassword: 'Ubah kata sandi',
		listTermsConditions: 'Syarat dan ketentuan',
		listPrivacyPolicy: 'Kebijakan privasi',
		listFaq: 'Pertanyaan',
		listLogout: 'Keluar'
	},
	editProfile: {
		header: 'Ubah Profil',
		formFullName: 'Nama lengkap'
	},
	changePassword: {
		header: 'Ubah Kata Sandi',
		formOldPassword: 'Kata sandi lama',
		formNewPassword: 'Kata sandi baru',
		formConfirmNewPassword: 'Konfirmasi kata sandi baru',
		errorPasswordNotMatch: 'Kata sandi baru tidak cocok'
	},
	sales: {
		header: 'Penjualan',
		emptySales: 'Anda belum memiliki pelanggan.',
		emptySalesAdd: 'BUAT BARU',
		modalNewCustomer: {
			header: 'Pelanggan Baru',
			formFullName: 'Nama lengkap',
			formHandphone: 'Handphone',
			formEmailAddress: 'Alamat email',
			buttonPositive: 'Buat Baru',
			buttonNegative: 'Batal'
		},
		modalCheckOutConfirmation: {
			header: 'Konfirmasi Checkout',
			textMessage: 'Anda yakin checkout barang ini?',
			buttonPositive: 'OK',
			buttonNegative: 'Batal'
		}
	},
	productList: {
		formSearchProduct: 'Cari produk...',
		sectionNewProducts: 'PRODUK BARU',
		sectionBrowseProducts: 'PILIH PRODUK',
		textLoadMore: 'Memuat produk lainnya...'
	},
	productFilter: {
		header: 'Filter Produk',
		sectionCategory: 'KATEGORI',
		sectionSortBy: 'DIURUTKAN BERDASARKAN'
	},
	productDetail: {
		header: 'Detil Produk', // Will be replaced by product name
		tabMain: 'UTAMA',
		tabSpecifications: 'SPEK',
		tabFeatures: 'FITUR',
		sectionColor: 'PILIHAN WARNA',
		sectionSpecifications: 'SPESIFIKASI LENGKAP',
		sectionFeatures: 'FITUR',
		textUsers: 'pengguna', // As a suffix of number of rating
		textSubtotal: 'Subtotal',
		btnBuy: 'BUY',
		modalAddToCart: {
			header: 'Tambah Keranjang Belanja',
			textMessage: 'Jumlah yang akan ditambahkan.',
			buttonPositive: 'Tambahkan',
			buttonNegative: 'Batal'
		}
	},
	espkList: {
		header: 'Daftar E-SPK', // Will be replaced by Search SPK.
		formSearchSpk: 'Cari e-SPK...',
		emptySpk: 'Anda belum membuat SPK.',
		sectionToday: 'HARI INI',
		sectionYesterday: 'KEMARIN' // Replace with date for orders older than yesterday.
	},
	espkFilter: {
		header: 'Filter E-SPK',
		sectionStatus: 'STATUS',
		sectionSortBy: 'DIURUTKAN BERDASARKAN'
	},
	espkCheckOut: {
		header: 'Check Out',
		textGrandTotal: 'Grand Total',
		btnSubmit: 'KIRIM',
		submitDraft: {
			stepper: 'Kirim Draf',
			sectionCustomer: 'PELANGGAN',
			sectionProduct: 'PRODUK',
			sectionProductChange: 'UBAH PRODUK',
			sectionApparels: 'HONDA GENUINE APPAREL & ACCESSORIES',
			sectionApparelsAdd: 'TAMBAH',
			sectionOther: 'INFORMASI LAIN',
			sectionPaymentMethod: 'METODE PEMBAYARAN',
			emptyApparels: 'Pelanggan tidak membeli aparel.',
			checkTemporaryLicensePlate: 'Plat nomor sementara',
			textDiscount: 'Diskon Program',
			textGift: 'Pelanggan mendapatkan hadiah langsung',
			paymentCredit: {
				textDownPayment: 'Uang muka',
				textTenure: 'Tenor',
				textMonthlyRepayment: 'Cicilan perbulan',
				textFincoyPO: 'Nomor PO'
			},
			paymentCash: {
				textAmount: 'Jumlah dibayarkan'
			},
			emptyPayment: 'Pilih metode pembayaran',
			partPaymentMethod: {
				header: 'Metode Pembayaran',
				sectionOption: 'PILIHAN METODE',
				sectionFincoy: 'PERUSAHAAN KEUANGAN',
				sectionDownPayment: 'UANG MUKA',
				sectionTenure: 'TENOR',
				textTotalPayment: 'Jumlah dibayarkan', // Cash
				textMonthlyRepayment: 'Cicilan perbulan' // Credit
			},
			partDiscount: {
				header: 'Ubah Diskon',
				formGlobalDiscount: 'Diskon global',
				formAdditionalDiscount: 'Tambahan diskon (butuh persetujuan)',
				textTotalDiscount: 'Total diskon'
			},
			modalSubmitDraftConfirmation: {
				header: 'Konfirmasi Kirim Draf',
				textMessage: 'Anda yakin mengirimkan draf aplikasi ini? Draf masih dapat diubah.',
				buttonPositive: 'OK',
				buttonNegative: 'Batal'
			}
		},
		create: {
			stepper: 'Buat SPK',
			sectionCustomerForm: 'FORMULIR PELANGGAN',
			sectionStnkForm: 'FORMULIR STNK',
			checkLegalInformation: 'Informasi legal',
			checkKtpAddress: 'Alamat KTP',
			checkHomeAddress: 'Alamat rumah',
			checkBillingAddress: 'Alamat surat',
			checkPersonalInformation: 'Informasi pribadi',
			checkContactInformation: 'Informasi kontak',
			checkOwnershipInformation: 'Informasi kepemilikan',
			checkSocialMediaIformation: 'Informasi Sosial Media',
			checkBankAccountInformation: 'Informasi Akun Bank',
			checkStnk: 'STNK',
			checkRO: 'Informasi Repeat Order (RO)',
			modalCreateSpkConfirmation: {
				header: 'Konfirmasi Pembuatan SPK',
				textMessage: 'Anda yakin untuk lanjut ke pembuatan SPK? Data yang telah dikirimkan tidak dapat diubah.',
				buttonPositive: 'OK',
				buttonNegative: 'Batal'
			},
			partLegalInformation: {
				header: 'Informasi Legal',
				formFullName: 'Nama lengkap (KTP)',
				formKtpNo: 'Nomor KTP',
				formKkNo: 'Nomor KK',
				formNpwpNo: 'Nomor NPWP',
				formKtpImage: 'Foto KTP',
				formNpwpImage: 'Foto NPWP',
				formKkImage: 'Foto KK',
				uploadImage: 'Unggah Foto'
			},
			partKTPAddress: {
				header: 'Alamat KTP',
				formStreetAddress: 'Jalan, RT, RW',
				formProvince: 'Provinsi',
				formCity: 'Kota / Kabupaten',
				formDistrict: 'Kecamatan',
				formVillage: 'Desa / Kelurahan',
				formPostalCode: 'Kode pos'
			},
			partPersonalInformation: {
				header: 'Informasi Pribadi',
				formReligion: 'Agama',
				formHobby: 'Hobi',
				formOccupation: 'Pekerjaan',
				formMonthlyExpenses: 'Pengeluaran sebulan',
				formEducationalBackground: 'Pendidikan terakhir',
				formHomeOwnershipStatus: 'Status kepemilikan rumah'
			},
			partContactInformation: {
				header: 'Informasi Kontak',
				formHandphone2: 'Handphone 2',
				formHomePhone: 'Telepon rumah',
				formEmailAddress: 'Alamat email',
				formOtherEmailAddress: 'Alamat email lainnya',
				checkSubscribe: 'Saya bersedia menerima berita baru dari Daya.'
			},
			partOwnershipInformation: {
				header: 'Informasi Kepemilikan',
				checkSimilarLegal: 'Sama dengan informasi legal',
				formFullName: 'Nama lengkap',
				formKtpNo: 'Nomor KTP',
				formKkNo: 'Nomor KK',
				formNpwpNo: 'Nomor NPWP',
				formKtpImage: 'Foto KTP',
				formNpwpImage: 'Foto NPWP',
				formKkImage: 'Foto KK',
				uploadImage: 'Upload Foto'
			},
			partSocialMediaInformation: {
				header: 'Informasi Sosial Media',
				formFacebook: 'Facebook',
				formTwitter: 'Twitter',
				formInstagram: 'Instagram',
				formYoutube: 'Youtube',
			},
			partBankAccountInformation: {
				header: 'Informasi Akun Bank',
				formAccountName: 'Nama Pemilik Rekening',
				formAccountNumber: 'Nomor Rekening',
				formBankName: 'Nama Bank',
				formBankBranch: 'Cabang',
			},
			partROInformation: {
				header: 'Informasi Repeat Order (RO)',
				formBD: 'RO BD ID',
				formReferal: 'Referal ID'
			}
		},
		discard: {
			menuItemDiscard: 'Pembatalan SPK',
			modalDiscardConfirmation: {
				header: 'Konfirmasi Pembatalan SPK',
				textMessage: 'Anda yakin untuk membatalkan SPK? Data yang telah dibatalkan tidak dapat diubah.',
				buttonPositive: 'OK',
				buttonNegative: 'Batal'
			}
		},
		discountApproval: {
			stepper: 'Persetujuan Diskon',
			formGlobalDiscount: 'Diskon global',
			formAdditionalDiscount: 'Diskon tambahan',
			formRequestAdditionalDiscount: 'Tambahan diskon (butuh persetujuan)',
			textTotalDiscount: 'Diskon total',
			modalDiscountApprovalConfirmation: {
				header: 'Konfirmasi Persetujuan Diskon',
				textMessage: 'Anda yakin untuk menambahkan diskon xx kepada yy?', // Replace xx with total discount, and yy with customer name.
				buttonPositive: 'OK',
				buttonNegative: 'Batal'
			}
		},
		confirm: {
			stepper: 'Konfirmasi',
			formDeliveryDate: 'Tanggal pengantaran',
			formMachineNumber: 'Nomor Mesin',
			partUpdatePaymentMethod: {
				header: 'Ubah Metode Pembayaran',
				sectionFincoy: 'PERUSAHAAN KEUANGAN',
				sectionDownPayment: 'UANG MUKA',
				sectionTenure: 'TENOR',
				formPoNumber: 'Nomor PO',
				textMonthlyRepayment: 'Cicilan perbulan' // Credit
			},
			modalFinalConfirmation: {
				header: 'Konfirmasi Terakhir',
				textMessage: 'Anda yakin untuk finalisasi SPK?',
				buttonPositive: 'OK',
				buttonNegative: 'Batal'
			}
		}
	},
	espkDetail: {
		header: 'Detil SPK',
		sectionCustomer: 'PELANGGAN',
		sectionProduct: 'PRODUK',
		sectionApparels: 'APAREL',
		sectionOther: 'INFORMASI LAIN',
		sectionPaymentMethod: 'METODE PEMBAYARAN',
		sectionForms: 'FORMULIR',
		textTemporaryLicensePlate: 'Plat nomor sementara',
		textDiscount: 'Diskon',
		textGift: 'Pelanggan mendapatkan hadiah langsung',
		paymentCredit: {
			textDownPayment: 'Uang muka',
			textTenure: 'Tenor',
			textMonthlyRepayment: 'Cicilan perbulan',
			textFincoyPO: 'Nomor PO'
		},
		paymentCash: {
			textAmount: 'Jumlah dibayar'
		},
		textPaymentSubmitted: 'Pembayaran yang diterima',
		textCustomerForm: 'Formulir pelanggan',
		textStnkForm: 'Formulir STNK',
		fabSubmitPayment: 'Laporkan pembayaran',
		fabIndentUnit: 'Unit indent',
		fabReturnSpk: 'Pengembalian SPK',
		fabCancelSpk: 'Pembatalan SPK',
		modalCancelSpkConfirmation: {
			header: 'Konfirmasi Pembatalan SPK',
			formCancelationReason: 'Alasan pembatalan',
			buttonPositive: 'OK',
			buttonNegative: 'Batal'
		},
		modalReturnSpkConfirmation: {
			header: 'Konfirmasi pengembalian SPK',
			formCancelationReason: 'Alasan pengembalian',
			buttonPositive: 'OK',
			buttonNegative: 'Batal'
		},
		modalIndentUnitConfirmation: {
			header: 'Konfirmasi Inden Unit',
			textMessage: 'Ubah status order menjadi inden?',
			buttonPositive: 'OK',
			buttonNegative: 'Batal'
		},
		partSubmitPayment: {
			header: 'Laporan Pembayaran',
			formAmount: 'Jumlah pembayaran',
			formReceiptImage: 'Foto bukti pembayaran'
		},
		uploadImage: {
			imageForm: 'Ambil Foto',
			uploadImage: 'Upload'
		}
	},
	deliveryOrderList: {
		header: 'Daftar Surat Jalan',
		emptyDeliveryOrder: 'Anda belum memiliki surat jalan.'
	},
	deliveryOrderDetail: {
		header: 'Detil Surat Jalan',
		formSearchDO: 'Cari Surat Jalan',
		sectionDetail: 'DETIL',
		sectionItems: 'BARANG',
		formDeliveryOrderNumber: 'Nomor surat jalan',
		formInsufficientPayment: 'Kekurangan bayar',
		formNotes: 'Catatan'
	},
	proofOfDelivery: {
		header: 'Bukti Serah Terima',
		sectionOther: 'INFORMASI LAIN',
		sectionProofOfDelivery: 'BUKTI SERAH TERIMA',
		formMachineNumber: 'Nomor mesin',
		uploadImage: 'Unggah Foto',
		formSender: 'Pengirim',
		formConsigneeName: 'Nama penerima',
		formProofOfDeliveryPhoto: 'Foto penerima dengan barang',
		formDigitalSignature: 'Tanda tangan digital'
	},
	returnOrderList: {
		header: 'Daftar Retur',
		emptyReturnOrder: 'Anda belum memiliki daftar retur.'
	},
	returnOrderDetail: {
		header: 'Detil Retur',
		sectionDetail: 'DETIL',
		sectionItems: 'BARANG',
		formReturnOrderNumber: 'Nomor surat jalan',
		formInsufficientPayment: 'Kekurangan bayar',
		formNotes: 'Catatan'
	},
	proofOfPickUp: {
		header: 'Bukti Pengambilan Barang',
		sectionOther: 'INFORMASI LAIN',
		sectionProofOfPickUp: 'BUKTI PEMBAMBILAN BARANG',
		formMachineNumber: 'Nomor mesin',
		formSender: 'Pengirim',
		formCustomerName: 'Nama pelanggan',
		formReason: 'Alasan pengambilan',
		formProofOfPickUpPhoto: 'Foto pembeli dengan barang',
		formDigitalSignature: 'Tanda tangan digital'
	},
	picdList: {
		header: 'Daftar PICD', // Will be replaced by Search SPK.
		formSearchSpk: 'Cari PICD...',
		emptySpk: 'Tidak ada PICD.',
		sectionToday: 'HARI INI',
		sectionYesterday: 'KEMARIN' // Replace with date for orders older than yesterday.
	},
	picdFilter: {
		header: 'Filter E-SPK',
		sectionStatus: 'STATUS',
		sectionSortBy: 'DIURUTKAN BERDASARKAN'
	},
	picd: {
		header: 'Penjualan',
		emptyPicd: 'Anda belum memiliki Discount Approval.',
		emptySalesAdd: 'BUAT BARU',
		amountDisc: 'Jumlah Approval Discount'
	},
	indent: {
		productId: 'Product ID',
		orderId: 'Order ID',
		custId: 'Customer ID',
		custName: 'Customer Name',
		custKTP: 'Customer KTP',
		eta: 'ETA',
		tandaJadi: 'Tanda Jadi',
		alamat: 'Alamat'
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

export default indonesian;
