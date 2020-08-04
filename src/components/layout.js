import React from "react"

const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <footer>
        <span>© 2020 RedeÜberWege | Website von <a href="https://malts.me">Malte Janßen</a></span>
      </footer>
    </div>
  )
}

export default Layout
