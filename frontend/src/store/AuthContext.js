import { createContext, useState, useEffect } from "react";

const BASE_URL = 'http://192.168.1.9:3000/'

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
})

export default function AuthContextProvider({children}) {
    const [accessToken, setAccessToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('accessToken')
            if(storedToken){
                setAccessToken(storedToken)
                setIsLoggedIn(true)
            }
        }
        fetchData()
    }, [])

    const signup = (name, email, password, confirmPassword) => {
        fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        })
        .then(response => {
            if(!response.ok) console.log("Couldn't Sign Up")
            else console.log("Sign In")
        })
        .catch(err => {
            console.log(err)
        })
    }

    const login = (email, password) => {
        console.log(email, password)
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Login Falied')
            } else {
                return response.json();
            }
        })
        .then(data => {
            if(!data.message){
                setIsLoggedIn(true)
                setAccessToken(data.accessToken)
                localStorage.setItem('accessToken', accessToken)
            } else {
                setIsLoggedIn(false)
                setAccessToken(null)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const refreshToken = () => {
        fetch('http://localhost:3000/auth/refresh-token', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => {
            if(!response.ok){
                setIsLoggedIn(false)
                throw new Error('Token Refresh Failed')
            }
            return response.json()
        })
        .then(data => {
            setAccessToken(data.accessToken)
            localStorage.setItem('accessToken', accessToken)
        })
        .catch(err => {
            setIsLoggedIn(false)
            console.log('Token Refresh Error: ', err)
        })
    }

    const logout = () => {
        fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Can't Logout")
            }
            return response
        })
        .then(data => {
            console.log(data)
            setAccessToken(null)
            setIsLoggedIn(false)
            localStorage.removeItem('accessToken')
        })
        .catch(err => {
            console.log('Logout Error: ', err)
        })
    }

    const ctxValue = {
        isLoggedIn, login, logout, signup
    }

    return <AuthContext.Provider value={ctxValue}>
        {children}
    </AuthContext.Provider>

}
