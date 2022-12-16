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
    </div>
  </>

  )
}

export { Search };
