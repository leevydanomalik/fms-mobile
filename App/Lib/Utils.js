import { isNil, isEmpty } from 'ramda';
import Api from '../Services/Api';
import { Colors } from '../Themes'

export function formatRpWithoutRp(num, fixed = 1) {
    num = parseFloat(num);
    var p = num.toFixed(fixed).split('.');
    return (
        p[0]
            .split('')
            .reverse()
            .reduce(function (acc, num, i, orig) {
                return num == '-' ? acc : num + (i && !(i % 3) ? '.' : '') + acc;
            }, '') +
        (isNil(p[1]) ? '' : ',' + p[1])
    );
}

export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' KL'
}

export function getPrimaryColor(role) {
    let primaryColor = "#000"
    switch (role) {
        case "GSO":
            primaryColor = "#b91500"
            break
        case "LM":
            primaryColor = "#472a88"
            break
        case "FLD":
            primaryColor = Colors.main
            break
        case "PICKER":
            primaryColor = Colors.main
            break
        case "PACKING":
            primaryColor = Colors.main
            break
        case "PUTAWAY":
            primaryColor = Colors.main
            break
        case "LABELING":
            primaryColor = Colors.main
            break
        case "STORING":
            primaryColor = Colors.main
            break
        case "MTO":
            primaryColor = Colors.main
            break
        case "GATE":
            primaryColor = Colors.main
            break
        case "DRIVER":
            primaryColor = Colors.main
            break
        case "LUM":
            primaryColor = Colors.main
            break
        case "GI":
            primaryColor = Colors.main
            break
        case "GR":
            primaryColor = Colors.main
            break
        case "FWD":
            primaryColor = "#2B9133"
            break
        default:
            primaryColor = Colors.main
            break
    }
    return primaryColor
}

export async function postToSap(sapPostingPayload, sapPostingURL, type) {
    let res, result, reffNo
    switch (type) {
        case "SAP-PO":
            res = await Api.create().sapCreateSto(sapPostingPayload)
            reffNo = (res.data && res.data.status === "S") ? res.data.data.purchaseOrder : "NONE"
            break
        case "SAP-LO-SO":
            res = await Api.create().sapCreateLoSo(sapPostingPayload)
            reffNo = (res.data && res.data.status === "S") ? res.data.data.loadingOrder : "NONE"
            break
        case "SAP-LO-PO":
            res = await Api.create().sapCreateLoSto(sapPostingPayload)
            reffNo = (res.data && res.data.status === "S") ? res.data.data.loadingOrder : "NONE"
            break
        case "GIPOSAP":
            res = await Api.create().sapCreateGiLoSto(sapPostingPayload)
            reffNo = (res.data && res.data.status === "S") ? "SUCCESS" : "NONE"
            break
        case "GISOSAP":
            res = await Api.create().sapCreateGiLoSto(sapPostingPayload)
            reffNo = (res.data && res.data.status === "S") ? "SUCCESS" : "NONE"
            break
        case "SAP-GR":
            res = await Api.create().sapCreateGrLoSto(sapPostingPayload)
            reffNo = (res.data && res.data.status === "S") ? "SUCCESS" : "NONE"
            break
        default:
            let response = await fetch(sapPostingURL, {
                method: "POST", headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                }, body: sapPostingPayload
            })
            res = await response.json()
            break
    }
    console.log("res", res, result, type, sapPostingPayload, sapPostingURL)
    if (type === "SAP-PO" || type === "SAP-LO-SO" || type === "SAP-LO-PO" || type === "GIPOSAP" || type === "GISOSAP" || type === "SAP-GR") {
        if (res.data && res.data.status === "S") return result = { stat: res.data.status, data: res.data, reffNo }
        else return res.data && res.data.message
    } else {
        if (res && res.status === "S") return result = { stat: res.status, data: res }
        else return res && res.message
    }
}