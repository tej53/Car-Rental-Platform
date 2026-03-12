import { Outlet } from "react-router-dom";
import NavBarOwner from "../../components/owner/NavBarOwner";
import SideBar from "../../components/owner/SideBar";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

function Layout(){
    const {isOwner, navigate} = useAppContext();

    useEffect(()=>{
        if(!isOwner){
            navigate("/");
        }
    }, [isOwner])
    return (
        <>
            <div className="flex flex-col">
                <NavBarOwner></NavBarOwner>
                <div className="flex">
                    <SideBar></SideBar>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}

export default Layout;