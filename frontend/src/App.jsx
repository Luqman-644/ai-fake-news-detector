import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';import Footer from './components/Footer';import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';import TextDetection from './pages/TextDetection';import ImageDetection from './pages/ImageDetection';import URLDetection from './pages/URLDetection';import Dashboard from './pages/Dashboard';import About from './pages/About';
export default function App(){return <div><AnimatedBackground/><Navbar/><main className='max-w-6xl mx-auto px-4 py-8'><Routes><Route path='/' element={<Home/>}/><Route path='/text' element={<TextDetection/>}/><Route path='/image' element={<ImageDetection/>}/><Route path='/url' element={<URLDetection/>}/><Route path='/dashboard' element={<Dashboard/>}/><Route path='/about' element={<About/>}/></Routes></main><Footer/></div>}

