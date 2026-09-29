THE TURBAN HOUSE - HOSTING READY
================================

Backend: Node.js + Express
Database: Aiven MySQL
Frontend: Served by the same Express app

IMPORTANT SECURITY
------------------
DO NOT upload your Aiven password into GitHub or put it in HTML/JS.
Create Railway Variables from the Aiven connection details.

RAILWAY VARIABLES
-----------------
PORT=3000
DB_HOST=<Aiven Host>
DB_PORT=<Aiven Port>
DB_USER=avnadmin
DB_PASSWORD=<NEW Aiven Password>
DB_NAME=defaultdb
DB_SSL=true

DEPLOY
------
1. Create a GitHub repository and upload this folder's files.
2. In Railway, create a new project from the GitHub repository.
3. Railway should detect Node.js automatically.
4. Add the Variables above in Railway -> Variables.
5. Deploy.
6. Open the generated Railway domain.
7. Check: /api/health

AIVEN
-----
Use the Aiven MySQL service already created.
SSL is required. The server uses SSL with rejectUnauthorized:false.
For production security, rotate the Aiven password before deployment.

DATABASE
--------
The server automatically creates these tables if missing:
products, customers, orders, order_items, coupons, reviews.

DATA SYNC
---------
The existing website pages use localStorage internally. api-sync.js bridges
those existing pages to MySQL so database data is loaded first and changes are
synced back to the server. MySQL becomes the shared persistent store.

TESTING
-------
Open /api/health and confirm:
{ "success": true, ... }
Then open the home page and test:
Products -> Add/Edit/Delete -> Shop -> Cart -> Checkout -> Orders -> Coupons -> Reviews.

NO POWERSHELL REQUIRED
----------------------
After uploading to GitHub, Railway can build and run the project directly.


ANNUAL SERVICE PLAN
--------------------
This build includes a database-backed 1-year service plan. The admin can set the annual service charge, start/expiry dates and payment status from settings.html.
When the service period expires, the server blocks new order synchronization and checkout checks /api/service-status before allowing an order. Existing products/pages remain viewable.
Use Settings -> 1-Year Service & Renewal to renew for another year. Renewal requires the server-side ADMIN_PASSWORD.
For automatic online payment collection, connect a payment gateway before production use; the included renewal control is an admin/manual renewal mechanism.

IMPORTANT
---------
Do not commit .env to GitHub. Set all production environment variables in Railway.
