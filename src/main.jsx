import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import RootLayout from "./routes/RootLayout.jsx";
import NewPost from "./components/NewPost.jsx";

const router = createBrowserRouter([
        {
            path: '/', element: <RootLayout/>, children: [
                {
                    path: '/', element: <App/>, children: [
                        {
                            path: '/create-post', element: <NewPost />
                        }
                    ]
                }
            ]
        },
    ]
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
