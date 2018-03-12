'use strict';

// the 2017 teams...
class Team {
    constructor(id, name, seed, region){
        this.id     = id;
        this.name   = name;
        this.seed   = seed;
        this.region = region
    }
}

const teams = [
    new Team(0,  "Villanova",       1,  "East"),
    new Team(1,  "Mt St Mary's",    16, "East"),
    new Team(2,  "Wisconsin",       8,  "East"),
    new Team(3,  "Virginia Tech",   9,  "East"),
    new Team(4,  "UVA",             5,  "East"),
    new Team(5,  "UNC Wilmington",  12, "East"),
    new Team(6,  "Florida",         4,  "East"),
    new Team(7,  "ETSU",            13, "East"),
    new Team(8,  "SMU",             6,  "East"),
    new Team(9,  "USC",             11, "East"),
    new Team(10, "Baylor",          3,  "East"),
    new Team(11, "New Mexico St",   14, "East"),
    new Team(12, "South Carolina",  7,  "East"),
    new Team(13, "Marquette",       10, "East"),
    new Team(14, "Duke",            2,  "East"),
    new Team(15, "Troy",            15, "East"),
    new Team(16, "Gonzaga",         1,  "West"),
    new Team(17, "South Dakota St", 16, "West"),
    new Team(18, "Northwestern",    8,  "West"),
    new Team(19, "Vanderbilt",      9,  "West"),
    new Team(20, "Notre Dame",      5,  "West"),
    new Team(21, "Princeton",       12, "West"),
    new Team(22, "West Virginia",   4,  "West"),
    new Team(23, "Bucknell",        13, "West"),
    new Team(24, "Maryland",        6,  "West"),
    new Team(25, "Xavier",          11, "West"),
    new Team(26, "Florida State",   3,  "West"),
    new Team(27, "FGCU",            14, "West"),
    new Team(28, "Saint Mary's",    7,  "West"),
    new Team(29, "VCU",             10, "West"),
    new Team(30, "Arizona",         2,  "West"),
    new Team(31, "North Dakota",    15, "West"),
    new Team(32, "Kansas",          1,  "Midwest"),
    new Team(33, "UC Davis",        16, "Midwest"),
    new Team(34, "Miami",           8,  "Midwest"),
    new Team(35, "Michigan State",  9,  "Midwest"),
    new Team(36, "Iowa State",      5,  "Midwest"),
    new Team(37, "Nevada",          12, "Midwest"),
    new Team(38, "Purdue",          4,  "Midwest"),
    new Team(39, "Vermont",         13, "Midwest"),
    new Team(40, "Creighton",       6,  "Midwest"),
    new Team(41, "URI",             11, "Midwest"),
    new Team(42, "Oregon",          3,  "Midwest"),
    new Team(43, "Iowa",            14, "Midwest"),
    new Team(44, "Michigan",        7,  "Midwest"),
    new Team(45, "Oklahoma State",  10, "Midwest"),
    new Team(46, "Louisville",      2,  "Midwest"),
    new Team(47, "Jacksonville St", 15, "Midwest"),
    new Team(48, "UNC",             1,  "South"),
    new Team(49, "Texas Southern",  16, "South"),
    new Team(50, "Arkansas",        8,  "South"),
    new Team(51, "Seton Hall",      9,  "South"),
    new Team(52, "Minnesota",       5,  "South"),
    new Team(53, "Mid Tennessee",   12, "South"),
    new Team(54, "Butler",          4,  "South"),
    new Team(55, "Winthrop",        13, "South"),
    new Team(56, "Cincinnati",      6,  "South"),
    new Team(57, "Kansas State",    11, "South"),
    new Team(58, "UCLA",            3,  "South"),
    new Team(59, "Kent State",      14, "South"),
    new Team(60, "Dayton",          7,  "South"),
    new Team(61, "Wichita State",   10, "South"),
    new Team(62, "Kentucky",        2,  "South"),
    new Team(63, "N Kentucky",      15, "South")
];