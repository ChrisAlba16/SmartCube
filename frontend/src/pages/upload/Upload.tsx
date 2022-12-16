import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function compilar(rust: string, toml: string) {
    fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify({ "rs": rust, "toml": toml })
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
}

function Upload() {
    return (
        <table className="table table-borderless">
            <tbody>
                <tr className="d-flex justify-content-center">
                    <td>
                        <p style={{
                            marginLeft: '160px',
                            color: "white", fontSize: '20px'
                        }} > Codigo Rust </p>
                        <textarea style={{
                            backgroundColor: 'hsla(0,0%,100%,.102)',
                        }} id="rs" name="rs"
                            rows={12} cols={70} placeholder="Ingrese el contenido de tu codigo Rust" />
                    </td>
                    <td>
                        <p style={{
                            marginLeft: '160px',
                            color: "white", fontSize: '20px'
                        }} > Archivo .toml </p>
                        <textarea style={{
                            backgroundColor: 'hsla(0,0%,100%,.102)',
                        }} id="toml" name="toml"
                            rows={12} cols={70} placeholder="Ingrese el contenido de tu archivo Cargo.toml" />
                    </td>
                </tr>
                <tr>
                    <td className="d-flex justify-content-around">
                        <Button onClick={() => compilar('rs', 'toml')} variant="contained">
                            Auditar
                        </Button>
                        <Button variant="contained" >
                            Compilar
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table >
    )
}

export { Upload };