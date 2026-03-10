import React, { useState, useEffect, useCallback, useRef } from "react";
import useHeroSlider from "../AdminCode/Hooks/useHeroSectionSlider";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

/* ─── Skeleton Loader ─────────────────────────────────── */
const SkeletonLoader = () => (
    <div className="relative w-full h-[92vh] min-h-[520px] bg-gray-950 overflow-hidden">
        {/* shimmer sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.6s_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 animate-pulse" />
        {/* fake content skeleton */}
        <div className="absolute bottom-20 left-8 md:left-20 space-y-4">
            <div className="h-3 w-24 bg-gray-800 rounded-full animate-pulse" />
            <div className="h-10 w-72 md:w-96 bg-gray-800 rounded-lg animate-pulse" />
            <div className="h-6 w-52 bg-gray-800/70 rounded-lg animate-pulse" />
            <div className="flex gap-3 mt-4">
                <div className="h-11 w-32 bg-gray-800 rounded-full animate-pulse" />
                <div className="h-11 w-32 bg-gray-800/50 rounded-full animate-pulse" />
            </div>
        </div>
        <style>{`
      @keyframes shimmer { to { transform: translateX(200%) } }
    `}</style>
    </div>
);

/* ─── Main Component ──────────────────────────────────── */
const HeroSlider = () => {
    const { isLoading, heroSlider } = useHeroSlider();

    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(null);
    const [direction, setDirection] = useState("next");
    const [transitioning, setTransitioning] = useState(false);
    const [paused, setPaused] = useState(false);
    const [progressKey, setProgressKey] = useState(0);

    const DURATION = 5000; // ms per slide

    const slides = heroSlider || [];
    const total = slides.length;

    // Always-fresh refs so timers never close over stale state
    const currentRef = useRef(current);
    const pausedRef = useRef(paused);
    const totalRef = useRef(total);
    const transRef = useRef(transitioning);
    const autoTimer = useRef(null);
    const transTimer = useRef(null);

    useEffect(() => { currentRef.current = current; }, [current]);
    useEffect(() => { pausedRef.current = paused; }, [paused]);
    useEffect(() => { totalRef.current = total; }, [total]);
    useEffect(() => { transRef.current = transitioning; }, [transitioning]);

    /* Core slide-change function — reads from refs, never stale */
    const goTo = useCallback((index, dir = "next") => {
        if (transRef.current || totalRef.current < 2) return;
        clearTimeout(transTimer.current);

        setDirection(dir);
        setPrev(currentRef.current);
        setTransitioning(true);
        setCurrent(index);
        setProgressKey((k) => k + 1);

        transTimer.current = setTimeout(() => {
            setPrev(null);
            setTransitioning(false);
        }, 720);
    }, []);

    const next = useCallback(() => {
        goTo((currentRef.current + 1) % totalRef.current, "next");
    }, [goTo]);

    const goBack = useCallback(() => {
        goTo((currentRef.current - 1 + totalRef.current) % totalRef.current, "prev");
    }, [goTo]);

    /* ── Rock-solid autoplay ── */
    const scheduleNext = useCallback(() => {
        clearTimeout(autoTimer.current);
        autoTimer.current = setTimeout(() => {
            if (!pausedRef.current && totalRef.current > 1) {
                goTo((currentRef.current + 1) % totalRef.current, "next");
            }
            scheduleNext(); // re-schedule regardless so it recovers from pause
        }, DURATION);
    }, [goTo]);

    // Boot autoplay once slides are loaded
    useEffect(() => {
        if (total < 2) return;
        scheduleNext();
        return () => {
            clearTimeout(autoTimer.current);
            clearTimeout(transTimer.current);
        };
    }, [total, scheduleNext]);

    // When manually navigating, restart the countdown from 0
    const manualGoTo = useCallback((index, dir) => {
        goTo(index, dir);
        if (total > 1) scheduleNext(); // reset timer
    }, [goTo, scheduleNext, total]);

    const manualNext = useCallback(() => {
        manualGoTo((currentRef.current + 1) % total, "next");
    }, [manualGoTo, total]);

    const manualBack = useCallback(() => {
        manualGoTo((currentRef.current - 1 + total) % total, "prev");
    }, [manualGoTo, total]);

    if (isLoading) return <SkeletonLoader />;
    if (!total) return null;

    const slide = slides[current];
    const prevSlide = prev !== null ? slides[prev] : null;

    return (
        <section
            className="relative w-full h-[92vh] min-h-[520px] overflow-hidden bg-gray-950 select-none"
        >
            {/* ── Background image layers ── */}

            {/* Previous slide fading out */}
            {prevSlide && (
                <div
                    key={`prev-${prev}`}
                    className="absolute inset-0 z-0"
                    style={{
                        animation: `${direction === "next" ? "slideOutLeft" : "slideOutRight"} 720ms cubic-bezier(0.76,0,0.24,1) forwards`,
                    }}
                >
                    <img
                        src={prevSlide.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-gray-950/10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950/70 via-transparent to-transparent" />
                </div>
            )}

            {/* Current slide entering */}
            <div
                key={`curr-${current}`}
                className="absolute inset-0 z-10"
                style={{
                    animation: transitioning
                        ? `${direction === "next" ? "slideInRight" : "slideInLeft"} 720ms cubic-bezier(0.76,0,0.24,1) forwards`
                        : "none",
                }}
            >
                <img
                    src={slide.image}
                    alt={`Slide ${current + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ animation: "kenBurns 6s ease-out forwards" }}
                />
                {/* Cinematic gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/75 via-gray-950/10 to-transparent" />
                {/* Vignette */}
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(3,7,18,0.55) 100%)" }} />
            </div>

            {/* ── Content ── */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-16 lg:px-24">
                {/* Slide counter */}
                {/* <div
                    key={`label-${current}`}
                    className="mb-4 flex items-center gap-2"
                    style={{ animation: "fadeSlideUp 0.6s 0.15s both" }}
                >
                    <span className="text-xs font-mono text-indigo-400 tracking-[0.25em] uppercase">
                        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <div className="h-px w-10 bg-indigo-500/50" />
                </div> */}

                {/* Buttons */}
                <div
                    key={`btns-${current}`}
                    className="flex flex-wrap gap-3 mt-6"
                    style={{ animation: "fadeSlideUp 0.6s 0.45s both" }}
                >
                    {slide?.button1 && (
                        <button className="group relative px-7 py-3 rounded-full bg-white text-gray-950 text-sm font-semibold tracking-wide
              hover:bg-indigo-100 active:scale-95 transition-all duration-200 overflow-hidden shadow-lg shadow-black/30">
                            <span className="relative z-10">{slide.button1}</span>
                            <span className="absolute inset-0 bg-indigo-400/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                        </button>
                    )}
                    {slide?.button2 && (
                        <button className="px-7 py-3 rounded-full border border-white/25 text-white text-sm font-medium tracking-wide
              hover:bg-white/10 hover:border-white/50 active:scale-95 transition-all duration-200 backdrop-blur-sm">
                            {slide.button2}
                        </button>
                    )}
                </div>

                {/* ── Bottom bar: dots + controls + progress ── */}
                <div className="mt-8 flex items-center justify-between">
                    {/* Dot indicators */}
                    <div className="flex items-center gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => manualGoTo(i, i > current ? "next" : "prev")}
                                className={`rounded-full transition-all duration-400 ${i === current
                                    ? "w-8 h-2 bg-white"
                                    : "w-2 h-2 bg-white/25 hover:bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Nav + pause */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPaused((p) => !p)}
                            className="p-2 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-all duration-200 backdrop-blur-sm"
                        >
                            {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                        </button>
                        <button
                            onClick={manualBack}
                            disabled={total < 2}
                            className="p-2.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm disabled:opacity-30"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={manualNext}
                            disabled={total < 2}
                            className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200 backdrop-blur-sm disabled:opacity-30"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Progress line ── */}
            {!paused && total > 1 && (
                <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/10">
                    <div
                        key={progressKey}
                        className="h-full bg-gradient-to-r from-indigo-400 to-violet-400 origin-left"
                        style={{ animation: `progressBar ${DURATION}ms linear forwards` }}
                    />
                </div>
            )}

            {/* ── Keyframe Definitions ── */}
            <style>{`
        @keyframes slideInRight {
          from { transform: translateX(6%) scale(1.02); opacity: 0; }
          to   { transform: translateX(0) scale(1);    opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-6%) scale(1.02); opacity: 0; }
          to   { transform: translateX(0) scale(1);      opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0) scale(1);      opacity: 1; }
          to   { transform: translateX(-5%) scale(0.98); opacity: 0; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0) scale(1);     opacity: 1; }
          to   { transform: translateX(5%) scale(0.98); opacity: 0; }
        }
        @keyframes kenBurns {
          from { transform: scale(1.06); }
          to   { transform: scale(1);    }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
        </section>
    );
};

export default HeroSlider;