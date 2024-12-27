import { useEffect, useState } from 'react'
import FavTable from '../components/FavTable'
import { Link } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
// type Props = {}

const Favourite = () => {
    const [data,setData]=useState<any>([])
    const [refresh,setRefresh]=useState<boolean>(false)
    useEffect(() => {
      setData(JSON.parse(localStorage.getItem('favorites') || '[]'))
    }, [localStorage,refresh])
    
  return (
    <div className='w-full flex flex-col items-center'>
        <div className="flex justify-between items-center w-full max-w-xl mt-8 my-4">
        <h1 className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-white ">Welcome back</h1>
        <Link to={"/"} className='px-3 py-2 rounded-xl bg-blue-600 text-white'>
        Add new</Link>
        </div>
        <div className='my-5 w-full max-w-xl'>
            <FavTable toast={toast} favourites={data} setRefresh={setRefresh}/>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Favourite