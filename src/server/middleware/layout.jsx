/**
 * Serve HTML layout with pre-rendered React views
 */

import { env, hotReloadUrl } from 'c0nfig';
import React from 'react';
import Router from 'react-router';
import routes from '../../shared/routes';
import versionifyAssets from 'versionify-assets';
import runRouteHandlerStatic from '../../shared/common/utils/runRouteHandlerStatic';

function _createLayoutMiddleware(title, mainJS, mainCSS) {
    return (req, res, next) => {
        title = req.title || title;
        const flux = req.flux;
        Router.run(routes, req.url, async (Handler, state) => {
            try {
                await runRouteHandlerStatic(state.routes, 'routerWillRun', { flux });
                const appString = React.renderToString(<Handler flux={flux} />);
                const snapshot = new Buffer(flux.serialize(), 'utf-8').toString('base64');
                res.render('base', { mainJS, mainCSS, env, title, snapshot, appString });
            } catch (err) {
                next(err);
            }
        });
    };
}

export function development() {
    return _createLayoutMiddleware('Universal React Flux Boilerplate | Dev', `${hotReloadUrl}app.js`);
}

export function production() {
    return _createLayoutMiddleware('Universal React Flux Boilerplate', versionifyAssets('/build/app.min.js'));
}
