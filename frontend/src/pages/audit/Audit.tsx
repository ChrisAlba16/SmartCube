import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function Audit() {

  return (
    <>
      <div>
        <form>
          <textarea style={{
            backgroundColor: 'hsla(0,0%,100%,.102)',
          }} id="description" name="description"
            rows={8} cols={70} placeholder="Ingrese el contenido de tu codigo Rust" />

        </form>
      </div>

      <div style={{ marginLeft: '700px', marginBottom: '90px' }} >


        <form>
          <textarea style={{
            backgroundColor: 'hsla(0,0%,100%,.102)',
          }} id="description" name="description"
            rows={7} cols={54} placeholder="Ingrese el contenido de tu codigo Rust" />

        </form>
      </div>

      <div style={{ marginLeft: '700px', marginBottom: '90px', fontFamily: 'serif' }}>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 0, width: '60ch' }, }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Descripción" variant="outlined" style={{ background: 'white' }} />

        </Box>

      </div>


      <div style={{ marginLeft: '700px', marginBottom: '90px', display: 'block' }}>

        <select style={{ fontSize: '25px', backgroundColor: '#1b2870', borderRadius: '8px', width: '430px', color: 'white', height: '50px' }}>

          <option value="fruit">Seleccione una opción</option>

          <option value="fruit">1</option>

          <option value="vegetable">2</option>

          <option value="meat">3</option>

          <option value="meat">4</option>

          <option value="meat">5</option>
        </select>




      </div>

      <div style={{ marginLeft: '700px', marginBottom: '90px', fontFamily: 'serif' }}>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 0, width: '60ch' }, }}
          noValidate
          autoComplete="off"
        >

          <TextField id="outlined-basic" label="Wallet" variant="outlined" style={{ background: 'white' }} />

        </Box>

      </div>


      <div style={{ marginLeft: '1100px' }}>
        <Button variant="contained" endIcon={<SendIcon />} style={{ fontSize: '20px', backgroundColor: '#3d4470' }}>
          ENVIAR
        </Button>
      </div>
    </>

  )
}


export { Audit };