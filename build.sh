#!/usr/bin/env sh
set -eu

documents_root=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
source_root="$documents_root/src"
output_root="$documents_root/html"
required_version=$(tr -d '\r\n' < "$source_root/.hugo-version")
hugo_binary=${HUGO:-hugo}
version_output=$($hugo_binary version)

case "$version_output" in
  "hugo v$required_version"*) ;;
  *) printf '%s\n' "Hugo $required_version is required; observed: $version_output" >&2; exit 1 ;;
esac

"$hugo_binary" --source "$source_root" --destination "$output_root" --cleanDestinationDir --gc --minify
node "$documents_root/verify-site.mjs"
node "$documents_root/verify-small-projects-site.mjs"
node "$documents_root/verify-english-edition.mjs"
