import React, { Component } from 'react'
import IsmorphicRouter from './IsomorphicRouter'
const isServer = typeof window === 'undefined'
const withReactRouter = (
    WrappedComponent,
    routerProps = {}
) => {
    return (
        class ReactRouterWrapper extends Component {
            static async getInitialProps(appContext) {
                if (isServer) {
                    const {
                        ctx: {
                            req: {
                                originalUrl,
                                locals = {},
                            },
                        },
                    } = appContext;
                    return {
                        originalUrl,
                        context: locals.context || {},
                    };
                }
                else {
                    return {}
                }
            }
            render() {
                const originalUrl = this.props.originalUrl || "";
                return (
                    <IsmorphicRouter routerProps={routerProps} location={originalUrl}>
                        <WrappedComponent {...this.props} />
                    </IsmorphicRouter>
                )
            }
        }
    )
}

export default withReactRouter
