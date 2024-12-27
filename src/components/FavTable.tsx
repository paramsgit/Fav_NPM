import React from 'react'
import TableComponent from './TableComponent'
import { toast } from 'react-toastify';


interface FavoritePackage { id: string; packageName: string; description: string; addedAt: string; }

interface Props{
favourites:FavoritePackage[]|any;
setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
toast:typeof toast
}

const FavTable = (props: Props) => {
    const {favourites,setRefresh,toast}=props;
 
  return (
    <div className='w-full'>
        { <TableComponent toast={toast} favourites={favourites} setRefresh={setRefresh}/>}
    </div>
  )
}

export default FavTable