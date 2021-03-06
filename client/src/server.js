import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import createStore from './store/createStore';
import { pad } from './utils/string';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import cookie from 'cookie';
import { setAuthToken } from './actions/shared/authentication';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import getStatusFromRoutes from './helpers/getStatusFromRoutes';
import createApiProxy from './proxies/api';
import createWebpackProxy from './proxies/webpack';
import fetchAllData from './helpers/fetchAllData';


const morgan = require('morgan');
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const logStyle = __DEVELOPMENT__ ? 'dev' : 'combined';


app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(require('serve-static')(path.join(__dirname, '..', 'static')));
app.use(morgan(logStyle));
app.use(createApiProxy());
app.use(createWebpackProxy());


app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const store = createStore();

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  if (req.headers.cookie) {
    const manifoldCookie = cookie.parse(req.headers.cookie);
    const authToken = manifoldCookie.authToken;
    store.dispatch(setAuthToken(authToken));
  }

  match({
    routes: getRoutes(store),
    location: req.originalUrl
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (!renderProps) {
      res.status(500);
      hydrateOnClient();
    } else {
      fetchAllData(
        renderProps.components,
        store.getState, store.dispatch,
        renderProps.location,
        renderProps.params
      ).then(() => {
        store.dispatch({ type: 'RECORD_DATA_FETCHING', payload: req.originalUrl });
        const component = (
          <Provider store={store} key="provider">
            <RoutingContext {...renderProps} />
          </Provider>
        );
        const status = getStatusFromRoutes(renderProps.routes);
        if (status) {
          res.status(status);
        }
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(
            <Html
              assets={webpackIsomorphicTools.assets()}
              component={component}
              store={store}
            />
          )
        );
      });
    }
  });
});

const socketLocation = process.env.NODE_SERVER_SOCKET_PATH;
let listenOn;
let setUmask = false;
let oldUmask;
if (socketLocation) {
  listenOn = socketLocation;
  setUmask = true;
  oldUmask = process.umask('0000');
} else {
  listenOn = config.clientPort;
}

if (listenOn) {
  server.listen(listenOn, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('');
    console.log('');
    if (!config.isProduction) {
      console.log('MANIFOLD WEBPACK SERVER'.cyan.bold);
      console.log('---------------------'.cyan);
      console.log('Manifold Asset Server, a.k.a. Webpack, is listening at http://127.0.0.1:%s'.green, config.assetPort);
      console.log('');
      console.log('');
    }

    console.log(`${'MANIFOLD ASSET PROXY'.cyan.bold}`);
    console.log(`-------------------`.cyan);
    console.log(`The Manifold Asset Proxy is proxying the following paths:`.green);
    console.log('');
    const assetPathMax = config.assetProxyPaths.reduce((memo, current) => {
      return current.length > memo ? current.length : memo;
    }, 0);
    config.assetProxyPaths.forEach((value) => {
      console.log(`${pad(value, assetPathMax, ' ', false)}  >  localhost:${config.assetPort}${value}`.green); // eslint-disable-line max-len
    });
    console.log('');
    console.log('');

    console.log(`${'MANIFOLD API PROXY'.cyan.bold}`);
    console.log(`-------------------`.cyan);
    console.log(`The Manifold API Proxy is proxying the following paths:`.green);
    console.log('');
    const apiPathMax = config.apiProxyPaths.reduce((memo, current) => {
      return current.length > memo ? current.length : memo;
    }, 0);
    config.apiProxyPaths.forEach((value) => {
      console.log(`${pad(value, apiPathMax, ' ', false)}  >  ${config.apiUri}${value}`.green);
    });
    console.log('');
    console.log('');

    console.log(`MANIFOLD CLIENT SERVER`.cyan.bold);
    console.log(`----------------------`.cyan);
    console.log(`Manifold Client is listening at http://127.0.0.1:${config.clientPort}`.green);
    console.log('');
    console.log('');

    if (setUmask === true) {
      process.umask(oldUmask);
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
