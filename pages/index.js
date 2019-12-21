import React, { useEffect, useState } from "react"
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from "../components/common/Header"
import "../static/css/style.css"
import { Route, useHistory } from "react-router-dom"
import News from "../components/News"
import NewsItem from "../components/NewsItem"
function Index() {
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
    isInitialPage || navigatePage ? (<div id="main">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <h1 className="mainTitle">Hello,Next.js</h1>
      <News />
      <Route path="/:segment" component={NewsItem} />
      <style jsx>
        {
          `
                  .mainTitle{
                      color:#3af;
                      padding:20px;
                  }
                  #main{
                      width:70%;
                      max-width:1300px;
                      min-width:500px;
                      box-shadow:0 0 2px 2px rgb(154, 200, 233);
                      padding:20px;
                      margin-top:20px;
                  }
                  ul{
                      padding-left:20px;
                  }
                  li{
                      padding:5px 0;
                  }
                  `
        }
      </style>
    </div>) : ""
  )
}

Index.getInitialProps = async function (ctx) {
  // const res = await fetch('https://api.github.com/repos/zeit/next.js')
  // const json = await res.json() // better use it inside try .. catch
  // return { stars: json.stargazers_count }
}

export default Index