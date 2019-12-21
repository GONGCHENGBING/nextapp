import React from 'react'
import App from 'next/app'
import WithReactRouter from "../components/WithReactRouter"
class Layout extends React.Component {
  render() {
    const { children } = this.props
    return <div className='layout'>{children}</div>
  }
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default WithReactRouter(MyApp, { basename: "" });