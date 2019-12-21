import React from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Link as BrowserLink } from "../Link"

function NavigateLink({ href, pathname, children }) {
    if (href !== pathname) {
        return (<Link href={href}>{children}</Link>)
    }
    else {
        return (<BrowserLink to={href}>{children}</BrowserLink>)
    }
}

function Header() {
    //当前page的url
    let pathname = useRouter().pathname;
    return (
        <div>
            <NavigateLink href="/About" pathname={pathname}>
                <span>About</span>
            </NavigateLink>
            <NavigateLink href="/" pathname={pathname}>
                <span>Home</span>
            </NavigateLink>
            <style jsx>
                {
                    `
                        span{
                            padding:0 5px;
                            cursor:pointer;
                        }

                    `
                }
            </style>
        </div>
    )
}

export default Header;