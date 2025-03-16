import MainLayout from "@/components/layouts/MainLayout";
import About from "@/components/sections/About";
import Brand from "@/components/sections/Brand";
import Guest from "@/components/sections/Guest";
import GuestStar from "@/components/sections/Guest-Star";
import Hero from "@/components/sections/Hero";
import HeroPetfest from "@/components/sections/HeroPetfest/HeroPetfest";

export default function Home() {
  return (
    <MainLayout title="Petfest ID">
      <Hero />
      {/* <HeroPetfest/> */}
      <About />
      <GuestStar/>
      <Guest />
      <Brand />
    </MainLayout>
  );
}
