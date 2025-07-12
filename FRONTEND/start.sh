#!/bin/sh

cat <<EOF > /usr/share/nginx/html/env.js
window.ENV = {
  STACKNOTES_API_URL: "${VITE_API_URL}"
};
EOF

echo "[INFO] Injected env.js:"
cat /usr/share/nginx/html/env.js

exec nginx -g 'daemon off;'