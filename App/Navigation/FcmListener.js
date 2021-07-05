
let nav = ""
let kosong = ""
let typesDefault = "SPLASH"
let types = ""
export function registerAppListener(notification, type, navigation) {
    notification && notification.userInteraction ? types = "NOTIF" : typesDefault
    if (navigation !== null) nav = navigation
    else {
        kosong = navigation
        switch (notification.title) {
            case "PACKING_LABELING":
                nav.navigate('LabelingScreen', {
                    card: "LABELING",
                    role: "LABELING",
                    name: "Mr. Labeling",
                    roleName: "LABELING",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: notification.message
                })
                break
            case "INBOUND_DELIVERY_STORING":
                nav.navigate('StoringScreen', {
                    role: "STORING",
                    card: "STORING",
                    name: "Mr. Storing",
                    roleName: "STORING",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: notification.message
                })
                break
            case "OUTBOUND_DELIVERY_PICKING":
                nav.navigate('PickingScreen', {
                    role: "PICKER",
                    card: "PICKER",
                    name: "Mr. Picker",
                    roleName: "PICKER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: notification.message
                })
                break
            case "MATERIAL_TRANSFER_ORDER":
                nav.navigate('TransferOrderScreen', {
                    role: "MTO",
                    card: "MTO",
                    name: "Mr. Transfer Order",
                    roleName: "MTO",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: notification.message
                })
                break
            case "GATE_SECURITY":
                nav.navigate('GateScreen', {
                    role: "GATE",
                    card: "GATE",
                    name: "Mr. Gate Security",
                    roleName: "GATE SECURITY",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: notification.message
                })
                break
            case "DRIVER_ASSIGNMENT":
                nav.navigate('DriverScreen', {
                    role: "DRIVER",
                    card: "DRIVER",
                    name: "Mr. Driver",
                    roleName: "DRIVER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: notification.message
                })
                break
            case "YARD_AND_DOCK":
                nav.navigate('YNDScreen', {
                    role: "YND",
                    card: "YND",
                    name: "Mr. YND",
                    roleName: "YND",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: notification.message
                })
                break
            case "INBOUND_DELIVERY_GR":
                nav.navigate('GoodReceiptScreen', {
                    role: "GR",
                    card: "GR",
                    name: "Mr. Good Receipt",
                    roleName: "GOOD RECEIPT",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: notification.message
                })
                break
            case "OUTBOUND_DELIVERY_GI":
                nav.navigate('GoodIssueScreen', {
                    role: "GI",
                    card: "GI",
                    name: "Mr. Good Issue",
                    roleName: "GOOD ISSUE",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: notification.message
                })
                break
            case "CYCLE_COUNT":
                nav.navigate('CycleCountScreen', {
                    role: "CYCLECOUNT",
                    card: "CYCLECOUNT",
                    name: "Mr. Cycle Count",
                    roleName: "CYCLE COUNT",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: notification.message
                })
                break
            case "YND Information":
                let ticketID = JSON.parse(notification.message)
                nav.navigate('DriverScreen', {
                    role: "DRIVER",
                    card: "DRIVER",
                    name: "Mr. Driver",
                    roleName: "DRIVER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: ticketID.ticket_no
                })
                break
            case "YND Information GR":
                let ticketIDGR = JSON.parse(notification.message)
                nav.navigate('GoodReceiptScreen', {
                    role: "GR",
                    card: "GR",
                    name: "Mr. Good Receipt",
                    roleName: "GOOD RECEIPT",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: ticketIDGR.ticket_no
                })
                break
            case "YND Information GI":
                let ticketIDGI = JSON.parse(notification.message)
                nav.navigate('GoodIssueScreen', {
                    role: "GI",
                    card: "GI",
                    name: "Mr. Good Issue",
                    roleName: "GOOD ISSUE",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: ticketIDGI.ticket_no
                })
                break
            case "YND Information Gate":
                let ticketIDGate = JSON.parse(notification.message)
                nav.navigate('GateScreen', {
                    role: "GATE",
                    card: "GATE",
                    name: "Mr. Gate Security",
                    roleName: "GATE SECURITY",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: ticketIDGate.ticket_no
                })
                break
            case "Gate Security Check In":
                let ticketDriver = JSON.parse(notification.message)
                nav.navigate('DriverScreen', {
                    role: "DRIVER",
                    card: "DRIVER",
                    name: "Mr. Driver",
                    roleName: "DRIVER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: ticketDriver.ticket_no
                })
                break
            case "Gate Security Check Out":
                let ticketDriverOut = JSON.parse(notification.message)
                nav.navigate('DriverScreen', {
                    role: "DRIVER",
                    card: "DRIVER",
                    name: "Mr. Driver",
                    roleName: "DRIVER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: ticketDriverOut.ticket_no
                })
                break
            case "Seal Number Information":
                let ticketSeal = JSON.parse(notification.message)
                nav.navigate('DriverScreen', {
                    role: "DRIVER",
                    card: "DRIVER",
                    name: "Mr. Driver",
                    roleName: "DRIVER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data: ticketSeal.ticket_no
                })
                break
            default:
                nav.navigate("MainScreen")
                break
        }
    }
    console.log("nott", notification, type, navigation, nav, kosong)
    return types
}