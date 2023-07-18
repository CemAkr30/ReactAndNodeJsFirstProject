import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/Auth';

/*interface IUseRequest {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' // İzin verilen HTTP metotları
}*/
//{ url, method }: IUseRequest
const useRequest = () => {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const fetchData = async (url: string, method: string, body: any) => {
       
        try {
          const token = localStorage.getItem('token');
          let response:any;
              
            if(token!=undefined){
                response = await fetch(url, {
                    method,
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`, 
                    },
                    body: JSON.stringify(body),
                });
            }else{
                response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(body),
                });
            }
    
           
    
          if (!response.ok) {
            // Hata durumunu ele al
            if(response.status === 403){
                dispatch(authActions.logoutAuth());
                navigate("/home");
                return;
            }
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
          
          const responseData = await response.json();
          setData(responseData);
        } catch (error) {
            console.log(error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      
    return { data, loading, error ,fetchData};
};

export default useRequest;
