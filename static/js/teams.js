'use strict';

class Team {
    constructor(id, name, seed, region){
        this.id     = id;
        this.name   = name;
        this.seed   = seed;
        this.region = region
    }
}

// the 2018 teams...
const teams = [
    new Team(0,  "Villanova",        1,  "East"),
    new Team(1,  "LIU / RAD",        16, "East"),
    new Team(2,  "Virginia Tech",    8,  "East"),
    new Team(3,  "Alabama",          9,  "East"),
    new Team(4,  "West Virginia",    5,  "East"),
    new Team(5,  "UNC Wilmington",   12, "East"),
    new Team(6,  "Murray State",     4,  "East"),
    new Team(7,  "Marshall",         13, "East"),
    new Team(8,  "Florida",          6,  "East"),
    new Team(9,  "SBON / UCLA",      11, "East"),
    new Team(10, "Texas Tech",       3,  "East"),
    new Team(11, "Stephen F Austin", 14, "East"),
    new Team(12, "Arkansas",         7,  "East"),
    new Team(13, "Butler",           10, "East"),
    new Team(14, "Purdue",           2,  "East"),
    new Team(15, "CS Fullerton",     15, "East"),
    new Team(16, "Xavier",           1,  "West"),
    new Team(17, "NCCU / TXSO",      16, "West"),
    new Team(18, "Missouri",         8,  "West"),
    new Team(19, "Florida State",    9,  "West"),
    new Team(20, "Ohio State",       5,  "West"),
    new Team(21, "South Dakota",     12, "West"),
    new Team(22, "Gonzaga",          4,  "West"),
    new Team(23, "UNC Greensboro",   13, "West"),
    new Team(24, "Houston",          6,  "West"),
    new Team(25, "San Diego SU",     11, "West"),
    new Team(26, "Michigan",         3,  "West"),
    new Team(27, "Montana",          14, "West"),
    new Team(28, "Texas A&M",        7,  "West"),
    new Team(29, "Providence",       10, "West"),
    new Team(30, "UNC",              2,  "West"),
    new Team(31, "Lipscomb",         15, "West"),
    new Team(32, "Kansas",           1,  "Midwest"),
    new Team(33, "Pennsylvania",     16, "Midwest"),
    new Team(34, "Seton Hall",       8,  "Midwest"),
    new Team(35, "NC State",         9,  "Midwest"),
    new Team(36, "Clemson",          5,  "Midwest"),
    new Team(37, "New Mexico St",    12, "Midwest"),
    new Team(38, "Auburn",           4,  "Midwest"),
    new Team(39, "Charleston",       13, "Midwest"),
    new Team(40, "TCU",              6,  "Midwest"),
    new Team(41, "ASU / SYR",        11, "Midwest"),
    new Team(42, "Michigan State",   3,  "Midwest"),
    new Team(43, "Bucknell",         14, "Midwest"),
    new Team(44, "URI",              7,  "Midwest"),
    new Team(45, "Oklahoma",         10, "Midwest"),
    new Team(46, "Duke",             2,  "Midwest"),
    new Team(47, "Iona",             15, "Midwest"),
    new Team(48, "UVA",              1,  "South"),
    new Team(49, "UMBC",             16, "South"),
    new Team(50, "Creighton",        8,  "South"),
    new Team(51, "Kansas State",     9,  "South"),
    new Team(52, "Kentucky",         5,  "South"),
    new Team(53, "Davidson",         12, "South"),
    new Team(54, "Arizona",          4,  "South"),
    new Team(55, "Buffalo",          13, "South"),
    new Team(56, "Miami",            6,  "South"),
    new Team(57, "Loyola-Chi",       11, "South"),
    new Team(58, "Tennesee",         3,  "South"),
    new Team(59, "Wright State",     14, "South"),
    new Team(60, "Nevada",           7,  "South"),
    new Team(61, "Texas",            10, "South"),
    new Team(62, "Cincinnati",       2,  "South"),
    new Team(63, "Georgia State",    15, "South")
];