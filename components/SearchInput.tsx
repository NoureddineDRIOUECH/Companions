'use client';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";
import React from "react";

const SearchInput = () => {
    const pathname = usePathname();
const  router = useRouter();
const searchParams = useSearchParams();
const query = searchParams.get('query') || '';
const [searchQuery, setSearchQuery] = React.useState(query);
React.useEffect(() => {
    setTimeout(() => {
        if  (searchQuery){
            router.push(`/companions?topic=${searchQuery}`)

        }
        else{
            router.push(`/companions`)
        }
    },500)

},[searchParams, searchQuery, router, pathname])
    console.log('pathname', pathname.split('/').slice(1).join(''))
    return <div className={'relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'}>
<Image src={'/icons/search.svg'} alt={'search Icon'} width={15} height={15} />
        <input placeholder={'Search companions ...'}
            className={'outline-none'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>
}
export default SearchInput;