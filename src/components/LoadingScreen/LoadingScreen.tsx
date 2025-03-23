import LoadingLogo from "../UI/LogoAnimation/LoadingLogo"

const LoadingScreen = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="w-[100px] h-[100px] relative">
                <LoadingLogo />
            </div>
        </div>
    )
}

export default LoadingScreen;