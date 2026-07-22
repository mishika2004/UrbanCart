
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SupportChatWidget from './components/SupportChatWidget'
import RecommendChatWidget from './components/RecommendChatWidget'
import { Outlet } from "react-router-dom"

function App() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
      <SupportChatWidget />
      <RecommendChatWidget />
    </div>
  )
}

export default App