const addonMenu = [
    // {
    //     label: "Dashboard",
    //     description: "View business KPI",
    //     icon: "home",
    //     route: 'AnalyticScreen',
    //     info: {},
    //     notif: 0,
    //     not_binding: true,
    //     version: "V10",
    //     role: "R_MOBILE_DASHBOARD"
    // },
    // {
    //     label: "Signver",
    //     description: "Sign and verification digital document",
    //     icon: "home",
    //     route: 'QrScanner',
    //     info: { value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576" },
    //     notif: 0,
    //     not_binding: true,
    //     version: "V10",
    //     role: "R_MOBILE_SIGNVER"
    // },
    {
        label: "Sales",
        description: "Sales function for selling produck and marketing",
        icon: "team",
        route: 'SalesProductMainScreen',
        info: {},
        notif: 0,
        not_binding: true,
        version: "V10",
        role: "R_MOBILE_SALES"
    },
    {
        label: "Agent",
        description: "Manage truck driver for Agent",
        icon: "team",
        route: 'SalesProductMainScreen',
        info: {},
        notif: 0,
        not_binding: true,
        version: "V10",
        role: "R_MOBILE_AGENT"
    },
    {
        label: "Customer",
        description: "Manage truck driver for Customer",
        icon: "team",
        route: 'SalesProductMainScreen',
        info: {},
        notif: 0,
        not_binding: true,
        version: "V10",
        role: "R_MOBILE_CUSTOMER"
    },
    {
        label: "News",
        description: "Manage truck driver for News",
        icon: "notification",
        route: 'StreamScreen',
        info: {},
        notif: 0,
        not_binding: true,
        version: "V10",
        role: "R_MOBILE_NEWS"
    },
    {
        label: "Driver",
        description: "Manage truck driver",
        icon: "idcard",
        route: 'DriverScreen',
        info: {
            role: "DRIVER",
            name: "Mr. Driver",
            roleName: "DRIVER",
            roleID: "M4756-2020",
            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
        },
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_DRIVER",
        taskType: "DRIVER_ASSIGNMENT"
    },
    {
        label: "QuickView",
        description: "Manage truck driver for QuickView",
        icon: "eyeo",
        route: 'SalesProductMainScreen',
        info: {},
        notif: 0,
        not_binding: true,
        version: "V10",
        role: "R_MOBILE_QUICK"
    },
    // {
    //     label: "Traccar Config",
    //     icon: "home",
    //     route: 'TraccarConfigScreen',
    //     info: { value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576" },
    //     notif: 0,
    //     not_binding: true,
    //     version: "V10",
    //     role: "all"
    // },
    // {
    //     label: "Traccar Map",
    //     icon: "home",
    //     route: 'TraccarMapScreen',
    //     info: { value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576" },
    //     notif: 0,
    //     not_binding: true,
    //     version: "V10",
    //     role: "all"
    // }
]

