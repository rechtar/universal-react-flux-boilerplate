// polyfills
import 'Base64';
import 'es5-shim';
import 'es5-shim/es5-sham';
import React from 'react';
window.React = React;
import Router from 'react-router';
import routes from '../shared/routes.jsx';
import Flux from '../shared/flux';
import runRouteHandlerStatic from '../shared/common/utils/runRouteHandlerStatic';

const flux = new Flux();
flux.deserialize(decodeURIComponent(escape(atob(window.__snapshot__))));

Router.run(routes, Router.HistoryLocation, async (Handler, state) => {
    await runRouteHandlerStatic(state.routes, 'routerWillRun', { flux });
    React.render(<Handler flux={flux} />, document.getElementById('app'));
});
