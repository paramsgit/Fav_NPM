import React from 'react'
import { Button } from '@nextui-org/react'
import { toast } from 'react-toastify';
interface FavoritePackage { id: string; packageName: string; description: string; addedAt: string; }
interface Props{
    data:FavoritePackage|null|undefined;
    onClose:()=>void
    setRefresh:React.Dispatch<React.SetStateAction<boolean>>
    toast:typeof toast
}
const DeleteModal = (props:Props) => {
    const {onClose,data,setRefresh}=props;
    
    const DeleteFunction=()=>{
        const id=data?.id
        if(!id){console.log("No id found");
          toast.error(`Error: Id not found`,{position:"bottom-right"})

          return}
        const existingFavorites: FavoritePackage[] = JSON.parse(localStorage.getItem('favorites') || '[]'); 
         const updatedFavorites = existingFavorites.filter(pkg => pkg.id !== id); 
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
           console.log(`Favorite with ID "${id}" removed.`)
           toast.success(`Package "${data?.packageName?data?.packageName:""}" removed.`,{position:"bottom-right"})

           setRefresh((prev)=>!prev);
    }
  return (
    <div>
      <div className="py-4 sm:py-8 text-center overflow-y-auto">
        <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-xl bg-gray-100 text-gray-500">
          <svg
            className="w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
          </svg>
        </span>

        <h3 className="mb-2 text-2xl font-bold text-gray-800">Confirm removal</h3>
        <p className="text-gray-500">
         Are you sure want to remove {data?.packageName}

        </p>
      </div>

      <div
        className={`flex justify-center mt-7 sm:mt-0 mb-4 ${
          !data && 'disabled'
        }`}
      >
        <Button className="mx-1" color="default" variant="ghost" onPress={onClose}>
          No, Cancel
        </Button>
  
        <Button onClick={() => {DeleteFunction();onClose()}} className={`mx-1`} color="danger"
        > Yes, Delete</Button>

        {/* {Field =="curriculum" && <Button onClick={() => {handleDeleteCurriculum(oldData.id);}} className={`mx-1 ${btnDisabled && 'disabled'}`} color="danger"
        > Yes, Delete</Button>} */}
 
      </div>
    </div>
  )
}

export default DeleteModal