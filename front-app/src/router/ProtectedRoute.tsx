import {Navigate, Outlet} from "react-router-dom";
import React, {PropsWithChildren} from "react";

type Props = PropsWithChildren & {
    isAllowed: boolean;
    redirectPath?: string;
}

export const ProtectedRoute: React.FC<Props> = ({isAllowed, redirectPath = '/login', children}) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace/>;
    }
    return children ? (<>{children}</>) : (<Outlet/>);
};