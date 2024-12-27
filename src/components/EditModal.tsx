import React, {  useState } from 'react'
import { Button, Textarea } from '@nextui-org/react'
import { toast } from 'react-toastify';
interface FavoritePackage { id: string; packageName: string; description: string; addedAt: string; }
interface Props{
    data:FavoritePackage|null|undefined;
    onClose:()=>void
    setRefresh:React.Dispatch<React.SetStateAction<boolean>>
    edit:boolean
    toast:typeof toast
}
const EditModal = (props:Props) => {
    const {onClose,data,setRefresh,edit}=props;
    const [reasonInput,setreasonInput]=useState(data?.description)

    function updateFavoriteDescription(id: string|undefined, newDescription: string|undefined): void 
    { if(!id || !newDescription){
      toast.error(`Error: Id / description not found`,{position:"bottom-right"})
        return;
    }
        const existingFavorites: FavoritePackage[] = JSON.parse(localStorage.getItem('favorites') || '[]'); 
         const updatedFavorites = existingFavorites.map(pkg => { if (pkg.id === id)
             { return { ...pkg, description: newDescription }; } return pkg; }); 
             localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
              console.log(`Description for favorite with ID "${id}" updated.`);
              toast.success(`Description for package ${data?.packageName?data.packageName:""} updated.`,{position:"bottom-right"})
            setRefresh((prev)=>!prev);
            }
  return (
    <div>
    <div className="py-4 sm:py-8 text-center overflow-y-auto">
     

      <h3 className="mb-2 text-2xl font-bold text-gray-800">{edit?"Edit":"View"} details</h3>
      <div className='flex flex-col w-full items-start'>
      <h3 className="mb-2 text-lg font-bold text-gray-600">{data?.packageName}</h3>
      <div className="flex flex-col items-center w-full">
      <Textarea
        readOnly={!edit}
        className="max-w-xl bg-white"
        label="Description"
        value={reasonInput}
        onValueChange={(e:string) => setreasonInput(e)}
        placeholder="Why this is your favourite package manager"
        variant={edit?"bordered":"flat"}
        // eslint-disable-next-line no-console
        // onClear={() => console.log("textarea cleared")}
      />

    </div>
      </div>
    </div>

    <div
      className={`flex justify-center mt-7 sm:mt-0 mb-4 ${!data && 'disabled'} ${!edit &&"hidden"}`}
    >
      <Button className="mx-1" color="default" variant="ghost" onPress={onClose}>
        Back
      </Button>

      <Button onPress={() => {updateFavoriteDescription(data?.id,reasonInput);onClose()}} className={`mx-1`} color="danger"
      > Submit</Button>

    </div>
  </div>
  )
}

export default EditModal