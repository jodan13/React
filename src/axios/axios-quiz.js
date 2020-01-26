import Axios from "axios";

export default Axios.create({
  baseURL: "https://react-quiz-f2424.firebaseio.com/"
});
