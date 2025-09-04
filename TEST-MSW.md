# Testing MSW Setup

To verify MSW is working correctly:

1. **Start the dev server:**

   ```bash
   npm run dev
   ```

2. **Check the browser console:**
   - You should see: `🔧 MSW: Mock Service Worker started`

3. **Open browser dev tools and go to Network tab**

4. **Navigate to the dashboard (home page)**

5. **You should see:**
   - A network request to `http://localhost:3001/api/stats`
   - Response with mock data
   - Artificial delay (~300ms)

6. **Try other pages:**
   - `/clients` → Should make request to `/api/clients`
   - `/proposals` → Should make request to `/api/proposals`

## Expected MSW Behavior

✅ **Loading states** - Shows spinner while fetching
✅ **Network requests** - Visible in browser dev tools  
✅ **Realistic delays** - 100-300ms response times
✅ **Error handling** - Try going to invalid routes
✅ **Caching** - Subsequent visits should be faster due to TanStack Query cache

## Console Messages

Look for these messages in the browser console:

- `🔧 MSW: Mock Service Worker started`
- Network requests in the Network tab
- TanStack Query cache updates

If you see these, MSW is working perfectly!
