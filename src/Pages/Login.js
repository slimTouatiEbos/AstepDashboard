import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import ASTEPLogo from '../assets/images/ASTEPLogo.png'
import SkyImg from '../assets/images/SkyImg.png'
import { IoIosMail, IoMdLock } from 'react-icons/io'
import { Checkbox, Input, Button } from 'antd'
import { login } from 'src/AuthHelpers'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [InputStatus, setInputStatus] = useState('')
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/home')
    }
  }, [])

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }} className="AuthPage">
      <CContainer style={{ width: '55%', height: '100%', padding: '0' }} className="AuthImage">
        <img src={SkyImg} style={{ width: '100%', height: '100%' }} />
      </CContainer>

      <div /* style={{ width: '45%', height: '100%', display: 'flex' }} */ className="AuthCard">
        <CContainer style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
          <CRow className="justify-content-center">
            <CCol md={8} style={{ display: 'flex', alignItems: 'center' }}>
              <CCardGroup>
                <CCard className="p-4" style={{ borderStyle: 'none' }}>
                  <CCardBody>
                    <CForm
                      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                    >
                      <img
                        src={ASTEPLogo}
                        style={{ width: '70%', height: '60%', marginBottom: '30px' }}
                      />

                      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Welcome to ASTEP
                      </h3>

                      <CInputGroup className="mb-3">
                        <Input
                          prefix={<IoIosMail size={25} color="#727272" />}
                          placeholder="Email"
                          size="middle"
                          type="email"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value)
                            setInputStatus('')
                          }}
                          status={InputStatus}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <Input.Password
                          prefix={<IoMdLock size={25} color="#727272" />}
                          placeholder="Password"
                          size="middle"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                            setInputStatus('')
                          }}
                          status={InputStatus}
                        />
                      </CInputGroup>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          marginBottom: '10px',
                          width: '100%',
                        }}
                      >
                        <Checkbox>
                          <div style={{ color: '#727272' }}>Remember me</div>
                        </Checkbox>
                        <Button
                          style={{ color: '#727272', textDecorationLine: 'underline' }}
                          type="link"
                        >
                          Forgot password?
                        </Button>
                      </div>
                      <p id="loginErr" style={{ color: '#FF0000' }}></p>
                      <CButton
                        color="primary"
                        className="px-4"
                        style={{ width: '100%', backgroundColor: '#ffc300', borderStyle: 'none' }}
                        onClick={() => {
                          login(username, password)
                            .then(() => navigate('/home'))
                            .catch((res) => {
                              let myElement = document.getElementById('loginErr')
                              myElement.innerHTML = res?.message
                              setInputStatus('error')
                            })
                        }}
                      >
                        Login
                      </CButton>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        Still without an account?
                        <Button
                          style={{ fontWeight: 'bold' }}
                          type="link"
                          onClick={() => navigate('/Register')}
                        >
                          Create one
                        </Button>
                      </div>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  )
}

export default Login
