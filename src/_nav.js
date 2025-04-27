import React from 'react'
import CIcon from '@coreui/icons-react'
import { LiaIndustrySolid } from 'react-icons/lia'
import { BiSolidFactory } from 'react-icons/bi'
import { RiApps2AiFill } from 'react-icons/ri'
import { HiClipboardDocumentList } from 'react-icons/hi2'
import { MdContactSupport, MdSettings } from 'react-icons/md'
import { cilHome } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = () => {
  return [
    {
      component: CNavTitle,
      name: 'Main Menu',
    },
    {
      component: CNavItem,
      name: 'Home',
      to: '/home',
      icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Mandrekas',
      to: '/Mandrekas',
      icon: <BiSolidFactory className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'ArcelorMittal',
      to: '/ArcelorMittal',
      icon: <LiaIndustrySolid className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'View Documents',
      to: '/documents',
      icon: <HiClipboardDocumentList className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Other',
      to: '/other',
      icon: <RiApps2AiFill className="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Useful Links',
    },
    {
      component: CNavItem,
      name: 'Help & Support',
      to: '/help',
      icon: <MdContactSupport className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Settings',
      to: '/settings',
      icon: <MdSettings className="nav-icon" />,
    },
  ]
}

export default _nav
