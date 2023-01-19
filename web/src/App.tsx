import { Habit } from './components/Habit'

function App() {

  return (
    <>
      <Habit completed={10} />
      <Habit completed={20} />
      <Habit completed={30} />
      <Habit completed={40} />  
    </>
  )
}

export default App
