#!/usr/bin/env bash

# Start building process
echo "Starting building process"
npm run build

# root package json will first install backend dpes, then install frontend deps, then will build the static frontend service