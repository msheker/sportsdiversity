drop table if exists players;
create table players ("Season" varchar, "Race" varchar, "Percent" varchar, "Count" int);
copy players from 'C://temp/nba_players.csv' csv header;
select * from players;


drop table if exists coaches;
create table coaches ("Season" varchar, "Race" varchar, "Percent" varchar, "Count" int);
copy coaches from 'C://temp/nba_coaches.csv' csv header;
select * from coaches;


drop table if exists team_management;
create table team_management ("Season" varchar, "Race" varchar, "Percent" varchar, "Count" varchar);
copy team_management from 'C://temp/nba_team_management.csv' csv header;
select * from team_management;


drop table if exists owners;
create table owners ("Season" varchar, "Race" varchar, "Percent" varchar, "Count" int);
copy owners from 'C://temp/nba_owners.csv' csv header;
select * from owners;


drop table if exists assistant_coaches;
create table assistant_coaches ("Season" varchar, "Race" varchar, "Percent" varchar, "Count" int);
copy assistant_coaches from 'C://temp/nba_assistant_coaches.csv' csv header;
select * from assistant_coaches;


drop table if exists league_office;
create table league_office ("Season" varchar, "Race" varchar, "Percent" varchar, "Count" int);
copy league_office from 'C://temp/nba_league_office.csv' csv header;
select * from league_office;


drop table if exists ceo_pres;
create table ceo_pres ("Season" varchar, "Race" varchar, "Percent" varchar, "Count" int);
copy ceo_pres from 'C://temp/nba_ceo_pres.csv' csv header;
select * from ceo_pres;


drop table if exists gm;
create table gm ("Season" varchar, "Race" varchar, "Percent" varchar, "Count" int);
copy gm from 'C://temp/nba_gm.csv' csv header;
select * from gm;


drop table if exists vp;
create table vp ("Season" varchar, "Race" varchar, "Percent" varchar, "Count" float8);
copy vp from 'C://temp/nba_vp.csv' csv header;
select * from vp;


drop table if exists coaches_list;
create table coaches_list ("Coach" varchar, "Team" varchar, "Year(s)" varchar, "Record" varchar);
copy coaches_list from 'C://temp/nba_coaches_list.csv' csv header;
select * from coaches_list;


drop table if exists staff;
create table staff ("Season" varchar, "Race" varchar, "Percent" varchar, "Count" varchar);
copy staff from 'C://temp/nba_staff.csv' csv header;
select * from staff;
