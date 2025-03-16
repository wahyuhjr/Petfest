import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

function ButtonStyled({ isMobile = false, label = "", limitWidth = false }) {
  const classMerge = twMerge(
    "bg-[#EC497F] px-4 py-2 sm:px-5 sm:py-2 md:px-8  mx-auto shadow-md border-[1px] md:border-2 border-black",
    limitWidth ? "max-w-[60%] sm:max-w-[250px]" : "w-full flex items-center justify-center flex-col",
    isMobile ? "rounded-2xl" : "rounded-3xl"
  );

  return (
    <div
      className={classMerge}
      style={{
        boxShadow: isMobile ? "1px 1px 0 #000" : "2px 2px 0 #000",
      }}
    >
      <span
        className="text-md sm:text-lg md:text-xl lg:text-3xl font-bold text-white block text-center"
        style={{
          textShadow: "2px 2px 0 #3F1508",
        }}
      >
        {label}
      </span>
      <div className="mt-1 text-center px-1">
        <Button
          className="text-xs sm:text-sm font-bold bg-yellow-400 hover:bg-yellow-500 rounded-md px-2 py-1 font-crunch-chips border border-black"
          style={{
            textShadow: "1px 1px 0 #3F1508",
            boxShadow: "1px 1px 0 #000",
          }}
        >
          CLICK HERE
        </Button>
      </div>
    </div>
  );
}

function TicketBoxes({ isMobile = false, view }) {
  // Deteksi ukuran layar untuk responsivitas
  const twClass = useMemo(() => {
    if (view === "mobile") {
      if (isMobile) {
        return "my-4";
      } else {
        return "hidden";
      }
    } else {
      if (!isMobile) {
        return "absolute bottom-44 sm:bottom-16 left-0 right-0 ";
      } else {
        return "hidden";
      }
    }
  }, [isMobile, view]);

  return (
    <>
      {/* Ticket boxes - Pink boxes di bawah text ICE BSD */}
      <div
        className={`${twClass} z-20 flex flex-col items-center space-y-3 sm:space-y-4 font-crunch-chips px-4 sm:px-6`}
      >
        {/* BCA Rp1 button */}
        <ButtonStyled limitWidth isMobile={isMobile} label="BCA Rp 1" />

        {/* Ticket options in a row */}
        <div className="flex flex-col sm:flex-row md:gap-6  justify-center space-y-3 sm:space-y-0 sm:space-x-3 w-full max-w-[90%] sm:max-w-[85%] md:max-w-[65%]">
          {/* General admission */}
          <ButtonStyled isMobile={isMobile} label="GENERAL ADMISSION" />
          <ButtonStyled
            isMobile={isMobile}
            label={
              <>
                PRIVATE SESSION WITH
                <br className={isMobile ? "hidden" : "block"} />
                {isMobile ? " " : ""} JACKSON GALAXY
              </>
            }
          />
        </div>
      </div>
    </>
  );
}

export default TicketBoxes;
