import '../styles/dash.css'
import TopDeals from './TopDeals'
import TotalClients from './TotalClients'
import TotalProducts from './TotalProducts'
function DashboardAdmin() {
  return (
    <div className = "dashboard">
      <div className="box box1"><TopDeals/></div>
      <div className="box box2">box</div>
      <div className="box box3"><TotalClients/></div>
      <div className="box box4">products</div>
      <div className="box box5">box5</div>
      <div className="box box6">box6</div>
    </div>
  )
}

export default DashboardAdmin