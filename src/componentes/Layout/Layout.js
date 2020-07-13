import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MenuIzquierdo from './MenuIzquierdo'

const Layout = () => {
    return (
        <Router>
            <MenuIzquierdo
            />
        </Router>
    )
}

export default Layout
