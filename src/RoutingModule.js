import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Books from './components/AllBooks/AllBooks';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DashBoard from './components/DashBoard/DashBoard';


function RoutingModule(){
    const AppRoutes = createBrowserRouter([
        {path:"/books",element:<Books/>},
        {path:"/header",element:<Header/>},
        {path:"/footer",element:<Footer/>},
        {path:"/dashboard", element:<DashBoard/>, children:[
            
        ]},
    ])
    return <RouterProvider router={AppRoutes}></RouterProvider>

}

export default RoutingModule;