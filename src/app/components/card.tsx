export default function Card({ title, children }: { title: string, children: React.ReactNode}) {
	return (
		<div className="relative border-[1px] border-grey h-auto w-auto self-center items-center box-border bg-light-white transition-all hover:translate-y-[-5px] shadow-[10px_10px_0_rgba(0,0,0,0.1)] hover:shadow-[15px_15px_0_rgba(0,0,0,0.2)] duration-500 ease-in-out" data-animate="">
			<p className="border-b-[1px] border-light-grey font-serif font-normal text-xl text-grey box-border p-basic">
				{ title }
			</p>
			{/* <p className="text-grey p-basic font-serif">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
				condimentum, lacus eget pretium convallis, libero erat
				condimentum orci, nec
			</p> */}
			{/* <br /> */}
			{/* <p className="text-grey p-basic font-serif">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
				condimentum, lacus eget pretium convallis, libero erat
				condimentum orci, nec
			</p> */}
			{ children}
		</div>
	);
}