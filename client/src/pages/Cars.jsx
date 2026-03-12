import { useEffect, useState } from "react";
import { assets, dummyCarData } from "../assets/assets";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Cars(){
    const [searchParams] = useSearchParams();
    const pickupLocation = searchParams.get("pickupLocation");
    const pickupDate = searchParams.get("pickupDate");
    const returnDate = searchParams.get("returnDate");
    const [input, setInput] = useState("");

    const {cars, axios} = useAppContext();
    const isSearchData = pickupLocation && pickupDate && returnDate;
    const [availableCars, setAvailableCars] = useState([]);
    const [filterCars, setFilterCars] = useState([]);

    async function searchCarAvailability(){
        const {data} = await axios.post("/api/booking/check-availability", 
            {location : pickupLocation, pickupDate, returnDate}
        );

        if(data.success){
            setAvailableCars(data.availableCars);
            if(data.availableCars.length === 0){
                toast("No cars available");
            }
        }
    }

    useEffect(()=>{
        isSearchData && searchCarAvailability();
    }, []);

    // Apply text filter on top of whichever list is active (date-searched or all cars)
    useEffect(()=>{
        const sourceList = isSearchData ? availableCars : cars;
        if(input === ""){
            setFilterCars(sourceList);
        } else {
            const filtered = sourceList.filter((car)=>{
                return car.brand.toLowerCase().includes(input.toLowerCase())
                || car.model.toLowerCase().includes(input.toLowerCase())
                || car.category.toLowerCase().includes(input.toLowerCase())
                || car.location.toLowerCase().includes(input.toLowerCase())
            });
            setFilterCars(filtered);
        }
    }, [input, cars, availableCars]);

    return (
        <>
            <div>
                <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
                    <Title title="Available Cars" subTitle="Browse our selection of premium
                     vehicles available for your next adventure"></Title>

                    <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12
                    rounded-full shadow">
                        <img src={assets.search_icon} alt=""  className="w-4.5 h-4.5 mr-2"/>
                        <input onChange={(e)=>setInput(e.target.value)} type="text" value={input} placeholder="Search by make model, or features"
                        className="w-full h-full outline-none text-gray-500"/>
                        <img src={assets.filter_icon} alt=""  className="w-4.5 h-4.5 ml-2"/>
                    </div>
                </div>

                <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
                    <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">Showing {filterCars.length} Cars</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4
                    xl:px-20 max-w-7xl mx-auto">
                        {filterCars.map((car)=>(
                            <div>
                                <CarCard car={car}></CarCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cars;