import Image from 'next/image'
import logo from './logo512.png'

export const Header = () => {
  return (
    <header className="app-header">
      <Image
        src={logo}
        alt="React logo"
      />
      <h1>The React Quiz</h1>
    </header>
  )
}
