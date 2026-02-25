// Complete Brawlers database with accurate information
// Based on official Brawl Stars data

const brawlers = [
    // Starting Brawler
    { id: 1, name: 'Shelly', rarity: 'Starting', role: 'Damage Dealer', range: 'Short', speed: 'Normal', health: 'Medium', releaseYear: 2017, image: 'images/brawlers/shelly.jpg' },
    
    // Rare Brawlers
    { id: 2, name: 'Nita', rarity: 'Rare', role: 'Damage Dealer', range: 'Medium', speed: 'Normal', health: 'Medium', releaseYear: 2017, image: 'images/brawlers/nita.png' },
    { id: 3, name: 'Colt', rarity: 'Rare', role: 'Damage Dealer', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2017, image: 'images/brawlers/colt.png' },
    { id: 4, name: 'Bull', rarity: 'Rare', role: 'Tank', range: 'Short', speed: 'Normal', health: 'Very High', releaseYear: 2017, image: 'images/brawlers/bull.png' },
    { id: 5, name: 'Brock', rarity: 'Rare', role: 'Marksman', range: 'Very Long', speed: 'Normal', health: 'Low', releaseYear: 2017, image: 'images/brawlers/brock.png' },
    { id: 6, name: 'El Primo', rarity: 'Rare', role: 'Tank', range: 'Short', speed: 'Fast', health: 'Very High', releaseYear: 2017, image: 'images/brawlers/el-primo.jpg' },
    { id: 7, name: 'Barley', rarity: 'Rare', role: 'Artillery', range: 'Medium', speed: 'Normal', health: 'Low', releaseYear: 2017, image: 'images/brawlers/barley.png' },
    { id: 8, name: 'Poco', rarity: 'Rare', role: 'Support', range: 'Medium', speed: 'Normal', health: 'High', releaseYear: 2017, image: 'images/brawlers/poco.png' },
    { id: 9, name: 'Rosa', rarity: 'Rare', role: 'Tank', range: 'Short', speed: 'Fast', health: 'High', releaseYear: 2019, image: 'images/brawlers/rosa.jpg' },
    
    // Super Rare Brawlers
    { id: 10, name: 'Jessie', rarity: 'Super Rare', role: 'Controller', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2017, image: 'images/brawlers/jessie.png' },
    { id: 11, name: 'Dynamike', rarity: 'Super Rare', role: 'Artillery', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2017, image: 'images/brawlers/dynamike.jpg' },
    { id: 12, name: 'Tick', rarity: 'Super Rare', role: 'Artillery', range: 'Very Long', speed: 'Normal', health: 'Very Low', releaseYear: 2019, image: 'images/brawlers/tick.png' },
    { id: 13, name: '8-Bit', rarity: 'Super Rare', role: 'Damage Dealer', range: 'Long', speed: 'Slow', health: 'High', releaseYear: 2019, image: 'images/brawlers/8-bit.png' },
    { id: 14, name: 'Rico', rarity: 'Super Rare', role: 'Damage Dealer', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2017, image: 'images/brawlers/rico.png' },
    { id: 15, name: 'Darryl', rarity: 'Super Rare', role: 'Tank', range: 'Short', speed: 'Normal', health: 'High', releaseYear: 2017, image: 'images/brawlers/darryl.jpg' },
    { id: 16, name: 'Penny', rarity: 'Super Rare', role: 'Artillery', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2018, image: 'images/brawlers/penny.png' },
    { id: 17, name: 'Carl', rarity: 'Super Rare', role: 'Damage Dealer', range: 'Medium', speed: 'Normal', health: 'High', releaseYear: 2019, image: 'images/brawlers/carl.jpg' },
    { id: 18, name: 'Jacky', rarity: 'Super Rare', role: 'Tank', range: 'Short', speed: 'Fast', health: 'High', releaseYear: 2020, image: 'images/brawlers/jacky.png' },
    { id: 19, name: 'Gus', rarity: 'Super Rare', role: 'Support', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2022, image: 'images/brawlers/gus.jpg' },
    
    // Epic Brawlers  
    { id: 20, name: 'Bo', rarity: 'Epic', role: 'Controller', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2017, image: 'images/brawlers/bo.png' },
    { id: 21, name: 'Emz', rarity: 'Epic', role: 'Controller', range: 'Medium', speed: 'Normal', health: 'Medium', releaseYear: 2019, image: 'images/brawlers/emz.png' },
    { id: 22, name: 'Stu', rarity: 'Epic', role: 'Assassin', range: 'Medium', speed: 'Very Fast', health: 'Low', releaseYear: 2021, image: 'images/brawlers/stu.jpg' },
    { id: 23, name: 'Piper', rarity: 'Epic', role: 'Marksman', range: 'Very Long', speed: 'Normal', health: 'Low', releaseYear: 2017, image: 'images/brawlers/piper.png' },
    { id: 24, name: 'Pam', rarity: 'Epic', role: 'Support', range: 'Medium', speed: 'Normal', health: 'Very High', releaseYear: 2017, image: 'images/brawlers/pam.png' },
    { id: 25, name: 'Frank', rarity: 'Epic', role: 'Tank', range: 'Medium', speed: 'Slow', health: 'Very High', releaseYear: 2018, image: 'images/brawlers/frank.png' },
    { id: 26, name: 'Bibi', rarity: 'Epic', role: 'Tank', range: 'Short', speed: 'Very Fast', health: 'High', releaseYear: 2019, image: 'images/brawlers/bibi.png' },
    { id: 27, name: 'Bea', rarity: 'Epic', role: 'Marksman', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2019, image: 'images/brawlers/bea.png' },
    { id: 28, name: 'Nani', rarity: 'Epic', role: 'Marksman', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2020, image: 'images/brawlers/nani.jpg' },
    { id: 29, name: 'Edgar', rarity: 'Epic', role: 'Assassin', range: 'Short', speed: 'Very Fast', health: 'Medium', releaseYear: 2020, image: 'images/brawlers/edgar.png' },
    { id: 30, name: 'Griff', rarity: 'Epic', role: 'Controller', range: 'Medium', speed: 'Normal', health: 'Medium', releaseYear: 2021, image: 'images/brawlers/griff.jpg' },
    { id: 31, name: 'Grom', rarity: 'Epic', role: 'Artillery', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2021, image: 'images/brawlers/grom.jpg' },
    { id: 32, name: 'Bonnie', rarity: 'Epic', role: 'Marksman', range: 'Long', speed: 'Fast', health: 'Low', releaseYear: 2022, image: 'images/brawlers/bonnie.png' },
    { id: 33, name: 'Gale', rarity: 'Epic', role: 'Controller', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2020, image: 'images/brawlers/gale.png' },
    { id: 34, name: 'Colette', rarity: 'Epic', role: 'Damage Dealer', range: 'Long', speed: 'Fast', health: 'Medium', releaseYear: 2020, image: 'images/brawlers/colette.jpg' },
    { id: 35, name: 'Belle', rarity: 'Epic', role: 'Marksman', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2021, image: 'images/brawlers/belle.png' },
    { id: 36, name: 'Ash', rarity: 'Epic', role: 'Tank', range: 'Short', speed: 'Normal', health: 'Very High', releaseYear: 2021, image: 'images/brawlers/ash.jpg' },
    { id: 37, name: 'Lola', rarity: 'Epic', role: 'Damage Dealer', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2021, image: 'images/brawlers/lola.png' },
    { id: 38, name: 'Sam', rarity: 'Epic', role: 'Assassin', range: 'Short', speed: 'Fast', health: 'High', releaseYear: 2022, image: 'images/brawlers/sam.jpg' },
    { id: 39, name: 'Mandy', rarity: 'Epic', role: 'Marksman', range: 'Very Long', speed: 'Normal', health: 'Low', releaseYear: 2022, image: 'images/brawlers/mandy.png' },
    { id: 40, name: 'Maisie', rarity: 'Epic', role: 'Marksman', range: 'Very Long', speed: 'Normal', health: 'Low', releaseYear: 2023, image: 'images/brawlers/maisie.png' },
    { id: 41, name: 'Hank', rarity: 'Epic', role: 'Tank', range: 'Short', speed: 'Normal', health: 'Very High', releaseYear: 2023, image: 'images/brawlers/hank.png' },
    { id: 42, name: 'Pearl', rarity: 'Epic', role: 'Damage Dealer', range: 'Medium', speed: 'Normal', health: 'Medium', releaseYear: 2023, image: 'images/brawlers/pearl.png' },
    { id: 43, name: 'Larry&Lawrie', rarity: 'Epic', role: 'Artillery', range: 'Long', speed: 'Schnell', health: 'Medium', releaseYear: 2024, image: 'images/brawlers/larry&lawrie.png' },
    { id: 44, name: 'Angelo', rarity: 'Epic', role: 'Marksman', range: 'Long', speed: 'Sehr schnell', health: 'Low', releaseYear: 2024, image: 'images/brawlers/angelo.png' }, //neu
    { id: 45, name: 'Berry', rarity: 'Epic', role: 'Support', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2024, image: 'images/brawlers/berrie.png' }, //neu
    { id: 46, name: 'Shade', rarity: 'Epic', role: 'Assassin', range: 'Short', speed: 'Schnell', health: 'Medium', releaseYear: 2024, image: 'images/brawlers/shade.png' }, //neu
    { id: 47, name: 'Meeple', rarity: 'Epic', role: 'Controller', range: 'Medium', speed: 'Normal', health: 'Medium', releaseYear: 2024, image: 'images/brawlers/meeple.png' }, //neu
    { id: 48, name: 'Trunk', rarity: 'Epic', role: 'Tank', range: 'Short', speed: 'Langsam', health: 'High', releaseYear: 2024, image: 'images/brawlers/trunk.png' }, //neu

    // Mythic Brawlers
    { id: 49, name: 'Mortis', rarity: 'Mythic', role: 'Assassin', range: 'Short', speed: 'Very Fast', health: 'Medium', releaseYear: 2017, image: 'images/brawlers/mortis.jpg' },
    { id: 50, name: 'Tara', rarity: 'Mythic', role: 'Damage Dealer', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2017, image: 'images/brawlers/tara.jpg' },
    { id: 51, name: 'Gene', rarity: 'Mythic', role: 'Controller', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2019, image: 'images/brawlers/gene.jpg' },
    { id: 52, name: 'Max', rarity: 'Mythic', role: 'Support', range: 'Long', speed: 'Very Fast', health: 'Low', releaseYear: 2019, image: 'images/brawlers/max.jpg' },
    { id: 53, name: 'Mr. P', rarity: 'Mythic', role: 'Controller', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2020, image: 'images/brawlers/mr-p.jpg' },
    { id: 54, name: 'Sprout', rarity: 'Mythic', role: 'Artillery', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2020, image: 'images/brawlers/sprout.png' },
    { id: 55, name: 'Byron', rarity: 'Mythic', role: 'Support', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2020, image: 'images/brawlers/byron.png' },
    { id: 56, name: 'Squeak', rarity: 'Mythic', role: 'Controller', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2021, image: 'images/brawlers/squeak.png' },
    { id: 57, name: 'Lou', rarity: 'Mythic', role: 'Controller', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2020, image: 'images/brawlers/lou.jpg' },
    { id: 58, name: 'Ruffs', rarity: 'Mythic', role: 'Support', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2021, image: 'images/brawlers/ruffs.jpg' },
    { id: 59, name: 'Buzz', rarity: 'Mythic', role: 'Assassin', range: 'Short', speed: 'Normal', health: 'High', releaseYear: 2021, image: 'images/brawlers/buzz.png' },
    { id: 60, name: 'Fang', rarity: 'Mythic', role: 'Assassin', range: 'Short', speed: 'Fast', health: 'Medium', releaseYear: 2022, image: 'images/brawlers/fang.png' },
    { id: 61, name: 'Eve', rarity: 'Mythic', role: 'Damage Dealer', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2022, image: 'images/brawlers/eve.png' },
    { id: 62, name: 'Janet', rarity: 'Mythic', role: 'Marksman', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2022, image: 'images/brawlers/janet.png' },
    { id: 63, name: 'Otis', rarity: 'Mythic', role: 'Controller', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2022, image: 'images/brawlers/otis.png' },
    { id: 64, name: 'Buster', rarity: 'Mythic', role: 'Tank', range: 'Short', speed: 'Normal', health: 'Very High', releaseYear: 2022, image: 'images/brawlers/buster.png' },
    { id: 65, name: 'Gray', rarity: 'Mythic', role: 'Support', range: 'Medium', speed: 'Normal', health: 'Medium', releaseYear: 2022, image: 'images/brawlers/gray.png' },
    { id: 66, name: 'R-T', rarity: 'Mythic', role: 'Damage Dealer', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2023, image: 'images/brawlers/r-t.png' },
    { id: 67, name: 'Willow', rarity: 'Mythic', role: 'Controller', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2023, image: 'images/brawlers/willow.png' },
    { id: 68, name: 'Doug', rarity: 'Mythic', role: 'Support', range: 'Medium', speed: 'Normal', health: 'Medium', releaseYear: 2023, image: 'images/brawlers/doug.png' },
    { id: 69, name: 'Chuck', rarity: 'Mythic', role: 'Damage Dealer', range: 'Medium', speed: 'Fast', health: 'Medium', releaseYear: 2023, image: 'images/brawlers/chuck.jpg' },
    { id: 70, name: 'Charlie', rarity: 'Mythic', role: 'Controller', range: 'Medium', speed: 'Fast', health: 'Medium', releaseYear: 2023, image: 'images/brawlers/charlie.png' },
    { id: 71, name: 'Mico', rarity: 'Mythic', role: 'Assassin', range: 'Short', speed: 'Sehr schnell', health: 'Low', releaseYear: 2023, image: 'images/brawlers/mico.png' }, //neu
    { id: 72, name: 'Lily', rarity: 'Mythic', role: 'Assassin', range: 'Short', speed: 'Sehr schnell', health: 'Low', releaseYear: 2024, image: 'images/brawlers/lily.png' }, //neu
    { id: 73, name: 'Ollie', rarity: 'Mythic', role: 'Tank', range: 'Short', speed: 'Normal', health: 'High', releaseYear: 2024, image: 'images/brawlers/ollie.png' }, //neu
    { id: 74, name: 'Melodie', rarity: 'Mythic', role: 'Assassin', range: 'Very High', speed: 'Normal', health: 'High', releaseYear: 2024, image: 'images/brawlers/melodie.png' }, //neu
    { id: 75, name: 'Clancy', rarity: 'Mythic', role: 'Damage Dealer', range: 'High', speed: 'Normal', health: 'Medium', releaseYear: 2024, image: 'images/brawlers/clancy.png' }, //neu
    { id: 76, name: 'Moe', rarity: 'Mythic', role: 'Damage Dealer', range: 'High', speed: 'High', health: 'Medium', releaseYear: 2024, image: 'images/brawlers/moe.png' }, //neu
    { id: 77, name: 'Juju', rarity: 'Mythic', role: 'Artillery', range: 'Low', speed: 'Normal', health: 'Low', releaseYear: 2024, image: 'images/brawlers/juju.png' }, //neu
    { id: 78, name: 'Lumi', rarity: 'Mythic', role: 'Damage Dealer', range: 'Very High', speed: 'Normal', health: 'Very Low', releaseYear: 2025, image: 'images/brawlers/lumi.png' },
    { id: 79, name: 'Finx', rarity: 'Mythic', role: 'Controller', range: 'Very High', speed: 'High', health: 'High', releaseYear: 2025, image: 'images/brawlers/finx.png' },
    { id: 80, name: 'Jae-Yong',rarity: 'Mythic', role: 'Support', range: 'Very High', speed: 'High', health: 'Medium', releaseYear: 2025, image: 'images/brawlers/jae-yong.png' },
    { id: 81, name: 'Alli', rarity: 'Mythic', role: 'Assassin', range: 'Very Low',  speed: 'High', health: 'Very High',releaseYear: 2025, image: 'images/brawlers/alli.png' },
    { id: 82, name: 'Mina', rarity: 'Mythic', role: 'Damage Dealer', range: 'Very High', speed: 'High', health: 'Medium', releaseYear: 2025, image: 'images/brawlers/mina.png' },
    { id: 83, name: 'Ziggy', rarity: 'Mythic', role: 'Controller', range: 'Medium', speed: 'High', health: 'Low', releaseYear: 2025, image: 'images/brawlers/ziggy.png' },
    { id: 84, name: 'Gigi', rarity: 'Mythic', role: 'Assassin', range: 'Very Low',  speed: 'Very High',health: 'Very High',releaseYear: 2025, image: 'images/brawlers/gigi.png' },
            
    // Legendary Brawlers
    { id: 85, name: 'Spike', rarity: 'Legendary', role: 'Damage Dealer', range: 'Medium', speed: 'Normal', health: 'Low', releaseYear: 2017, image: 'images/brawlers/spike.jpg' },
    { id: 86, name: 'Crow', rarity: 'Legendary', role: 'Assassin', range: 'Long', speed: 'Very Fast', health: 'Very Low', releaseYear: 2017, image: 'images/brawlers/crow.jpg' },
    { id: 87, name: 'Leon', rarity: 'Legendary', role: 'Assassin', range: 'Long', speed: 'Very Fast', health: 'Medium', releaseYear: 2018, image: 'images/brawlers/leon.jpg' },
    { id: 88, name: 'Sandy', rarity: 'Legendary', role: 'Controller', range: 'Long', speed: 'Normal', health: 'High', releaseYear: 2019, image: 'images/brawlers/sandy.png' },
    { id: 89, name: 'Amber', rarity: 'Legendary', role: 'Controller', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2020, image: 'images/brawlers/amber.png' },
    { id: 90, name: 'Meg', rarity: 'Legendary', role: 'Tank', range: 'Medium', speed: 'Normal', health: 'Very High', releaseYear: 2021, image: 'images/brawlers/meg.jpg' },
    { id: 91, name: 'Surge', rarity: 'Legendary', role: 'Damage Dealer', range: 'Long', speed: 'Normal', health: 'Medium', releaseYear: 2020, image: 'images/brawlers/surge.jpg' },
    { id: 92, name: 'Chester', rarity: 'Legendary', role: 'Damage Dealer', range: 'Long', speed: 'Fast', health: 'Medium', releaseYear: 2022, image: 'images/brawlers/chester.png' },
    { id: 93, name: 'Cordelius', rarity: 'Legendary', role: 'Assassin', range: 'Medium', speed: 'Fast', health: 'Medium', releaseYear: 2023, image: 'images/brawlers/cordelius.png' },
    { id: 94, name: 'Kit', rarity: 'Legendary', role: 'Support', range: 'Medium', speed: 'Schnell', health: 'High', releaseYear: 2023, image: 'images/brawlers/kit.png' }, //neu
    { id: 95, name: 'Draco', rarity: 'Legendary', role: 'Tank', range: 'Short',  speed: 'Normal', health: 'Very High', releaseYear: 2024, image: 'images/brawlers/draco.png' }, //neu
    { id: 96, name: 'Kenji', rarity: 'Legendary', role: 'Assassin', range: 'Short', speed: 'Sehr schnell', health: 'Medium', releaseYear: 2024, image: 'images/brawlers/kenji.png' }, //neu
    { id: 97, name: 'Pierce', rarity: 'Legendary', role: 'Marksman', range: 'Long', speed: 'Normal', health: 'Low', releaseYear: 2024, image: 'images/brawlers/pierce.png' }, //neu
    
    // Ultra Legendary Brawlers
    { id: 98, name: 'Kaze', rarity: 'ultralegendary',    role: 'Assassin',   range: 'Short',  speed: 'Sehr schnell', health: 'Low',    releaseYear: 2024, image: 'images/brawlers/kaze.png' }, //neu
];

// Stat comparison values for higher/lower logic
const statValues = {
    rarity: {
        'Starting': 0,
        'Rare': 1,
        'Super Rare': 2,
        'Epic': 3,
        'Mythic': 4,
        'Legendary': 5,
        'Ultra Legendary': 6
    },
    range: {
        'Short': 0,
        'Medium': 1,
        'Long': 2,
        'Very Long': 3
    },
    speed: {
        'Slow': 0,
        'Normal': 1,
        'Fast': 2,
        'Very Fast': 3
    },
    health: {
        'Very Low': 0,
        'Low': 1,
        'Medium': 2,
        'High': 3,
        'Very High': 4
    }
};
