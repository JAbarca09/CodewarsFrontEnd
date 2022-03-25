import { useState } from "react";

export default function useReserve(){
    const [searchKata, setSearchKata] = useState("");
    const [kata, setKata] = useState("");
    const [kataSlug, setKataSlug] = useState("");
    const [userRerservedKatas, setDisplayReservebyUser] = useState([]);
    const [adminIncompleteKatas, setAdminIncompleteKatas] = useState([]);
    const [userSearch ,setUserSearch] = useState("");
    const [searchCompletedKatas, setSearchCompletedKatas] = useState([]);
    const [searchedCohortName, setSearchedCohortName] = useState("");
    const [searchedCohortLvl, setSearchedCohortLvl] = useState(0);
    const [completedKatas, setCompletedKatas] = useState([]);

  return {searchKata,setSearchKata, kata, setKata, kataSlug, setKataSlug, userRerservedKatas, setDisplayReservebyUser, adminIncompleteKatas, setAdminIncompleteKatas, userSearch, setUserSearch,searchCompletedKatas, setSearchCompletedKatas,searchedCohortName,setSearchedCohortName,searchedCohortLvl,setSearchedCohortLvl,completedKatas,setCompletedKatas}
}