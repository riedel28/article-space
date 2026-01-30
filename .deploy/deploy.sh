cd ~/articlespace
npm run build:prod

rm -rf ~/../var/www/articlespace/html
mv ~/articlespace/build ~/../var/www/articlespace/html