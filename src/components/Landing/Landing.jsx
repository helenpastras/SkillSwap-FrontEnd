import { Link } from "react-router"

const Landing = () => {
  return (
    <main className="landing">
      <header className="landing-hero">
        <img
          src="../src/assets/Images/SkillSwap.png"
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
          <img src="../src/assets/Images/SkillSwap1.png"/> 
          
        </div>

        <div className="feature">
          <p className="feature-text">Find your match</p>
          <img src="../src/assets/Images/SkillSwap2.png"/> 
          
        </div>

        <div className="feature">
          <p className="feature-text">Swap & learn</p>
          <img src="../src/assets/Images/SkillSwap3.png"/> 
          
        </div>
      </section>    
    </main>
  );
};

export default Landing;
