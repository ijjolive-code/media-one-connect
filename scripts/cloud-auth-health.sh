#!/bin/sh
# Cloud Docker injects a proxy; BusyBox wget ignores its no_proxy list.
# Keep external proxy handling intact and only route this container-local health URL directly.
case "$*" in
  *http://127.0.0.1:9999/health*) unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY all_proxy ;;
esac
exec /usr/bin/wget "$@"
