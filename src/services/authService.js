import { BASEURL, authRequest, moveTo } from "../constants";
export async function authUser() {
    
    try {
        const res = await fetch(BASEURL + authRequest, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (res.status && res.status === 200) {
            let data = await res.json();
            setPermission(true);
            console.log("data",data)
            return data;
        } else {
            moveTo("/")
        }
    } catch (error) {
        console.log(error);
    }
}

export function setPermission(permission){
    return window.localStorage.setItem("permission",JSON.stringify(permission));
}

export function getPermission(){
    return JSON.parse(window.localStorage.getItem("permission"));
}

const auth = {
    authUser,
    setPermission,
    getPermission,
};
export default auth;