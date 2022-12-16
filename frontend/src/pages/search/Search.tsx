import Button from 'react-bootstrap/Button';
import TextField from "@mui/material/TextField";
//import List from "./Components/List"

function Search() {
  return (
  <>
     <div className="main">
      <h1>Search contract</h1>
      <div style={{color:'white'}} className="search">
        <TextField style={{backgroundColor:"#ffffff", color:'white'}}
          id="outlined-basic"
          variant="outlined"
          fullWidth
        />
      </div>
      <Button onClick={() => fetch("https://idea.gear-tech.io/programs/" + document.getElementById('outlined-basic')?.nodeValue + "?node=wss%3A%2F%2Fnode-workshop.gear.rs")}>Enviar</Button>
    </div>
  </>

  )
}

export { Search };
