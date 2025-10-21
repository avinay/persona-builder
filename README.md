# 🎨 Persona Builder - Full Stack App

A beautiful, full-stack web application for UX designers to create, manage, and visualize user personas. Built with vanilla JavaScript, Supabase, and deployed on Vercel.

![Persona Builder](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Supabase](https://img.shields.io/badge/Supabase-Database-green.svg)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black.svg)

## ✨ Features

### 🎯 Core Functionality
- **Create Personas**: Build detailed user personas with all essential fields
- **Live Preview**: Real-time preview as you type
- **Save to Database**: All personas are saved to Supabase database
- **Manage Personas**: View, edit, and delete saved personas
- **Search & Filter**: Find personas by name or occupation
- **Download Cards**: Export persona cards as PNG images

### 🎨 Design Features
- **Modern UI**: Clean, professional design matching Figma specifications
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Tab Navigation**: Easy switching between create and manage modes
- **Beautiful Cards**: Professional persona card layouts
- **Real-time Updates**: Instant preview updates

### 🚀 Technical Features
- **Supabase Integration**: Full CRUD operations with PostgreSQL
- **Real-time Database**: Automatic updates and synchronization
- **Vercel Deployment**: One-click deployment to production
- **Environment Variables**: Secure configuration management
- **No Build Process**: Pure HTML, CSS, and JavaScript

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (optional)
- **Deployment**: Vercel
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Manrope (Google Fonts)

## 🚀 Quick Start

### 1. Set Up Supabase

1. **Create a Supabase project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Set up the database**:
   - Go to SQL Editor in your Supabase dashboard
   - Run the SQL from `supabase-schema.sql`
   - This creates the `personas` table with proper indexes and RLS

### 2. Configure Environment Variables

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Update with your Supabase credentials**:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Update script.js**:
   Replace the placeholder values in `script.js`:
   ```javascript
   const supabaseUrl = 'your_actual_supabase_url'
   const supabaseKey = 'your_actual_supabase_anon_key'
   ```

### 3. Local Development

```bash
# Install dependencies (optional)
npm install

# Start local server
npm start
# or
python3 -m http.server 8000
```

Visit `http://localhost:8000`

### 4. Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

#### Option B: Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in project settings
5. Deploy!

## 📁 Project Structure

```
persona-builder/
├── index.html              # Main application
├── styles.css              # All styling
├── script.js               # Application logic
├── supabase.js             # Supabase service layer
├── supabase-schema.sql     # Database schema
├── package.json            # Dependencies
├── vercel.json             # Vercel configuration
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # Documentation
```

## 🗄️ Database Schema

The `personas` table includes:
- `id` (UUID, Primary Key)
- `name` (VARCHAR, Required)
- `age` (INTEGER)
- `education` (VARCHAR)
- `status` (VARCHAR)
- `occupation` (VARCHAR, Required)
- `location` (VARCHAR)
- `tech_literacy` (VARCHAR)
- `goals` (TEXT)
- `frustrations` (TEXT)
- `quote` (TEXT)
- `image_url` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🔧 Configuration

### Supabase Setup
1. **Row Level Security (RLS)**: Enabled for data protection
2. **Policies**: Configured for authenticated users
3. **Indexes**: Optimized for query performance
4. **Triggers**: Auto-update timestamps

### Environment Variables
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🎯 Usage

### Creating Personas
1. Fill out the form with persona details
2. Watch the live preview update
3. Click "Save Persona" to store in database
4. Switch to "Manage Personas" to view saved personas

### Managing Personas
1. View all saved personas in a list
2. Search by name or occupation
3. Edit personas by clicking "Edit"
4. Delete personas with confirmation
5. Download persona cards as images

## 🚀 Deployment

### Vercel Deployment
1. **Automatic**: Push to GitHub, connect to Vercel
2. **Manual**: Use Vercel CLI for direct deployment
3. **Environment**: Set Supabase credentials in Vercel dashboard

### Other Platforms
- **Netlify**: Works with static hosting
- **GitHub Pages**: Free hosting option
- **Cloudflare Pages**: Fast global CDN

## 🔒 Security

- **Row Level Security**: Database-level access control
- **Environment Variables**: Secure credential management
- **CORS**: Properly configured for Supabase
- **Input Validation**: Client and server-side validation

## 🎨 Customization

### Styling
- Modify CSS variables in `styles.css`
- Update colors, fonts, and spacing
- Add custom animations and transitions

### Functionality
- Add new persona fields
- Implement user authentication
- Add persona sharing features
- Create persona templates

## 🐛 Troubleshooting

### Common Issues
1. **Supabase Connection**: Check URL and API key
2. **Database Errors**: Verify table schema
3. **CORS Issues**: Check Supabase project settings
4. **Environment Variables**: Ensure proper configuration

### Debug Mode
- Check browser console for errors
- Verify Supabase dashboard for data
- Test API calls in Supabase SQL editor

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **Supabase** for the amazing backend-as-a-service
- **Vercel** for seamless deployment
- **Figma** for design inspiration
- **UX Community** for feedback and support

---

**Built with ❤️ for UX Designers**

**Ready to deploy? Follow the setup guide above and you'll have a production-ready persona builder in minutes!**