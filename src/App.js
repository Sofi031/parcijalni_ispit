import {useState,useEffect} from "react"
import './App.css';

function App()
{
  const [userDetails, setUserDetails] = useState(null);
  const [userRepo, setUserRepo] = useState(null);
  
  const [user, setUser] = useState(null);
  
  const input = (event) =>
  {
    setUser(state => event.target.value);
  }
  const submit = (event) =>
  {
    event.preventDefault() 

    fetch(`https://api.github.com/users/${user}`).then(response => response.json()).then(data => setUserDetails(data))
    fetch(`https://api.github.com/users/${user}/repos`).then(response => response.json()).then(data => setUserRepo(data));
    setUser(null);
    
  }
  
  
  if (userRepo !== null)
  {
    const repoMaps = userRepo.map((item, index) =>
    {
      return (
        <li>{item.full_name}</li>
      )
    
    })
  }
  const reset = (event) =>
  {
    setUser(null);
    setUserRepo(null);
    setUserDetails(null);
    

    }
  
  return (
    <div>
    <form onSubmit={submit}>
      <p>Github Username:</p>
      <input type="text" onChange={input}  />
      <button type="submit"  >Go</button>
      <button type="button" onClick={reset}  >Reset</button>
      </form>
      {userDetails!==null&&<div>
        <img src={userDetails.avatar_url} alt={userDetails.id}  />
        <p>Name:{user}</p>
        {userDetails!==null&&<p>bio:{userDetails.bio}</p>}
        {userRepo !== null &&        
        <ul>
          
        </ul>}
        
      </div>}
    </div>
    
  );
}

export default App;
