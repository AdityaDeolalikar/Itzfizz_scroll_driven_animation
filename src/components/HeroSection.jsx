import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import car from "../assets/car.png";
import React from "react";
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const carRef = useRef(null);
  const greenBandRef = useRef(null);
  const statsTopRef = useRef(null);
  const statsBottomRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1667",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        carRef.current,
        { left: "0%" },
        { left: "100%", ease: "none" },
        0,
      )
        .fromTo(
          greenBandRef.current,
          { width: "0%" },
          { width: "100%", ease: "none" },
          0,
        )
        .fromTo(
          statsTopRef.current,
          { opacity: 0 },
          { opacity: 1, ease: "none" },
          0,
        )
        .fromTo(
          statsBottomRef.current,
          { opacity: 0 },
          { opacity: 1, ease: "none" },
          0,
        );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero relative h-screen w-full overflow-hidden bg-[#e0e0e0]"
    >
      {/* Track container */}
      <div className="absolute top-1/2 left-0 w-full h-[60px] sm:h-[100px] md:h-[150px] lg:h-[200px] -translate-y-1/2 bg-[#222222] flex items-center">
        {/* Invisible text in black band to maintain layout tracking */}
        <h1 className="invisible text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-[0.2em] pl-4 sm:pl-8 md:pl-16 whitespace-nowrap">
          WELCOME ITZFIZZ
        </h1>

        {/* Green progress band */}
        <div
          ref={greenBandRef}
          className="absolute top-0 left-0 h-full bg-[#4de77a] overflow-hidden whitespace-nowrap flex items-center z-0 origin-left"
        >
          <h1 className="text-black text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-widest pl-4 sm:pl-8 md:pl-16 whitespace-nowrap">
            WELCOME ITZFIZZ
          </h1>
        </div>

        {/* Car */}
        <img
          ref={carRef}
          src={car}
          alt="car"
          className="absolute top-1/2 left-0 h-full w-auto object-contain -translate-y-1/2 -translate-x-[40%] will-change-transform z-10 drop-shadow-2xl"
        />
      </div>

      {/* Stats Top */}
      <div
        ref={statsTopRef}
        className="absolute top-8 sm:top-16 left-1/2 -translate-x-1/2 flex flex-row gap-2 sm:gap-6 z-0"
      >
        <Stat
          value="58%"
          label="Increase in pick up point use"
          variant="lime"
        />
        <Stat
          value="27%"
          label="Increase in pick up point use"
          variant="dark"
        />
      </div>

      {/* Stats Bottom */}
      <div
        ref={statsBottomRef}
        className="absolute bottom-8 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-row gap-2 sm:gap-6 z-0"
      >
        <Stat
          value="23%"
          label="Decreased in customer phone calls"
          variant="blue"
        />
        <Stat
          value="40%"
          label="Decreased in customer phone calls"
          variant="orange"
        />
      </div>
    </section>
  );
}

function Stat({ value, label, variant }) {
  let bg = "bg-blue-400";
  let text = "text-black";
  if (variant === "lime") bg = "bg-[#cff545]";
  if (variant === "dark") {
    bg = "bg-[#333333]";
    text = "text-white";
  }
  if (variant === "blue") bg = "bg-[#6cbdfb]";
  if (variant === "orange") {
    bg = "bg-[#f8782a]";
    text = "text-black";
  }

  return (
    <div
      className={`${bg} ${text} p-4 sm:p-6 lg:p-8 rounded-xl w-[140px] sm:w-[200px] lg:w-[280px]`}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{value}</h2>
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm">{label}</p>
    </div>
  );
}
