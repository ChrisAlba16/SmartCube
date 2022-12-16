import { Route, Routes } from 'react-router-dom';
import { Audit } from './audit';
import { Home } from './home';
import { Upload } from './upload';
import { Mine } from './mine';
import { Search } from './search';

const routes = [{ path: '/', Page: Home }, { path: '/Mine', Page: Mine }, { path: '/Audit', Page: Audit }, { path: '/Upload', Page: Upload }, { path: '/Search', Page: Search }];

function Routing() {
  const getRoutes = () => routes.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />);

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };
