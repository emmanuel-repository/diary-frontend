import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {

  return (
    <>
      <div className="min-h-screen flex flex-col">

        {/* Contenido expandible */}
        <main className="flex-grow">
          
          <Suspense>
            <Outlet />
          </Suspense>

        </main>

      </div>
    </>
  )
}

export default Layout;