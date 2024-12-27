import AppNavbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'


const Dashboard = () => {
  return (
    <div className='px-2'>
        <AppNavbar/>
        <Outlet/>
    </div>
  )
}

export default Dashboard