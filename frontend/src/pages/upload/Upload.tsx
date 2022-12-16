import Button from '@mui/material/Button';
import { SetStateAction, useState } from 'react';

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
    const [message, setMessage] = useState('');
    const handleMessageChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        // 👇️ access textarea value
        setMessage(event.target.value);
    };

    const [message2, setMessage2] = useState('');
    const handleMessageChange2 = (event: { target: { value: SetStateAction<string>; }; }) => {
        // 👇️ access textarea value
        setMessage2(event.target.value);
    };


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
                            rows={12} cols={70} placeholder="Ingrese el contenido de tu codigo Rust" value={message}
                            onChange={handleMessageChange} />
                    </td>
                    <td>
                        <p style={{
                            marginLeft: '160px',
                            color: "white", fontSize: '20px'
                        }} > Archivo .toml </p>
                        <textarea style={{
                            backgroundColor: 'hsla(0,0%,100%,.102)',
                        }} id="toml" name="toml"
                            rows={12} cols={70} placeholder="Ingrese el contenido de tu archivo Cargo.toml" value={message2}
                            onChange={handleMessageChange2} />
                    </td>
                </tr>
                <tr>
                    <td className="d-flex justify-content-around">
                        <Button onClick={() => compilar(message, message2)} variant="contained">
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