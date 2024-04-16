import "./suggestions.css";

function Suggestions() {
  return (
    <div className="suggestions-root">
      <h2 className="suggestions-title">Suggestions</h2>
      <ul className="suggestions-list">
        <li className="suggestions-bullet">
          Glass is rigid in nature, it cannot be curved once it is formed. Any
          curved section of the design will have to be broken up into smaller,
          straight pieces to mimic a curve. The less curves in your design, the
          cheaper it will be.
        </li>
        <li className="suggestions-bullet">
          If your request is for a 3D object, submitting a complete 2D schematic
          will greatly improve the chances of acceptance.
        </li>
        <li className="suggestions-bullet">
          Choose the translucent type if you plan to keep your piece directly
          on/over a light source or in a high light area. The colors on
          translucent glass darken significantly when not in light. If not,
          choose the opaque type, as it will look more consistant in all levels
          of light.
        </li>
        <li className="suggestions-bullet">
          Keep it as simple as you can. Overly complex requests will be met with
          a high price and long time frame.
        </li>
      </ul>
    </div>
  );
}

export default Suggestions;
