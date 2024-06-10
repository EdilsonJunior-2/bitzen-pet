import { getUser } from "@api/user";
import { useEffect, useState } from "react";

function UserContext() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        console.log(getUser())
    }, []);
}