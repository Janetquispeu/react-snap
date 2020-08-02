#!/bin/bash:

# List File inside app/dist

make_public() {
  for file in app/dist/*; do
    make accessing-public-data NAME_FILE="$(basename "$file")"
  done
}

"$@"