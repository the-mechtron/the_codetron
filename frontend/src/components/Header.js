import AuthContextProvider, { AuthContext } from '../store/AuthContext'
import { useContext, useRef } from 'react'
import LoginModal from './LoginModal'

export default function Header () {
  const {login, logout, isLoggedIn} = useContext(AuthContext)
  const loginModal = useRef(null)
  function onClick () {
    console.log('login method')
    if (!isLoggedIn) {
      console.log('here')
      loginModal.current.open()
    } else {
      console.log('here: ', isLoggedIn)
      logout('pmaroria1@gmail.com', 'hello')
    }
  }

  return <header>
           <LoginModal ref={loginModal} />
           <button onClick={onClick} className='run-code'>
             {isLoggedIn ? 'Logout' : 'Login'}
           </button>
           {!isLoggedIn ? <button onClick={()=>{}} className='run-code'>
                            Signup
                          </button> : null}
         </header>
}
