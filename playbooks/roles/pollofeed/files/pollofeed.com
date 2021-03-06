
location /api {
    # requests to the API will be proxy_pass to the backend API infra
    # read this -> http://en.wikipedia.org/wiki/X-Forwarded-For
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # pass the host header from the client to help with redirects
    proxy_set_header Host $http_host;

    # stops nginx from doing something silly
    proxy_redirect off;

    # proxy_pass to backend API Django in my case
    proxy_pass http://pollofeed:9000/api;

    # send the IP address and remote server address for secuirty
    proxy_set_header X-Real-IP $remote_addr;
}

# https://www.nginx.com/blog/websocket-nginx/
location /ws {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
    proxy_pass http://pollofeed:9000/ws;
}

location /.well-known/lnurlp/pollofeed {
  root /usr/share/nginx/html;
  default_type "application/json";
  try_files /lightningAddr.json =404;
}

location /health {
  return 204;
  # default_type text/html;
  # return 200 'hello';
}




# TODO: https://www.nginx.com/blog/rate-limiting-nginx/
