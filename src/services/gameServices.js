import axios from "axios";
const baseUrl = "http://localhost:2022";

const getQuestion = async () => {
  return await axios(baseUrl + "/questions/");
};

const createAnswer = async (newData) => {
  let data = JSON.stringify({
    question: newData.question,
    username: newData.username,
    time: newData.time,
    answer: newData.answer,
  });

  let config = {
    method: "post",
    url: baseUrl + "/answers",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: data,
  };
  return await axios(config);
};

export { createAnswer, getQuestion };