const listMenu = [
    {
        label: "Yard & Dock",
        description: "Manage truck driver for Yard and Dock",
        icon: "inbox",
        route: 'YNDScreen',
        info: {
            role: "YND",
            card: "YND",
            name: "Mr. YND",
            roleName: "YND",
            roleID: "M4756-2020",
            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
        },
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_YND",
        taskType: "YARD_AND_DOCK"
    },
    {
        label: "Gate",
        sublabel: "Security",
        description: "Manage truck driver for Gate Security",
        icon: "Safety",
        route: 'GateScreen',
        info: {
            role: "GATE",
            name: "Mr. Gate Security",
            roleName: "GATE SECURITY",
            roleID: "M4756-2020",
            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
        },
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_GATE_SECURITY",
        taskType: "GATE_SECURITY"
    },
    {
        label: "Picking",
        description: "Pick material for Customer PO",
        icon: "totop",
        route: 'PickingScreen',
        info: {
            role: "PICKER",
            card: "PICKER",
            name: "Mr. Picking",
            roleName: "PICKING",
            roleID: "M4756-2020",
            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
        },
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_PICKING",
        taskType: "OUTBOUND_DELIVERY_PICKING"
    },
    {
        label: "Storing",
        description: "Manage truck driver for Storing",
        icon: "filter",
        route: 'StoringScreen',
        info: {
            role: "STORING",
            name: "Mr. Storing",
            roleName: "STORING",
            roleID: "M4756-2020",
            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
        },
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_STORING",
        taskType: "INBOUND_DELIVERY_STORING"
    },
    {
        label: "Good Issue",
        description: "Release material from current warehouse",
        icon: "upload",
        route: 'GoodIssueScreen',
        info: {
            role: "GI",
            name: "Mr. Good Issue",
            roleName: "GOOD ISSUE",
            roleID: "M4756-2020",
            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
        },
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_GOOD_ISSUE",
        taskType: "OUTBOUND_DELIVERY_GI"
    },
    {
        label: "Good Receipt",
        description: "Receiving material from Supplier",
        icon: "download",
        route: 'GoodReceiptScreen', //screen ticket 2
        info: {
            role: "GR",
            name: "Mr. Good Receipt",
            roleName: "GOOD RECEIPT",
            roleID: "M4756-2020",
            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
        },
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_GOOD_RECEIPT",
        taskType: "INBOUND_DELIVERY_GR"
    },
    {
        label: "Movement",
        description: "Manage truck driver for Movement",
        icon: "swap",
        route: 'TransferOrderScreen',
        info: {
            role: "MTO",
            name: "Mr. Movement",
            roleName: "MTO",
            roleID: "M4756-2020",
            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
        },
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_MTO",
        taskType: "MATERIAL_TRANSFER_ORDER"
    },
    {
        label: "Cycle Count",
        description: "Manage truck driver for Cycle Count",
        icon: "calculator",
        route: 'CycleCountScreen',
        info: {
            role: "CYCLECOUNT",
            name: "Mr. Cycle Count",
            roleName: "CYCLE COUNT",
            roleID: "M4756-2020",
            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
        },
        notif: 0,
        not_binding: true,
        version: "V10",
        role: "R_MOBILE_CYCLE_COUNT",
        taskType: "CYCLE_COUNT"
    },
    // {
    //     label: "Loading UnLoad",
    //     icon: "home",
    //     route: 'DashboardScreen',
    //     info: {
    //         role: "LUM",
    //         name: "Mr. Loading",
    //         roleName: "Loading UnLoad Master",
    //         roleID: "M4756-2020",
    //         imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
    //     },
    //     notif: 0,
    //     not_binding: true,
    //     version: "V10",
    //     role: "all"
    // },
    // {
    //     label: "Replenishment",
    //     description: "Manage truck driver for Replenishment",
    //     icon: "home",
    //     route: 'MovementScreen',
    //     info: {
    //         role: "REPLENISHMENT",
    //         name: "Mr. Replenishment",
    //         roleName: "REPLENISHMENT",
    //         roleID: "M4756-2020",
    //         imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
    //     },
    //     notif: 0,
    //     not_binding: false,
    //     version: "V10",
    //     role: "R_MOBILE_REPLENISHMENT"
    // },
    // {
    //     label: "Movement",
    //     description: "Manage truck driver for Movement",
    //     icon: "home",
    //     route: 'MovementScreen',
    //     info: {
    //         role: "MATERIALMOVEMENT",
    //         name: "Mr. Movement",
    //         roleName: "MATERIAL MOVEMENT",
    //         roleID: "M4756-2020",
    //         imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
    //     },
    //     notif: 0,
    //     not_binding: true,
    //     version: "V10",
    //     role: "R_MOBILE_MOVEMENT"
    // },
    {
        label: "Pack & Label",
        description: "Manage truck driver for Pack & Label",
        icon: "tagso",
        route: 'LabelingScreen',
        info: {
            role: "LABELING",
            name: "Mr. Pack & Label",
            roleName: "LABELING",
            roleID: "M4756-2020",
            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
        },
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_LABELING",
        taskType: "PACKING_LABELING"
    },
    // {
    //     label: "Putaway",
    //     description: "Manage truck driver for Putaway",
    //     icon: "home",
    //     route: 'PutawayScreen',
    //     info: {
    //         role: "PUTAWAY",
    //         name: "Mr. Putaway",
    //         roleName: "PUTAWAY",
    //         roleID: "M4756-2020",
    //         imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
    //     },
    //     notif: 0,
    //     not_binding: false,
    //     version: "V10",
    //     role: "R_MOBILE_PUTAWAY"
    // },
    // {
    //     label: "Driver",
    //     icon: "home",
    //     route: 'DashboardScreen',
    //     info: {
    //         role: "DRIVER",
    //         name: "Mr. Driver",
    //         roleName: "DRIVER",
    //         roleID: "M4756-2020",
    //         imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
    //     },
    //     notif: 3,
    //     not_binding: true,
    //     version: "V10",
    //     role: "all"
    // },
    {
        label: "Dashboard",
        description: "View business KPI",
        icon: "dashboard",
        route: 'AnalyticScreen',
        info: {},
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_DASHBOARD"
    },
    {
        label: "Signver",
        description: "Sign and verification digital document",
        icon: "scan1",
        route: 'QrScanner',
        info: { value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576" },
        notif: 0,
        not_binding: false,
        version: "V10",
        role: "R_MOBILE_SIGNVER"
    },
]

export default { listMenu, addonMenu }