import React from "react"
import { Link } from "./Link"
function News() {
    return (
        <div>
            <ul>
                <li><Link to="/one">News one</Link></li>
                <li><Link to="/two">News two</Link></li>
                <li><Link to="/three">News three</Link></li>
            </ul>
            <style jsx>
                {
                    `
                    ul{
                        padding-left:30px;
                    }
                    li{
                        padding:3px 0;
                    }
                    `
                }
            </style>
        </div>
    )
}

export default News;