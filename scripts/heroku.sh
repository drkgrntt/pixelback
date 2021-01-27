#!/bin/sh -e

usage() {
  echo "OVERVIEW: Build apps according to BUILD_ENV value. Meant to be used for Heroku deployment"
  exit
}

if [ "$1" = '-h' ] || [ "$1" = '--help' ]; then
  usage
fi

(
  PROJECT_ROOT="$(cd $(dirname $0)/..; pwd)"

  cd $PROJECT_ROOT

  if [ "$BUILD_ENV" = "server" ]; then
    cd packages/server && npm install && npm install --only-dev && npm run build
  elif [ "$BUILD_ENV" = "web" ]; then
    cd packages/web && npm install && npm install --only-dev && npm run build
  else
    echo "Error: no build config for BUILD_ENV value '$BUILD_ENV'"
    exit 1
  fi
)