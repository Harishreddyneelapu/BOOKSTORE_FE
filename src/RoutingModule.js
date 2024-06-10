import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Books from './components/AllBooks/AllBooks';
import Header from './components/Header/Header';
import DashBoard from './components/DashBoard/DashBoard';
import AllBooks from './components/AllBooks/AllBooks'
import Bookview from './components/BookView/BookView';


function RoutingModule(){
    const AppRoutes = createBrowserRouter([
        {path:"/books",element:<Books/>},
        {path:"/header",element:<Header/>},
        {path:"/dashboard", element:<DashBoard/>, children:[
            {path:"allBooks",element:<AllBooks/>},
            {path : "bookView/:bookId" , element : <Bookview/>}
        ]},
    ])
    return <RouterProvider router={AppRoutes}></RouterProvider>

}

export default RoutingModule;