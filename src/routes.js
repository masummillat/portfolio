import Home from "./container/home";
import Login from "./container/login/LoginPage";
import AdminPanel from "./container/adminPanel";
import DefaultLayout from "./components/layout/DefaultLayout";
import LoginLayout from "./components/layout/LoginLayout";
import HomeLayout from "./components/layout/HomeLayout";

const routes = [

    {
        path: '/login',
        exact: true,
        component: Login,
        authenticated: false,
        layout: LoginLayout,
    },
    {
        path: '/',
        exact: false,
        component: Home,
        layout: DefaultLayout,
        breadCrumbName : 'Home',
        children: [
            {
                path: '/admin',
                exact: true,
                component: AdminPanel,
                layout: HomeLayout
            }
        ]
    },

]

export default routes;