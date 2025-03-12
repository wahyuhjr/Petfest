import MainLayout from "@/components/layouts/MainLayout";
import Brand from "@/components/sections/Brand";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <MainLayout title="Petfest ID">
      <Hero />
      <Brand />
    </MainLayout>
  );
}
