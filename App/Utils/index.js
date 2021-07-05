import { Dimensions, Platform, PixelRatio, PermissionsAndroid, ToastAndroid } from 'react-native'
import Config from 'react-native-config'
import M from 'moment'
import Api from '../Services/Api'

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');
  
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export async function hasLocationPermission() {
  if (Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)) {
    return true;
  }
  console.log("plat", Platform.OS, Platform.Version)

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (hasPermission) return true;
  
  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

  if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
  }

  return false;
}

export function generateUrlPhoto(data) {
  return Config.API_FMS_BASE_URL + 'idp/download.user.image/' + data + '?id=' + M()
}

export function generateUrlPhotoDriver(data) {
  return Config.API_FMS_BASE_URL + 'masterdata/download.driver.image/' + data
}

export function generateUrlPhotoSim(data) {
  return Config.API_FMS_BASE_URL + 'masterdata/download.driver.sim.image/' + data
}

export function generateUrlPhotoFleet(data) {
  return Config.API_FMS_BASE_URL + 'masterdata/download.fleet.image/' + data
}

export function generateUrlPhotoKir(data) {
  return Config.API_FMS_BASE_URL + 'masterdata/download.fleet.kir.image/' + data
}

export function generateUrlPhotoMaterial(data) {
  return Config.API_FMS_BASE_URL + 'material/download.material.image/' + data
}

export function generateUrlPhotoGR(referenceID, itemID) {
  return Config.API_FMS_BASE_URL + 'trxcmd/api/gr.image.get/' + referenceID + '/' + itemID
}

export function documentType(data) {
  let type = data.split("&DocType=")[1]
  return type
}

export function generateDiferenceMilisecond(firstDate, secondDate) {
  // split dat n time
  let fdDate = firstDate.split(' ')[0]
  let fdTime = firstDate.split(' ')[1] ? firstDate.split(' ')[1].includes("12") ? firstDate.split(' ')[1].replace("12", "00") : firstDate.split(' ')[1] : firstDate.split(' ')[1]
  let fdFormat = firstDate.split(' ')[2] ? firstDate.split(' ')[2] : ''
  let sdDate = secondDate.split(' ')[0]
  let sdTime = secondDate.split(' ')[1] ? secondDate.split(' ')[1].includes("12") ? secondDate.split(' ')[1].replace("12", "00") : secondDate.split(' ')[1] : secondDate.split(' ')[1]
  let sdFormat = secondDate.split(' ')[2] ? secondDate.split(' ')[2] : ''

  // split date
  let newFdDay = fdDate.split('-')[0]
  let newFdMonth = fdDate.split('-')[1]
  let newFdYear = fdDate.split('-')[2]
  let newSdDay = sdDate.split('-')[0]
  let newSdMonth = sdDate.split('-')[1]
  let newSdYear = sdDate.split('-')[2]

  // new date
  let newFdDate = newFdYear+'/'+newFdMonth+'/'+newFdDay+' '+fdTime+' '+fdFormat
  let newSdDate = newSdYear+'/'+newSdMonth+'/'+newSdDay+' '+sdTime+' '+sdFormat

  let date1 = new Date(newFdDate)
  let date2 = new Date(newSdDate)

  let diffInTime = Math.abs(date2.getTime() - date1.getTime())

  return diffInTime
}

