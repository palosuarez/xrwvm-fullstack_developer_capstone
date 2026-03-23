import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png"
import neutral_icon from "../assets/neutral.png"
import negative_icon from "../assets/negative.png"
import review_icon from "../assets/reviewbutton.png"
import Header from '../Header/Header';

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>)

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("dealer"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let reviews_url = root_url + `djangoapp/reviews/dealer/${id}`;
  let post_review = root_url + `postreview/${id}`;

  const get_dealer = async () => {
    const res = await fetch(dealer_url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) {
      setDealer(retobj.dealer)
    }
  }

  const get_reviews = async () => {
    const res = await fetch(reviews_url, { method: "GET" });
    const retobj = await res.json();
    if (retobj.status === 200) {
      if (retobj.reviews.length > 0) {
        setReviews(retobj.reviews)
      } else {
        setUnreviewed(true);
      }
    }
  }

  const senti_icon = (sentiment) => {
    return sentiment === "positive" ? positive_icon : sentiment === "negative" ? negative_icon : neutral_icon;
  }

  const senti_color = (sentiment) => {
    return sentiment === "positive" ? "#00f0ff" : sentiment === "negative" ? "#f43f5e" : "#94a3b8";
  }

  useEffect(() => {
    get_dealer();
    get_reviews();
    if (sessionStorage.getItem("username")) {
      setPostReview(
        <a href={post_review} style={{marginLeft:"1rem"}}>
          <img src={review_icon} style={{width:'32px', filter:"invert(1) sepia(1) saturate(5) hue-rotate(160deg)", opacity:"0.8"}} alt='Post Review'/>
        </a>
      )
    }
  }, []);

  return (
    <div style={{background:"#0a0a0f", minHeight:"100vh", color:"#e2e8f0", fontFamily:"'Courier New', monospace"}}>
      <Header/>
      <div style={{padding:"2rem", maxWidth:"900px", margin:"0 auto"}}>
        <div style={{borderLeft:"3px solid #00f0ff", paddingLeft:"1rem", marginBottom:"2rem", background:"#111118", padding:"1.5rem", border:"1px solid #1e1e2e"}}>
          <h1 style={{color:"#00f0ff", fontFamily:"sans-serif", marginBottom:"0.5rem", display:"flex", alignItems:"center"}}>
            &gt; {dealer.full_name} {postReview}
          </h1>
          <p style={{color:"#64748b", fontSize:"0.85rem"}}>
            {dealer.city} · {dealer.address} · ZIP {dealer.zip} · {dealer.state}
          </p>
        </div>

        <h2 style={{color:"#7c3aed", fontSize:"0.9rem", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"1rem"}}>
          // Customer Reviews
        </h2>

        {reviews.length === 0 && unreviewed === false ? (
          <div style={{color:"#64748b", padding:"2rem", textAlign:"center", border:"1px solid #1e1e2e"}}>
            Loading reviews...
          </div>
        ) : unreviewed === true ? (
          <div style={{color:"#64748b", padding:"2rem", textAlign:"center", border:"1px solid #1e1e2e"}}>
            No reviews yet. Be the first to review!
          </div>
        ) : (
          reviews.map((review, i) => (
            <div key={i} style={{background:"#111118", border:"1px solid #1e1e2e", borderLeft:`3px solid ${senti_color(review.sentiment)}`, padding:"1.25rem", marginBottom:"1rem", borderRadius:"2px"}}>
              <div style={{display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.75rem"}}>
                <img src={senti_icon(review.sentiment)} style={{width:"24px", height:"24px", objectFit:"contain"}} alt={review.sentiment}/>
                <span style={{color:senti_color(review.sentiment), fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:"bold"}}>
                  {review.sentiment}
                </span>
              </div>
              <p style={{color:"#e2e8f0", marginBottom:"0.75rem", lineHeight:"1.6"}}>{review.review}</p>
              <div style={{color:"#64748b", fontSize:"0.78rem"}}>
                {review.name} · {review.car_make} {review.car_model} {review.car_year}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default Dealer
