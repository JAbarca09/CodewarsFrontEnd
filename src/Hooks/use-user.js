import { useState } from "react";

export default function useUser(){

    const [userId, setUserId] = useState("");
    const [cohortName, setCohortName] = useState("");
    const [codeWarName, setCodeWarName] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [isDeleted, setIsDeleted] = useState("");
    const [userItems, setUserItems] = useState({});
    const [kataDifficulty, setKataDifficulty] = useState("");

    return { userId, setUserId, cohortName, setCohortName, codeWarName, setCodeWarName, isAdmin, setIsAdmin, isDeleted, setIsDeleted, userItems, setUserItems, kataDifficulty, setKataDifficulty} 
}
