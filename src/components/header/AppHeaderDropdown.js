import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import blankAvatar from './../../assets/images/avatars/blankAvatar.jpg'
import { capitalizeFirstLetter } from '../AppContentHeader'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={blankAvatar} size="md" />
        <CBadge textColor="dark" className="HeaderElementToHide">
          {capitalizeFirstLetter(JSON.parse(localStorage.getItem('user')).username)}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
