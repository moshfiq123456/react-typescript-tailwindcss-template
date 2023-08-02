import { Outlet, Route } from "react-router-dom";
import { ROUTE } from "./route";
import { ReactElement } from "react";


interface RouteType {
    id: string;
    path: string;
    component: ReactElement;
    permissions: {
        auth: string[];
        userCode: string[];
    };
    children: RouteType[];
    _throw?: ReactElement;
    redirection?: ReactElement;
}

const routes: RouteType[] = [
    {
        id: "1",
        path: "",
        component: (
            <div>
                <Outlet />
            </div>
        ),
        permissions: {
            auth: ["token"],
            userCode: [],
        },
        children: [
            {
                id: "1.1",
                path: `${ROUTE.home}`,
                component: <div className="text-2xl text-red-900">Home</div>,
                permissions: {
                    auth: [],
                    userCode: [],
                },
                children: [],
            },
            {
                id: "1.2", // Corrected duplicate id
                path: `${ROUTE.about}`,
                component: <div className="text-2xl text-red-900">about</div>,
                permissions: {
                    auth: [],
                    userCode: [],
                },
                children: [],
            },
        ],
    },
];

const buildRoute = (route: RouteType | undefined): ReactElement | null => {
    if (!route) return null;
    const {
        id,
        children,
        path,
        component,
        permissions,
        redirection,
        _throw,
    } = route;
    return (
        <Route key={id} path={path} element={component}>
            {children && children.length > 0 && children.map((child) => buildRoute(child))}
        </Route>
    );
};

const getRoute = (): ReactElement[] => routes.map((route) => buildRoute(route)!);

export { getRoute };
