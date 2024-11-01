import React, { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Facebook, Mail } from "lucide-react"
import axios from '../../utils/axiosConfig'

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const toggleView = () => {
    setIsSignUp(!isSignUp)
    setMessage("")
    setIsError(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setIsError(false)

    if (isSignUp && password !== confirmPassword) {
      setMessage("Passwords do not match")
      setIsError(true)
      return
    }

    const url = isSignUp ? '/users' : '/sessions'
    const data = { email, password }

    try {
      const response = await axios.post(`http://localhost:5000${url}`, data)
      setMessage(response.data.message)
      setIsError(false)
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred")
      setIsError(true)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-300 to-purple-400">
      <div className="relative">
        <img
          src="https://via.placeholder.com/800x400"
          alt="Decorative background"
          className="absolute -z-10 rounded-3xl opacity-50 blur-sm"
        />
        <div className="z-10 w-96 rounded-3xl bg-white bg-opacity-80 p-8 shadow-xl backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-bold">{isSignUp ? "Sign Up" : "Sign In"}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <Input 
                  className="w-full" 
                  placeholder="Full Name" 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}
            <div>
              <Input 
                className="w-full" 
                placeholder="Email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input 
                className="w-full" 
                placeholder="Password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignUp && (
              <div>
                <Input 
                  className="w-full" 
                  placeholder="Confirm Password" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <Button className="w-full bg-purple-600 hover:bg-purple-700" type="submit">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          {message && (
            <p className={`mt-4 text-center text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
          <div className="mt-4 text-center text-sm text-gray-600">
            Or {isSignUp ? "sign up" : "sign in"} with
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Google</span>
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <Button variant="link" className="p-0 text-purple-600" onClick={toggleView}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}