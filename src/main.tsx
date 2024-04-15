import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gpt from './pages/Gpt'
import './index.css'
import './styles/app.css'
import './styles/chat.css'
import './styles/tag.css'
import './styles/search.css'
import './styles/whisper.css'
import './styles/embed.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={ <Gpt page="" /> }></Route>
        <Route path="/Chat" element={ <Gpt page="chat" /> }></Route>
        <Route path="/Embed" element={ <Gpt page="embed" /> }></Route>
        <Route path="/Whisper" element={ <Gpt page="whisper" /> }></Route>
        <Route path="/Speech" element={ <Gpt page="speech" /> }></Route>
        <Route path="/Vision" element={ <Gpt page="vision" /> }></Route>
        <Route path="/Image" element={ <Gpt page="image" /> }></Route>
        <Route path="/Token" element={ <Gpt page="token" /> }></Route>
    </Routes>
  </BrowserRouter>
)
