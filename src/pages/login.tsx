import { login } from '@/api/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const { token } = await login(email, password)
      localStorage.setItem('auth', JSON.stringify({ token }))
      router.push('/task-management')
    } catch (err) {
      setError('Login failed')
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (auth) {
      router.push('/task-management')
    }
  }, [router])

  return (
    <div className='flex flex-col m-10 gap-5 items-center text-gray-600'>
      <h1 className='text-3xl font-extrabold'>Login</h1>
      {error && <p className='text-red-600'>{error}</p>}
      <div className='flex flex-col gap-3'>
        <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin} className='p-2 px-4 bg-gray-600 text-white rounded'>
          Login
        </button>
      </div>
    </div>
  )
}
