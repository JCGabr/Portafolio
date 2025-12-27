import ImageBox from '../components/ImageBox.tsx'
import MotionBox from '../components/MotionBox.tsx'
import '../pages_styles/Home.css'
import backgroundImg from '../assets/IMG_0092.jpg'

function Home() {

  return (
    <div className='container'>
      <ImageBox image={backgroundImg} styleClass='background'/>
      <MotionBox>
        <h1>José Gabriel Cornejo Castro</h1>
        <p className='content'>
          I'm a Computer Science student interested in cybersecurity and game development, driven by curiosity and a desire to understand how systems work. I enjoy learning through reading and deep exploration.
        </p>
      </MotionBox>
    </div>
  )
}

export default Home
