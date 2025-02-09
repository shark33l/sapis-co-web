const Home = () => {
    return (
        <div
            id="Home"
            // height calculated - 100 vertical height - (Header height + margin)
            className="h-[calc(100vh-(5.75rem))]">
            <div
                id="HeroSection"
                className="min-h-full flex flex-col lg:flex-row items-stretch space-y-3 lg:space-x-3 lg:space-y-0 mx-3 py-1">
                    <div id="hero-left" className="bg-slate-400 rounded-3xl min-h-[220px] lg:min-h-full basis-1/2">Text</div>
                    <div id="hero-right" className="bg-slate-400 rounded-3xl min-h-[350px] lg:min-h-full basis-1/2">Text</div>
                </div>
        </div>
    )
}

export default Home;