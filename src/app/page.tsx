"use client"

import { useEffect, useRef } from "react";
import anime from "animejs";


export default function Home() {

	const appRef = useRef(null);
	const container = useRef(null);

	const tl = useRef();

	useEffect(() => {

		const handleScroll = () => {
			
		};
		
		document.addEventListener('scroll', () => { document.body.style.setProperty('--scroll', window.scrollY / (document.body.offsetHeight - window.innerHeight))}, false)
		// tl.current = anime.timeline({
		// 	duration: 1000,
		// 	easing: 'easeInOutQuad',
		// 	direction: 'alternate',
		// 	loop: true,
		// });
		// tl.current.add({
		// 	targets: '.box',
		// 	// translateX: 100,
		// 	scale: 0.75,
		// 	translateY: 40,
		// 	easing: 'easeInOutQuad',
		// 	delay: anime.stagger(200, {grid: [12, 3], from: 'center'}),
		// })
		const moveGradient = (event) => {
			const winWidth = window.innerWidth;
			const winHeight = window.innerHeight;

			const mouseX = Math.round((event.clientX / winWidth) * 100);
			const mouseY = Math.round((event.clientY / winHeight) * 100);

			if (appRef) {
				appRef.current.style.setProperty(
					'--mouse-x',
					mouseX.toString() + "%"
				);
				appRef.current.style.setProperty(
					'--mouse-y',
					mouseY.toString() + "%"
				);
			}
		}
		
		document.addEventListener('mousemove', moveGradient);

		return () => {
			document.removeEventListener('mousemove', moveGradient);
		}
	}, [appRef])
	return (
		<div ref={appRef} id="app" className="app">
			<p>test</p>
			{/* <section className="flex flex-col boxes-container gap-4" ref={container}>
				<div className="box w-20 h-20 bg-gradient-to-r from-indigo-400 to-slate-300">Box-1</div>
				<div className="box w-20 h-20 bg-gradient-to-r from-indigo-400 to-slate-300">Box-2</div>
				<div className="box w-20 h-20 bg-gradient-to-r from-indigo-400 to-slate-300">Box-3</div>
			</section> */}
			<section className="grid grid-cols-12 gap-2">
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
				<div className="box w-20 h-20 bg-emerald-300" />
			</section>
		</div>
	);
}
