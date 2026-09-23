#!/bin/bash
# Double-click this file in Finder to start the Lesson Formatting Tool and
# open its dashboard in your browser.
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

PORT=4570
URL="http://localhost:$PORT"

echo "CodeDo Lesson Formatting Tool"
echo "Project: $DIR"
echo ""

if curl -s -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null | grep -q "200\|404"; then
  echo "Server already running at $URL -- opening dashboard."
  open "$URL"
  exit 0
fi

echo "Starting server..."
nohup npm run lesson-format-ui > /tmp/codedo-lesson-format-ui.log 2>&1 &
SERVER_PID=$!

echo "Waiting for it to come up (PID $SERVER_PID)..."
for i in $(seq 1 30); do
  if curl -s -o /dev/null "$URL" 2>/dev/null; then
    echo "Server is up. Opening dashboard..."
    open "$URL"
    echo ""
    echo "This window can stay open or be closed -- the server keeps running in the background."
    echo "Logs: /tmp/codedo-lesson-format-ui.log"
    echo "To stop the server later, run: pkill -f 'lesson-formatting/server.ts'"
    sleep 2
    exit 0
  fi
  sleep 1
done

echo "Server did not come up in time. Check the log:"
echo "  /tmp/codedo-lesson-format-ui.log"
tail -n 30 /tmp/codedo-lesson-format-ui.log
read -p "Press Enter to close this window..."
