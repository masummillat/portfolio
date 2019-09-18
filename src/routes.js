import HomeRoot from "./components/layout/home";
import Login from "./container/login/LoginPage";
import AdminPanel from "./container/adminPanel";
import DefaultLayout from "./components/layout/DefaultLayout";
import LoginLayout from "./components/layout/LoginLayout";
import HomeLayout from "./components/layout/HomeLayout";
import HomePage from "./container/homePage";
import PublicLayout from "./components/layout/PublicLayout";
import PageNotFound from "./components/PageNotFound";
import Profile from "./container/profile";
import NewStory from './container/newStory';
import Signup from './container/login/Signup';

const routes = [

    {
        path: '/login',
        exact: true,
        component: Login,
        authenticated: false,
        layout: LoginLayout,
    },
    {
        path: '/signup',
        exact: true,
        component: Signup,
        authenticated: false,
        layout: LoginLayout,
    },
    {
        path: '/',
        exact: false,
        component: HomeRoot,
        layout: DefaultLayout,
        breadCrumbName : 'Home',
        children: [
            {
                path:'/',
                exact: true,
                component: HomePage,
                layout: HomeLayout,
                breadCrumbName: 'Home'
            },
            {
                path: '/admin',
                exact: true,
                component: AdminPanel,
                layout: HomeLayout
            },
            {
                path: '/profile',
                exact: true,
                component: Profile,
                layout: HomeLayout
            },
            {
                path:'/new-story',
                exact: true,
                component: NewStory,
                layout: HomeLayout,
            },
            {
                path: '*',
                exact: true,
                component: PageNotFound,
                layout: HomeLayout,
            },
        ]
    },
    {
        path: '*',
        exact: true,
        component: PageNotFound,
        layout: PublicLayout,
    },

]

export default routes;