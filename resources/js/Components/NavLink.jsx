import { Link } from '@inertiajs/react'

export default function NavLink({
  active = false,
  className = '',
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      className={
        // tinggi 48px biar sejajar logo
        'inline-flex h-12 items-center border-b-2 px-3 text-sm font-medium transition duration-150 ease-in-out ' +
        (active
          ? 'border-indigo-400 text-gray-900'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700') +
        ' ' +
        className
      }
    >
      {children}
    </Link>
  )
}
