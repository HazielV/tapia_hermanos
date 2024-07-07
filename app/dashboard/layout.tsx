import Header from './components/header'
import Sidebar from './components/sidebar'
import { logout } from '@/app/actions/auth'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#F4F4F4] h-full flex flex-col">
        <Header logout={logout} />
        {children}
      </main>
    </div>
  )
}
