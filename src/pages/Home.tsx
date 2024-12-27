import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import useApi from '../hooks/useApi'
import SuggestionCard from '../components/SuggestionCard'
import FavouriteReason from '../components/Reason'
import { ToastContainer, toast } from 'react-toastify';

interface ApiResponse {
    results: any[];
}

const Home = () => {
    const URL="https://api.npms.io/v2/search?q="
    const [searchInput,setSearchInput]=useState("")
    const [SelectedPackage,setSelectedPackage]=useState("")
    const [ApiResult,setApiResult]=useState<any[]>([])
    const [apiUrl, setApiUrl] = useState<null|string>(null);
    const { data, loading, error } = useApi<ApiResponse>(apiUrl || '');

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchInput) {
                setApiUrl(`${URL}${searchInput}`);
            } else { setApiUrl('');}
        }, 300); 

        return () => {
            clearTimeout(handler);};
    }, [searchInput]);

    useEffect(() => {
        if(data && data.results)
        {setApiResult(data.results)}
    }, [data]);
    
    useEffect(() => {
      if(error){
        toast.error(`${error?error:"Something went wrong"}`,{position:'bottom-right'})
      }
    }, [error])
    


    
  return (
    <div className='w-full flex flex-col justify-center items-center'>

        <div className='mb-2 mt-10 w-full flex justify-center'>
            <SearchBar setSearchInput={setSearchInput} searchInput={searchInput}/>
        </div>
        <div className='w-full flex justify-center'>
            <SuggestionCard loading={loading} searchInput={searchInput} setSelectedPackage={setSelectedPackage} SelectedPackage={SelectedPackage} results={ApiResult}/>
        </div>

        <div className={`w-full justify-center ${SelectedPackage ? "flex" :"hidden"}`}>
            <FavouriteReason toast={toast} setSelectedPackage={setSelectedPackage} ApiResult={ApiResult} SelectedPackage={SelectedPackage}/>
        </div>
        <ToastContainer/>

    </div>
  )
}

export default Home