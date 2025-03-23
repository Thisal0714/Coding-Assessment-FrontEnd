import axios from "axios";

class Service{

    static BASE_URL = "http://localhost:8080/";
    static async addTask(reviewData){
        try{
            const response=await axios.post(`${Service.BASE_URL}addTask`, reviewData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            return response.data;
        }catch(error){
            throw error.response ? error.response.data : error;
        }
    }
    static async getTasks() {
        try {
          const response = await axios.get(`${Service.BASE_URL}getTasks`);
          return response.data;
        } catch (error) {
          console.error("Error fetching Tasks:", error);
          throw error.response ? error.response.data : error;
        }
}
}
export default Service;