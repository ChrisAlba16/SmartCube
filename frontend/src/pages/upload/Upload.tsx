import Button from '@mui/material/Button';

function compilar(rust: string, toml: string) {
    let data = [];
    data[0] = rust;
    data[1] = toml;
    fetch('http://localhost:5000', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
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
                        <Button onClick={() => compilar( document.getElementById('rs')?.nodeValue + " ", document.getElementById('toml')?.nodeValue + " " )} variant="contained">
                            Compile
                        </Button>
                        <Button variant="contained" >
                            Audit
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table >
    )
}

export { Upload };