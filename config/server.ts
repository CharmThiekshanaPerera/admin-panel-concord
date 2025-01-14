export default ({ env})  => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys:[
      env('APP_KEY_1', '2ZY/X4m9rsJ37BQNrA42n6X3IHPoLJi6nyJXPkseKjQ='),  // Replace 'myKeyA' with a random key
      env('APP_KEY_2', 'GCH5yB2CanLbnoreiNmNl0Lg1lmDnqz5DN8KEbHgIIk=')   // Replace 'myKeyB' with a random key
    ],
    },
    proxy: true, // Enable proxy if using a reverse proxy
    ssl: {
    enabled: true,
    key: env('SSL_KEY_PATH', '/etc/ssl/private/selfsigned.key'),
    cert: env('SSL_CERT_PATH', '/etc/ssl/certs/selfsigned.crt'),

  },
});
