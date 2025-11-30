import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home.js';
import Login from '../pages/login/login.js';
import Register from '../pages/register/register.js';
import Index from '../pages/index/index.js';
import Category from '../pages/category/category.js';
import About from '../pages/about/about.js';
import My from '../pages/my/my.js';
import Serach from '../pages/serach/serach.js';
import MyIndex from '../pages/myIndex/myIndex.js';
import MyArticle from '../pages/myArticle/myArticle.js';
import MyCollect from '../pages/myCollect/myCollect.js';
import MyFollow from '../pages/myFollow/myFollow.js';
import MyLike from '../pages/myLike/myLike.js';
import MyFans from '../pages/myFans/myFans.js';
import Detail from '../pages/detail/detail.js';
import Publish from '../pages/publish/publish.js'; 
import ChangeData from '../pages/changeData/changeData.js';

const router = createBrowserRouter([
    {
        path: '/Home',
        element: <Home />,
        children: [
            {
                index: true,
                element: <Index />
            },
            {
                path: 'Category',
                element: <Category />
            },
            {
                path: 'About',
                element: <About />
            },
            {
                path: 'Serach',
                element: <Serach />
            }
        ]
    },
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/Register',
        element: <Register />
    },
    {
        path: 'My',
        element: <My />,
        children: [
            {
                index: true,
                element: <MyIndex />
            },
            {
                path: 'MyArticle',
                element: <MyArticle />
            },
            {
                path: 'MyCollect',
                element: <MyCollect />
            },
            {
                path: 'MyFollow',
                element: <MyFollow />
            },
            {
                path: 'MyLike',
                element: <MyLike />
            },
            {
                path: 'MyFans',
                element: <MyFans />
            }
        ]
    },
    {
        path: 'ChangeData',
        element: <ChangeData />
    },
    {
        path: 'Detail',
        element: <Detail />
    },
    {
        path: 'Publish',
        element: <Publish />
    }
]);

export default router;