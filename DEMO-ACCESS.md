# 🎯 RM Training Platform - Live Demo

## Quick Start

**Option 1: One-Click Start**
```bash
cd demo
./start-demo.sh
```

**Option 2: Manual Start**
```bash
cd demo
node server.js
```

Then open: **http://localhost:3000**

---

## 🌟 Demo Features

### Interactive Elements
- **Navi Mascot**: Click the beaver (🦫) for coaching tips
- **Live Simulation**: Chat with AI customer "Alex Wong"
- **Real-time Metrics**: Watch skill bars update as you interact
- **AI Recommendations**: Generate explainable product suggestions

### Navigation Shortcuts
- **Alt + 1**: Dashboard
- **Alt + 2**: Knowledge Hub  
- **Alt + 3**: Simulation Lab
- **Alt + 4**: Recommendations
- **Alt + 5**: Analytics
- **Alt + 6**: Achievements

### Try These Interactions
1. **Start Simulation**: Go to Simulation Lab → Type responses to customer
2. **Get Recommendations**: Input customer profile → Generate suggestions
3. **Mascot Coaching**: Click Navi for contextual encouragement
4. **Performance Tracking**: Watch skill meters improve during simulation

---

## 🎨 UX/UI Highlights

- **UOB Branding**: Official colors (#003366, #E60000)
- **Professional Design**: Banking-appropriate interface
- **Responsive Layout**: Works on desktop and tablet
- **Smooth Animations**: Micro-interactions throughout
- **Accessibility**: Keyboard navigation, proper contrast

---

## 🏗️ Technical Stack

- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Interactions**: Vanilla JavaScript with smooth animations
- **Server**: Node.js HTTP server for local hosting

---

## 🚀 Production Deployment

For AWS deployment:
```bash
cd cdk
./deploy.sh
```

This creates:
- S3 + CloudFront hosting
- Cognito authentication
- API Gateway + Lambda
- DynamoDB storage

---

**Demo URL**: http://localhost:3000
**Stop Server**: Press Ctrl+C in terminal
