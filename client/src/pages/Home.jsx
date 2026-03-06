import Banner from "../components/Banner";
import FeaturedSection from "../components/FeaturedSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Testimonial from "../components/Testimonial";
import CarDetails from "./CarDetails";

function Home(){
    return(
        <>
            <Hero></Hero>
            <FeaturedSection></FeaturedSection>
            <Banner></Banner>
            <Testimonial></Testimonial>
            <Newsletter></Newsletter>
        </>
    )
}

export default Home;