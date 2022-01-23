import React from "react";
import "./home.css";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  return (
    <div className="bg">
      <div class="year">
        <img src="/assets/images/2022.png" alt="2022" />
      </div>
      <div class="trangchu">
        <img src="/assets/images/gl.png" alt="Good Luck!" />
      </div>
      <div class="batdau">
        <input
          onClick={() => {
            history.push("/game");
          }}
          value="START"
          type="button"
          className="start"
        />

        {/* <Link to="/game">START</Link> */}
      </div>
      <div class="anhdep">
        <img src="/assets/images/tiger.png" alt="Con hổ" />
      </div>
    </div>
  );
}

// export default Home;
