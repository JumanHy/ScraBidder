import NavBar from "/src/components/NavBar/NavBar";
import Hero from "/src/components/Hero/Hero";
import WhyUs from "../../components/WhyUs/WhyUs";
import LatestAuctions from "../../components/LatestAuctions/LatestAuctions";

function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <LatestAuctions />
    </>
  );
}

export default Home;
