import Router from 'next/router'
import * as React from 'react'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import onPopStatePatch from './Patch'
import PropTypes from "prop-types"


class IsomorphicRouter extends React.Component {
    static childContextTypes = {
        Routes: PropTypes.object,
        routerProps: PropTypes.object
    }
    constructor(props) {
        super(props)
        if (Router.router) {
            // The history package attaches route state in a way that is incompatible with the way that
            // the next.js router attaches route state, monkey-patch is performed here. Be sure to see
            // the patch.js file for more information on what's going on
            const oldOnPopState = Router.router.onPopState
            window.removeEventListener('popstate', oldOnPopState);
            Router.router.onPopState = onPopStatePatch.bind(Router.router);
            window.addEventListener('popstate', Router.router.onPopState);
        }
    }

    getChildContext() {
        return {
            routerProps: this.props.routerProps
        }
    }

    render() {
        const { location, children, routerProps } = this.props
        const isServer = typeof window === 'undefined'
        if (isServer) {
            return (
                <StaticRouter location={location} context={{}} routerProps={routerProps}>
                    {children}
                </StaticRouter>
            )
        }
        return <BrowserRouter routerProps={routerProps}>{children}</BrowserRouter>
    }
}

export default IsomorphicRouter
