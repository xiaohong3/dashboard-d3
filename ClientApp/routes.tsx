import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SendingRateDiagramPage } from './components/SendingRateDiagramPage';
import { SendingRateDiaByBuild } from './components/SendingRateDiaByBuild';
import { MediaTypeByAppID } from './components/MediaTypeByAppID';

export const routes = <Layout>
    <Route exact path='/sending-rate' component={ SendingRateDiagramPage } />
    <Route exact path='/sending-rate-by-build' component={ SendingRateDiaByBuild } />
    <Route exact path='/media-type' component={ MediaTypeByAppID } />
</Layout>;
