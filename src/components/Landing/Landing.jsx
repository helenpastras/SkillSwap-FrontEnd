import { Link } from "react-router"

import logo from '../../assets/images/SkillSwap.png'
import img1 from '../../assets/images/SkillSwap1.png'
import img2 from '../../assets/images/SkillSwap2.png'
import img3 from '../../assets/images/SkillSwap3.png'

const Landing = () => {
  return (
    <main className="landing">
      <header className="landing-hero">
        <img
          src={logo}
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
          <img src={img1}/> 
          
        </div>

        <div className="feature">
          <p className="feature-text">Find your match</p>
          <img src={img2}/> 
          
        </div>

        <div className="feature">
          <p className="feature-text">Swap & learn</p>
          <img src={img3}/> 
          
        </div>
      </section>    
    </main>
  );
};

export default Landing;
