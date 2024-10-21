import styles from './App.module.css'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import Projects from './components/Projects/Projects'

function App() {

  return (
    <div className={styles.App}>
      <Navbar/>
      <Profile/>
      <About/>
      <Projects/>
      <Contact/>
    </div>
  )
}

export default App
