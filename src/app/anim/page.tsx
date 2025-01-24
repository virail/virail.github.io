"use client"

import { motion } from "motion/react";

export default function Anim() {
    return (
        <div className="w-full h-full p-8">
            <motion.div
                transition={{
                    staggerChildren: 0.2,
                }}
                className="relative block overflow-hidden whitespace-nowrap text-4xl font-[#dbdbdb] uppercase"
            >
                {/* <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="font-[family-name:var(--font-turret-road)] text-2xl italic"
                >
                    This is the coolest font?
                </motion.p> */}
                <div>
                { "SCROLL".split("").map((l, i) => {
                    return (
                        <motion.span
                            variants={{
                                initial: {
                                    y: 0,
                                },
                                hovered: {
                                    y: "-100%",
                                },
                            }}
                            transition={{
                                delay: 0.1 * i,
                            }}
                            key={i}
                            className="inline-block font-[family-name:var(--font-quantico)] text-4xl text-[#dbdbdb]"
                        >
                            {l}
                        </motion.span>
                    )
                })}
                </div>
                <div className="absolute inset-0">
                    { "SCROLL".split("").map((l, i) => {
                        return (
                        <motion.span
                            variants={{
                                initial: {
                                    y: "100%",
                                },
                                hovered: {
                                    y: 0,
                                },
                            }}
                            className="inline-block font-[family-name:var(--font-quantico)] text-4xl text-[#dbdbdb]"
                            transition={{
                                delay: 0.1 * i,
                            }}
                            key={i}
                        >
                            {l}
                        </motion.span>
                    );
                    })}
                </div>
            </motion.div>
            <p>test</p>
        </div>
    );
}