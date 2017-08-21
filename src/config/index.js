let env = process.env.NODE_ENV
let config = {
    env: env,
    title: '明阅电子发票',
    serverHost: 'http://localhost:3000',
    serverRoot: env === 'development' ? 'http://120.92.45.7/project_dzff/' : env === 'production' ? 'http://120.92.45.7/project_dzff/' : 'https://debug.url.com'
}
export default config
