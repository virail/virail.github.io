"use client"

import { useEffect, useRef } from "react";
import Card from "./components/card";


export default function Home() {

	const appRef = useRef(null);

	useEffect(() => {

		const elements = document.querySelectorAll('[data-animate]');
		console.log(elements);
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('fadeInUp');
					entry.target.classList.remove('fadeOutDown');
				}
				else {
					entry.target.classList.add('fadeOutDown');
					entry.target.classList.remove('fadeInUp');
				}
			});
		}, {
			threshold: 0.5
		});

		elements.forEach(element => {
			observer.observe(element);
		})
		
		document.addEventListener('scroll', () => { document.body.style.setProperty('--scroll', window.scrollY / (document.body.offsetHeight - window.innerHeight))}, false)
		const moveGradient = (event) => {
			const winWidth = window.innerWidth;
			const winHeight = window.innerHeight;

			const mouseX = Math.round((event.clientX / winWidth) * 100);
			const mouseY = Math.round((event.clientY / winHeight) * 100);

			// const mouseX = event.clientX;
			// const mouseY = event.clientY;

			if (appRef) {
				appRef.current.style.setProperty(
					'--mouse-x',
					mouseX.toString() + "px"
				);
				appRef.current.style.setProperty(
					'--mouse-y',
					mouseY.toString() + "px"
				);
			}
		}
		
		document.addEventListener('mousemove', moveGradient);

		return () => {
			document.removeEventListener('mousemove', moveGradient);
			observer.disconnect();
		}
	}, [appRef])
	return (
		<div ref={appRef} id="app" className="app">
			<p className="text-grey font-bold text-2xl text-center self-center align-middle font-[family-name:var(--font-dm-serif-display)] p-basic pb-0 fadeInUp text-shadow">Hi I&apos;m James Bridge</p>
			<p className="text-grey text-base text-center self-center align-middle">Junior Developer @ Warren James Jewellers</p>
			<div className="grid grid-cols-2 gap-8 px-8">
				<Card title="test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
				<Card title="Test">
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
					<br />
					<p className="text-grey p-basic font-serif">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
						condimentum, lacus eget pretium convallis, libero erat
						condimentum orci, nec
					</p>
				</Card>
			</div>
		</div>
	);
}
