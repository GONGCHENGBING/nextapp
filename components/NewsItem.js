import React from "react"
import { Link } from "./Link"
import { useLocation } from "react-router-dom"
function News(props) {
    const RouteInfo = useLocation();
    return (
        <div>
            <Link to="/">News</Link>
            <h2>News!PathName ---- {RouteInfo.pathname}</h2>
        </div>
    )
}

export default News;