import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useContext } from 'react'
import { AuthContext } from '../store/AuthContext'

const LoginModal = forwardRef(function LoginModal ({},
  ref
) {
  const dialog = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login} = useContext(AuthContext)
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal()
      }
    }
  })

  function onChangeEmail (event) {
    setEmail(event.target.value)
  }

  function onChangePassword (event) {
    setPassword(event.target.value)
  }

  function onSubmit (event) {
    event.preventDefault()
    console.log(email, password)
    login(email, password)
    dialog.current.close()

  }

  return createPortal(
    <dialog ref={dialog} className='login-modal'>
      <h2>Login Form</h2>
      <form className='login-form'>
        <label>
          Email:
        </label>
        <input name='email' value={email} onChange={event => onChangeEmail(event)} />
        <label>
          Password:
        </label>
        <input name='password' value={password} onChange={event => onChangePassword(event)} />
        <button type='submit' onClick={e => onSubmit(e)}>
          Submit
        </button>
      </form>
      <form className='close-modal' method='dialog'>
        <div></div>
        <button>
          Close
        </button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
})

export default LoginModal
