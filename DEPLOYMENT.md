# 🚀 Deployment Guide: Education eXcellence Services

This project consists of a high-performance **React (Vite) Frontend** and a **PHP / MySQL Backend API**. It is designed to be easily deployable in modern serverless environments (Vercel, Netlify) or traditional full-stack hosting (cPanel, Apache, Nginx, Plesk, VPS).

---

## 📋 Environment Variables Reference

Copy `.env.example` to `.env` or configure these variables in your hosting provider's dashboard:

| Variable | Scope | Default | Description |
| :--- | :--- | :--- | :--- |
| `VITE_API_BASE` | Frontend | `""` (same origin) | Remote backend API base URL (e.g. `https://api.yourdomain.com`). Leave empty if hosted on same domain. |
| `DB_HOST` | Backend | `localhost` | MySQL server host |
| `DB_USER` | Backend | `root` | Database username |
| `DB_PASS` | Backend | `""` | Database password |
| `DB_NAME` | Backend | `rvqsakxwfu` | Database name |
| `DB_PORT` | Backend | `3306` | MySQL port |

---

## 🌐 Option 1: Deploying to Vercel (Recommended for Frontend)

The repository includes a pre-configured [vercel.json](file:///d:/2026%20Projects/GWA/vercel.json).

1. Push your code to your GitHub/GitLab repository.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import this repository.
4. Vercel automatically detects the build configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
5. **Environment Variables**:
   - If your PHP backend is hosted on a separate server (e.g. `https://api.yourdomain.com`), add:
     - `VITE_API_BASE` = `https://api.yourdomain.com`
6. Click **Deploy**.

---

## 🗄️ Option 2: Full-Stack on cPanel / Apache / Shared Hosting

If you want both the frontend and backend running on the same domain (e.g. `https://www.yourdomain.com`):

1. **Build the Frontend**:
   ```bash
   npm run build
   ```
2. **Upload Files to `public_html/`**:
   - Copy everything from [frontend/dist/](file:///d:/2026%20Projects/GWA/frontend/dist) into your web root (`public_html/`).
     *(This includes `index.html`, `assets/`, and the pre-configured [.htaccess](file:///d:/2026%20Projects/GWA/frontend/public/.htaccess) for client-side routing).*
   - Copy the PHP files from [backend/](file:///d:/2026%20Projects/GWA/backend) directly into `public_html/` (e.g. `get_coursedata.php`, `submit_enquiry.php`, and `config/db.php`).
3. **Database Configuration**:
   - Create a `.env` file in `public_html/` or edit `config/db.php` with your cPanel MySQL database credentials:
     ```ini
     DB_HOST=localhost
     DB_USER=cpanel_dbuser
     DB_PASS=cpanel_password
     DB_NAME=cpanel_dbname
     DB_PORT=3306
     ```
4. **Import Database Schema**:
   - In phpMyAdmin, import `backend/eduexcellence.sql` (or your existing database dump).

---

## 🐧 Option 3: VPS / Nginx / Linux Server

If using Nginx, configure your site configuration block:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/gwa;
    index index.html index.php;

    # Frontend SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # PHP API Endpoints
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## ✅ Deployment Checklist

- [x] Production build tested and verified (`npm run build` exits with code 0).
- [x] Zero hardcoded localhost pings when running in production (`api.js`).
- [x] Automatic JSON / Content-Type safety checks on all API responses.
- [x] Dynamic database fallbacks (`db_courses.json`, countries, streams, levels) keep the site active even during temporary database downtime.
- [x] Apache [.htaccess](file:///d:/2026%20Projects/GWA/frontend/public/.htaccess) created to handle client-side routing and prevent 404s on page refresh.
- [x] Environment variable definitions provided in [.env.example](file:///d:/2026%20Projects/GWA/.env.example).
- [x] MySQL database sync verifier script [sync_verifier.php](file:///d:/2026%20Projects/GWA/backend/sync_verifier.php) available for validating production DB connection.
