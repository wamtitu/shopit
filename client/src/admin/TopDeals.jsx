import axios from 'axios'
import '../styles/topdeals.css'
import { useEffect, useState } from 'react';

function TopDeals() {
    const [topDeal, setTopdeal] = useState([]);
    const topDeals = async()=>{
        try {
            const top = await axios.get('http://localhost:5000/topdeals');
        setTopdeal(top.data)
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        topDeals()
    }, [])

  return (
    <div className='top'>
        <h3>TOP DEALS</h3>
        {
            topDeal&& topDeal.map((deal, index)=>(
                <div className="deal-item" key={index}>
                    <img style={{borderRadius:'50%', height:'40px', width:'40px', objectFit:'cover'}} src={deal.images} alt="topDeal" />
                    <div>
                        <p >{deal.name}</p>
                    </div>
                    <p style={{fontWeight:'bold'}}>{deal.price}</p>
                </div>
            ))
        }
    </div>
  )
}

export default TopDeals