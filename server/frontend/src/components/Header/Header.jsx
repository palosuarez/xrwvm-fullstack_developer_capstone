import React from 'react';

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, { method: "GET" });
    const json = await res.json();
    if (json) {
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
    }
  };

  let curr_user = sessionStorage.getItem('username');

  return (
    <nav style={{
      background: "#111118",
      borderBottom: "1px solid #1e1e2e",
      padding: "0.9rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "'Courier New', monospace"
    }}>
      <a href="/" style={{
        color: "#00f0ff",
        fontFamily: "sans-serif",
        fontSize: "1.2rem",
        fontWeight: "700",
        textDecoration: "none",
        letterSpacing: "0.05em"
      }}>
        Best<span style={{color:"#7c3aed"}}>Cars</span>
      </a>

      <div style={{display: "flex", gap: "2rem", alignItems: "center"}}>
        <a href="/" style={{color:"#64748b", textDecoration:"none", fontSize:"0.78rem", letterSpacing:"0.08em", textTransform:"uppercase"}}>Home</a>
        <a href="/about" style={{color:"#64748b", textDecoration:"none", fontSize:"0.78rem", letterSpacing:"0.08em", textTransform:"uppercase"}}>About Us</a>
        <a href="/contact" style={{color:"#64748b", textDecoration:"none", fontSize:"0.78rem", letterSpacing:"0.08em", textTransform:"uppercase"}}>Contact Us</a>
        <a href="/dealers" style={{color:"#64748b", textDecoration:"none", fontSize:"0.78rem", letterSpacing:"0.08em", textTransform:"uppercase"}}>Dealerships</a>
      </div>

      <div style={{display:"flex", gap:"1rem", alignItems:"center"}}>
        {curr_user ? (
          <>
            <span style={{color:"#00f0ff", fontSize:"0.82rem", fontWeight:"600"}}>{curr_user}</span>
            <a href="/" onClick={logout} style={{color:"#64748b", textDecoration:"none", fontSize:"0.78rem", cursor:"pointer", letterSpacing:"0.06em"}}>Logout</a>
          </>
        ) : (
          <>
            <a href="/login" style={{color:"#64748b", textDecoration:"none", fontSize:"0.78rem", letterSpacing:"0.06em"}}>Login</a>
            <a href="/register" style={{color:"#00f0ff", textDecoration:"none", fontSize:"0.78rem", border:"1px solid #00f0ff44", padding:"0.3rem 0.75rem", letterSpacing:"0.06em"}}>Register</a>
          </>
        )}
      </div>
    </nav>
  )
}
export default Header
