// Knowledge Hub Search
function searchKnowledge() {
    const searchInput = document.getElementById('knowledgeSearch');
    const query = searchInput.value.trim();
    
    if (!query) return;
    
    // Simulate search loading
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Searching...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        
        // Highlight search results
        const cards = document.querySelectorAll('.knowledge-card');
        cards.forEach(card => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 100);
        });
        
        showNaviToast(`Found relevant content for "${query}". Great learning!`);
    }, 1500);
}

// Knowledge card click handlers
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.knowledge-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNaviToast(`Opening ${title}. Knowledge is power!`);
            
            // Simulate opening content
            this.style.borderLeft = '4px solid var(--success)';
            setTimeout(() => {
                this.style.borderLeft = '';
            }, 2000);
        });
    });
});

// Analytics interactions
function updateAnalytics() {
    // Simulate real-time analytics updates
    const skillBars = document.querySelectorAll('.skill-bar .progress');
    skillBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width) || 0;
        const newWidth = Math.min(100, currentWidth + Math.floor(Math.random() * 3) + 1);
        bar.style.width = newWidth + '%';
        
        // Update score display
        const scoreSpan = bar.parentElement.parentElement.querySelector('.score');
        if (scoreSpan) {
            scoreSpan.textContent = newWidth + '%';
        }
    });
    
    showNaviToast("Your skills are improving! Keep up the great work!");
}

// Achievement unlock simulation
function unlockAchievement(achievementCard) {
    if (achievementCard.classList.contains('locked')) {
        achievementCard.classList.remove('locked');
        achievementCard.classList.add('unlocked');
        achievementCard.style.borderLeft = '4px solid var(--success)';
        
        const title = achievementCard.querySelector('h4').textContent;
        showNaviToast(`🎉 Achievement Unlocked: ${title}!`);
        
        // Add XP
        const xpFill = document.querySelector('.xp-fill');
        if (xpFill) {
            const currentWidth = parseInt(xpFill.style.width) || 83;
            xpFill.style.width = Math.min(100, currentWidth + 5) + '%';
        }
    }
}

// Leaderboard interactions
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.leaderboard-item').forEach(item => {
        item.addEventListener('click', function() {
            if (!this.classList.contains('current-user')) {
                const name = this.querySelector('.name').textContent;
                showNaviToast(`Viewing ${name}'s profile. Learn from the best!`);
            }
        });
    });
});

// Enhanced navigation with section-specific actions
function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Activate corresponding nav item
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Section-specific actions and Navi messages
    switch(sectionName) {
        case 'knowledge':
            showNaviToast("Knowledge is power! Explore the latest updates.");
            break;
        case 'simulation':
            showNaviToast("Ready to practice? Let's build those skills!");
            break;
        case 'recommend':
            showNaviToast("Great choice! AI recommendations help you learn faster.");
            break;
        case 'analytics':
            showNaviToast("Check your progress! Data drives improvement.");
            // Trigger analytics animation
            setTimeout(updateAnalytics, 1000);
            break;
        case 'gamification':
            showNaviToast("Achievements unlock motivation! Keep pushing forward.");
            // Check for potential achievement unlocks
            setTimeout(() => {
                const lockedAchievements = document.querySelectorAll('.achievement-card.locked');
                if (lockedAchievements.length > 0 && Math.random() < 0.3) {
                    unlockAchievement(lockedAchievements[0]);
                }
            }, 2000);
            break;
    }
}

// Navigation click handlers
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });
    
    // Show welcome toast after 2 seconds
    setTimeout(() => {
        showNaviToast("Welcome back! Ready to continue your training?");
    }, 2000);
});

// Chat Simulation
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add RM message
    addChatMessage(message, 'rm');
    input.value = '';
    
    // Simulate customer response after delay
    setTimeout(() => {
        const responses = [
            "That sounds good. What kind of coverage amount would you recommend?",
            "I'm interested. Can you explain the benefits in more detail?",
            "How does this compare to other options available?",
            "What would be the monthly premium for someone like me?",
            "I need to think about this. Can you send me a summary?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage(randomResponse, 'customer');
        
        // Update performance metrics
        updatePerformanceMetrics();
        
        // Show Navi feedback
        showNaviToast("Nice rapport building! Keep asking discovery questions.");
        
    }, 1500);
}

function addChatMessage(text, sender) {
    const messagesContainer = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function updatePerformanceMetrics() {
    const rapportBar = document.querySelector('.skill-item:first-child .progress');
    const needsBar = document.querySelector('.skill-item:last-child .progress');
    
    // Simulate skill improvement
    const currentRapport = parseInt(rapportBar.style.width) || 85;
    const currentNeeds = parseInt(needsBar.style.width) || 70;
    
    rapportBar.style.width = Math.min(100, currentRapport + 2) + '%';
    needsBar.style.width = Math.min(100, currentNeeds + 3) + '%';
}

// Recommendations
function generateRecommendations() {
    // Simulate loading
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Analyzing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        
        // Update recommendations with animation
        const cards = document.querySelectorAll('.recommendation-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 100);
            }, index * 200);
        });
        
        showNaviToast("Recommendations updated! Notice the explainable reasons.");
    }, 2000);
}

// Navi Mascot System
function showNaviToast(message) {
    const toast = document.getElementById('naviToast');
    const messageEl = toast.querySelector('.navi-message');
    
    messageEl.textContent = message;
    toast.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (toast.classList.contains('show')) {
            closeToast();
        }
    }, 5000);
}

function closeToast() {
    document.getElementById('naviToast').classList.remove('show');
}

// Mascot click handler
document.getElementById('naviMascot').addEventListener('click', function() {
    const encouragements = [
        "You're doing great! Keep up the excellent work!",
        "Ready for your next challenge? I believe in you!",
        "Your skills are improving every day. Well done!",
        "Remember: every expert was once a beginner.",
        "You've got this! Let's continue learning together."
    ];
    
    const randomMessage = encouragements[Math.floor(Math.random() * encouragements.length)];
    showNaviToast(randomMessage);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.id === 'chatInput') {
        sendMessage();
    }
    
    // Quick navigation with numbers
    if (e.altKey) {
        const sections = ['dashboard', 'knowledge', 'simulation', 'recommend', 'analytics', 'gamification'];
        const num = parseInt(e.key);
        if (num >= 1 && num <= sections.length) {
            switchSection(sections[num - 1]);
        }
    }
});

// Smooth animations and micro-interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    document.querySelectorAll('.stat-card, .action-card, .recommendation-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animate progress bars on load
    setTimeout(() => {
        document.querySelectorAll('.progress').forEach(bar => {
            const width = bar.style.width || '0%';
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 500);
});

// Simulate real-time updates
setInterval(() => {
    // Update XP counter occasionally
    const xpCard = document.querySelector('.stat-card:last-child .stat-value');
    if (xpCard && Math.random() < 0.1) { // 10% chance every interval
        const currentXP = parseInt(xpCard.textContent.replace(',', ''));
        xpCard.textContent = (currentXP + Math.floor(Math.random() * 10) + 1).toLocaleString();
    }
}, 10000); // Every 10 seconds
