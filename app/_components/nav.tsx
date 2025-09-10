import Link from 'next/link'

export const Nav = () => {
  return (
    <ul className="mb-4 border-b pb-4 flex gap-5">
      <li>
        <Link
          className="hover:underline"
          href="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="hover:underline"
          href="/about"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          className="hover:underline"
          href="/cabins"
        >
          Cabins
        </Link>
      </li>
      <li>
        <Link
          className="hover:underline"
          href="/account"
        >
          Account
        </Link>
      </li>
    </ul>
  )
}
