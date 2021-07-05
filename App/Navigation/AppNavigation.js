import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { Image, View, Text, Button, Alert, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers';
import SplashScreen from '../Screen/SplashScreen';
import LoginScreen from "../Screen/LoginScreen";
import ValidatorScreen from "../Screen/ValidatorScreen";
// import HomeScreen from '../screen/HomeScreen';
// import ProfileScreen from '../screen/ProfileScreen';
// import HorizontalBarChartScreen from '../screen/Other/HorizontalBarChartScreen';
// import PoStoScreen from '../screen/PoStoScreen';
// import PoStoPerDspScreen from '../screen/POSTO/PoStoPerDspScreen';
// import BarChartScreen from '../screen/Other/BarChartScreen';
// import ZeroLineChartScreen from '../screen/Other/ZeroLineChartScreen';
// import StackedBarChartScreen from '../screen/Other/StackedBarChartScreen';
// import GroupBarChartScreen from '../screen/Other/GroupBarChartScreen';
// import LineChartScreen from '../screen/Other/LineChartScreen';
// import CombinedChartScreen from '../screen/Other/CombinedChartScreen';
// import RadarChartScreen from '../screen/Other/RadarChartScreen';
// import PoPrChartScreen from '../screen/Operation/PoPrChartScreen';
// import PoPrPerformanceScreen from '../screen/Operation/PoPrPerformanceScreen';
// import PoPrThroughputPerDspScreen from '../screen/PR/PoPrThroughputPerDspScreen';
// import PtPoChartScreen from '../screen/Operation/PtPoChartScreen';
// import GiPoChartScreen from '../screen/Operation/GiPoChartScreen';
// import GiPoPerDspScreen from '../screen/POSTO/GiPoPerDspScreen';
// import GrPoChartScreen from '../screen/Operation/GrPoChartScreen';
// import GrPoPerDspScreen from '../screen/POSTO/GrPoPerDspScreen';
// import GrPrThroughputPerDspScreen from '../screen/PR/GrPrThroughputPerDspScreen';
// import RealizationPerDSPScreen from '../screen/Operation/RealizationPerDSPScreen';
// import DelayPerDSPScreen from '../screen/Operation/DelayPerDSPScreen';
// import PrThroughputChartScreen from '../screen/PR/PrThroughputChartScreen';
// import PrThroughputPerDspScreen from '../screen/PR/PrThroughputPerDspScreen';
// import PrPerformanceChartScreen from '../screen/PR/PrPerformanceChartScreen';
// import PrVolumeChartScreen from '../screen/PR/PrVolumeChartScreen';
// import PrVolumePerDspScreen from '../screen/PR/PrVolumePerDspScreen';
// import StoVolumeChartScreen from '../screen/Operation/StoVolumeChartScreen';
// import StoPerDspVolumeScreen from '../screen/POSTO/StoPerDspVolumeScreen';
// import SapInterfacingScreen from '../screen/SapInterfacingScreen';
// import SapVolumeChartScreen from '../screen/SAP/SapVolumeChartScreen';
// import SuccessRateScreen from '../screen/SAP/SuccessRateScreen';
// import ErrorRateScreen from '../screen/SAP/ErrorRateScreen';
// import TotalCommandScreen from '../screen/SAP/TotalCommandScreen';
// import StockScreen from '../screen/KPI/StockScreen';
// import StockMapScreen from '../screen/KPI/StockMapScreen';
// import StockChartScreen from '../screen/KPI/StockChartScreen';
// import StockPerDspChartScreen from '../screen/Stock/StockPerDspChartScreen';
// import StockMonitorScreen from '../screen/Stock/StockMonitorScreen';
// import StockListMaterialScreen from '../screen/Stock/StockListMaterialScreen';
// import PurchaseRequisitionScreen from '../screen/PurchaseRequisitionScreen';
// import PurchaseRequisitionPerDspScreen from '../screen/PR/PurchaseRequisitionPerDspScreen';
// import FleetGpsScreen from '../screen/Fleet/FleetGpsScreen';
// import KpiScreen from '../screen/KpiScreen';
// import OperationScreen from '../screen/KPI/OperationScreen';
// import OperationSalesScreen from '../screen/KPI/OperationSalesScreen';
// import SoScreen from '../screen/SoScreen';
// import SoPerDspScreen from '../screen/SO/SoPerDspScreen';
// import DelayPoPerformanceScreen from '../screen/Operation/DelayPoPerformanceScreen';
// import DelayPoPerDspScreen from '../screen/POSTO/DelayPoPerDspScreen';
// import GiGrPerformanceScreen from '../screen/Operation/GiGrPerformanceScreen';
// import GiGrPerDspScreen from '../screen/POSTO/GiGrPerDspScreen';
// import GiLoPerformanceScreen from '../screen/Operation/GiLoPerformanceScreen';
// import GiLoSoPerformanceScreen from '../screen/OperationSales/GiLoSoPerformanceScreen';
// import GiLoSoPerDspScreen from '../screen/SO/GiLoSoPerDspScreen';
// import GiLoPerDspScreen from '../screen/POSTO/GiLoPerDspScreen';
// import GrPrThroughputScreen from '../screen/Operation/GrPrThroughputScreen';
// import LoPoPerformanceScreen from '../screen/Operation/LoPoPerformanceScreen';
// import LoPoPerDspScreen from '../screen/POSTO/LoPoPerDspScreen';
// import PdtPoPerformanceScreen from '../screen/Operation/PdtPoPerformanceScreen';
// import PdtPoPerDspScreen from '../screen/POSTO/PdtPoPerDspScreen';
// import LoSoPerformanceScreen from '../screen/OperationSales/LoSoPerformanceScreen';
// import LoSoPerDspScreen from '../screen/SO/LoSoPerDspScreen';
// import GiSoPerformanceScreen from '../screen/OperationSales/GiSoPerformanceScreen';
// import GiSoPerDspScreen from '../screen/SO/GiSoPerDspScreen';
// import LoDelaySoPerformanceScreen from '../screen/OperationSales/LoDelaySoPerformanceScreen';
// import LoDelaySoPerDspScreen from '../screen/SO/LoDelaySoPerDspScreen';
// import LoOntimeSoPerformanceScreen from '../screen/OperationSales/LoOntimeSoPerformanceScreen';
// import LoOntimeSoPerDspScreen from '../screen/SO/LoOntimeSoPerDspScreen';
// import SoSalesVolumeScreen from '../screen/OperationSales/SoSalesVolumeScreen';
// import SoSalesPerDspVolumeScreen from '../screen/SO/SoSalesPerDspVolumeScreen';
// import PdtScreen from '../screen/POSTO/PdtScreen';
// import PerfectOrderRateScreen from '../screen/POSTO/PerfectOrderRateScreen';
// import NoteGoodRateScreen from '../screen/POSTO/NoteGoodRateScreen';
// import FifoScreen from '../screen/POSTO/FifoScreen';
// import StockAccuracyScreen from '../screen/POSTO/StockAccuracyScreen';
import DashboardScreen from '../Screen/DashboardScreen';
import TicketDetailScreen from '../Screen/TicketDetailScreen';
import DocumentInbound from '../Screen/Modules/DocumentInbound';
import DocumentInternalProcess from '../Screen/Modules/DocumentInternalProcess';
import DocumentOutbound from '../Screen/Modules/DocumentOutbound';
import DocumentMaterial from '../Screen/Modules/DocumentMaterial';
// import QrListScreen from '../screen/QrListScreen';
import QrScanner from '../Screen/QrScanner';
// import QrValidScreen from '../screen/QrValidScreen';
import AnalyticScreen from '../Screen/AnalyticScreen';
import AnalyticListScreen from '../Screen/AnalyticListScreen';
import StreamScreen from '../Screen/StreamScreen';
import MainScreen from '../Screen/MainScreen';
import PickingScreen from '../Screen/PickingScreen';
import PackingScreen from '../Screen/PackingScreen';
import PutawayScreen from '../Screen/PutawayScreen';
import LabelingScreen from '../Screen/LabelingScreen';
import StoringScreen from '../Screen/StoringScreen';
import TransferOrderScreen from '../Screen/TransferOrderScreen';
import GateScreen from '../Screen/GateScreen';
import GateScannerScreen from '../Screen/GateScannerScreen';
import DriverScreen from '../Screen/DriverScreen';
import GoodReceiptScreen from '../Screen/GoodReceiptScreen';
import GoodIssueScreen from '../Screen/GoodIssueScreen';
import MovementScreen from '../Screen/MovementScreen';
import CycleCountScreen from '../Screen/CycleCountScreen';
import ReplenishmentScreen from '../Screen/ReplenishmentScreen';
import YNDScreen from '../Screen/YNDScreen';
// import RoleAccess from '../screen/RoleAccess';
// import RoleFilter from '../screen/RoleFilter';
// import TicketFilter from '../screen/TicketFilter';
import SalesProductMainScreen from '../Screen/SalesProduct/MainScreen';
import SalesProductCategoryScreen from '../Screen/SalesProduct/CategoryScreen';
import SalesProductDetailScreen from '../Screen/SalesProduct/DetailScreen';
import TraccarMapScreen from '../Screen/Traccar/TraccarMapScreen';
import TraccarConfigScreen from '../Screen/Traccar/TraccarConfigScreen';
import TraccarStatusScreen from '../Screen/Traccar/TraccarStatusScreen';
import GoodReceiptCheck from '../Screen/Modules/CardGoodReceiptCheck';
import CardMaterialDetail from '../Screen/Components/CardMaterialDetail';
import ProfileScreen from '../Screen/ProfileScreen'
   
export const PrimaryNav = createStackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    LoginScreen: { 
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }    
    },
    ValidatorScreen: {
        screen: ValidatorScreen,
        navigationOptions: {
            headerShown: false,
            animationEnabled: false,
        }
    },
    TraccarMapScreen: { 
        screen: TraccarMapScreen,
        navigationOptions: {
            headerShown: false
        }    
    },
    TraccarConfigScreen: { 
        screen: TraccarConfigScreen,
        navigationOptions: {
            headerShown: false
        }    
    },
    TraccarStatusScreen: { 
        screen: TraccarStatusScreen,
        navigationOptions: {
            headerShown: false
        }    
    },
    // HomeScreen: { 
    //     screen: HomeScreen,
    //     navigationOptions: {
    //         header: null
    //     }  
    // },
    // ProfileScreen: { 
    //     screen: ProfileScreen,
    //     navigationOptions: {
    //         title: 'User Profile',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     } 
    // },
    // PurchaseRequisitionScreen: { 
    //     screen: PurchaseRequisitionScreen,
    //     navigationOptions: { 
    //         title: 'Purchase Requisition',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }
    // },
    // PoStoScreen: { 
    //     screen: PoStoScreen,
    //     navigationOptions: { 
    //         title: 'PO STO',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }
    // },
    // PoStoPerDspScreen: { 
    //     screen: PoStoPerDspScreen,
    //     navigationOptions: { 
    //         header: null
    //     }
    // },
    // PoPrChartScreen: { 
    //     screen: PoPrChartScreen, 
    //     navigationOptions: { 
    //         title: 'PO-PR Throughput',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PoPrPerformanceScreen: { 
    //     screen: PoPrPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'PO-PR Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PoPrThroughputPerDspScreen: { 
    //     screen: PoPrThroughputPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'PO-PR Throughput',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PtPoChartScreen: { 
    //     screen: PtPoChartScreen, 
    //     navigationOptions: { 
    //         title: 'PT-PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GiPoChartScreen: { 
    //     screen: GiPoChartScreen, 
    //     navigationOptions: { 
    //         title: 'GI-PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GiPoPerDspScreen: { 
    //     screen: GiPoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'GI-PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GrPoChartScreen: { 
    //     screen: GrPoChartScreen, 
    //     navigationOptions: { 
    //         title: 'GR-PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GrPoPerDspScreen: { 
    //     screen: GrPoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'GR-PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GrPrThroughputPerDspScreen: { 
    //     screen: GrPrThroughputPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'GR-PR Throughput',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // RealizationPerDSPScreen: { 
    //     screen: RealizationPerDSPScreen, 
    //     navigationOptions: { 
    //         title: 'Realization Per DSP',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // DelayPerDSPScreen: { 
    //     screen: DelayPerDSPScreen, 
    //     navigationOptions: { 
    //         title: 'Delay Per DSP',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PrThroughputChartScreen: { 
    //     screen: PrThroughputChartScreen, 
    //     navigationOptions: { 
    //         title: 'PR Throughput',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PrThroughputPerDspScreen: { 
    //     screen: PrThroughputPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'PR Throughput',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PrPerformanceChartScreen: { 
    //     screen: PrPerformanceChartScreen, 
    //     navigationOptions: { 
    //         title: 'PR Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PurchaseRequisitionPerDspScreen: { 
    //     screen: PurchaseRequisitionPerDspScreen, 
    //     navigationOptions: { 
    //        header: null
    //     }, 
    // },
    // PrVolumeChartScreen: { 
    //     screen: PrVolumeChartScreen, 
    //     navigationOptions: { 
    //         title: 'PR Execution by Volume',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PrVolumePerDspScreen: { 
    //     screen: PrVolumePerDspScreen, 
    //     navigationOptions: { 
    //         title: 'PR Execution by Volume',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // StoVolumeChartScreen: { 
    //     screen: StoVolumeChartScreen, 
    //     navigationOptions: { 
    //         title: 'STO Execution by Volume',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // StoPerDspVolumeScreen: { 
    //     screen: StoPerDspVolumeScreen, 
    //     navigationOptions: { 
    //         title: 'STO Execution by Volume',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // SapInterfacingScreen: { 
    //     screen: SapInterfacingScreen, 
    //     navigationOptions: { 
    //         title: 'SAP Interface',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // SuccessRateScreen: { 
    //     screen: SuccessRateScreen, 
    //     navigationOptions: { 
    //         title: 'Success Rate',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // ErrorRateScreen: { 
    //     screen: ErrorRateScreen, 
    //     navigationOptions: { 
    //         title: 'Error Rate',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // TotalCommandScreen: { 
    //     screen: TotalCommandScreen, 
    //     navigationOptions: { 
    //         title: 'Total Command',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // SapVolumeChartScreen: { 
    //     screen: SapVolumeChartScreen, 
    //     navigationOptions: { 
    //         title: 'SAP Execution per Volume',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // StockScreen: { 
    //     screen: StockScreen, 
    //     navigationOptions: { 
    //         title: 'KPI Stock',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // StockMapScreen: { 
    //     screen: StockMapScreen, 
    //     navigationOptions: { 
    //         title: 'KPI Stock List',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // StockChartScreen: { 
    //     screen: StockChartScreen, 
    //     navigationOptions: { 
    //         title: 'KPI Stock List',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // StockPerDspChartScreen: { 
    //     screen: StockPerDspChartScreen, 
    //     navigationOptions: { 
    //         title: 'KPI Stock',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // StockMonitorScreen: { 
    //     screen: StockMonitorScreen, 
    //     navigationOptions: { 
    //         title: 'Stock Monitor',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // StockListMaterialScreen: { 
    //     screen: StockListMaterialScreen, 
    //     navigationOptions: { 
    //         title: 'KPI Stock',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // FleetGpsScreen: { 
    //     screen: FleetGpsScreen, 
    //     navigationOptions: { 
    //         title: 'Fleet GPS',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // KpiScreen: { 
    //     screen: KpiScreen, 
    //     navigationOptions: { 
    //         title: 'KPI',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // OperationScreen: { 
    //     screen: OperationScreen, 
    //     navigationOptions: { 
    //         title: 'KPI Operation',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // OperationSalesScreen: { 
    //     screen: OperationSalesScreen, 
    //     navigationOptions: { 
    //         title: 'KPI Operation Sales',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // SoScreen: { 
    //     screen: SoScreen, 
    //     navigationOptions: { 
    //         title: 'SO',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // SoPerDspScreen: { 
    //     screen: SoPerDspScreen, 
    //     navigationOptions: { 
    //         header: null
    //     }, 
    // },
    // DelayPoPerformanceScreen: { 
    //     screen: DelayPoPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'Delay PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // DelayPoPerDspScreen: { 
    //     screen: DelayPoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'Delay PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GiGrPerformanceScreen: { 
    //     screen: GiGrPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'GR-GI Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GiGrPerDspScreen: { 
    //     screen: GiGrPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'GR-GI Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GiLoPerformanceScreen: { 
    //     screen: GiLoPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'GI-LO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GiLoSoPerformanceScreen: { 
    //     screen: GiLoSoPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'GI-LO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GiLoSoPerDspScreen: { 
    //     screen: GiLoSoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'GI-LO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GiLoPerDspScreen: { 
    //     screen: GiLoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'GI-LO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GrPrThroughputScreen: { 
    //     screen: GrPrThroughputScreen, 
    //     navigationOptions: { 
    //         title: 'GR-PR Throughput',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // LoPoPerformanceScreen: { 
    //     screen: LoPoPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'LO-PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // LoPoPerDspScreen: { 
    //     screen: LoPoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'LO-PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PdtPoPerformanceScreen: { 
    //     screen: PdtPoPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'PDT-PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PdtPoPerDspScreen: { 
    //     screen: PdtPoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'PDT-PO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // LoSoPerformanceScreen: { 
    //     screen: LoSoPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'LO-SO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // LoSoPerDspScreen: { 
    //     screen: LoSoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'LO-SO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GiSoPerformanceScreen: { 
    //     screen: GiSoPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'GI-SO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // GiSoPerDspScreen: { 
    //     screen: GiSoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'GI-SO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // LoDelaySoPerformanceScreen: { 
    //     screen: LoDelaySoPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'LO Delay-SO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // LoDelaySoPerDspScreen: { 
    //     screen: LoDelaySoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'LO Delay-SO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // LoOntimeSoPerformanceScreen: { 
    //     screen: LoOntimeSoPerformanceScreen, 
    //     navigationOptions: { 
    //         title: 'LO Ontime-SO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // LoOntimeSoPerDspScreen: { 
    //     screen: LoOntimeSoPerDspScreen, 
    //     navigationOptions: { 
    //         title: 'LO Ontime-SO Performance',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // SoSalesVolumeScreen: { 
    //     screen: SoSalesVolumeScreen, 
    //     navigationOptions: { 
    //         title: 'SO Sales Execution by Volume',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // SoSalesPerDspVolumeScreen: { 
    //     screen: SoSalesPerDspVolumeScreen, 
    //     navigationOptions: { 
    //         title: 'SO Sales Execution by Volume',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PdtScreen: { 
    //     screen: PdtScreen, 
    //     navigationOptions: { 
    //         title: 'PDT',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // PerfectOrderRateScreen: { 
    //     screen: PerfectOrderRateScreen, 
    //     navigationOptions: { 
    //         title: 'Perfect Order Rate',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // NoteGoodRateScreen: { 
    //     screen: NoteGoodRateScreen, 
    //     navigationOptions: { 
    //         title: 'Note Good Rate',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // FifoScreen: { 
    //     screen: FifoScreen, 
    //     navigationOptions: { 
    //         title: 'FIFO',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // StockAccuracyScreen: { 
    //     screen: StockAccuracyScreen, 
    //     navigationOptions: { 
    //         title: 'Stock Accuracy',  
    //         headerTintColor: '#000000',
    //         headerStyle: {
    //             backgroundColor: '#ffffff',
    //         }
    //     }, 
    // },
    // HorizontalBarChartScreen: { screen: HorizontalBarChartScreen },
    // BarChartScreen: { screen: BarChartScreen },
    // ZeroLineChartScreen: { screen: ZeroLineChartScreen },
    // StackedBarChartScreen: { screen: StackedBarChartScreen },
    // GroupBarChartScreen: { screen: GroupBarChartScreen },
    // LineChartScreen: { screen: LineChartScreen },
    // CombinedChartScreen: { screen: CombinedChartScreen },
    // RadarChartScreen: { screen: RadarChartScreen },
    DashboardScreen: { 
        screen: DashboardScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    TicketDetailScreen: { 
        screen: TicketDetailScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    DocumentInbound: { 
        screen: DocumentInbound,
        navigationOptions: {
            headerShown: false
        }
    },
    DocumentInternalProcess: { 
        screen: DocumentInternalProcess,
        navigationOptions: {
            headerShown: false
        }
    },
    DocumentOutbound: { 
        screen: DocumentOutbound,
        navigationOptions: {
            headerShown: false
        }
    },
    DocumentMaterial: {
        screen: DocumentMaterial,
        navigationOptions: {
            headerShown: false
        }
    },
    // QrListScreen: { 
    //     screen: QrListScreen,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    QrScanner: { 
        screen: QrScanner,
        navigationOptions: {
            headerShown: false,
            animationEnabled: false,
        }
    },
    // QrValidScreen: { 
    //     screen: QrValidScreen,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    AnalyticScreen: { 
        screen: AnalyticScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    AnalyticListScreen: {
        screen: AnalyticListScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    StreamScreen: { 
        screen: StreamScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    MainScreen: { 
        screen: MainScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    PickingScreen: { 
        screen: PickingScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    PackingScreen: {
        screen: PackingScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    PutawayScreen: {
        screen: PutawayScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    LabelingScreen: {
        screen: LabelingScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    GateScannerScreen: {
        screen: GateScannerScreen,
        navigationOptions: {
            headerShown: false,
            animationEnabled: false,
        }
    },
    GateScreen: {
        screen: GateScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    DriverScreen: {
        screen: DriverScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    StoringScreen: {
        screen: StoringScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    TransferOrderScreen: {
        screen: TransferOrderScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    GoodReceiptScreen: {
        screen: GoodReceiptScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    YNDScreen: {
        screen: YNDScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    GoodReceiptCheck: {
        screen: GoodReceiptCheck,
        navigationOptions: {
            headerShown: false
        }
    },
    GoodIssueScreen: {
        screen: GoodIssueScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    MovementScreen: {
        screen: MovementScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    CycleCountScreen: {
        screen: CycleCountScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    ReplenishmentScreen: {
        screen: ReplenishmentScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    CardMaterialDetail: {
        screen: CardMaterialDetail,
        navigationOptions: {
            headerShown: false
        }
    },
    // RoleAccess: { 
    //     screen: RoleAccess,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // RoleFilter: { 
    //     screen: RoleFilter,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // TicketFilter: { 
    //     screen: TicketFilter,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    SalesProductMainScreen: { 
        screen: SalesProductMainScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    SalesProductCategoryScreen: {
        screen: SalesProductCategoryScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    SalesProductDetailScreen: {
        screen: SalesProductDetailScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
            headerShown: false
        }
    }
},{
    initialRouteName: 'SplashScreen',
  })

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(state => state.nav);
const AppNavigator = createReduxContainer(PrimaryNav, 'root');
export default AppNavigator;