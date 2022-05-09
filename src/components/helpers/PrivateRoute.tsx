import { FC, useContext } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
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

  const renderComponent = (props: RouteComponentProps) => {
    if ((redirect && !user) || (!redirect && user)) {
      return <Component {...props} />;
    }
    if (redirect && user) {
      return <Redirect to={redirect} />;
    }
    return <Redirect to="/auth" />;
  };

  return <Route {...rest} exact={!!exact} render={(props) => renderComponent(props)} />;
}
