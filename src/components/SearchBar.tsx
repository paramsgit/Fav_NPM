import { Input } from '@nextui-org/react'
import React from 'react'

type Props = {
    searchInput:string;
    setSearchInput:React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props: Props) => {
    const { searchInput ,setSearchInput }=props;
  return (
    <div className='w-full flex justify-center'>
        <Input
      className="max-w-xl w-full "
      value={searchInput}
      onChange={(e)=>{setSearchInput(e.target.value)}}
    //   description="We'll never share your email with anyone else."
      label="Search for package manager"
      endContent={
        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="text-2xl mb-1 max-w-6 text-default-400 pointer-events-none flex-shrink-0" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>

      }
    />
    </div>
  )
}

export default SearchBar