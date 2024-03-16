import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signin from "./page/Signin"
import Signup from "./page/Signup"
import Dashboard from "./page/Dashboard"
import SendMoney from "./page/SendMoney"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
