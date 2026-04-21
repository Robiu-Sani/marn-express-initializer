
# 🚀 AI ChatBot Package - Complete Documentation

## 📋 Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Quick Start](#quick-start)
5. [Configuration Guide](#configuration-guide)
6. [How to Train Your Chatbot](#how-to-train-your-chatbot)
7. [API Reference](#api-reference)
8. [Usage Examples](#usage-examples)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)
11. [FAQ](#faq)
12. [Support](#support)

---

## 🎯 Introduction

Welcome to the **AI ChatBot Package** - a powerful, flexible, and easy-to-use conversational AI solution that you can customize for ANY project within minutes! Whether you're building a customer support system for an e-commerce store, a FAQ bot for your educational institution, or a virtual assistant for your SaaS product, this package has got you covered.

### What Makes This Package Special?

Unlike other chatbot solutions that require complex training and months of development, our package is designed with **simplicity and flexibility** at its core. You don't need to be an AI expert or a senior developer to get started. With just 4 simple configuration sections, you can have a fully functional AI chatbot that understands your business, answers questions conversationally, and guides users to the right pages.

### The Problem We Solve

Traditional chatbots are either:
- **Too rigid**: Only answer predefined questions with scripted responses
- **Too complex**: Require machine learning knowledge and days of training
- **Too expensive**: Cost thousands of dollars for custom development
- **Too limited**: Can't understand context or provide natural responses

### Our Solution

This package combines:
- **Google's Gemini AI** for intelligent, contextual understanding
- **Simple configuration** that anyone can update
- **Conversational responses** (10-40 words) that sound natural
- **Smart page suggestions** that guide users to relevant content
- **Multi-language support** for global audiences

---

## ✨ Features

### Core Features

| Feature | Description | Benefit |
|---------|-------------|---------|
| **🤖 AI-Powered Responses** | Uses Google Gemini AI for intelligent answers | Natural, contextual conversations |
| **📝 10-40 Word Responses** | Concise, conversational answers | Users get quick, readable information |
| **🌍 Multi-Language Support** | English, Bangla, Arabic, Hindi, Urdu | Serve global audiences |
| **🔗 Smart Page Linking** | Automatically suggests relevant pages | Increases user engagement |
| **📞 Contact Integration** | Includes contact methods when relevant | Easy customer reach-out |
| **⚡ Fast Response Time** | Typically under 2 seconds | Smooth user experience |
| **🔄 Easy Updates** | Just edit 4 configuration sections | No coding required for updates |
| **📦 Zero Training Data** | Works with plain text knowledge base | Add your info in minutes |

### Advanced Features

- **Dynamic Knowledge Base**: Add 3000-5000 words of plain text information
- **Automatic Page Matching**: AI finds relevant pages based on user queries
- **Fallback Responses**: Graceful degradation when AI is unavailable
- **Response Time Tracking**: Monitor performance metrics
- **Configurable Response Style**: Conversational, professional, or friendly
- **Contact Info Management**: Centralized contact method storage

---

## 💻 Installation

### Prerequisites

Before installing, ensure you have:

```bash
Node.js 18+ or higher
npm or yarn package manager
Google Gemini API key (get it free from Google AI Studio)
```

### Step 1: Install the Package

```bash
# Using npm
npm install @google/genai

# Using yarn
yarn add @google/genai

# Using pnpm
pnpm add @google/genai
```

### Step 2: Get Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your key (it looks like: `AIzaSyD...`)

### Step 3: Set Environment Variable

```bash
# For Linux/Mac
export GEMINI_API_KEY="your-api-key-here"

# For Windows (Command Prompt)
set GEMINI_API_KEY=your-api-key-here

# For Windows (PowerShell)
$env:GEMINI_API_KEY="your-api-key-here"

# For .env file (recommended)
GEMINI_API_KEY=your-api-key-here
```

### Step 4: Create Your Chatbot File

Create a new file called `chatbot.ts` or `chatbot.js`:

```typescript
// Copy the entire package code into this file
// Then start configuring (see next section)
```

---

## 🚀 Quick Start

Get your chatbot running in 5 minutes with this simple example:

### Minimal Setup Example

```typescript
// Step 1: Import the package
import { ChatBotFunction } from './chatbot';

// Step 2: Configure your basic info (edit the config section)
const MY_BUSINESS_INFO = `
My Company Name: TechGurus Inc.
We build amazing websites and mobile apps.
Our services: Web Development, App Development, Digital Marketing
Pricing: Starting at $499 for basic websites
Contact: hello@techgurus.com or +1 (555) 123-4567
`;

// Step 3: Use the chatbot
async function demo() {
  const response = await ChatBotFunction("What services do you offer?");
  console.log(response.response);
  // Output: "We build amazing websites and mobile apps! Our services include Web Development, App Development, and Digital Marketing. Check our Services page for details."
}

demo();
```

### Express.js Integration

```typescript
import express from 'express';
import { ChatBotFunction } from './chatbot';

const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  const response = await ChatBotFunction(message);
  res.json(response);
});

app.listen(3000, () => {
  console.log('Chatbot API running on port 3000');
});
```

### React.js Integration

```jsx
import React, { useState } from 'react';
import { ChatBotFunction } from './chatbot';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    
    // Get bot response
    const response = await ChatBotFunction(input);
    setMessages(prev => [...prev, { text: response.response, sender: 'bot' }]);
    
    setInput('');
  };
  
  return (
    <div className="chat-container">
      {messages.map((msg, idx) => (
        <div key={idx} className={`message ${msg.sender}`}>
          {msg.text}
        </div>
      ))}
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
```

---

## ⚙️ Configuration Guide

This is the most important section. Your chatbot is only as good as your configuration. Let's dive deep into each configuration section.

### Configuration Section 1: Client Side Pages

This array defines all the pages on your website. The AI uses this to suggest relevant pages to users.

```typescript
const CLIENT_SIDE_PAGES = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
  // Add ALL your pages here
];
```

#### How to Add Pages

```typescript
// Single page
{ name: "Blog", path: "/blog" }

// Nested page structure (optional - for organization)
{ name: "Blog Post 1", path: "/blog/post-1" }

// Dynamic routes
{ name: "User Dashboard", path: "/dashboard/:userId" }
```

#### Best Practices for Pages

1. **Use Clear Names**: "Customer Support" is better than "CS"
2. **Include Important Pages**: FAQ, Support, Contact are critical
3. **Keep Paths Consistent**: Use lowercase with hyphens: `/about-us`
4. **Add 10-20 Pages**: More pages = better suggestions

### Configuration Section 2: Knowledge Base Info

This is where you add ALL your business/project information. Write 3000-5000 words as plain text. The AI reads this to answer questions.

```typescript
const KNOWLEDGE_BASE_INFO = `
[WRITE EVERYTHING HERE - 3000 to 5000 words]

ORGANIZATION NAME: [Your Name]
Founded: [Year]
Mission: [What you do and why]

COMPLETE DESCRIPTION:
[Write 500-1000 words about your organization]

SERVICES/PRODUCTS:
[List each service with details]
Service 1 Name: 
- What it is
- How it works  
- Pricing
- Benefits

Service 2 Name:
- Description
- Features
- Pricing

[Continue for all services]

PRICING STRUCTURE:
Basic Plan: $XX/month - Includes [features]
Pro Plan: $XX/month - Includes [features]
Enterprise: Custom pricing

FAQ SECTION:
Q: Common question 1?
A: Detailed answer

Q: Common question 2?
A: Detailed answer

[Add 10-20 FAQs]

POLICIES:
Return Policy: [Details]
Shipping: [Details]
Privacy: [Key points]

ACHIEVEMENTS:
- Award/Recognition 1
- Milestone 2
- Customer success story

TESTIMONIALS:
"Great service!" - Customer Name
"Highly recommended!" - Another Customer

SUPPORT INFO:
Hours: Monday-Friday, 9AM-6PM EST
Response Time: Within 24 hours
Languages: English, Spanish

[Continue until you reach 3000-5000 words]
`;
```

#### Knowledge Base Template (Copy This)

```markdown
COMPANY NAME: [Your Company Name]
WEBSITE: [yourwebsite.com]
ESTABLISHED: [Year]
CEO/FOUNDER: [Name]

ABOUT US:
[Write a compelling story about your company. Include your journey, values, team, and what makes you unique. Minimum 500 words]

OUR MISSION:
[Your mission statement - 2-3 sentences]

OUR VISION:
[Where you see your company in 5-10 years]

SERVICES WE OFFER:

1. [Service Name]
   - Description: [Detailed explanation]
   - Features: [List key features]
   - Pricing: [Cost and what's included]
   - Delivery Time: [How long it takes]
   - Support Included: [Yes/No and details]

2. [Service Name]
   - Description: [Detailed explanation]
   - Features: [List key features]
   - Pricing: [Cost and what's included]

[Add 3-10 services]

PRODUCTS:

1. [Product Name]
   - Description: [What it is]
   - Price: [Cost]
   - Specifications: [Technical details]
   - Availability: [In stock/Backorder]

[Add products]

PRICING PLANS:

🟢 Basic Plan - $XX/month
✓ Feature 1
✓ Feature 2
✓ Feature 3
✗ Premium features

🟡 Pro Plan - $XX/month  
✓ All Basic features
✓ Feature 4
✓ Feature 5
✓ Priority support

🔴 Enterprise - Custom pricing
✓ Everything in Pro
✓ Dedicated account manager
✓ Custom integrations

HOW IT WORKS:

Step 1: [First action]
Step 2: [Second action]
Step 3: [Third action]
Step 4: [Final delivery]

COMMON QUESTIONS (FAQ):

Q: How do I get started?
A: [Detailed answer with steps]

Q: What payment methods do you accept?
A: Credit cards, PayPal, Bank Transfer

Q: Is there a money-back guarantee?
A: Yes, 30-day money-back guarantee

Q: Do you offer discounts?
A: Annual billing saves 20%, educational discounts available

Q: How long does delivery take?
A: Digital products: instantly, Physical: 3-5 business days

[Add 10-20 more FAQs]

OUR GUARANTEE:
[Your guarantee policy - 30-day refund, satisfaction guaranteed, etc.]

CUSTOMER SUCCESS STORIES:

Case Study 1:
Customer: [Name/Company]
Challenge: [What problem they had]
Solution: [How you helped]
Result: [The outcome]

[Add 2-3 case studies]

TESTIMONIALS:

"[Quote]" - [Name], [Title]
"[Quote]" - [Name], [Company]

[Add 5-10 testimonials]

ACHIEVEMENTS & AWARDS:

🏆 Award 1: [Year] - [Award name]
🏆 Award 2: [Year] - [Recognition]
📈 Milestone: [Achievement]

SUPPORT & CONTACT:

Email Support: [email]
Response Time: Within 24 hours
Live Chat: Available [days and times]
Phone Support: [number and hours]

BUSINESS HOURS:
Monday-Friday: 9:00 AM - 6:00 PM [Timezone]
Saturday: 10:00 AM - 2:00 PM
Sunday: Closed

SOCIAL MEDIA:
Facebook: [link]
Twitter: [link]
LinkedIn: [link]
Instagram: [link]

TECHNICAL REQUIREMENTS:
[For software products - browser requirements, device compatibility, etc.]

INTEGRATIONS:
[List any third-party integrations available]

ROADMAP & UPCOMING FEATURES:
- Feature 1 (Coming Q1 2024)
- Feature 2 (Coming Q2 2024)

TERMS OF SERVICE:
[Key points from your ToS]

PRIVACY POLICY:
[How you handle customer data]

REFUND POLICY:
[Conditions for refunds]

[Continue writing until you reach 3000-5000 words]
```

#### Tips for Writing Knowledge Base

1. **Be Detailed**: More information = better answers
2. **Use Natural Language**: Write like you talk
3. **Include Examples**: Real scenarios help the AI understand
4. **Cover Edge Cases**: Address unusual questions
5. **Update Regularly**: Keep information current
6. **Organize with Headers**: Use ALL CAPS for sections
7. **Add Bullet Points**: Makes information scannable
8. **Include Numbers**: Prices, dates, quantities
9. **Mention Names**: People, products, features
10. **Add Context**: Explain why, not just what

### Configuration Section 3: Contact Methods

Store all your contact information in one place for easy updates.

```typescript
const CONTACT_METHODS = {
  // Primary contact
  email: "support@yourcompany.com",
  phone: "+1234567890",
  whatsapp: "+1234567890",
  
  // Social media
  facebook: "https://facebook.com/yourpage",
  instagram: "https://instagram.com/yourpage",
  twitter: "https://twitter.com/yourpage",
  linkedin: "https://linkedin.com/company/yourpage",
  youtube: "https://youtube.com/yourchannel",
  
  // Web presence
  website: "https://www.yourwebsite.com",
  
  // Physical location
  address: "123 Business St, City, Country",
  
  // Support hours
  supportHours: "Monday-Friday, 9 AM - 6 PM EST",
};
```

#### Adding More Contact Methods

```typescript
// Add any custom method
const CONTACT_METHODS = {
  // ... existing methods
  telegram: "https://t.me/yourusername",
  discord: "https://discord.gg/invite",
  signal: "+1234567890",
  wechat: "yourwechatid",
  line: "yourlineid",
  viber: "yourviber",
};
```

### Configuration Section 4: Response Configuration

Control how your chatbot responds.

```typescript
const RESPONSE_CONFIG = {
  // Response length (words)
  maxWords: 40,     // Maximum response length
  minWords: 10,     // Minimum response length
  
  // Response style
  responseStyle: "conversational", // Options: "conversational", "professional", "friendly"
  
  // Features
  includeLinks: true,   // Show page links in responses
  includeContact: true, // Include contact info when relevant
};
```

#### Response Style Examples

**Conversational Style** (Default):
```
"Hey there! Yes, we offer web development services. Our basic package starts at $499. Check our Services page for details!"
```

**Professional Style**:
```
"Thank you for your inquiry. Yes, web development services are available. Our basic package begins at $499. Please refer to our Services page for comprehensive information."
```

**Friendly Style**:
```
"Great question! We absolutely do web development 😊 Our basic package is just $499 to start. You'll find all the details on our Services page!"
```

---

## 🎓 How to Train Your Chatbot

Unlike traditional AI models that require thousands of examples, our chatbot is "trained" simply by providing information. Here's the complete training guide:

### Phase 1: Initial Setup (Day 1)

#### Step 1: Gather Your Information
Collect all documentation about your business:
- Company history and mission
- Product/service descriptions
- Pricing information
- FAQs from customer support
- Policies and guarantees
- Testimonials and case studies
- Contact information

#### Step 2: Write Your Knowledge Base
Take all the information from Step 1 and write it as plain text in the `KNOWLEDGE_BASE_INFO` section. Aim for 3000-5000 words.

**Pro Tip**: Copy your existing FAQ page, About page, and Services page content. That's usually 70% of what you need!

#### Step 3: Add Your Pages
List all important pages from your website in `CLIENT_SIDE_PAGES`. Include at least 10-15 pages for best results.

#### Step 4: Test Basic Questions
Ask these fundamental questions to verify setup:

```typescript
const testQuestions = [
  "What do you do?",
  "How much does it cost?",
  "How can I contact you?",
  "Where are you located?",
  "Do you offer refunds?"
];
```

### Phase 2: Refinement (Day 2-3)

#### Step 5: Analyze Responses
Review how your chatbot answers and identify gaps:

```typescript
// Run this test suite
async function testChatbot() {
  const tests = [
    "Tell me about your company",
    "What services do you offer?",
    "How do I get started?",
    "What payment methods do you accept?",
    "Do you have discounts?",
    "How long does shipping take?",
    "What's your return policy?",
    "Can I speak to a human?",
    "Do you offer technical support?",
    "Is there a warranty?"
  ];
  
  for (const test of tests) {
    const response = await ChatBotFunction(test);
    console.log(`Q: ${test}`);
    console.log(`A: ${response.response}\n`);
  }
}
```

#### Step 6: Fill Knowledge Gaps
If the chatbot doesn't answer well, add more information to `KNOWLEDGE_BASE_INFO`:

```typescript
// Before: Vague answer
Q: "What's your refund policy?"
A: "We have a refund policy. Contact support for details."

// After adding to knowledge base:
Q: "What's your refund policy?"
A: "We offer a 30-day money-back guarantee on all products. Just email support@company.com with your order number for a full refund."
```

#### Step 7: Add Edge Cases
Think of unusual questions customers might ask:

```typescript
const edgeCases = [
  "What if I lose my password?",
  "Do you serve customers in Europe?",
  "Can I upgrade my plan mid-month?",
  "What happens if I cancel?",
  "Do you have an affiliate program?"
];
```

Add answers to these in your knowledge base.

### Phase 3: Optimization (Day 4-5)

#### Step 8: Adjust Response Configuration

Experiment with different settings:

```typescript
// For customer support - shorter, direct answers
RESPONSE_CONFIG = {
  maxWords: 20,
  minWords: 5,
  responseStyle: "professional",
  includeLinks: false,
  includeContact: true
};

// For marketing - longer, enthusiastic answers
RESPONSE_CONFIG = {
  maxWords: 50,
  minWords: 15,
  responseStyle: "friendly",
  includeLinks: true,
  includeContact: false
};
```

#### Step 9: Monitor Real Conversations
If possible, log real user questions:

```typescript
// Add logging to your implementation
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const response = await ChatBotFunction(message);
  
  // Log for analysis
  console.log({
    timestamp: new Date().toISOString(),
    question: message,
    answer: response.response,
    suggestedPages: response.suggestedPages
  });
  
  res.json(response);
});
```

#### Step 10: Iterate Based on Data
After a week of real usage, review logs and update your knowledge base with missing information.

### Training Timeline Summary

| Day | Activities | Expected Outcome |
|-----|------------|------------------|
| Day 1 | Initial setup, add basic info | Chatbot answers 50% of questions |
| Day 2 | Add detailed information | Chatbot answers 70% of questions |
| Day 3 | Add edge cases and FAQs | Chatbot answers 85% of questions |
| Day 4 | Optimize configuration | Responses are natural and helpful |
| Day 5+ | Monitor and iterate | 95%+ satisfaction rate |

---

## 📚 API Reference

### Main Function: `ChatBotFunction`

```typescript
async function ChatBotFunction(prompt: string): Promise<ChatResponse>
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | Yes | User's question or message |

#### Return Value: `ChatResponse`

```typescript
interface ChatResponse {
  success: boolean;           // Whether request succeeded
  response: string;           // AI-generated answer (10-40 words)
  foundResults: boolean;      // Whether relevant info was found
  suggestedPages: Array<{     // Relevant page suggestions
    name: string;
    path: string;
  }>;
  contactInfo?: any;          // Contact methods (if includeContact=true)
  responseTime?: number;      // Time taken in milliseconds
}
```

### Helper Functions

#### `quickReply()`
Get just the response text without the full object.

```typescript
async function quickReply(prompt: string): Promise<string>

// Usage
const answer = await quickReply("What's your price?");
console.log(answer); // "Our pricing starts at $49/month..."
```

#### `getPageSuggestions()`
Get page suggestions without generating a response.

```typescript
function getPageSuggestions(query: string): Array<{name: string; path: string;}>

// Usage
const pages = getPageSuggestions("how to contact");
console.log(pages); // [{ name: "Contact", path: "/contact" }, ...]
```

#### `getConfig()`
Get current configuration settings.

```typescript
function getConfig(): {
  pages: Array<{name: string; path: string;}>;
  contact: any;
  responseConfig: any;
}

// Usage
const config = getConfig();
console.log(config.pages); // All your pages
console.log(config.contact); // All contact methods
```

#### `updateKnowledgeBase()`
Dynamically update the knowledge base (advanced usage).

```typescript
function updateKnowledgeBase(newInfo: string): void

// Usage
updateKnowledgeBase("New product launched: AI Assistant Pro at $99/month");
```

---

## 💡 Usage Examples

### Example 1: E-commerce Store

```typescript
// Configuration for an online store
const CLIENT_SIDE_PAGES = [
  { name: "Shop", path: "/shop" },
  { name: "Cart", path: "/cart" },
  { name: "Checkout", path: "/checkout" },
  { name: "Track Order", path: "/track" },
  { name: "Returns", path: "/returns" }
];

const KNOWLEDGE_BASE_INFO = `
Store Name: FashionHub
Products: Clothing, shoes, accessories
Shipping: Free shipping over $50, delivery in 3-5 days
Returns: 30-day return policy, free returns
Payment: Credit card, PayPal, Afterpay
... [rest of knowledge base]
`;

// Implementation
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const response = await ChatBotFunction(message);
  
  if (response.suggestedPages.length > 0) {
    // Add quick reply buttons
    response.quickReplies = response.suggestedPages.map(p => p.name);
  }
  
  res.json(response);
});
```

### Example 2: SaaS Product

```typescript
// Configuration for a software company
const KNOWLEDGE_BASE_INFO = `
Product: ProjectMaster Pro
Features: Task management, team collaboration, time tracking
Pricing: 
- Free: 5 projects, 10MB storage
- Pro: $19/month, unlimited projects, 100GB storage
- Enterprise: $99/month, custom features
Integrations: Slack, GitHub, Google Drive
... [rest of knowledge base]
`;

// Implementation with authentication
app.post('/api/chat', authenticateUser, async (req, res) => {
  const { message, userId } = req.body;
  
  // Add user context to the prompt
  const userPlan = await getUserPlan(userId);
  const contextualPrompt = `${message} (User is on ${userPlan} plan)`;
  
  const response = await ChatBotFunction(contextualPrompt);
  res.json(response);
});
```

### Example 3: Educational Institution

```typescript
// Configuration for a school/university
const CLIENT_SIDE_PAGES = [
  { name: "Admissions", path: "/admissions" },
  { name: "Programs", path: "/programs" },
  { name: "Tuition", path: "/tuition" },
  { name: "Scholarships", path: "/scholarships" },
  { name: "Apply Now", path: "/apply" }
];

const KNOWLEDGE_BASE_INFO = `
Institution: Global University
Programs: Computer Science, Business, Engineering
Admission Requirements: GPA 3.0+, SAT/ACT scores, essays
Deadlines: Fall - March 15, Spring - October 15
Tuition: $15,000/year undergraduate, $20,000/year graduate
Scholarships: Merit-based up to $10,000, Need-based available
... [rest of knowledge base]
`;

// Implementation with multi-language support
app.post('/api/chat', async (req, res) => {
  const { message, language } = req.body;
  
  // The chatbot auto-detects language, but you can specify
  const response = await ChatBotFunction(message);
  
  // Translate contact info if needed
  if (language === 'es' && response.contactInfo) {
    response.contactInfo.hours = "Lunes a Viernes, 9 AM - 6 PM";
  }
  
  res.json(response);
});
```

### Example 4: Customer Support System

```typescript
// Configuration for support bot
const KNOWLEDGE_BASE_INFO = `
Support Hours: 24/7 for emergencies, 9-6 for regular issues
Response Times: 
- Email: Within 4 hours
- Chat: Instant during business hours
- Phone: Within 10 minutes
Common Issues:
1. Login problems: Reset password or clear cache
2. Billing issues: Check payment method or contact billing@company.com
3. Technical bugs: Submit ticket with screenshot
Escalation Process: Tier 1 → Tier 2 → Engineering
... [rest of knowledge base]
`;

// Implementation with ticket creation
app.post('/api/chat', async (req, res) => {
  const { message, userId } = req.body;
  const response = await ChatBotFunction(message);
  
  // If bot can't help, create support ticket
  if (!response.foundResults || response.response.includes("contact")) {
    const ticket = await createSupportTicket(userId, message);
    response.ticketId = ticket.id;
    response.response += ` I've created ticket #${ticket.id} for you.`;
  }
  
  res.json(response);
});
```

---

## 🌟 Best Practices

### 1. Knowledge Base Writing

**DO:**
- Write in complete sentences
- Include specific numbers (prices, dates, quantities)
- Use natural language
- Add examples and scenarios
- Update regularly

**DON'T:**
- Use vague terms ("soon", "maybe", "sometimes")
- Write in ALL CAPS
- Leave outdated information
- Contradict yourself
- Forget to mention exceptions

### 2. Page Configuration

**DO:**
```typescript
{ name: "Customer Support", path: "/support" }
{ name: "Technical Documentation", path: "/docs" }
{ name: "Pricing Plans", path: "/pricing" }
```

**DON'T:**
```typescript
{ name: "Page1", path: "/p1" }
{ name: "Stuff", path: "/things" }
{ name: "Click here", path: "/link" }
```

### 3. Response Configuration

**For Customer Support:**
```typescript
{
  maxWords: 20,
  minWords: 8,
  responseStyle: "professional",
  includeLinks: false,
  includeContact: true
}
```

**For Sales/Marketing:**
```typescript
{
  maxWords: 40,
  minWords: 15,
  responseStyle: "friendly",
  includeLinks: true,
  includeContact: false
}
```

**For General Information:**
```typescript
{
  maxWords: 30,
  minWords: 10,
  responseStyle: "conversational",
  includeLinks: true,
  includeContact: true
}
```

### 4. Error Handling

Always implement proper error handling:

```typescript
try {
  const response = await ChatBotFunction(userInput);
  
  if (!response.success) {
    // Log error and fallback to human support
    logError(response);
    return "Let me connect you with a human agent.";
  }
  
  return response.response;
} catch (error) {
  console.error('Chatbot error:', error);
  return "I'm having trouble right now. Please try again or contact support.";
}
```

### 5. Performance Optimization

```typescript
// Cache frequent questions
const cache = new Map();

async function getCachedResponse(question: string) {
  if (cache.has(question)) {
    return cache.get(question);
  }
  
  const response = await ChatBotFunction(question);
  cache.set(question, response);
  
  // Clear cache after 1 hour
  setTimeout(() => cache.delete(question), 3600000);
  
  return response;
}
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue 1: "API key not working"

**Symptoms:**
- Error: "Invalid API key"
- Responses not generating

**Solution:**
```bash
# Check if API key is set
echo $GEMINI_API_KEY

# If empty, set it again
export GEMINI_API_KEY="your-actual-key"

# Verify key is valid
curl -X POST https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

#### Issue 2: "Responses are too long/short"

**Symptoms:**
- Answers are 100+ words
- Answers are just 1-2 words

**Solution:**
```typescript
// Adjust the config
const RESPONSE_CONFIG = {
  maxWords: 40,  // Decrease for shorter, increase for longer
  minWords: 10,  // Increase for longer minimum
  // ...
};

// Or force in the prompt
const systemPrompt = `... MUST be between ${minWords} to ${maxWords} words ...`;
```

#### Issue 3: "Chatbot doesn't know my business"

**Symptoms:**
- Generic answers
- "I don't know" responses

**Solution:**
```typescript
// Add MORE detail to KNOWLEDGE_BASE_INFO
const KNOWLEDGE_BASE_INFO = `
[Previous content]

SPECIFIC DETAILS:
- Product names: [List exact names]
- Prices: [Exact numbers]
- Dates: [Specific dates]
- Names: [Employee names, department names]
- Locations: [Addresses, office names]

[Add as much specific information as possible]
`;
```

#### Issue 4: "Slow response times"

**Symptoms:**
- responseTime > 5000ms
- Users complaining about lag

**Solution:**
```typescript
// Implement timeout
const timeoutPromise = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Timeout')), 3000)
);

const response = await Promise.race([
  ChatBotFunction(prompt),
  timeoutPromise
]).catch(() => ({
  success: false,
  response: "I'm thinking... Let me get back to you shortly.",
  foundResults: false,
  suggestedPages: []
}));
```

#### Issue 5: "Wrong language detection"

**Symptoms:**
- Responding in wrong language
- Mixed language responses

**Solution:**
```typescript
// Force language based on user profile
const userLanguage = getUserLanguage(userId); // 'bangla', 'english', etc.

// Modify the detectLanguage function or add a parameter
const detectLanguage = (text: string, forceLanguage?: string): string => {
  if (forceLanguage) return forceLanguage;
  // ... existing detection logic
};
```

---

## ❓ FAQ

### General Questions

**Q: How much does this cost to run?**
A: Only the Google Gemini API costs. For typical usage (1000 queries/day), it's about $1-2 per month.

**Q: Can I use this without Google Gemini?**
A: Currently, no. The package is built specifically for Gemini. However, you can modify the `generateAIResponse` function to use other AI providers.

**Q: Is my data secure?**
A: Yes. Your data stays in your knowledge base. Only user queries are sent to Google's API. We recommend implementing your own data privacy measures.

**Q: Can I customize the response format?**
A: Absolutely! Edit the `generateAIResponse` function to change how responses are formatted.

### Technical Questions

**Q: What Node.js version do I need?**
A: Node.js 18 or higher (for fetch API support).

**Q: Can I use this in a browser?**
A: Not directly (API keys would be exposed). Use it on a backend server and create an API endpoint.

**Q: How many concurrent requests can it handle?**
A: Depends on your server. The package itself is lightweight. Google Gemini has rate limits (typically 60 requests per minute).

**Q: Can I train it on custom data?**
A: That's exactly what the knowledge base does! No traditional training needed.

### Business Questions

**Q: Can I use this for multiple businesses?**
A: Yes, create separate instances with different configurations.

**Q: How do I handle offensive questions?**
A: Add content filtering in your implementation or let Gemini handle it (it has built-in safety filters).

**Q: Can the chatbot make bookings or transactions?**
A: Not directly, but you can extend the code to call your APIs based on user intent.

---

## 📞 Support

### Getting Help

1. **Documentation**: Read this guide thoroughly
2. **GitHub Issues**: Submit bugs and feature requests
3. **Email Support**: support@yourdomain.com
4. **Community Forum**: Join our Discord/Telegram

### Reporting Issues

When reporting issues, include:

```typescript
// Debug information
console.log({
  version: '1.0.0',
  nodeVersion: process.version,
  platform: process.platform,
  config: getConfig(),
  error: error.stack
});
```

### Feature Requests

We welcome feature requests! Common requests we're considering:
- Webhook integrations
- Analytics dashboard
- A/B testing for responses
- Voice input support
- Sentiment analysis

---

## 🎉 Conclusion

Congratulations! You now have a complete, production-ready AI chatbot that you can customize for ANY project. Remember:

1.