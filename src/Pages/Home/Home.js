import CIcon from '@coreui/icons-react'
import { Card, Input } from 'antd'
import React from 'react'
import { BiSearch, BiSolidFactory } from 'react-icons/bi'
import { HiClipboardDocumentList } from 'react-icons/hi2'
import { LiaIndustrySolid } from 'react-icons/lia'
import { MdContactSupport, MdSettings } from 'react-icons/md'
import { RiApps2AiFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <div
        /*  style={{
            display: 'flex',
            gap: '25px',
            flexWrap: 'wrap',
            justifyContent: 'start',
          }} */
        className="HomeCardsContainer"
      >
        <Card
          style={{
            width: 250,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/Mandrekas')}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <BiSolidFactory size={70} color="#ffc300" />
            <p style={{ fontFamily: 'Roboto', fontSize: '18px', opacity: '0.85' }}>Mandrekas</p>
          </div>
        </Card>
        <Card
          style={{
            width: 250,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/ArcelorMittal')}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <LiaIndustrySolid size={70} color="#ffc300" />
            <p style={{ fontFamily: 'Roboto', fontSize: '18px', opacity: '0.85' }}>ArcelorMittal</p>
          </div>
        </Card>
        <Card
          style={{
            width: 250,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/documents')}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <HiClipboardDocumentList size={70} color="#ffc300" />
            <p style={{ fontFamily: 'Roboto', fontSize: '18px', opacity: '0.85' }}>
              View Documents
            </p>
          </div>
        </Card>
        <Card
          style={{
            width: 250,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/other')}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <RiApps2AiFill size={70} color="#ffc300" />
            <p style={{ fontFamily: 'Roboto', fontSize: '18px', opacity: '0.85' }}>Other</p>
          </div>
        </Card>
        <Card
          style={{
            width: 250,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/help')}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <MdContactSupport size={70} color="#ffc300" />
            <p style={{ fontFamily: 'Roboto', fontSize: '18px', opacity: '0.85' }}>
              Help & Support
            </p>
          </div>
        </Card>
        <Card
          style={{
            width: 250,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/settings')}
        >
          <MdSettings size={70} color="#ffc300" />
          <p style={{ fontFamily: 'Roboto', fontSize: '18px', opacity: '0.85' }}>Settings</p>
        </Card>
        <Card
          style={{
            width: 250,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <BiSolidFactory size={70} color="#ffc300" />
          <p style={{ fontFamily: 'Roboto', fontSize: '18px', opacity: '0.85' }}>Logout</p>
        </Card>
      </div>
    </div>
  )
}

export default Home
