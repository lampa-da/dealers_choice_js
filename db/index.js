const {Client} = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost/thesimpsons_db');

const getProfiles = async()=>{
  return (await client.query('SELECT * FROM profiles;')).rows;
}

const syncAndSeed = async()=>{
  const SQL =`
    DROP TABLE IF EXISTS profiles;
    
    CREATE TABLE profiles(
      id SERIAL PRIMARY KEY,
      name TEXT DEFAULT NULL,
      fullname VARCHAR(100) DEFAULT NULL,
      species VARCHAR(20) DEFAULT NULL,
      gender VARCHAR(20) DEFAULT NULL,
      occupation TEXT DEFAULT NULL,
      shortinfo TEXT DEFAULT NULL,
      moreinfo TEXT DEFAULT NULL
    );

    INSERT INTO profiles (id, name, fullname, species, gender, occupation, shortinfo, moreinfo) VALUES (1, 'Homer Simpson', 'Homer Jay Simpson', 'Human', 'Male', 'Chemist and safety inspector nuclear power plant operator', 'Homer Simpson is the patriarch of the Simpson family. Dan Castellaneta, the voice of Homer, describes him as "a dog trapped in a man''s body. He''s incredibly loyal—not entirely clean—but you gotta love him".', 'Homer Simpson is 38 years old, is married to Marge Simpson and is the father of Bart, Lisa and Maggie Simpson. He works at the Springfield Nuclear Power Plant with his co-workers and drinking buddies Lenny Leonard and Carl Carlson. His boss is Mr. Burns, owner of the nuclear power plant plant where Homer works as the safety inspector in sector 7G. He spends most of his free time at Moe''s Tavern or at home watching TV. Homer, Barney Gumble, Apu Nahasapeemapetilon, and Seymour Skinner were once a Barber shop quartet called the Be Sharps. Their first album was called Meet The Be Sharps and had the famous song Baby On Board. When Homer gets upset up with Bart''s behavior he tends to start strangling Bart but is usually either scolded by Marge to let Bart go or is beaten by Bart while he is strangling him. <br><br>Homer''s Father is named Abraham Simpson and his mother is named Mona. She was a political activist who died and tried to get her son to use her ashes in one last hippie protest.  He has a half-brother named Herb Powell who was voiced by Danny Devito. Upon one occasion Homer married a woman named Amber in Las Vegas while drunk, however he soon divorced her and she died of a drug overdose.<br><br> Homer hates Marge''s sisters Patty and Selma who insult him at every chance they get. He also has a love-hate friendship with his neighbor Ned Flanders. In one episode George H.W. Bush and Homer once got into a fight because George spanked Bart for ruining his memoirs. Homer also once made a drink called The Flaming Homer but it was stolen by Moe but after Homer revealed the ingredients in it everyone was disgusted by the drink.. The ingredients for the Flaming Homer are Tequila, Creme De Menthe, Schnapps, and Krusty Non-Narkotik Kough Syrup. After those ingredients are added it is set aflame.<br><br> Homer''s trademark saying is "D''oh", an annoyed grunt he often makes. Homer loves donuts and beer with a passion and also claims to very much enjoy the pork chops Marge makes.');
    INSERT INTO profiles (id, name, fullname, species, gender, occupation, shortinfo, moreinfo) VALUES (2, 'Marge Simpson', 'Marjorie Jacqueline Simpson (née Bouvier)', 'Human', 'Female', 'Housewife', 'Mother of Bart, Lisa, and Maggie and married Homer on the animated television show The Simpsons. Julie Kavner is the voice of Marge Simpson.', 'Marge Simpson is a Stay home wife and mother on The TV show The Simpsons. Marge has three children; Bart, Maggie, and Lisa. Her Husband is the fat food-loving Homer. She loves to clean, cook and take care of her family. She has been in every Simpsons game since the original arcade title.<br><br> Besides being a homemaker she has been employed before. She has been a nuclear technician, real estate agent, worked at an adult bakery, and was also a cop for a brief time.<br><br> She once owned her own pretzel making business.');
    INSERT INTO profiles (id, name, fullname, species, gender, occupation, shortinfo, moreinfo) VALUES (3, 'Bart Simpson', 'Bartholomew JoJo Simpson', 'Human', 'Male', '4th grade student', 'One of the most popular characters in television and video games, Bart is the mischievous son of Homer and Marge Simpson, and brother to Lisa and Maggie Simpson.', 'Bart Simpson is a 10 year old boy from the famous The Simpsons television show. He loves to pull pranks on his guardians and elders. He is also a Radioactive Man freak collector, and he is also interested in comic books. Bart is mostly seen at The Android''s Dungeon and the Kwik-E-Mart. He currently lives in Springfield, Unknown state, USA. He has a dog named Santa''s Little Helper and a cat named Snowball II. Bart is usually up to no good at school and recieves many poor grades. Bart has been in video games since the NES and is still present in current generation games on the Wii, PS3, and Xbox 360.');
    INSERT INTO profiles (id, name, fullname, species, gender, occupation, shortinfo, moreinfo) VALUES (4, 'Lisa Simpson', 'Lisa Marie Simpson', 'Human', 'Female', '2nd grade student', 'Lisa Simpson is the middle child of Marge and Homer on the long running animated sitcom, The Simpsons. She has a remarkably high intellect, enjoys Jazz music, and plays a baritone saxophone.', 'Lisa Simpson is the second oldest child in the Simpson family and one of the rare people in the show that uses any common sense. Even though Lisa is proud of her 156 IQ she is still shown to be very self conscious in some areas and is picked on at times for being so intelligent. Because Lisa is so intelligent she was allowed into the Springfield chapter of Mensa. The other members include Principal Seymour Skinner, Dr. Julius Hibbert, Lindsay Naegle, Jeff Albertson A.K.A Comic Book Guy, and Professor John Frink. Lisa loves the Itchy And Scratchy Show, Malibu Stacy dolls, and ponies.<br><br>Bart is Lisa''s ten year old brother and the two are mostly seen either fighting or arguing. At very rare times Bart and Lisa have shown that they care about each other and have worked together a couple of times as well.');
    INSERT INTO profiles (id, name, fullname, species, gender, occupation, shortinfo, moreinfo) VALUES (5, 'Maggie Simpson', 'Margaret Evelyn Lenny Simpson', 'Human', 'Female', 'none', 'Maggie is the baby in the Simpson family and has been in their video games ever since the beginning.', 'Maggie Simpson is a very important to Simpsons Video Games. She was kidnapped in the original arcade game and is still in them to today. She is a baby always sucking on a pacifier and is seen with Marge.');
  `;
  await client.query(SQL);
}

module.exports = {
  client,
  syncAndSeed,
  getProfiles
}