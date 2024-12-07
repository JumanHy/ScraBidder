import Hero from "@/components/Hero/Hero";
import WhyUs from "@/components/WhyUs/WhyUs";
import LatestAuctions from "@/components/LatestAuctions/LatestAuctions";
import OurPartners from "@/components/OurPartners/OurPartners";
import { useEffect } from "react";
function Home() {
  useEffect(() => {
    // Save data to localStorage when the component mounts

    localStorage.setItem("userId", "77ac1d93-dc3e-49e6-9930-d6b5c8e3ff3e");
    localStorage.setItem("role", "Individual");
    localStorage.setItem("email", "Mohammad12@example.com");
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1laWQiOiJkZTkzYmYyNy0xOWJiLTQyMjUtYmY3OC1kZDE4NGE5NjhhZjgiLCJnaXZlbl9uYW1lIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJCdXNpbmVzcyIsIm5iZiI6MTczMzQ5MTE0MywiZXhwIjoxNzM0MDk1OTQzLCJpYXQiOjE3MzM0OTExNDMsImlzcyI6Imh0dHA6Ly9Mb2NhbGhvc3Q6NTE5MiIsImF1ZCI6Imh0dHA6Ly9Mb2NhbGhvc3Q6NTE5MiJ9.TvlfenR-oSbUijvicdZAgLzX8qE45Mpr-Ke2FUGyZjXmULsxcdvQGP2mXbyYHWb53JmVZjkIVeb8NwYAC8E9ng"
    );
  }, []);
  return (
    <>
      <Hero />
      <WhyUs />
      <LatestAuctions />
      <OurPartners />
    </>
  );
}

export default Home;
