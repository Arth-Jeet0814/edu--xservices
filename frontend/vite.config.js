import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/get_country.php': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/get_levels.php': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/get_streams.php': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/get_purpose.php': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/get_coursedata.php': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/get_courses.php': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/get_colleges.php': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/get_course_details.php': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/submit_enquiry.php': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
