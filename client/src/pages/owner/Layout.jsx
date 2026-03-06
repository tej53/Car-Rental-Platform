import { Outlet } from "react-router-dom";
import NavBarOwner from "../../components/owner/NavBarOwner";
import SideBar from "../../components/owner/SideBar";

function Layout(){
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