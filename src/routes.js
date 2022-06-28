import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import LineProductPage from './Pages/LineProductPage/LineProductPage'
import LineProductActionPage from "./Pages/LineProductActionPage/LineProductActionPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import ProductActionPage from "./Pages/ProductPage/ProductActionPage";
import OrderUserPage from "./Pages/OrderUserPage/OrderUserPage";
import InvoiceActionPage from "./Pages/InvoicePage/InvoiceActionPage";
import InvoicePage from "./Pages/InvoicePage/InvoicePage";
import OrderSupplyPage from "./Pages/OrderSupplyPage/OrderSupplyPage"
import OrderSupplyActionPage from "./Pages/OrderSupplyPage/OrderSupplyActionPage";
import ReceiptActionPage from "./Pages/ReceiptPage/ReceiptActionPage";
import ReceiptPage from "./Pages/ReceiptPage/ReceiptPage";
import EmployeePage from "./Pages/EmployeePage/EmployeePage";
import EmployeeActionPage from "./Pages/EmployeePage/EmployeeActionPage";
import PromotionPage from './Pages/PromotionPage/PromotionPage'
import PromotionActionPage from "./Pages/PromotionPage/PromotionActionPage";
import BrandPage from './Pages/BrandPage/BrandPage'
import BrandActionPage from "./Pages/BrandPage/BrandActionPage";
import ShippingCompanyPage from './Pages/ShippingCompanyPage/ShippingCompanyPage'
import ShippingCompanyActionPage from "./Pages/ShippingCompanyPage/ShippingCompanyActionPage";
import ShipperPage from './Pages/ShipperPage/ShipperPage'
import ShipperActionPage from "./Pages/ShipperPage/ShipperActionPage";
import UserPage from './Pages/UserPage/UserPage'
import UserActionPage from "./Pages/UserPage/UserActionPage";
import OrderUserActionPage from "./Pages/OrderUserPage/OrderUserActionPage";
import Revenue from './Pages/Statistic/Revenue/Revenue'
import Profit from './Pages/Statistic/Profit/Profit'


const routes = [
    {
        path: '/',
        exact: true,
        main: ({ history }) => <LineProductPage history={history} />
    },
    {
        path: '/addlineproduct',
        exact: true,
        main: ({ history }) => <LineProductActionPage history={history} />
    },
    {
        path: '/editlineproduct/:id',
        exact: false,
        main: ({ match, history }) => <LineProductActionPage match={match} history={history} />
    },
    {
        path: '/employee',
        exact: true,
        main: ({ history }) => <EmployeePage history={history} />
    },
    {
        path: '/addEmployee',
        exact: true,
        main: ({ history, match }) => <EmployeeActionPage match={match} history={history} />
    },
    {
        path: '/editEmployee/:id',
        exact: false,
        main: ({ match, history }) => <EmployeeActionPage match={match} history={history} />
    },
    {
        path: '/product',
        exact: true,
        main: ({ history }) => <ProductPage history={history} />
    },
    {
        path: '/addproduct',
        exact: true,
        main: ({ history }) => <ProductActionPage history={history} />
    },
    {
        path: '/editproduct/:id',
        exact: false,
        main: ({ match, history }) => <ProductActionPage match={match} history={history} />
    },
    {
        path: '/promotion',
        exact: true,
        main: ({ history }) => <PromotionPage history={history} />
    },
    {
        path: '/addPromotion',
        exact: true,
        main: ({ history }) => <PromotionActionPage history={history} />
    },
    {
        path: '/editPromotion/:id',
        exact: false,
        main: ({ match, history }) => <PromotionActionPage match={match} history={history} />
    },
    {
        path: '/orderSupply',
        exact: true,
        main: ({ history }) => <OrderSupplyPage history={history} />

    },
    {
        path: '/addOrderSupply',
        exact: true,
        main: ({ history }) => <OrderSupplyActionPage history={history} />

    },
    {
        path: '/editOrderSupply/:id',
        exact: false,
        main: ({ history, match }) => <OrderSupplyActionPage match={match} history={history} />

    },
    {
        path: '/invoice',
        exact: true,
        main: ({ history }) => <InvoicePage history={history} />

    },
    {
        path: '/addinvoice/:id',
        exact: false,
        main: ({ match, history }) => <InvoiceActionPage match={match} history={history} />
    },
    {
        path: '/receipt',
        exact: true,
        main: ({ history }) => <ReceiptPage history={history} />
    },
    {
        path: '/addReceipt/:id',
        exact: false,
        main: ({ match, history }) => <ReceiptActionPage match={match} history={history} />
    },
    {
        path: '/order',
        exact: true,
        main: ({ history }) => <OrderUserPage history={history} />
    },
    {
        path: '/editOrder/:id',
        exact: false,
        main: ({ history, match }) => <OrderUserActionPage match={match} history={history} />

    },
    {
        path: '/brand',
        exact: true,
        main: ({ history }) => <BrandPage history={history} />

    },
    {
        path: '/addBrand',
        exact: true,
        main: ({ match, history }) => <BrandActionPage match={match} history={history} />
    },
    {
        path: '/editBrand/:id',
        exact: false,
        main: ({ match, history }) => <BrandActionPage match={match} history={history} />
    },
    {
        path: '/shippingCompany',
        exact: true,
        main: ({ history }) => <ShippingCompanyPage history={history} />

    },
    {
        path: '/addShippingCompany',
        exact: true,
        main: ({ match, history }) => <ShippingCompanyActionPage match={match} history={history} />
    },
    {
        path: '/editShippingCompany/:id',
        exact: false,
        main: ({ match, history }) => <ShippingCompanyActionPage match={match} history={history} />
    },
    {
        path: '/shipper',
        exact: true,
        main: ({ history }) => <ShipperPage history={history} />

    },
    {
        path: '/addShipper',
        exact: true,
        main: ({ match, history }) => <ShipperActionPage match={match} history={history} />
    },
    {
        path: '/editShipper/:id',
        exact: false,
        main: ({ match, history }) => <ShipperActionPage match={match} history={history} />
    },
    {
        path: '/user',
        exact: true,
        main: ({ history }) => <UserPage history={history} />

    },
    {
        path: '/editUser/:id',
        exact: false,
        main: ({ match, history }) => <UserActionPage match={match} history={history} />
    },
    {
        path: '/login',
        exact: true,
        main: ({ history }) => <Login history={history} />
    },
    {
        path: '/revenue',
        exact: true,
        main: () => <Revenue />
    },
    {
        path: '/profit',
        exact: true,
        main: () => <Profit />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />
    }
]

export default routes;