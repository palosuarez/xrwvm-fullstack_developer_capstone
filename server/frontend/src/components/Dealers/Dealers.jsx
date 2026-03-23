import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  let [states, setStates] = useState([])
  let dealer_url = "/djangoapp/get_dealers";
  let dealer_url_by_state = "/djangoapp/get_dealers/";

  const filterDealers = async (state) => {
    let url = state === "All" ? dealer_url : dealer_url_by_state + state;
    const res = await fetch(url, { method: "GET" });
    const retobj = await res.json();
    if(retobj.status === 200) {
      setDealersList(Array.from(retobj.dealers))
    }
  }

  const get_dealers = async () => {
    const res = await fetch(dealer_url, { method: "GET" });
    const retobj = await res.json();
    if(retobj.status === 200) {
      let all_dealers = Array.from(retobj.dealers)
      let st = [];
      all_dealers.forEach((dealer) => { st.push(dealer.state) });
      setStates(Array.from(new Set(st)))
      setDealersList(all_dealers)
    }
  }

  useEffect(() => { get_dealers(); }, []);

  let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;

  return(
    <div style={{background:"#0a0a0f", minHeight:"100vh", color:"#e2e8f0", fontFamily:"'Courier New', monospace"}}>
      <Header/>
      <div style={{padding:"2rem"}}>
        <h2 style={{color:"#00f0ff", borderLeft:"3px solid #00f0ff", paddingLeft:"1rem", marginBottom:"1.5rem", fontFamily:"sans-serif"}}>
          &gt; Dealerships
        </h2>
        <table style={{width:"100%", borderCollapse:"collapse", background:"#111118", border:"1px solid #1e1e2e"}}>
          <thead>
            <tr style={{borderBottom:"2px solid #00f0ff33"}}>
              <th style={{padding:"0.75rem", color:"#00f0ff", textAlign:"left", fontSize:"0.8rem", letterSpacing:"0.08em"}}>ID</th>
              <th style={{padding:"0.75rem", color:"#00f0ff", textAlign:"left", fontSize:"0.8rem", letterSpacing:"0.08em"}}>DEALER NAME</th>
              <th style={{padding:"0.75rem", color:"#00f0ff", textAlign:"left", fontSize:"0.8rem", letterSpacing:"0.08em"}}>CITY</th>
              <th style={{padding:"0.75rem", color:"#00f0ff", textAlign:"left", fontSize:"0.8rem", letterSpacing:"0.08em"}}>ADDRESS</th>
              <th style={{padding:"0.75rem", color:"#00f0ff", textAlign:"left", fontSize:"0.8rem", letterSpacing:"0.08em"}}>ZIP</th>
              <th style={{padding:"0.75rem", color:"#00f0ff", textAlign:"left", fontSize:"0.8rem", letterSpacing:"0.08em"}}>
                <select onChange={(e) => filterDealers(e.target.value)}
                  style={{background:"#0a0a0f", color:"#00f0ff", border:"1px solid #00f0ff44", padding:"0.3rem 0.5rem", fontFamily:"'Courier New', monospace", fontSize:"0.75rem", cursor:"pointer"}}>
                  <option value="" disabled>State</option>
                  <option value="All">All States</option>
                  {states.map(state => (<option key={state} value={state}>{state}</option>))}
                </select>
              </th>
              {isLoggedIn ? <th style={{padding:"0.75rem", color:"#00f0ff", textAlign:"left", fontSize:"0.8rem", letterSpacing:"0.08em"}}>REVIEW</th> : <></>}
            </tr>
          </thead>
          <tbody>
            {dealersList.map(dealer => (
              <tr key={dealer['id']} style={{borderBottom:"1px solid #1e1e2e"}}
                onMouseEnter={e => e.currentTarget.style.background="#1e1e2e"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                <td style={{padding:"0.65rem 0.75rem", color:"#64748b", fontSize:"0.85rem"}}>{dealer['id']}</td>
                <td style={{padding:"0.65rem 0.75rem"}}>
                  <a href={'/dealer/'+dealer['id']} style={{color:"#7c3aed", textDecoration:"none", fontWeight:"600"}}
                    onMouseEnter={e => e.target.style.color="#00f0ff"}
                    onMouseLeave={e => e.target.style.color="#7c3aed"}>
                    {dealer['full_name']}
                  </a>
                </td>
                <td style={{padding:"0.65rem 0.75rem", color:"#94a3b8", fontSize:"0.85rem"}}>{dealer['city']}</td>
                <td style={{padding:"0.65rem 0.75rem", color:"#94a3b8", fontSize:"0.85rem"}}>{dealer['address']}</td>
                <td style={{padding:"0.65rem 0.75rem", color:"#64748b", fontSize:"0.85rem"}}>{dealer['zip']}</td>
                <td style={{padding:"0.65rem 0.75rem", color:"#94a3b8", fontSize:"0.85rem"}}>{dealer['state']}</td>
                {isLoggedIn ? (
                  <td style={{padding:"0.65rem 0.75rem", textAlign:"center"}}>
                    <a href={`/postreview/${dealer['id']}`}>
                      <img src={review_icon} style={{width:"28px", filter:"invert(1) sepia(1) saturate(5) hue-rotate(160deg)", opacity:"0.8"}} alt="Review"/>
                    </a>
                  </td>
                ) : <></>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Dealers
