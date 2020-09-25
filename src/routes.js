import Home from './views/Home'
import Registration from './views/Boarding'
import Profile from './views/Profile'
import Login from './views/Login'
import Dashboard from './views/Dashboard'

export default[
    {path:'/', component: Home  },
    {path:'/Home', component: Home  },
    {path:'/Registration', component: Registration  },
    {path:'/Login', component: Login },
    {path:'/Dashboard', component: Dashboard },
    {path:'/Profile', component: Profile  }

]