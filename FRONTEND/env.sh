#!/bin/sh

for env in $(env | grep STACKNOTES_)
do
  echo $env
  key=$(echo $env | cut -d '=' -f 1)
  value=$(echo $env | cut -d '=' -f 2-)
  echo $key=$value
  find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i "s|${key}|$value|g" '{}' +
done