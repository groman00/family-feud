-- SQLite
update Answers set revealed = false where id > 0;

update Surveys set strikes = 0 where id > 0;