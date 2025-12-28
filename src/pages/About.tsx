import MotionBox from '../components/MotionBox.tsx'
import '../pages_styles/About.css'

function About(){
    return (
        <div className='container-about'>
            <MotionBox variant='subtleFade'>
                <h1>About</h1>
            </MotionBox>
        </div>
    )
}

export default About;