import Home from '../pages/Home'
import CityList from "../pages/CityList"


const routers = [
    {
        title: 'Home',
        path: '/home',
        component: Home,
        // children: [
        //     {
        //         path: 'news',
        //         element: <News />
        //     },
        // ]
    },
    {
        title: 'CityList',
        path: '/citylist',
        component: CityList,
    },
];

export default routers;
