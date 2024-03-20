import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root";
import UK from "./routes/UK";
import UKGeneralElections from "./routes/UK/UKGeneralElections";

import './style.css';

const router = createBrowserRouter([
    {
        element: <Root />,
        children: [
            {
                path: "/uk",
                element: <UK />,
                children: [
                    {
                        path: "general-elections",
                        element: <UKGeneralElections />
                    },
                    {
                        path: "scottish-parliament-elections",
                        element: <div>Scottish Parliament Elections</div>
                    },
                    {
                        path: "senedd-elections",
                        element: <div>Senedd Elections</div>
                    }
                ]
            }
        ]
    },
    {
        path: "/",
        element: <h1>Index</h1>
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<RouterProvider router={router} />);