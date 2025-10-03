import { Link } from "react-router"

const Landing = () => {
  return (
    <main className="landing">
      <header className="landing-hero">
        <img
          src="https://imgur.com/Ri76Z2j.png"
          alt="SkillSwap-logo"
          className="landing-logo"
        />

        <h2>Swap Skills, Not Cash</h2>
        <p className="subtitle">
          Offer what you know, learn what you don’t. Join the SkillSwap community.
        </p>

        <div>
          <Link className="button" to="/sign-up">Create an account</Link>
          <Link className="button" to="/sign-in">Sign in</Link>
        </div>
      </header>

      <section className="features">
        <div className="feature">
          <p className="feature-text">Offer your skills</p>
          <img src="https://imgur.com/OWiFnEm.png"/> 
          
        </div>

        <div className="feature">
          <p className="feature-text">Find your match</p>
          <img src="https://imgur.com/OcrnZaY.png"/> 
          
        </div>

        <div className="feature">
          <p className="feature-text">Swap & learn</p>
          <img src="https://imgur.com/UwVM5Yr.png"/> 
          
        </div>
      </section>    
    </main>
  );
};

export default Landing;
