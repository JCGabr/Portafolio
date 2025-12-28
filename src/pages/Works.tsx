import MotionBox from '../components/MotionBox.tsx'
import ProjectSlider from '../components/ProjectSlider.tsx';
import '../pages_styles/Works.css'

function Works(){
    return (
        <MotionBox variant='blur'>
            <div className='container-works'>
                <ProjectSlider/>
            </div>
        </MotionBox>
    )
}

export default Works;