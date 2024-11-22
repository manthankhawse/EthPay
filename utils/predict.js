import axios from "axios";

const predict = async (details)=>{
    const response = await axios.post("http://localhost:8000/predict", details);
    console.log(response.data);  // Handle the response data
    return response.data;
}

export default predict;