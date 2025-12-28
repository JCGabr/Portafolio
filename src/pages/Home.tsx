import MotionBox from '../components/MotionBox.tsx'
import '../pages_styles/Home.css'
import { Typewriter } from 'react-simple-typewriter'

function Home() {
  return (
    <div className="container-home">

      <MotionBox variant="breathe">
        <h1>
          <Typewriter
            words={['José Gabriel Cornejo Castro']}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={0}
            delaySpeed={1000}
            loop={1}
          />
        </h1>

        <p className="content">
          <Typewriter
            words={[
              "I'm a Computer Science student interested in cybersecurity and game development, driven by curiosity and a desire to understand how systems work."
            ]}
            typeSpeed={30}
            deleteSpeed={0}
            delaySpeed={1500}
            loop={1}
          />
        </p>
      </MotionBox>
    </div>
  )
}

export default Home
