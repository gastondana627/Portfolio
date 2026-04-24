#!/bin/bash
TARGET_DIRS=("assets/content/segments" "assets/content/advancingx")

for BASE in "${TARGET_DIRS[@]}"; do
  # First rename files
  find "$BASE" -depth -type f -name '*[A-Z]*' | while read -r FILE; do
    DIR=$(dirname "$FILE")
    BASE_FILE=$(basename "$FILE")
    LOWER_FILE=$(echo "$BASE_FILE" | tr '[:upper:]' '[:lower:]')
    echo "Renaming file: $FILE -> $DIR/$LOWER_FILE"
    git mv "$FILE" "$FILE-temp"
    git mv "$FILE-temp" "$DIR/$LOWER_FILE"
  done

  # Then rename directories (bottom-up because of -depth)
  find "$BASE" -depth -type d -name '*[A-Z]*' | while read -r DIR; do
    PARENT=$(dirname "$DIR")
    BASE_DIR=$(basename "$DIR")
    LOWER_DIR=$(echo "$BASE_DIR" | tr '[:upper:]' '[:lower:]')
    echo "Renaming dir: $DIR -> $PARENT/$LOWER_DIR"
    git mv "$DIR" "$DIR-temp"
    git mv "$DIR-temp" "$PARENT/$LOWER_DIR"
  done
done
