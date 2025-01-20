"use client"

import { useEffect, useRef } from "react";

export default function CustomCursor() {

    const acc = 0.1;
    const radius = 18;
    const stroke = 2;
    const dotRadius = 5;
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const cursorX = useRef(0);
    const cursorY = useRef(0);
    const dotX = useRef(0);
    const dotY = useRef(0);

    useEffect(() => {
        const handleMouseMove = (event) => {
            mouseX.current = event.clientX;
            mouseY.current = event.clientY;
        }

        document.addEventListener('mousemove', handleMouseMove);
        
        const updateCursor = () => {
            cursorX.current += (mouseX.current - cursorX.current) * acc
            cursorY.current += (mouseY.current - cursorY.current) * acc


            dotX.current += (mouseX.current - dotX.current) * 0.5
            dotY.current += (mouseY.current - dotY.current) * 0.5


            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorX.current - radius - stroke}px, ${cursorY.current - radius - stroke}px, 0)`;
            }

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${dotX.current - dotRadius}px, ${dotY.current - dotRadius}px, 0)`;
            }

            requestAnimationFrame(updateCursor);
        }
    
        requestAnimationFrame(updateCursor);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return (
        <div>
            <svg 
                ref={cursorRef}
                className="cursor"
                width="40"
                height="40"
                viewBox="0 0 40 40"
            >
                <circle cx="20" cy="20" r={radius} stroke="#3b3b3b" strokeWidth={stroke} fill="white" />
            </svg>
            <svg
                ref={dotRef}
                className="cursor"
                width={dotRadius * 2}
                height={dotRadius * 2}
                viewBox={`0 0 ${dotRadius * 2} ${dotRadius * 2}`}
            >
                <circle cx={dotRadius} cy={dotRadius} r={dotRadius} fill="#3b3b3b" />
            </svg>
        </div>
    )
}