import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gpt from './pages/Gpt'
import './index.css'
import './styles/app.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={ <Gpt page="" /> }></Route>
        <Route path="/Response" element={ <Gpt page="response" /> }></Route>
        <Route path="/Chat" element={ <Gpt page="chat" /> }></Route>
        <Route path="/ChatAdvance" element={ <Gpt page="chatadvance" /> }></Route>
        <Route path="/Embed" element={ <Gpt page="embed" /> }></Route>
        <Route path="/Whisper" element={ <Gpt page="whisper" /> }></Route>
        <Route path="/Speech" element={ <Gpt page="speech" /> }></Route>
        <Route path="/Image" element={ <Gpt page="image" /> }></Route>
        <Route path="/Token" element={ <Gpt page="token" /> }></Route>
        <Route path="/Realtime" element={ <Gpt page="realtime" /> }></Route>
    </Routes>
  </BrowserRouter>
)
