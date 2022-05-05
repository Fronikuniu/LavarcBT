import { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

interface PrivateRouteProps {
  component: FC<any>;
  exact?: boolean;
  redirect?: string;
  path: string;
}

export default function PrivateRoute({
  component: Component,
  exact = false,
  redirect = '',
  ...rest
}: PrivateRouteProps) {
  const { user } = useContext(AuthContext);
  return redirect ? (
    <Route
      {...rest}
      exact={!!exact}
      render={(props) => (user ? <Redirect to={redirect} /> : <Component {...props} />)}
    />
  ) : (
    <Route
      {...rest}
      exact={!!exact}
      render={(props) => (user ? <Component {...props} /> : <Redirect to="/auth" />)}
    />
  );
}
