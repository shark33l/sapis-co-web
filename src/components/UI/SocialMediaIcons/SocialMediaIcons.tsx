// Icons
import Facebook from '../../../assets/icons/socialmedia/facebook.svg?react'
import Instagram from '../../../assets/icons/socialmedia/instagram.svg?react'
import LinkedIn from '../../../assets/icons/socialmedia/linkedin.svg?react'

interface SocialMediaIconProps {
    width: number
  }

const SocialMediaIcons: React.FC<SocialMediaIconProps> = ({ width }) => {
    return (
        <div id="SocialMediaIcons" className="flex flex-row space-x-2 lg:space-x-5">
            <a href="facebook.com" target='blank'><Facebook className=" fill-black  hover:fill-[#1877F2] transition-all duration-300 ease-in-out" width={width}/></a>
            <a href="facebook.com" target='blank'><Instagram className="fill-black  hover:fill-[#E1306C] transition-all duration-300 ease-in-out" width={width}/></a>
            <a href="facebook.com" target='blank'><LinkedIn className=" fill-black  hover:fill-[#0077B5] transition-all duration-300 ease-in-out" width={width}/></a>
        </div>
    )
}

export default SocialMediaIcons