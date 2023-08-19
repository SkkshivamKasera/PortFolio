import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import About from './components/about/About.js'
import Projects from './components/projects/Projects.js'
import Contact from './components/contacts/Contact.js'
import Login from './components/authentication/Login.js'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, loaduser } from './actions/user';
import Loader from './components/loader/Loader';
import AdminPanel from './components/admin/AdminPanel.js'
import TimeLine from './components/admin/TimeLine';
import YouTube from './components/admin/YouTube';
import Project from './components/admin/Project';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


let userLoader = true

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, error, message } = useSelector((state) => state.auth)
  const { loading, user } = useSelector((state) => state.user)

  if(userLoader){
    if(error){
      toast.error(error)
      dispatch({type: "CLEAR_ERROR"})
    }
    if(message){
      toast(message)
      dispatch({type: "CLEAR_MESSAGE"})
    }
    dispatch(getUser())
    dispatch(loaduser())
    userLoader = false
  }
  return <Router>
    <Header />
    {loading ? <Loader/> : <Routes>
      <Route path='/' element={<Home timelines={user && user.timeline} youtubes={user && user.youtube} skills={user && user.skills} />} />
      <Route path='/about' element={<About about={user && user.about} />} />
      <Route path='/projects' element={<Projects projects={user && user.projects} />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/Account' element={isAuthenticated ? <AdminPanel /> : <Login />} />
      <Route path='/admin/timeline' element={isAuthenticated ? <TimeLine /> : <Login />} />
      <Route path='/admin/youtube' element={isAuthenticated ? <YouTube /> : <Login />} />
      <Route path='/admin/project' element={isAuthenticated ? <Project /> : <Login />} />
    </Routes>}
    <ToastContainer/>
    <Footer />
  </Router>
}

export default App;
