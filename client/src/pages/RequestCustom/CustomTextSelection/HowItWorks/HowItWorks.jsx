import "./HowItWorks.css";

function HowItWorks() {
  return (
    <div className="howItWorks-root">
      <h2 className="howItWorks-title">How It works</h2>
      <ol className="howItWorks-list">
        <li className="howItWorks-bullet">
          Fill out the custom piece request form below. I will fill any omitted
          options to my desired taste and style.
        </li>
        <li className="howItWorks-bullet">
          Once I receive your request, I will determine if it is a project that
          I wish to take on. If I deny your request I will let you know via the
          email you provided, along with some suggestions, for your approval,
          that would allow me to change my mind.
        </li>
        <li className="howItWorks-bullet">
          If I approve your request, I will calculate what I beleive to be a
          fair price, taking into account material cost, labor, and shipping.
          This price will not be up for negotiation, unless we both agree to
          scale down the project.
        </li>
        <li className="howItWorks-bullet">
          If we are in agreement, I will only begin working on your project once
          I have received payment in full. Once you provide me with payment and
          your shipping information, I will let you know an approximate time
          frame in which you can expect to receive your piece.
        </li>
      </ol>
    </div>
  );
}

export default HowItWorks;
