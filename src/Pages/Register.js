import React from 'react'
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
import { FaUser } from 'react-icons/fa'

import { Checkbox, Input, Button } from 'antd'

const Register = () => {
  const navigate = useNavigate()
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
                        Registration Form
                      </h3>
                      <CInputGroup className="mb-3">
                        <Input
                          prefix={<FaUser size={25} color="#727272" />}
                          placeholder="User name"
                          size="middle"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <Input
                          prefix={<IoIosMail size={25} color="#727272" />}
                          placeholder="Email"
                          size="middle"
                          type="email"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <Input.Password
                          prefix={<IoMdLock size={25} color="#727272" />}
                          placeholder="Password"
                          size="middle"
                        />
                      </CInputGroup>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'baseline',
                          marginBottom: '10px',
                          width: '100%',
                        }}
                      >
                        <Checkbox>
                          <div style={{ color: '#727272' }}>
                            I agree to{' '}
                            <Button
                              style={{
                                color: '#727272',
                                textDecorationLine: 'underline',
                                padding: '0',
                              }}
                              type="link"
                            >
                              Terms of User
                            </Button>
                          </div>
                        </Checkbox>
                      </div>

                      <CButton
                        color="primary"
                        className="px-2"
                        style={{
                          width: '100%',
                          backgroundColor: '#ffc300',
                          borderStyle: 'none',
                        }}
                      >
                        Create Account
                      </CButton>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        Already have an account?
                        <Button
                          style={{ fontWeight: 'bold' }}
                          type="link"
                          onClick={() => navigate('/login')}
                        >
                          Log in
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

export default Register
