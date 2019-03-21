cd server
npm run clean
cd ..
git reset --hard
git pull origin master
cd server
npm install
npm run build
cd ../client
npm install
npm run build