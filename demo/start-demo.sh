#!/bin/bash

echo "🚀 Starting RM Training Platform Demo..."
echo ""

# Start server in background
node server.js &
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Open browser
echo "🌐 Opening demo in browser..."
open "http://localhost:3000"

echo ""
echo "✅ Demo is now running!"
echo "📱 Access at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the demo server"

# Wait for Ctrl+C
trap "echo ''; echo '🛑 Stopping demo server...'; kill $SERVER_PID; exit 0" INT

# Keep script running
wait $SERVER_PID
