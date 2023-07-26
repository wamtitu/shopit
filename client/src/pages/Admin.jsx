import SidenavAdmin from '../admin/SidenavAdmin'
import Main from '../admin/Main'
import '../styles/admin.css'

function Admin() {
  return (
    <div className='admin'>
        <div className="side">
         <SidenavAdmin/>
        </div>
        <div className="main">
         <Main/>
        </div>
    </div>
  )
}

export default Admin