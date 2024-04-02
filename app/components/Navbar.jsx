import Link from 'next/link'
import Image from 'next/image'
import Dogo from './fune.png'

export default function Navbar() {
    return (
    <nav>
        <Image 
          src={Dogo}
          alt="It is fune"
          width={70}
          quality={100}
          placeholder='blur'
        />
        <h1>Fintan's Many Problems</h1>
        <Link href="/">Dashboard </Link>
        <Link href="/problems">Problems</Link>
      </nav>
    )
}