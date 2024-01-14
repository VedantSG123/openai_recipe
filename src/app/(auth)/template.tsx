import React from "react"

const AuthTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen p-6 flex justify-center relative">
      {/* <div className="absolute top-2 right-2">
        <ToggleTheme />
      </div> */}
      {children}
    </div>
  )
}

export default AuthTemplate
