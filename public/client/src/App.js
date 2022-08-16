import './App.css';
import HomePage from './components/homePage';
import {useState,useEffect} from "react";
import "./css/login.css";


function App() {
  //alert("hi");

  const [is_logged,set_logged] = useState(false);
  const [loading,setLoading] = useState(false);
  const [teacher_id,setTeacherId] = useState(1);
  const [isAdmin,setAdmin] = useState(false);
  const [user,setuser] = useState({
      username:null,
      pass:null
  })

  useEffect(()=>{
    //alert("HI");
    checkLogged();
  },[]);

  
  function checkLogged(){
    setLoading(true);
    //alert("HI");
    fetch("/isLogged",{method:"GET"})
    .then(res=>{
      if(res.ok)return res.json();
      else{
        setLoading(false);
        set_logged(false);
      }
    })
    .then(data=>{
      setTeacherId(data.teacher_id);
      setAdmin(data.isAdmin);
      setLoading(false);
      set_logged(true);
    })
    .catch(e=>console.log(e));
  }

  function logout(){
    setLoading(true);
    fetch("/login/logout")
    .then(res=>{
      checkLogged();
    })
    .catch(e=>console.log(e));
  }

  function change(e){
    setuser((prev)=>{
      return {...prev, [e.target.name] : e.target.value}
    })
  }

  function submit(e){
    setLoading(true);
    fetch("/login",{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        username:user.username,
        pass:user.pass
      })
    })
    .then(res=>{
      if(res.ok)return res.json();
      else {
        setLoading(false);
        set_logged(false);
      }
    })
    .then(data=>{
      setTeacherId(data.teacher_id);
      setAdmin(data.isAdmin);
      setLoading(false);
      set_logged(true);
    })
    .catch(e=>{setLoading(false);console.log(e)});

  }


  return (
    <div className="App">
      {
        !loading?
        is_logged?<HomePage isAdmin={isAdmin} teacher_id={teacher_id} logOut = {logout}></HomePage>:
          <div className="LoginDetails">

            <h2>Login to view schedule</h2>

            <div className="login-username">
              <label for="username">Enter Username :</label>
          <input name = "username" id="username"  onChange={change}></input>
            </div>

            <div className="login-pass">
              <label for="pass" >Enter Password :</label>
          <input name = "pass" id = "pass" type="password" onChange={change} ></input>
            </div>

          <button onClick={submit}>Submit</button>

          <p> use this for login = [ username : "admin"  , password : "1238904567" ] </p>
        </div>
        :<div>
          LOADING.....
        </div>
      }
      
        
    </div>
  );
}

export default App;
