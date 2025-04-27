import { CContainer } from '@coreui/react'
import { Input } from 'antd'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

function AppContentHeader() {
  return (
    <CContainer lg>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '5px',
          marginBottom: '15px',
        }}
        className="WelcomeAndSearch"
      >
        <h5 style={{ fontWeight: 'bolder' }}>
          Welcome Back, {capitalizeFirstLetter(JSON.parse(localStorage.getItem('user')).username)}
        </h5>
        <div className="SearchGlobal">
          <Input prefix={<BiSearch />} placeholder="Search..." size="middle" width={260} />
        </div>
      </div>
    </CContainer>
  )
}

export default AppContentHeader
