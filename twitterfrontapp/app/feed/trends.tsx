import Image from "next/image";
import Moon from "@/Image/Moon.jpg"
import Cat from "@/Image/Cat.jpg"

export default function Trends() {
    return (
        <>
        <div className="trend rounded-full py-2 flex">
                    {/* <a href="#" className="search_icon"><svg className="h-8 w-8 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="11" cy="11" r="8" />  <line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></a> */}
                    <a href="#" className="search_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 pl-2 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </a>
                        <input className="search_input trend ml-2" type="text" placeholder="Search Twitter" />
                </div>

                <div className="trend rounded-xl mt-2 flex flex-col divide-y divide-gray-700">
                    <div className="flex p-2">                    
                        <h1 className="font-bold text-lg">Trends for you</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ms-auto pt-1 size-6 text-sky-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <div className="p-2 hover:bg-gray-500">
                        <p className="texte text-sm">Trending worldwide</p>
                        <h1 className="font-bold">#BreakingNews</h1>
                        <div className="flex py-1">
                            <div className="borderTrend border border-solid rounded-l-lg w-3/4">
                                <p className="texte text-sm px-1 pt-2">Space</p>
                                <p className="text-sm px-1 pb-2">Lunar photography improves the discovery of the moon</p>
                            </div>
                            <div className="ms-auto borderTrend border border-solid rounded-r-lg w-1/4">
                                <Image src={Moon} alt="Moon image" className="w-full h-full rounded-r-lg"/>
                            </div>
                        </div>
                        <p className="texte text-sm">10,094 people are Tweeting about this</p>
                    </div>
                    <div className="p-2 hover:bg-gray-500">
                        <p className="texte text-sm">Trending worldwide</p>
                        <h1 className="font-bold">#WorldNews</h1>
                        <p className="texte text-base">125K Tweets</p>
                        <p className="texte text-sm">5,094 people are Tweeting about this</p>
                    </div>
                    <div className="p-2 hover:bg-gray-500">
                        <p className="texte text-sm">Trending worldwide</p>
                        <h1 className="font-bold">#BreakingNews</h1>
                        <div className="flex py-1">
                            <div className="borderTrend border border-solid rounded-l-lg w-3/4">
                                <p className="texte text-sm px-1 pt-2">Animals</p>
                                <p className="text-sm px-1 pb-2">These cats are ready for #internationalCatDay</p>
                            </div>
                            <div className="ms-auto borderTrend border border-solid rounded-r-lg w-1/4">
                                <Image src={Cat} alt="Moon image" className="w-full h-full rounded-r-lg"/>
                            </div>
                        </div>
                        <p className="texte text-sm">2,757 people are Tweeting about this</p>
                    </div>
                    <div className="p-2 hover:bg-gray-500">
                        <p className="texte text-sm">Trending worldwide</p>
                        <h1 className="font-bold">#GreatestOfAllTime</h1>
                        <p className="texte text-base">100K Tweets</p>
                        <p className="texte text-sm">4,123 people are Tweeting about this</p>
                    </div>
                    <div className="p-2">
                        <button className="text-sky-500 hover:text-sky-800 focus:outline">Show more</button>
                    </div>
                </div>
        </>
    );
}
