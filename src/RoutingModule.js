import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashBoard from './components/DashBoard/DashBoard';
import AllBooks from './components/AllBooks/AllBooks'
import Bookview from './components/BookView/BookView';
import BookStoreCart from './components/BookStoreCart/BookStoreCart';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import MyOrders from './components/MyOrders/MyOrders';
import WishList from './components/WishList/WishList';
import { Provider } from 'react-redux';
import appStore from './utils/store/AppStore';
import LoginOrSignUp from './components/LoginOrSignUp/LoginOrSignUp';
import BookNavBar from './components/BookNavBar/BookNavBar';


function RoutingModule() {
    const AppRoutes = createBrowserRouter([
        { path: "/loginOrSignUp", element: <LoginOrSignUp /> },
        { path: "/bookNavBar", element: <BookNavBar /> },
        {
            path: "/dashboard", element: <DashBoard />, children: [
                { path: "allBooks", element: <AllBooks /> },
                { path: "bookView/:bookId", element: <Bookview /> },
                { path: "bookCart", element: <BookStoreCart /> },
                { path: "success", element: <OrderSuccess /> },
                { path: "allOrders", element: <MyOrders /> },
                { path: "wishlist", element: <WishList /> }

            ]
        },
    ])
    return <Provider store={appStore}>
        <RouterProvider router={AppRoutes}></RouterProvider>
    </Provider>
    

}

export default RoutingModule;