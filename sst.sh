#!/bin/bash
echo "Starting sst.sh"

# Read environment variables from env.txt
while IFS='=' read -r key value || [ -n "$key" ]; do
    # Remove leading/trailing whitespace and quotes
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs | sed -e 's/^"//' -e 's/"$//')
    export "$key=$value"
done < env.txt

if [ -z "$OP_SERVICE_ACCOUNT_TOKEN" ]; then export OP_SERVICE_ACCOUNT_TOKEN=$(op read "$REF_OP_SERVICE_ACCOUNT_TOKEN"); fi

SST_ARGS="$*"

export CLOUDFLARE_API_TOKEN=$(op read "$REF_CLOUDFLARE_API_TOKEN")

export CLOUDFLARE_DEFAULT_ACCOUNT_ID=$(op read "$REF_CLOUDFLARE_DEFAULT_ACCOUNT_ID")

sst $SST_ARGS

echo "Ending sst.sh"