import { Link } from 'react-router-dom';
import { ReactComponent as SVG } from 'assets/images/variante-de-cubo-con-sombra.svg';

function Logo() {
  return (
    <Link to="/">
      <SVG style={{width:"180", height:"42.3529"}} />
    </Link>
  );
}

export { Logo };
