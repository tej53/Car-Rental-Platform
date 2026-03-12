import { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Dashboard() {
    const {axios, isOwner, currency} = useAppContext();

    const [data, setData] = useState({
        totalCars: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        recentBookings: [],
        monthlyRevenue: 0
    });

    const dashboardCards = [
        { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
        { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
        { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
        { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored },
    ];

    const fetchDashboardData = async ()=>{
        try{
            const {data} = await axios.get("/api/owner/dashboard");
            if(data.success){
                setData(data.dashboardData)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(isOwner){
            fetchDashboardData();
        }
    }, [isOwner]);

    return (
        <div className="flex-1 px-4 pt-10 md:px-10">

            <Title
                title="Admin Dashboard"
                subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
            />

            {/* Dashboard Cards */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                {dashboardCards.map((card, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-5 rounded-lg border border-borderColor bg-white shadow-sm"
                    >
                        <div>
                            <h1 className="text-sm text-gray-500">{card.title}</h1>
                            <p className="text-xl font-semibold">{card.value}</p>
                        </div>

                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                            <img src={card.icon} alt="" className="h-5 w-5" />
                        </div>
                    </div>
                ))}
            </div>


            {/* Recent Bookings + Monthly Revenue */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Recent Bookings */}
                <div className="flex-1 bg-white border border-borderColor rounded-lg p-6 shadow-sm">

                    <div className="mb-6">
                        <h1 className="text-lg font-semibold">Recent Bookings</h1>
                        <p className="text-sm text-gray-500">Latest customer bookings</p>
                    </div>

                    <div className="space-y-4">
                        {data.recentBookings.map((booking, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 border border-borderColor rounded-md"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                                        <img
                                            src={assets.listIconColored}
                                            alt=""
                                            className="h-5 w-5"
                                        />
                                    </div>

                                    <div>
                                        <p className="font-medium">
                                            {booking.car.brand} {booking.car.model}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {booking.createdAt.split("T")[0]}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="text-sm font-medium">
                                        {currency}{booking.price}
                                    </p>
                                    <p className="px-3 py-1 text-xs border border-borderColor rounded-full">
                                        {booking.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>


                {/* Monthly Revenue */}
                <div className="bg-white border border-borderColor rounded-lg p-6 shadow-sm w-full lg:max-w-xs">

                    <h1 className="text-lg font-medium">Monthly Revenue</h1>
                    <p className="text-gray-500">Revenue for current month</p>

                    <p className="text-3xl mt-6 font-semibold text-primary">
                        {currency} {data.monthlyRevenue}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;