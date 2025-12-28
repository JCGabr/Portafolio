import MotionBox from '../components/MotionBox.tsx'
import ParticleBackground from '../components/ParticleBackground.tsx';
import ProjectSlider from '../components/ProjectSlider.tsx';
import '../pages_styles/Works.css'

function Works(){
    return (
        <>
        <ParticleBackground />
        <MotionBox variant='blur'>
            <div className='container-works'>
                <ProjectSlider/>
            </div>
        </MotionBox>
        </>
    )
}

export default Works;