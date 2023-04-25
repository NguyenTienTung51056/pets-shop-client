import LayoutOthers from "~/components/Layout/LayoutOthers/LayoutOthers";
import Home from "~/pages/home/Home";
import Login from "~/pages/login/Login";
import Cart from "~/pages/cart/Cart";
import Register from "~/pages/register/Register";
import ProductList from "~/pages/productList/ProductList";  
import Product from "~/pages/product/Product";
import Order from "~/pages/order/Order";
import Success from "~/pages/success/Success";
import OrderDetails from "~/pages/order/OrderDetails";
const publicRouters = [
    {
        path: "/",component: Home
    },
    {
        path: "/cart",component: Cart
    },
    {
        path: "/products/:category",component: ProductList
    },
    {
        path: "/product/:id",component: Product
    },
    {
        path:"/success",component: Success
    },
    {
        path: "/orders",component: Order
    },
    {
        path: "/order/:id",component: OrderDetails
    }
    
]

const privateRouters = [
    {
        path: "/login",component: Login,layout: null
    },
    {
        path: "/register",component: Register,layout: null
    }

]

export { publicRouters, privateRouters }