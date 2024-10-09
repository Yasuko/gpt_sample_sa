import React from 'react'

import { Link } from 'react-router-dom'

const Header = (): JSX.Element => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/Stream" className="navbar-brand">
                Stream
            </Link>
            <Link to="/Whisper" className="navbar-brand">
                Whisper
            </Link>
            <Link to="/Speech" className="navbar-brand">
                Speech
            </Link>
            <Link to="/Chat" className="navbar-brand">
                Chat
            </Link>
            <Link to="/Embed" className="navbar-brand">
                Embed
            </Link>
            <Link to="/Vision" className="navbar-brand">
                Vision
            </Link>
            <Link to="/Image" className="navbar-brand">
                Image
            </Link>
        </nav>
    )
}

export default Header
