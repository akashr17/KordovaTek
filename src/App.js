import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("http://jsonplaceholder.typicode.com/users");
      setData(res.data);
    } catch (err){
      // handle error, will display error on screen for now
      setError("Failed to fetch data. Error thrown: " + err);
    } finally {
      setLoading(false);
    }
  };

  // If you want data to be loaded on rendering, enable this
  // useEffect(()=>{
  //   fetchData();
  // }, [])
  

  return (
    <div className="App">
      <header className="App-header">

        <div>
          <h1>Order Table</h1>
          <button onClick={fetchData}>
            Get Data
          </button>

          {/* Handle Loading */}
          {loading && 
            <p>Loading data...</p>
          }

          {/* Handle Error */}  
          {error && 
            <p>{error}</p>
          }

          {/* If not Loading or Error, load table*/}  
          {!loading && !error && 
            <table>
              <thead>
                <tr>
                  <th>
                    ID
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Username
                  </th>
                  <th>
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((user)=>(
                  <tr>
                    <td>
                      {user.id}
                    </td>
                    <td>
                      {user.name}
                    </td>
                    <td>
                      {user.username}
                    </td>
                    <td>
                      {user.email}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          }    

        </div>
      </header>
    </div>
  );
}

export default App;
