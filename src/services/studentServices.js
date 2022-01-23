import axios from "axios";
const baseUrl = "http://localhost:2022";

const handleSignUpAPI = async (newData) => {
  let data = JSON.stringify({
    username: newData.username,
  });

  let config = {
    method: "post",
    url: baseUrl + "/students/signup",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: data,
  };
  console.log(baseUrl);
  return await axios(config);
};

export { handleSignUpAPI };
