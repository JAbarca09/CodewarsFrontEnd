import { useState } from "react";

export default function useReserve(){
    const [searchKata, setSearchKata] = useState("");
    const [kata, setKata] = useState("");
    const [kataSlug, setKataSlug] = useState("");

  return {searchKata,setSearchKata, kata, setKata, kataSlug, setKataSlug}
}