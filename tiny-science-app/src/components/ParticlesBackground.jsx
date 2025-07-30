"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div className="absolute inset-0">
            <Particles
                init={particlesInit}
                options={{
                    fullScreen: false,
                    background: { color: "transparent" },
                    particles: {
                        number: { value: 50 },
                        color: { value: "#ffffff" },
                        shape: { type: "circle" },
                        opacity: { value: 0.3 },
                        size: { value: 4 },
                        move: { enable: true, speed: 0.8 },
                        links: { enable: true, color: '#ffffff', distance: 75 },
                    },
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "grab"
                            }
                        },
                        modes: {
                            grab: {
                                distance: 140,
                                links: {
                                    opacity: 0.4
                                }
                            }
                        }
                    }
                }}
                className="w-full h-full"
            />
        </div>
    );
}
