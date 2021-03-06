import React, { useState, useEffect } from "react";
import { getQuestion, createAnswer } from "../../services/gameServices";
import { useHistory } from "react-router-dom";
import "./game.css";

export default function Game(props) {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const { initialMinute = 0, initialSeconds = 20 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [button, setButton] = useState(true);
  const [warning, setWarning] = useState("");

  const history = useHistory();

  const isAuth = () => {
    if (localStorage.getItem("username")) {
      return JSON.parse(localStorage.getItem("username"));
    } else {
      return false;
    }
  };
  const username = isAuth() ? isAuth() : "";

  useEffect(async () => {
    const data = await getQuestion();
    console.info(data.data[0]);
    setQuestion(data.data[0]);
  }, []);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleInput = (e) => {
    setWarning("");
    setAnswer(e.target.value);
  };
  const handleSubmit = async (e) => {
    setButton(false);
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    const d = new Date();
    const h = addZero(d.getHours());
    const m = addZero(d.getMinutes());
    const s = addZero(d.getSeconds());
    const time = h + ":" + m + ":" + s;
    e.preventDefault();
    try {
      const data = {
        username: username,
        question: question.STT,
        time: time,
        answer: answer,
      };
      await createAnswer(data).then((response) => {
        console.log(JSON.stringify(response));
        if (response.data) {
          // localStorage.setItem("username", JSON.stringify(response.data));
          history.push("/ready");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg">
      {minutes === 0 && seconds === 0 ? (
        history.push("/ready")
      ) : (
        <h1 style={{ color: "white" }}>
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
      <div>
        <h1
          style={{ color: "yellow", marginLeft: "180px", marginRight: "180px" }}
          onCopy={(e) => {
            setWarning("Copying is strictly prohibited");
            e.preventDefault();
            return false;
          }}
        >
          Question {question.STT}: {question.content}
        </h1>
      </div>
      <br />

      <div>
        <input
          type="text"
          placeholder="Your answer..."
          onChange={handleInput}
          onPaste={(e) => {
            setWarning("Paste is strictly prohibited");
            e.preventDefault();
            return false;
          }}
          onCopy={(e) => {
            setWarning("Copying is strictly prohibited");
            e.preventDefault();
            return false;
          }}
        />
        <br />
        <br />
        <div
          className="errMessage"
          style={{ color: "yellow", fontSize: "18px" }}
        >
          {warning ? "WARNING: " + warning : ""}
        </div>
        <input
          id="submit"
          type="submit"
          value={button ? "Submit" : "Submitting..."}
          onClick={handleSubmit}
          disabled={!button}
        />
      </div>
    </div>
  );
}

// export default Game;
