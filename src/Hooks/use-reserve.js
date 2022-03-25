import { useState } from "react";

export default function useReserve(){
    const [searchKata, setSearchKata] = useState("");
    const [kata, setKata] = useState("");
    const [kataSlug, setKataSlug] = useState("");
    const [userRerservedKatas, setDisplayReservebyUser] = useState([]);

  return {searchKata,setSearchKata, kata, setKata, kataSlug, setKataSlug, userRerservedKatas, setDisplayReservebyUser}
}