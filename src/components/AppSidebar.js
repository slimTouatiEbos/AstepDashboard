import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { NavLink } from 'react-router-dom'
import { cilAccountLogout } from '@coreui/icons'
import { logout } from 'src/AuthHelpers'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      size="sm"
    >
      <CSidebarBrand className="d-none d-md-flex" to="/"></CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarFooter>
        <CSidebarNav className="d-none d-md-flex">
          <SimpleBar>
            <AppSidebarNav
              items={() => [
                {
                  component: CNavItem,
                  name: 'Logout',
                  to: '/login',
                  icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
                  onClick: logout,
                },
              ]}
            />
          </SimpleBar>
        </CSidebarNav>
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
