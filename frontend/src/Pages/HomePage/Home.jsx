import NavBar from "/src/components/NavBar/NavBar";
import Hero from "/src/components/Hero/Hero";
import WhyUs from "../../components/WhyUs/WhyUs";
import LatestAuctions from "../../components/LatestAuctions/LatestAuctions";
import Footer from "../../components/Footer/Footer";
function Home() {
  return (
    <>
      <NavBar />
      <Hero/>
      <WhyUs/>
      <LatestAuctions/>
      <Footer/>
    </>
  );
}

export default Home;
