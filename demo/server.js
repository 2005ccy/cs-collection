import path from 'path';
import express from 'express';
import compression from 'compression';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

const app = express();
const compiler = webpack(config);

app.use('/', compression());
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, '../src/mock')));
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})


app.listen(3000, function() {
	console.log('server start!!');
});