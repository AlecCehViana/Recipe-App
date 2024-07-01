import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          <Link to="/create-recipe">Create Recipe</Link>
          <Link to="/saved-recipes">Saved Recipes</Link>
          <a class="fancy" onClick={logout} href="#">
            <span class="top-key"></span>
            <span class="text">Logout</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
          </a>
        </>
      )}
    </div>
  );
};
