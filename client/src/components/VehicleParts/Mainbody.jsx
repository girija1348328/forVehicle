import axios from 'axios';
import React,{useState,useEffect} from 'react'

function MainBody(){
    
    const [data,setData]= useState([])
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        getParts();
    })

    const getParts = async ()=>{
        const response = await axios.get("http://localhost:8080/getParts",{

        headers: {
            'x-access-token': localStorage.getItem('token'),
        }
        })
        // console.warn(response)
        if(response.status === 200){
           setData(response.data.data)
           setLoading(false);
           
        }
    }
    // useEffect( ()=>{
    //    async function fetchData() {
    //         // You can await here
    //         let result = await fetch("http://localhost:8080/getParts")
    //         result = await result.json()
    //         setData(result)
    //         // ...
    //       }
    //       fetchData();
        
    // },[])
    // console.warn("data",data)
    return(
        <div>
        {data.length === 0
          ? <h3 className='text-danger'><i>No parts available</i></h3>
          : <div className='container'>
            <div className='App'>
              <table border='1'>
             
              <tr>
              <td>S.no</td>
                <td>parts name</td>
                <td>description</td>
                <td>Billing Details</td>
                <td>price</td>
              </tr>
                {
                  loading
                ? (<p>Loading....</p>)
                : (data.map((item, index) => (
                  <tr key={item._id}>
                    <td >{index + 1}</td>
                    <td >{item.partsName}</td>
                    <td >{item.description}</td>
                    <td ><img style = {{width:200}}src = {item.productImage}/></td>
                    <td >{item.price}</td>
                    
                  </tr>
                )))
                }
    
    
              </table>
            </div>
    </div>}
      </div>
    
    )
}
export default MainBody