export function generateDiferenceTime(firstDate, secondDate) {
  // console.log('firstDate', firstDate)
  // console.log('secondDate', secondDate)

  // split dat n time
  let fdDate = firstDate.split(' ')[0]
  // let fdTime = firstDate.split(' ')[1]
  let fdTime = firstDate.split(' ')[1] ? firstDate.split(' ')[1].includes("12") ? firstDate.split(' ')[1].replace("12", "00") : firstDate.split(' ')[1] : firstDate.split(' ')[1]
  let sdDate = secondDate.split(' ')[0]
  // let sdTime = secondDate.split(' ')[1]
  let sdTime = secondDate.split(' ')[1] ? secondDate.split(' ')[1].includes("12") ? secondDate.split(' ')[1].replace("12", "00") : secondDate.split(' ')[1] : secondDate.split(' ')[1]

  // split date
  let newFdDay = fdDate.split('-')[0]
  let newFdMonth = fdDate.split('-')[1]
  let newFdYear = fdDate.split('-')[2]
  let newSdDay = sdDate.split('-')[0]
  let newSdMonth = sdDate.split('-')[1]
  let newSdYear = sdDate.split('-')[2]

  // new date
  let newFdDate = newFdYear+'/'+newFdMonth+'/'+newFdDay+' '+fdTime
  let newSdDate = newSdYear+'/'+newSdMonth+'/'+newSdDay+' '+sdTime

  let date1 = new Date(newFdDate)
  let date2 = new Date(newSdDate)

  let diffInTime = Math.abs(date2.getTime() - date1.getTime())
  let diffInMilliSeconds = diffInTime / 1000

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400)
  diffInMilliSeconds -= days * 86400
  // console.log('calculated days', days)

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24
  diffInMilliSeconds -= hours * 3600
  // console.log('calculated hours', hours)

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60
  diffInMilliSeconds -= minutes * 60
  // console.log('minutes', minutes)

  // calculate seconds
  const seconds = diffInMilliSeconds
  // console.log('seconds', seconds)

  // let difference = ''
  let calculated = ''
  let newHours = 0
  if (days > 0) {
    // difference += (days === 1) ? `${days} day, ` : `${days} days, `
    newHours += (days * 24)
  }

  // difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `

  // difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes, `

  // difference += (seconds === 0 || minutes === 1) ? `${seconds} second` : `${seconds} seconds`
  let newCalHours = (hours + newHours)
  calculated += `${newCalHours > 0 ? newCalHours < newCalHours ? '0' + newCalHours : newCalHours : '00'} : `
  calculated += `${minutes > 0 ? minutes < 10 ? '0' + minutes : minutes : '00'} : `
  calculated += `${seconds > 0 ? seconds < 10 ? '0' + seconds : seconds : '00'}`

  // console.log('difference', difference)
  // console.log('calculated', calculated)

  return calculated
}

