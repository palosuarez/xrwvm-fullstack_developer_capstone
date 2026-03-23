import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let review_url = root_url + `djangoapp/add_review`;
  let carmodels_url = root_url + `djangoapp/get_cars`;

  const inputStyle = {
    background: "#0a0a0f",
    border: "1px solid #1e1e2e",
    color: "#e2e8f0",
    padding: "0.65rem 1rem",
    fontFamily: "'Courier New', monospace",
    fontSize: "0.85rem",
    width: "100%",
    outline: "none",
    borderRadius: "2px"
  };

  const labelStyle = {
    color: "#64748b",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "0.4rem",
    display: "block"
  };

  const postreview = async () => {
    let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    if (name.includes("null")) { name = sessionStorage.getItem("username"); }
    if (!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory");
      return;
    }
    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];
    let jsoninput = JSON.stringify({
      "name": name, "dealership": id, "review": review,
      "purchase": true, "purchase_date": date,
      "car_make": make_chosen, "car_model": model_chosen, "car_year": year,
    });
    const res = await fetch(review_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsoninput,
    });
    const json = await res.json();
    if (json.status === 200) {
      window.location.href = window.location.origin + "/dealer/" + id;
    }
  }

  const get_dealer = async () => {
    const res = await fetch(dealer_url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) { setDealer(retobj.dealer) }
  }

  const get_cars = async () => {
    const res = await fetch(carmodels_url, { method: "GET" });
    const retobj = await res.json();
    setCarmodels(Array.from(retobj.CarModels))
  }

  useEffect(() => { get_dealer(); get_cars(); }, []);

  return (
    <div style={{background:"#0a0a0f", minHeight:"100vh", color:"#e2e8f0", fontFamily:"'Courier New', monospace"}}>
      <Header/>
      <div style={{padding:"2rem", maxWidth:"640px", margin:"0 auto"}}>
        <div style={{borderLeft:"3px solid #00f0ff", paddingLeft:"1rem", marginBottom:"2rem"}}>
          <p style={{color:"#64748b", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.25rem"}}>// Post Review</p>
          <h1 style={{color:"#00f0ff", fontFamily:"sans-serif", fontSize:"1.5rem"}}>{dealer.full_name}</h1>
          <p style={{color:"#64748b", fontSize:"0.8rem", marginTop:"0.25rem"}}>{dealer.city} · {dealer.state}</p>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:"1.25rem"}}>
          <div>
            <label style={labelStyle}>Your Review</label>
            <textarea rows="6" onChange={(e) => setReview(e.target.value)}
              style={{...inputStyle, resize:"vertical"}}
              placeholder="Share your experience with this dealership..."/>
          </div>

          <div>
            <label style={labelStyle}>Purchase Date</label>
            <input type="date" onChange={(e) => setDate(e.target.value)} style={inputStyle}/>
          </div>

          <div>
            <label style={labelStyle}>Car Make & Model</label>
            <select onChange={(e) => setModel(e.target.value)} style={{...inputStyle, cursor:"pointer"}}>
              <option value="" disabled selected>Choose Car Make and Model</option>
              {carmodels.map((carmodel, i) => (
                <option key={i} value={carmodel.CarMake + " " + carmodel.CarModel}>
                  {carmodel.CarMake} {carmodel.CarModel}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Car Year</label>
            <input type="number" onChange={(e) => setYear(e.target.value)}
              max={2023} min={2015} placeholder="e.g. 2023" style={inputStyle}/>
          </div>

          <button onClick={postreview} style={{
            background: "transparent",
            border: "1px solid #00f0ff",
            color: "#00f0ff",
            padding: "0.75rem 2rem",
            fontFamily: "'Courier New', monospace",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.2s",
            marginTop: "0.5rem"
          }}
          onMouseEnter={e => {e.target.style.background="#00f0ff"; e.target.style.color="#0a0a0f"}}
          onMouseLeave={e => {e.target.style.background="transparent"; e.target.style.color="#00f0ff"}}>
            Post Review
          </button>
        </div>
      </div>
    </div>
  )
}
export default PostReview
