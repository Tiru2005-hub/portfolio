/**
 * ============================================================
 * ANTI-GRAVITY PORTFOLIO - Backend Server
 * Author: Tiru Krishna E
 * Description: Express.js server for contact form submissions
 *              Messages stored in a JSON file (local database)
 * ============================================================
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static portfolio files
app.use(express.static(path.join(__dirname, '..')));

// ─── Database (JSON File) ─────────────────────────────────────────
const DB_FILE = path.join(__dirname, 'data', 'messages.json');

// Ensure data directory and file exist
const initDB = async () => {
  await fs.ensureDir(path.join(__dirname, 'data'));
  const exists = await fs.pathExists(DB_FILE);
  if (!exists) {
    await fs.writeJson(DB_FILE, { messages: [] }, { spaces: 2 });
    console.log('📁 Database file created: data/messages.json');
  }
};

// Read messages from JSON
const readMessages = async () => {
  const data = await fs.readJson(DB_FILE);
  return data.messages || [];
};

// Save message to JSON
const saveMessage = async (message) => {
  const data = await fs.readJson(DB_FILE);
  const messages = data.messages || [];
  messages.push(message);
  await fs.writeJson(DB_FILE, { messages }, { spaces: 2 });
  return message;
};

// ─── Routes ──────────────────────────────────────────────────────

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: '🚀 Anti-Gravity Portfolio Backend is running!',
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/contact
 * Submit a contact message - validates & stores in JSON DB
 */
app.post('/api/contact',
  // Validation rules
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('message')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Message must be between 10 and 2000 characters')
  ],
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    try {
      const { name, email, subject, message } = req.body;

      // Create message record
      const newMessage = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim(),
        subject: (subject || '').trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
        read: false
      };

      // Save to JSON database
      await saveMessage(newMessage);

      console.log(`✉️  New message from: ${name} (${email}) at ${newMessage.timestamp}`);

      res.status(201).json({
        success: true,
        message: '🎉 Your message has been sent successfully! I\'ll get back to you soon.',
        id: newMessage.id
      });

    } catch (error) {
      console.error('❌ Error saving message:', error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    }
  }
);

/**
 * GET /api/messages
 * Get all stored messages (admin view)
 */
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await readMessages();
    res.json({
      success: true,
      count: messages.length,
      messages: messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    });
  } catch (error) {
    console.error('❌ Error reading messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving messages'
    });
  }
});

/**
 * GET /api/stats
 * Get portfolio stats
 */
app.get('/api/stats', async (req, res) => {
  try {
    const messages = await readMessages();
    res.json({
      success: true,
      stats: {
        totalMessages: messages.length,
        unreadMessages: messages.filter(m => !m.read).length,
        lastContact: messages.length > 0 ? messages[messages.length - 1].timestamp : null
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching stats' });
  }
});

// ─── Catch-all: Serve index.html ─────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ─── Start Server ─────────────────────────────────────────────────
initDB().then(() => {
  app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ════════════════════════════════════════════════');
    console.log('   ANTI-GRAVITY PORTFOLIO BACKEND');
    console.log('   Tiru Krishna E - Portfolio Server');
    console.log('════════════════════════════════════════════════════');
    console.log(`✅  Server running at: http://localhost:${PORT}`);
    console.log(`📬  Contact API:       http://localhost:${PORT}/api/contact`);
    console.log(`📋  Messages:          http://localhost:${PORT}/api/messages`);
    console.log(`💓  Health Check:      http://localhost:${PORT}/api/health`);
    console.log('════════════════════════════════════════════════════\n');
  });
});