export async function updateTrucks (fcID, params, type, auth = []) {
  let statusResponse = false
  let roleType = ''
  let isUpdate = false
  switch (type) {
      case 'GI':
          roleType = 'DOCK'
          isUpdate = true
          break
      case 'GR':
          roleType = 'DOCK'
          isUpdate = true
          break
      case 'YND':
          roleType = 'YARD'
          isUpdate = true
          break
      case 'GATE':
          roleType = 'GATE_IN'
          break
      default:
          roleType = ''
          break
  }

  let freightContractID = fcID
  let plantName = auth && auth.user.data.esCommonDTO.plant.plantName
  let count = await Api.create().getCountHumanTaskListByFcID(freightContractID + "/DRIVER_ASSIGNMENT")
  let payloadFc = { limit: count.data.data, offset: 0, params: { freightContractID, humanTaskType: "DRIVER_ASSIGNMENT" } }
  let results = await Api.create().getHumanTaskListByFcID(payloadFc)
  if (results.data && results.data.status === "S") {
      results.data.data && results.data.data.map(async item => {
          let dataPayload = JSON.parse(item.payload)
          let driverID = dataPayload.driver_info.id
          let daID = item.humanTaskID
          let fleetID = dataPayload.fleet_info.id
          let typeDelivery = params.rowData.item.doc_info.source === "INBOUND DELIVERY" ? "INBOUND_DELIVERY" : "OUTBOUND_DELIVERY"
          if (!isUpdate) {
              let payloadTruck = {
                  "arriveTime": M().format("DD-MM-YYYY HH:mm:ss"),
                  "dock": { "name": "", "timeIn": "", "timeOut": "" },
                  driverID, fleetID, daID,
                  "fcID": freightContractID,
                  "gateIn": {
                      "name": plantName,
                      "time": M().format("DD-MM-YYYY HH:mm:ss")
                  },
                  "es": params.rowData.item.user_assignment_es,
                  "taskID": params.rowData.item.humanTaskID,
                  "gateOut": { "name": "", "time": "" },
                  "loading": { "name": "", "timeIn": "", "timeOut": "" },
                  "location": roleType,
                  "locationName": plantName,
                  "tmCreational": {
                      "createdBy": "SYSTEM",
                      "createdDate": M().format("DD-MM-YYYY HH:mm:ss"),
                      "modifiedBy": "",
                      "modifiedDate": ""
                  },
                  "truckMonitoringID": M().format("x"),
                  "type": typeDelivery,
                  "yard": { "name": "", "timeIn": "", "timeOut": "" }

              }
              let postTruck = isUpdate ? await Api.create().updateTruckMonitoring(payloadTruck) : await Api.create().postTruckMonitoring(payloadTruck)
              console.log("postTruck", postTruck)
              if (postTruck.data && postTruck.data.status === "S") {
                statusResponse = true
              } else {
                statusResponse = false
              }
          } else {
              let truck = await Api.create().getTruckMonitoringByDrvIDDaIDType(driverID + "/" + daID + "/" + typeDelivery)
              console.log('driverID', driverID)
              console.log('truck.data', truck)
              if (truck.data && truck.data.status === "S") {
                  let payloadTruckUpdate = truck.data && truck.data.data
                  if (payloadTruckUpdate) {
                      payloadTruckUpdate = {
                          ...payloadTruckUpdate,
                          "es": {
                              "clientID": payloadTruckUpdate && payloadTruckUpdate.es && payloadTruckUpdate.es.client && payloadTruckUpdate.es.client.clientID ? payloadTruckUpdate.es.client.clientID : "",
                              "companyID": payloadTruckUpdate && payloadTruckUpdate.es && payloadTruckUpdate.es.company && payloadTruckUpdate.es.company.compID ? payloadTruckUpdate.es.company.compID : "",
                              "plantID": payloadTruckUpdate && payloadTruckUpdate.es && payloadTruckUpdate.es.plant && payloadTruckUpdate.es.plant.plantID ? payloadTruckUpdate.es.plant.plantID : "",
                              "slocID": payloadTruckUpdate && payloadTruckUpdate.es && payloadTruckUpdate.es.sloc && payloadTruckUpdate.es.sloc.slocID ? payloadTruckUpdate.es.sloc.slocID : "",
                              "whID": payloadTruckUpdate && payloadTruckUpdate.es && payloadTruckUpdate.es.warehouse && payloadTruckUpdate.es.warehouse.whID ? payloadTruckUpdate.es.warehouse.whID : "",
                          },
                          "taskID": params.rowData.item.humanTaskID,
                          "location": roleType,
                          "driverID": payloadTruckUpdate && payloadTruckUpdate.driverID.drvID,
                          "fleetID": payloadTruckUpdate && payloadTruckUpdate.fleetID.flID,
                          "locationName": plantName,
                          "arriveTime": M().format("DD-MM-YYYY HH:mm:ss"),
                          "tmCreational": { ...payloadTruckUpdate.tmCreational, modifiedBy: "SYSTEM", modifiedDate: M().format("DD-MM-YYYY HH:mm:ss") }
                      }
                      switch (type) {
                          case 'GI':
                              payloadTruckUpdate = {
                                  ...payloadTruckUpdate,
                                  "dock": {
                                      "name": params.rowData.item.ynd_info.dock,
                                      "timeIn": M().format("DD-MM-YYYY HH:mm:ss"),
                                      "timeOut": M().format("DD-MM-YYYY HH:mm:ss")
                                  }
                              }
                              break
                          case 'GR':
                              payloadTruckUpdate = {
                                  ...payloadTruckUpdate,
                                  "dock": {
                                      "name": params.rowData.item.ynd_info.dock,
                                      "timeIn": M().format("DD-MM-YYYY HH:mm:ss"),
                                      "timeOut": M().format("DD-MM-YYYY HH:mm:ss")
                                  }
                              }
                              break
                          case 'YND':
                              payloadTruckUpdate = {
                                  ...payloadTruckUpdate,
                                  "yard": {
                                      "name": params.rowData.item.ynd_info.yard,
                                      "timeIn": M().format("DD-MM-YYYY HH:mm:ss"),
                                      "timeOut": M().format("DD-MM-YYYY HH:mm:ss")
                                  }
                              }
                              break
                          default:
                              payloadTruckUpdate = { ...payloadTruckUpdate }
                              break
                      }

                      console.log("payloadTruckUpdate", payloadTruckUpdate)
                      let updateTruck = await Api.create().updateTruckMonitoring(payloadTruckUpdate)
                      console.log("updateTruck", JSON.stringify(updateTruck))
                      if (updateTruck.data && updateTruck.data.status === "S") {
                        statusResponse = true
                      } else {
                        statusResponse = false
                      }
                  } else {
                    statusResponse = false
                  }
              } else {
                statusResponse = false
              }
          }
      })
  } else {
    statusResponse = false
  }

  console.log('updateTrucks', statusResponse)
}