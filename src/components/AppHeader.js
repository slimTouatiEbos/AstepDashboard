import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import ASTEPLogo from '../assets/images/ASTEPLogo.png'
//import { AppHeaderDropdown } from './header/index'

import { IoIosMail } from 'react-icons/io'
import { MdSettings } from 'react-icons/md'
import { BiSolidBellRing } from 'react-icons/bi'
import AppHeaderDropdown from './header/AppHeaderDropdown'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4 p-0">
      <CContainer className="" fluid style={{ flexWrap: 'nowrap' }}>
        <div style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
          <CHeaderToggler
            className="ps-1"
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <div
            style={{ width: '30%', cursor: 'pointer' }}
            className="HeaderElementToHide"
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          >
            <img src={ASTEPLogo} style={{ width: '100%' }} />
          </div>
        </div>

        {/*  <div style={{ display: 'flex' }}> */}
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              <BiSolidBellRing size={25} color="#ffc300" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#/Settings">
              <MdSettings size={25} color="#ffc300" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <IoIosMail color="#ffc300" size={25} />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
        {/* </div> */}
      </CContainer>
      {/*  <CHeaderDivider /> */}
    </CHeader>
  )
}

export default AppHeader
