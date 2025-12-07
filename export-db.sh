#!/bin/bash
mysqldump -u root -p pison_gold > database/pison_gold.sql
git add . 
git commit -m "working"
git push



