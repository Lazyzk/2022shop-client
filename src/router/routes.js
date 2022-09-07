import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/search',
    component: Search
  }
  ,
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  }
]