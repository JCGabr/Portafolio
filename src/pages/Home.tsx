import ImageBox from '../components/ImageBox.tsx'
import MotionBox from '../components/MotionBox.tsx'
import '../pages_styles/Home.css'
import backgroundImg from '../assets/IMG_0092.jpg'
import { useScramble } from 'use-scramble'

function Home() {
  const titleScramble = useScramble(
    {
      text: 'José Gabriel Cornejo Castro',
      range: [65,122],
      speed: 0.3,
      tick: 1,
      scramble: 5,
    }
  );

  const contentScramble = useScramble(
    {
      text: `I'm a Computer Science student interested in cybersecurity and game development, driven by curiosity and a desire to understand how systems work.`,
      range: [65,122],
      speed: 2,
      tick: 1,
      scramble: 10,
    }
  );

  return (
    <div className='container'>
      <ImageBox image={backgroundImg} styleClass='background'/>
      <MotionBox>
        <h1 ref={titleScramble.ref}>José Gabriel Cornejo Castro</h1>
        <p ref={contentScramble.ref} className='content'>
          I'm a Computer Science student interested in cybersecurity and game development, driven by curiosity and a desire to understand how systems work. I enjoy learning through reading and deep exploration.
        </p>
      </MotionBox>
    </div>
  )
}

export default Home
