'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT, jwtVerify } from 'jose'

const clave = process.env.PRIVATE_KEY as string
const key = new TextEncoder().encode(clave)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .sign(key)
}
export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}
export async function getSession() {
  const session = cookies().get('session')?.value

  if (!session) return null
  return await decrypt(session)
}
export async function logout() {
  cookies().set('session', '', { expires: new Date(0) })
  redirect(`/login`)
}
export async function login(formData: FormData) {
  // Validate form fields

  const data = {
    usuario: formData.get('usuario'),
    password: formData.get('password'),
  }
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt(data)

  cookies().set('session', session, { expires, httpOnly: true, path: '/' })

  // If any form fields are invalid, return early
  /* if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  } */
  redirect(`/dashboard`)
  // Call the provider or db to create a user...
}
