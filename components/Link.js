import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

export function Link(props, context) {
    let router = useRouter();
    let to = props.to;
    to = {
        pathname: to,
        state: { as: to, url: router.pathname, gong: "chengbing" }
    }
    return <ReactRouterLink {...props} to={to} />
}

Link.contextTypes = {
    routerProps: PropTypes.object
};
