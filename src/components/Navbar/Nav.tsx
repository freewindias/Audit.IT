'use client'

import { useState, useRef, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import PulsatingButton from '../ui/pulsating-button'

type UserRole = 'admin' | 'client' | null

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogin = () => {
    // Simulating login. In a real app, this would be handled by your authentication system.
    setIsLoggedIn(true)
    setUserRole('client') // or 'admin', depending on the user
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const renderNavLinks = () => {
    const commonLinks = [
      { href: '/About', label: 'About' },
    ]

    const clientLinks = [
      { href: '/form', label: 'Form' },
    ]

    const adminLinks = [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/users', label: 'Users' },
      { href: '/Submissions', label: 'Submissions' },
    ]

    const links = userRole === 'admin' ? [...commonLinks, ...clientLinks, ...adminLinks] : commonLinks

    return links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-gray-800 hover:bg-white hover:bg-opacity-30 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
      >
        {link.label}
      </Link>
    ))
  }

  return (
    <div className="w-screen flex justify-center">
      <nav className="w-full bg-background">
        <div className="mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-gray-800 font-bold text-xl">
                Logo
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {renderNavLinks()}
              <PulsatingButton
                onClick={isLoggedIn ? handleLogout : handleLogin}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </PulsatingButton>
            </div>
            <div className="md:hidden">
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div 
            ref={dropdownRef}
            className="md:hidden absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-gray-200 bg-opacity-90 backdrop-blur-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 text-center place-items-center">
              {renderNavLinks().map((link, index) => (
                <div key={index}>{link}</div>
              ))}
              <PulsatingButton
                onClick={isLoggedIn ? handleLogout : handleLogin}
                className="block w-fit text-center px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-white hover:bg-opacity-50 transition-colors duration-300"
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </PulsatingButton>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}