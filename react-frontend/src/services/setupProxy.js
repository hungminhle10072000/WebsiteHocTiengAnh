import {API_BASE} from '../../env.js'
const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use("/api/users",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );

    app.use("/api/topic-vocas",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );

    app.use("/api/user-topic-vocas",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );

    app.use("/api/user-vocabulary",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );

    app.use("/api/vocabulary",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );

    app.use("/api/vocabulary/getVocaByid",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );

    app.use("/api/course",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );

    app.use("/api/grammars",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );

    app.use("/api/user-grammars",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );

    app.use("/api/exercise",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );
    app.use("/api/users",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );
    app.use("/authenticate",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );
    app.use("/api/users/check-username-email",
        createProxyMiddleware({
            target: `${API_BASE}`,
            changeOrigin: true
        })
    );
    
};