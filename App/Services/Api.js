import apisauce from 'apisauce';
import { encode } from 'base-64';
import Config from 'react-native-config'

const create = () => {
    let api;

    api = apisauce.create({
        baseURL: Config.API_URL,
        headers: {
            Authorization: 'Basic ' + encode('admindash:admindash'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        timeout: 30000
    });

    apisocket = apisauce.create({
        baseURL: Config.API_SOCKET_URL,
        timeout: 30000
    });

    apiwms = apisauce.create({
        baseURL: Config.API_FMS_BASE_URL + 'idp/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    apiwmsmd = apisauce.create({
        baseURL: Config.API_FMS_BASE_URL + 'masterdata/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    apiwmsmat = apisauce.create({
        baseURL: Config.API_FMS_BASE_URL + 'material/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    apiwmstrx = apisauce.create({
        baseURL: Config.API_FMS_BASE_URL + 'trxcmd/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    apiwmstrxq = apisauce.create({
        baseURL: Config.API_FMS_BASE_URL + 'trxquery/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    apiwmsdocgw = apisauce.create({
        baseURL: Config.API_FMS_BASE_URL + 'docgw/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    apiwmsnotif = apisauce.create({
        baseURL: Config.API_FMS_BASE_URL + 'notification/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    apiwmselastic = apisauce.create({
        baseURL: Config.API_FMS_BASE_URL + 'elastic/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    apiwmssap = apisauce.create({
        baseURL: Config.API_FMS_BASE_URL + 'sap/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    apiwmsfcm = apisauce.create({
        baseURL: Config.API_FMS_BASE_URL + 'fcm/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    const socketLogin = () => apisocket.get('/traccar/rest/login?payload=["leevy","slovenia"]')
    // User login
    const userAuth = body => apiwms.post('user.auth', body);
    const postToken = body => apiwmsmd.post('post.token.device', body);
    const getUserByEmpID = body => apiwms.get('get.user.by.emp.id/' + body)
    const getTokenDeviceByUserID = (data) => apiwmsmd.get('get.token.device.by.userid/' + data)
    const cacheTrx = (data) => apiwmstrx.post('release.all.wms.trx.cache', data, {
        method: 'DELETE'
    })


    // SAP Interfacing
    const getErrorRate = () => api.get('/dashboardapi/sap.error.rate.get.for.mobile');
    const getSuccessRate = () => api.get('/dashboardapi/sap.success.rate.get.for.mobile');
    const getTotalRate = () => api.get('/dashboardapi/sap.total.rate.get.for.mobile');
    const getSapVolume = body => api.get('/dashboardapi/sap.log.execution.per.year.get/' + body.year);

    // Fleet gps
    const getVehicle = () => api.get('/dashboardapi/vehicle.tracking.get');

    // Purchase Requisition
    const getCalculatePrPerformance = () => api.get('/dashboardapi/pr.calculate.performance');
    const getCalculatePrThroughput = () => api.get('/dashboardapi/pr.calculate.thorughput');
    const getPrVolume = body => api.get('/dashboardapi/pr.execution.per.year.get/' + body.year);

    // PO STO
    const getCalculateDelayDsp = () => api.get('/dashboardapi/calculate.delay.dsp.for.mobile');
    const getCalculateRealizationDsp = () => api.get('/dashboardapi/calculate.realization.dsp.for.mobile');
    const getCalculateGiPo = () => api.get('/dashboardapi/gi.lo.sto.po.calculate.performance');
    const getCalculateGrPo = () => api.get('/dashboardapi/gr.lo.sto.po.calculate.performance');
    const getCalculatePoPr = () => api.get('/dashboardapi/po.pr.calculate.thorughput');
    const getCalculatePtPo = () => api.get('/dashboardapi/pt.po.calculate.performance');
    const getStoVolume = body => api.get('/dashboardapi/po.execution.per.year.get/' + body.year);

    // Stock
    const getStockMonitor = body => api.get('/dashboardapi/stock.monitor.get.for.mobile/' + body.kimap);
    const getStockDsp = body => api.get('/dashboardapi/stock.by.number.get.for.mobile/' + body.kimap);

    const getMaterial = body => api.get('/dashboardapi/material.get.all/' + body.offset + '/' + body.limit);

    // Docgw
    const getDocgw = body => apiwmsdocgw.post('get.doc.content.all', body)

    // SIGN & VERIFY INBOUND MENU
    const postSignatureInbound = (data) => apiwmstrx.put('command/sign.inbound.delivery', data)
    const verifySignatureInbound = (data) => apiwmstrx.put('command/verify.inbound.delivery', data)
    const postSignatureGr = (data) => apiwmstrx.put('command/sign.mgr', data)
    const verifySignatureGr = (data) => apiwmstrx.put('command/verify.mgr', data)
    const postSignaturePutaway = (data) => apiwmstrx.put('command/sign.material.putaway', data)
    const verifySignaturePutaway = (data) => apiwmstrx.put('command/verify.material.putaway', data)
    const postSignatureLabeling = (data) => apiwmstrx.put('command/sign.material.labelling', data)
    const verifySignatureLabeling = (data) => apiwmstrx.put('command/verify.material.labelling', data)
    const postSignatureStoring = (data) => apiwmstrx.put('command/sign.material.storing', data)
    const verifySignatureStoring = (data) => apiwmstrx.put('command/verify.material.storing', data)

    // SIGN & VERIFY OUTBOUND MENU
    const postSignatureIOutbound = (data) => apiwmstrx.put('command/sign.outbound.delivery', data)
    const verifySignatureOutbound = (data) => apiwmstrx.put('command/verify.outbound.delivery', data)
    const postSignaturePicking = (data) => apiwmstrx.put('command/sign.material.picking', data)
    const verifySignaturePicking = (data) => apiwmstrx.put('command/verify.material.picking', data)
    const postSignaturePacking = (data) => apiwmstrx.put('command/sign.material.packing', data)
    const verifySignaturePacking = (data) => apiwmstrx.put('command/verify.material.packing', data)
    const postSignatureGi = (data) => apiwmstrx.put('command/sign.good.issue', data)
    const verifySignatureGi = (data) => apiwmstrx.put('command/verify.good.issue', data)
    const postSignatureLo = (data) => apiwmstrx.put('command/sign.loading.order', data)
    const verifySignatureLo = (data) => apiwmstrx.put('command/verify.loading.order', data)
    const postSignatureShipping = (data) => apiwmstrx.put('command/sign.shipping', data)
    const verifySignatureShipping = (data) => apiwmstrx.put('command/verify.shipping', data)

    // SIGN & VERIFY INTERNAL PROSES MENU
    const postSignaturePo = (data) => apiwmstrx.put('command/sign.purchase.order', data)
    const verifySignaturePo = (data) => apiwmstrx.put('command/verify.purchase.order', data)
    const postSignaturePt = (data) => apiwmstrx.put('command/sign.pt', data)
    const verifySignaturePt = (data) => apiwmstrx.put('command/verify.pt', data)
    const postSignatureSo = (data) => apiwmstrx.put('command/sign.sales.order', data)
    const verifySignatureSo = (data) => apiwmstrx.put('command/verify.sales.order', data)
    const postSignatureTo = (data) => apiwmstrx.put('command/sign.mto', data)
    const verifySignatureTo = (data) => apiwmstrx.put('command/verify.mto', data)
    const postSignatureQuotation = (data) => apiwmstrx.put('command/sign.quo', data)
    const verifySignatureQuotation = (data) => apiwmstrx.put('command/verify.quo', data)
    const postSignatureClaim = (data) => apiwmstrx.put('command/sign.claim', data)
    const verifySignatureClaim = (data) => apiwmstrx.put('command/verify.claim', data)
    const postSignatureBill = (data) => apiwmstrx.put('command/sign.bl', data)
    const verifySignatureBill = (data) => apiwmstrx.put('command/verify.bl', data)
    const postSignatureFreight = (data) => apiwmstrx.put('command/sign.freight.contract', data)
    const verifySignatureFreight = (data) => apiwmstrx.put('command/verify.freight.contract', data)
    const postSignatureInquiry = (data) => apiwmstrx.put('command/sign.inquiry', data)
    const verifySignatureInquiry = (data) => apiwmstrx.put('command/verify.inquiry', data)
    const postSignaturePoc = (data) => apiwmsmd.put('sign.client.po', data)
    const verifySignaturePoc = (data) => apiwmsmd.put('verify.client.po', data)
    const postSignaturePir = (data) => apiwmsmd.put('sign.pir', data)
    const verifySignaturePir = (data) => apiwmsmd.put('verify.pir', data)
    const postSignatureShippingInst = (data) => apiwmsmd.put('sign.shipping.instruction', data)
    const verifySignatureShippingInst = (data) => apiwmsmd.put('verify.shipping.instruction', data)
    const postSignatureAsn = (data) => apiwmstrxq.put('sign.asn', data)
    const verifySignatureAsn = (data) => apiwmstrxq.put('verify.asn', data)
    const postSignatureInvoice = (data) => apiwmstrxq.put('sign.invoice', data)
    const verifySignatureInvoice = (data) => apiwmstrxq.put('verify.invoice', data)
    const postSignaturePr = (data) => apiwmstrxq.put('sign.pr', data)
    const verifySignaturePr = (data) => apiwmstrxq.put('verify.pr', data)

    // SIGN & VERIFY MATERIAL MENU
    const postSignatureBasePrice = (data) => apiwmsmat.put('sign.material.baseprice', data)
    const verifySignatureBasePrice = (data) => apiwmsmat.put('verify.material.baseprice', data)
    const postSignatureInventory = (data) => apiwmsmat.put('sign.material.inventory', data)
    const verifySignatureInventory = (data) => apiwmsmat.put('verify.material.inventory', data)
    const postSignatureMovement = (data) => apiwmsmat.put('command/sign.material.movement', data)
    const verifySignatureMovement = (data) => apiwmsmat.put('command/verify.material.movement', data)
    const postSignatureReplenishment = (data) => apiwmsmat.put('sign.material.ro', data)
    const verifySignatureReplenishment = (data) => apiwmsmat.put('verify.material.ro', data)
    const postSignatureStockOpname = (data) => apiwmsmat.put('sign.material.stockopname', data)
    const verifySignatureStockOpname = (data) => apiwmsmat.put('verify.material.stockopname', data)
    const postSignatureValuation = (data) => apiwmsmat.put('sign.material.valuation', data)
    const verifySignatureValuation = (data) => apiwmsmat.put('verify.material.valuation', data)
    const postSignatureQuality = (data) => apiwmsmat.put('sign.material.quality', data)
    const verifySignatureQuality = (data) => apiwmsmat.put('verify.material.quality', data)
    const postSignatureReplenishmentPicking = (data) => apiwmsmat.put('sign.material.rp', data)
    const verifySignatureReplenishmentPicking = (data) => apiwmsmat.put('verify.material.rp', data)
    const postSignatureReplenishmentPacking = (data) => apiwmsmat.put('sign.material.rpck', data)
    const verifySignatureReplenishmentPacking = (data) => apiwmsmat.put('verify.material.rpck', data)
    const postSignatureReplenishmentStoring = (data) => apiwmsmat.put('sign.material.rst', data)
    const verifySignatureReplenishmentStoring = (data) => apiwmsmat.put('verify.material.rst', data)

    const getMaterialMasterById = (data, body) => apiwmsmat.post('get.material.by.id/' + data, body, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const getMaterialBasePriceItem = (data) => apiwmsmat.post('get.baseprice.item.by.baseprice.id.and.kimap', data)
    const getMaterialInventoryItem = data => apiwmsmat.post('/get.inventory.item.by.inventory.id.and.kimap', data)
    const getMaterialSOItem = data => apiwmsmat.post('/get.so.item.by.so.id.and.kimap', data)
    const getMaterialSOItemComplete = data => apiwmsmat.post('/get.so.item.by.complete', data)
    const getMaterialQualityItem = data => apiwmsmat.post('/get.quality.item.by.quality.id.and.kimap', data)
    const getMaterialCountSOItem = data => apiwmsmat.get('/get.count.so.item.by.so.id/' + data)
    const getMaterialCountSOItemComplete = data => apiwmsmat.post('/get.count.so.item.by.complete', data)

    const getHumanTaskList = (data) => apiwmsnotif.post('get.advance.humantask.all', data)
    const getHumanTaskListByID = (data) => apiwmsnotif.get('get.advance.humantask.by.id/' + data)
    const getHumanTaskListByType = (data) => apiwmsnotif.post('get.all.advance.humantask.by.type', data)
    const getHumanTaskListByAssignementID = (data) => apiwmsnotif.post('get.advance.humantask.by.type.and.assignmentid.and.status', data)
    const getHumanTaskListByAssignementIDFinish = (data) => apiwmsnotif.post('get.advance.humantask.by.type.and.assignmentid.and.status.done', data)
    const getHumanTaskListByAssignementIDBacklog = (data) => apiwmsnotif.post('get.advance.humantask.by.type.and.assignmentid', data)
    const getCountHumanTaskListByType = (data) => apiwmsnotif.get('get.count.advance.humantask.by.type/' + data)
    const getCountHumanTaskListByUserID = (data) => apiwmsnotif.get('get.count.advance.humantask.by.user.id/' + data)
    const getCountHumanTaskListDone = (data) => apiwmsnotif.get('get.count.task.done/' + data)
    const getCountHumanTaskListOutstanding = (data) => apiwmsnotif.get('get.count.outstanding.by.user.id/' + data)
    const getCountHumanTaskListThroughput = (data) => apiwmsnotif.get('get.count.throughtput.by.user.id/' + data)
    const getCountHumanTaskListByAll = () => apiwmsnotif.get('get.count.all.advance.humantask')
    const getCountHumanTaskListByAssignmentID = (body) => apiwmsnotif.post('get.count.advance.humantask.by.type.and.assignmentid.and.status', body)
    const getHumanTaskListByFcID = (data) => apiwmsnotif.post('get.advance.humantask.by.fc.id.and.type', data)
    const getCountHumanTaskListByFcID = (data) => apiwmsnotif.get('get.count.advance.humantask.by.fc.id.and.type/' + data)
    const updateHumanTaskList = (data) => apiwmsnotif.put('update.advance.humantask', data)

    const getTruckMonitoringByDrvID = (data) => apiwmsnotif.get('get.truck.monitoring.by.driver.id/' + data)
    const getTruckMonitoringByDrvIDDaIDType = (data) => apiwmsnotif.get('get.truck.monitoring.by.driver.and.daID.and.type/' + data)
    const postTruckMonitoring = (data) => apiwmsnotif.post('post.truck.monitoring', data)
    const updateTruckMonitoring = (data) => apiwmsnotif.put('update.truck.monitoring', data)

    // cyclcount
    const updateCycleCountMaterial = (data) => apiwmsmat.put('update.material.stock.opname.item', data)

    const getSapAll = (data) => apiwmstrxq.post('get.sap.activity.posting.all', data)
    const getCountSapAll = () => apiwmstrxq.get('get.count.all.sap')

    const getDashboardKpi = (body) => apiwmselastic.post('getAllOperationKPIValues', body)

    // SAP
    const sapCreateSto = (data) => apiwmssap.post('sap.create.sto', data)
    const sapCreateLoSo = (data) => apiwmssap.post('sap.create.lo.sales', data)
    const sapCreateLoSto = (data) => apiwmssap.post('sap.create.lo.sto', data)
    const sapCreateGiLoSto = (data) => apiwmssap.post('sap.gi.lo.sto', data)
    const sapCreateGrLoSto = (data) => apiwmssap.post('sap.gr.lo.sto', data)

    // FCM
    const postFcm = (data) => apiwmsfcm.post('test.publish', data)

    // UPLOAD MATERIAL
    const postImageMaterialGr = (body) => apiwmstrx.post('api/gr.image.post', body)

    return {
        userAuth,
        postToken,
        getErrorRate,
        getSuccessRate,
        getTotalRate,
        getSapVolume,
        getVehicle,
        getCalculatePrPerformance,
        getCalculatePrThroughput,
        getPrVolume,
        getCalculateDelayDsp,
        getCalculateRealizationDsp,
        getCalculateGiPo,
        getCalculateGrPo,
        getCalculatePoPr,
        getCalculatePtPo,
        getStoVolume,
        getStockMonitor,
        getStockDsp,
        getMaterial,
        socketLogin,
        getDocgw,

        postSignatureInbound,
        verifySignatureInbound,
        postSignatureGr,
        verifySignatureGr,
        postSignaturePutaway,
        verifySignaturePutaway,
        postSignatureStoring,
        verifySignatureStoring,
        postSignatureLabeling,
        verifySignatureLabeling,

        postSignatureIOutbound,
        verifySignatureOutbound,
        postSignaturePicking,
        verifySignaturePicking,
        postSignaturePacking,
        verifySignaturePacking,
        postSignatureGi,
        verifySignatureGi,
        postSignatureLo,
        verifySignatureLo,
        postSignatureShipping,
        verifySignatureShipping,

        postSignaturePo,
        verifySignaturePo,
        postSignaturePt,
        verifySignaturePt,
        postSignatureSo,
        verifySignatureSo,
        postSignatureTo,
        verifySignatureTo,
        postSignatureQuotation,
        verifySignatureQuotation,
        postSignatureClaim,
        verifySignatureClaim,
        postSignatureBill,
        verifySignatureBill,
        postSignatureFreight,
        verifySignatureFreight,
        postSignatureInquiry,
        verifySignatureInquiry,
        postSignaturePoc,
        verifySignaturePoc,
        postSignaturePir,
        verifySignaturePir,
        postSignatureShippingInst,
        verifySignatureShippingInst,
        postSignatureAsn,
        verifySignatureAsn,
        postSignatureInvoice,
        verifySignatureInvoice,
        postSignaturePr,
        verifySignaturePr,

        postSignatureBasePrice,
        verifySignatureBasePrice,
        postSignatureInventory,
        verifySignatureInventory,
        postSignatureMovement,
        verifySignatureMovement,
        postSignatureReplenishment,
        verifySignatureReplenishment,
        postSignatureStockOpname,
        verifySignatureStockOpname,
        postSignatureValuation,
        verifySignatureValuation,
        postSignatureQuality,
        verifySignatureQuality,
        postSignatureReplenishmentPicking,
        verifySignatureReplenishmentPicking,
        postSignatureReplenishmentPacking,
        verifySignatureReplenishmentPacking,
        postSignatureReplenishmentStoring,
        verifySignatureReplenishmentStoring,

        getMaterialMasterById,
        getMaterialBasePriceItem,
        getMaterialInventoryItem,
        getMaterialSOItem,
        getMaterialSOItemComplete,
        getMaterialQualityItem,
        getMaterialCountSOItem,
        getMaterialCountSOItemComplete,

        getHumanTaskList,
        getHumanTaskListByID,
        getHumanTaskListByType,
        getHumanTaskListByAssignementID,
        getHumanTaskListByAssignementIDFinish,
        getHumanTaskListByAssignementIDBacklog,
        getCountHumanTaskListByType,
        getCountHumanTaskListByUserID,
        getCountHumanTaskListByAll,
        getCountHumanTaskListByAssignmentID,

        getSapAll,
        getCountSapAll,

        getDashboardKpi,

        sapCreateSto,
        sapCreateLoSo,
        sapCreateLoSto,
        sapCreateGiLoSto,
        sapCreateGrLoSto,

        postFcm,

        getHumanTaskListByFcID,
        getCountHumanTaskListByFcID,
        updateHumanTaskList,
        getUserByEmpID,
        getTokenDeviceByUserID,

        cacheTrx,

        getCountHumanTaskListDone,
        getCountHumanTaskListOutstanding,
        getCountHumanTaskListThroughput,

        postImageMaterialGr,

        getTruckMonitoringByDrvID,
        getTruckMonitoringByDrvIDDaIDType,
        postTruckMonitoring,
        updateTruckMonitoring,
        updateCycleCountMaterial
    }
}

export default { create }