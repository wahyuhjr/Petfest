"use client"

import Image from "next/image";

const Hero = () => {
    return(
        <section className="bg-[#4F98CF]  text-white">
            <div className="flex justify-start items-center">
                <Image src="/images/pohon-header.jpeg" width={500} height={500} alt="Hero Image" />
            </div>
        </section>
    );
}

export default Hero;