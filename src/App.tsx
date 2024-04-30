import './App.css'
import { ThemeProvider } from './components/theme-provider'
import HabitList from './mycomp/HabitList'
import Navbar from './mycomp/Navbar'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar/>
      <HabitList/>
    </ThemeProvider>
  )
}

export default App
