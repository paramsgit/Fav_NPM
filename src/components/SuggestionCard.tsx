import { Button, Skeleton, Tooltip } from '@nextui-org/react'
import React from 'react'
import PackageCard from './PackageCard'

export interface PackageLink {
  npm: string;
  homepage?: string;
  repository?: string;
  bugs?: string;
}

export interface PackageAuthor {
  name: string;
  email: string;
  url?: string;
}

export interface PackagePublisher {
  username: string;
  email: string;
}

export interface PackageMaintainer {
  username: string;
  email: string;
}

export interface PackageDetails {
  name: string;
  scope: string;
  version: string;
  description?: string;
  keywords?: string[];
  date: string;
  links: PackageLink;
  author?: PackageAuthor;
  publisher: PackagePublisher;
  maintainers: PackageMaintainer[];
}

export interface ScoreDetails {
  quality: number;
  popularity: number;
  maintenance: number;
}

export interface Score {
  final: number;
  detail: ScoreDetails;
}

export interface Result {
  package: PackageDetails;
  score: Score;
  searchScore: number;
}

export interface ResultsProps {
  results: Result[];
}


type Props = {
  results: Result[]|[];
  SelectedPackage: string;
  searchInput:string;
  setSelectedPackage: React.Dispatch<React.SetStateAction<string>>;
  loading:boolean;

}

const SuggestionCard = (props: Props) => {
  const {results,setSelectedPackage,SelectedPackage,searchInput,loading }=props;
  return (
    <div className='max-w-xl w-full rounded-xl bg-white shadow-lg my-4 p-2'>
         <div className={`w-full smooth overflow-auto  p-2 hide_scroll ${SelectedPackage?"max-h-[8rem]":"max-h-[18rem]"}`}>
          {(!searchInput && results.length==0) && 
          <Skeleton className="rounded-lg" isLoaded={!loading}>

          <div className="flex justify-center items-center px-3 py-1 rounded-lg hover:bg-slate-100">
          <div className="flex gap-2 justify-center items-center">
            {/* <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} /> */}
            <div className="flex justify-center text-gray-500">
           Start typing in searchbox to see results
            </div>
          </div>
        </div>
        </Skeleton>
          }
          {searchInput && results.length==0 ?
            <Skeleton className="rounded-lg" isLoaded={!loading}>

          <div className="flex justify-center items-center px-3 py-1 rounded-lg hover:bg-slate-100">
          <div className="flex gap-2 justify-center items-center">
            {/* <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} /> */}
            <div className="flex justify-center z-20">
            {loading?"Loading...":"No items found"}
            </div>
          </div>
        </div>
        </Skeleton>
        :results?.map((item) => {
          if (!item.package.name) return null;
          return (
            <Skeleton key={item.package.name} className="rounded-lg my-1" isLoaded={!loading}>

            <div className={`flex justify-between items-center px-3 my-1 py-1 rounded-lg hover:bg-slate-100`}>
            <div className="flex gap-2 items-center">
              {/* <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} /> */}
              <div className="flex flex-col">
              
                <span className="text-small cursor-default">{item.package.name}</span>
                <span className="text-tiny text-default-400">{item.package.version}</span>
              </div>
            </div>
            <Tooltip delay={1000} closeDelay={0} key={item.package.name+"tooltip"}
             content={
               <PackageCard package={item.package} score={item.score} />
             }>
            <Button
              className={`bg-white ${SelectedPackage === item.package.name && "bg-green-600 text-white"} font-medium shadow-small`}
              radius="full"
              size="sm" onPress={() => {
              setSelectedPackage((prev) => prev === item.package.name ? "" : item.package.name);
              }}
            >
              Select
            </Button>
            </Tooltip>
          </div></Skeleton>
    )
        })}
        </div>
    </div>
  )
}

export default SuggestionCard