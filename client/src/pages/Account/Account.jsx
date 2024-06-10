import "./Account.css";
import { logout } from "../../store/auth.js";
import { logoutCartHandler } from "../../store/cart.js";
import { useDispatch } from "react-redux";
function Account() {
  const dispatch = useDispatch();
  const logoutFunc = () => {
    dispatch(logout());
    dispatch(logoutCartHandler());
  };
  return (
    <div className="account-root">
      <div>account</div>
      <button onClick={logoutFunc}>Log Out</button>
    </div>
  );
}

export default Account;
