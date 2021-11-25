import { useEffect, useState } from "react";
import Routes from "../Routes/Routes";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("Not_Logged");

  const fetchData = async () => {
    const toke = JSON.parse(localStorage.getItem("token"));
    setToken(toke);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [token, user]);
  return (
    <div>
      <Routes user={user} setUser={setUser} />
    </div>
  );
}

export default App;
