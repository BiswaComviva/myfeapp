
import axios from 'axios';
 

 export async function  getUser(userid) {
        try {
          const response =  await axios({
            method: 'post',
            url: 'http://localhost:4000/otps',
            headers: {"Content-Type": "application/json"}, 
            data: {
              userid: userid, 
            }
          });
          console.log(response);
          if(response.data.userid)
          {
              localStorage.setItem('userToken' , response.data);
              console.log(response.data);
              return response.data;
          }
        } catch (error) {
          console.log(error);
        }
    }

    
export default {getUser};