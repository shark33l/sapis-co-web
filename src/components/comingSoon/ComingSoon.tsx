import EmailSubmission from "./EmailSubmission";
import heroImage from '/images/coming-soon-hero-1920.jpg';

function ComingSoon() {
    return (
        <>
            <div
                id="hero"
                className="relative h-[66.67vh] w-screen bg-cover bg-center flex flex-col items-center justify-center text-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10">
                    <h1 className="text-white text-5xl font-bold mb-2">Sapis</h1>
                    <p className="text-xl text-white">Empowering Energy Sector with Superior Infrastructure Solutions</p>
                </div>
            </div>
            <div className="h-[33.33vh] bg-dark-ui-grey flex flex-col items-center justify-center text-center">
                <div className="text-white">
                    <h1 className="text-4xl font-bold">Launching Soon</h1>
                    <p className="mt-4 text-lg">We’re building <span className="bg-gradient-to-r from-blue-300 via-green-500 to-indigo-200 inline-block text-transparent bg-clip-text">something remarkable</span> — be the first to see what’s next.</p>
                </div>
                <div className="mt-8">
                    <EmailSubmission />
                    <p className="mt-2 text-gray-400 text-sm">Be the first to know when we launch!</p>
                </div>
            </div>
        </>
    );
}

export default ComingSoon;
