import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from "../components/common/Header"
import "../static/css/style.css"
import { Route, useHistory } from "react-router-dom"
import { Link } from "../components/Link"
function About() {
  const [count, setCount] = useState(0);
  let history = useHistory();
  let router = useRouter();
  let historyState = {};

  if (typeof window !== "undefined") {
    historyState = window.history.state;
  }
  historyState = historyState.state || historyState;

  //PrePageName，每一次页面之间的切换，是不会改变当前useHistory的指向，可以根据它得到上一个页面的信息
  let prePageName = (history.location.state && history.location.state.url) || '';

  let curPage = router.pathname;

  //pageName为空一定是第一次进入，或刷新
  const [isInitialPage] = useState(!history.location.state);

  let navigatePage = isInitialPage ? false : (prePageName === curPage)

  //只有刷新了页面之后，才会出现这种情况

  useEffect(function () {
    if (prePageName !== curPage) {
      let location = { pathname: historyState.as, state: { as: historyState.as, url: curPage } };
      history.replace(location);
    }
  })
  return (
    isInitialPage || navigatePage ? (
      <div id="about">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div>
          <p><span>count：{count}</span></p>
          <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
        <div id="about-contact">
          <Route path="/About" exact>
            <ul>
              <li><Link to="/About/contact">联系方式</Link></li>
              <li><Link to="/About/joinus">加入我们</Link></li>
              <li><Link to="/About/helpus">赞助我们</Link></li>
            </ul>
          </Route>
          <Route path="/About/contact">
            <h1>我们的联系方式是：111-1111--1111</h1>
          </Route>
          <Route path="/About/joinus">
            <h1>欢迎你加入我们这个团队</h1>
          </Route>
          <Route path="/About/helpus">
            <h1>感谢赞助</h1>
            <img src="/img/sister.png"/>
          </Route>
        </div>
        <style jsx>
          {
            `
            #about{
              margin-top:20px;
              padding:10px;
              box-shadow:0 0 2px 2px red;
            }
            p{
              padding:10px 0;
            }
            ul{
              margin-top:5px;
              padding-left:5px;
            }
            li{
              padding:5px 0;
              text-align:center;
              list-style-type:none;
            }
          `
          }
        </style>
      </div>
    ) : ''
  )
}

export default About