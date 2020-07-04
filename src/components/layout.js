import React from "react"

const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <footer>
        <span>© 2020 RedeÜberWege</span>
      </footer>
    </div>
  )
}

export default Layout
