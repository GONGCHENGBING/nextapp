const express = require('express');
const nextJS = require('next');
const { isBlockedPage, isInternalUrl } = require('next-server/dist/server/utils');
const photoServer = require("./modules/photoServer");
const ssrRouter = ['/','/About'];
async function start() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = nextJS({ dev });
  const server = express();
  await app.prepare();

  server.use(photoServer);
  server.use(express.static('public'));
  // Redirect all requests to main entrypoint pages/index.js
  server.get('/*', async (req, res, next) => {
    try {
      req.locals = {};
      req.locals.context = {};
      let pathName = req.originalUrl;
      if (isInternalUrl(req.url)) {
        return app.handleRequest(req, res, req.originalUrl)
      }
      if (isBlockedPage(pathName)) {
        return app.render404(req, res, req.originalUrl)
      }

      if (!ssrRouter.find(r => r === pathName)) {
        pathName = "/";
      }
      const html = await app.renderToHTML(req, res, pathName, {});

      /*
        client side 触发popstate事件，Nextjs router 和 history都对该事件有侦听并
        有相应的处理，在不移除其中任何一个的情况下，目前情况只能在Nextjs router中进行
        处理；
        1.如何区分是client router还是nextjs router
      */

      // Handle client redirects
      const context = req.locals.context;
      if (context.url) {
        return res.redirect(context.url)
      }

      // Handle client response statuses
      if (context.status) {
        return res.status(context.status).send();
      }

      // Request was ended by the user
      if (html === null) {
        return;
      }

      app.sendHTML(req, res, html);
    } catch (e) {
      next(e);
    }
  });

  server.listen(3001, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:3001`);
  });
}

start();
