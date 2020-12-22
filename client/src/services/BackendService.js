import API from "./API"

class BackendService{
    static async checkout(data){
        const response=await API().post("/checkout",data)
        return response.data;
    }
}


export default BackendService;