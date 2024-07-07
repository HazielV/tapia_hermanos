'use client'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Footer() {
  const { pending } = useFormStatus()
  return (
    <div className="flex w-full justify-between pt-4">
      <Button type="submit" className="capitalize" disabled={pending}>
        iniciar sesion
      </Button>
      <Link href={'/'}>
        <Button variant={'outline'} type="button" className="capitalize">
          cancelar
        </Button>
      </Link>
    </div>
  )
}
