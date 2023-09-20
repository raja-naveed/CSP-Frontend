import { Button } from "@mui/material";
import { BASEURL, moveTo } from "../constants";
import { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        logout()
    })
    const logout = async () => {
        try {
            const res = await fetch(BASEURL + "logout",{
                method:"GET",
                headers:{
                    Accept: "application/json",
                    "Content-Type" : "application/json"
                },
                credentials:"include"
            })
            if(!res.ok || res.status != 200)
            {
                message.error("Logout Later");
                window.location.reload();
            }
            else{
               // message.success("Logout Successfully");
                window.localStorage.setItem("permission", JSON.stringify(false))
                navigate("/")
            }
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <div>
        </div>
    );
}
export default Logout;