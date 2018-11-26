const fs = require('fs')
const path = require('path')

const products = []

// GUITARS

products.push({
    instrument: 'guitar',
    brand: 'Fender',
    model: 'Stratocaster American Special',
    features: [
        'Highly Resonant and Lightweight Alder Body',
        'Two Texas Special Single-Coil Pickups and an Atomic Humbucker',
        'Maple Neck with a Modern C Profile',
        'Greasebucket Tone Circuit',
        '6-Saddle Vintage Style Synchronized Tremolo Bridge'
    ],
    description: 'The Fender American Special HSS Stratocaster electric guitar delivers genuine U.S-made Fender quality into the hands of beginners and professionals alike. Combining the resonant Alder body with a Maple neck and Rosewood fingerboard, the American Special HSS Stratocaster provides a smooth and comfortable playing experience. The two single-coil Texas Special pickups with an Atomic Humbucker in a HSS configuration produce a bright and full tone that\'s ideal for everything from country and blues to rock, punk, jazz and more.',
    price: 847,
    inStock: 25,
    imageUrl: 'https://images.static-thomann.de/pics/prod/402337.jpg',
    type: 'ELECTRIC'
}),

    products.push({
        instrument: 'guitar',
        brand: 'Gibson',
        model: 'SG Faded 2018, Worn Bourbon',
        features: [
            'Versatile 490R & 490T Humbuckers Offer Rich, Vintage Tones',
            'Iconic SG Shaped Mahogany Body Delivers Warm Characteristics',
            'Slim Taper Neck Provides Comfortable Playing Experience',
            'Tektoid Nut Increases Middle & Upper Harmonics',
            'Includes Gibson Softshell Case for Transportation'
        ],
        description: 'The Gibson SG Faded Electric Guitar, Worn Bourbon (2018) provides players with the legendary SG performance with a worn-in aesthetic, creating the same feeling as a guitar that\'s seen many years of life. The lightweight mahogany body is finished in a stunning worn bourbon colour, delivering a beautiful look which reflect its warm, organic tones. The slim taper maple neck delivers an incredibly smooth performance, while the addition of a rosewood fingerboard helps warm the harsh tones of the maple for a beautiful tonality. The SG is also equipped with a set of 490 humbuckers, offering a stunning, vintage tone, with independent tone and volume control to dial in a range of powerful sounds. The guitar also features a tune-o-matic bridge, tektoid nut, and vintage-style keystone tuners to deliver incredible string stability and enhance sustain and resonance. Delivered with a softshell case, the Gibson SG Faded Guitar is perfect for players wanting high quality SG performance with a vintage aesthetic.',
        price: 649,
        inStock: 5,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/36/367294/1200/preview.jpg',
        type: 'ELECTRIC'
    }),

    products.push({
        instrument: 'guitar',
        brand: 'Fender',
        model: 'Fender American Original \'50s Telecaster MN, Butterscotch Blonde',
        features: [
            'Pure Vintage \'52 Tele Pickups Delivers Powerfully Authentic Tones',
            'Iconic Telecaster Body For Signature Fender Style & Tone',
            'Perfect For Upper Fingerboard Shredding Due To Cutaway Profile',
            'Lacquer Finish Enables The Wood To Breath Naturally',
            'Butterscotch Blonde Finish Offers Eye-Catching & Authentic Look'
        ],
        description: 'The Fender American Original \'50s Telecaster MN, Butterscotch Blonde recreates the sound and appearance of those 1950s Telecasters, combined with a modern feel for a classic Fender tone and style. Players who love the Telecaster\'s unique feel and style will truly appreciate the American Original Tele\'s tonal characteristics that take you soaring back to the 1950s. The Fender American Original Telecaster features Pure Vintage \'52 single-coil Tele pickups which were built to be as period-correct as possible to deliver a powerfully authentic sound and a vintage-styled fat warmth. With these pickups, players are able to achieve the classic sounds from the 50s decade, from rock and roll, to swing, rockabilly, and rhythm and blues. With the American Original\'s iconic Telecaster body, thick U shaped neck profile, and familiar 9.5" fingerboard radius, players can benefit from enhanced playability and the comfort that\'s on offer. The American Original also features a lacquer finish which allows the wood to breath naturally for added resonance, as well as helping the appearance to age in a distinctively appealing way. With all of these exceptional qualities, this is the reason why many legendary artists choose Fender.',
        price: 1590,
        inStock: 25,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/17/170869/1200/preview.jpg',
        type: 'ELECTRIC'
    }),

    products.push({
        instrument: 'guitar',
        brand: 'Gretsch',
        model: 'G2420T Streamliner Hollow Body with Bigsby',
        features: [
            'Broad-Tron Humbucking Pickups Deliver High Output',
            'Fast Playing 12\"Radius Rosewood Fingerboard',
            'Vintage “Big Block” Inlays and Electro-style Control Knobs',
            'Bigsby Tailpiece Offers Pitch Bending Effects & Sustain',
            'Classic F Holes Offer Traditional Look & Acoustic Projection'
        ],
        description: 'The Fender American Original \'50s Telecaster MN, Butterscotch Blonde recreates the sound and appearance of those 1950s Telecasters, combined with a modern feel for a classic Fender tone and style. Players who love the Telecaster\'s unique feel and style will truly appreciate the American Original Tele\'s tonal characteristics that take you soaring back to the 1950s. The Fender American Original Telecaster features Pure Vintage \'52 single-coil Tele pickups which were built to be as period-correct as possible to deliver a powerfully authentic sound and a vintage-styled fat warmth. With these pickups, players are able to achieve the classic sounds from the 50s decade, from rock and roll, to swing, rockabilly, and rhythm and blues. With the American Original\'s iconic Telecaster body, thick U shaped neck profile, and familiar 9.5" fingerboard radius, players can benefit from enhanced playability and the comfort that\'s on offer. The American Original also features a lacquer finish which allows the wood to breath naturally for added resonance, as well as helping the appearance to age in a distinctively appealing way. With all of these exceptional qualities, this is the reason why many legendary artists choose Fender.',
        price: 790,
        inStock: 12,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/23/236294/1200/preview.jpg',
        type: 'ELECTRIC'
    }),

    products.push({
        instrument: 'guitar',
        brand: 'Ibanez',
        model: 'AF200 Artstar Prestige 2018, Brown Sunburst',
        features: [
            'Super 58 Pickups for Vintage-Inspired Sounds',
            'Spruce Top Hollow Body Gives Airy & Resonant Tonality',
            'Flamed Maple Body & Abalone Inlays for Classy Aesthetic',
            'Quality Gotoh Tuners, Bone Nut, & Ebony Bridge',
            'Hardshell Case Included'
        ],
        description: 'The Ibanez AF200 Artstar Prestige 2018 in Brown Sunburst is a hollow body guitar designed to take you back to the sounds and the styles of a by-gone era. It combines the design features of a vintage guitar with Ibanez\'s own Super 58 pickups for a vintage-inspired bite and smooth sound, depending on your control adjustments. The hollow body gives a lovely warmth and resonance; it is crafted from spruce and flamed maple for a quick response to every input from the player. A mahogany/maple neck is glued into the body to give optimum vibration transfer and a wonderfully ergonomic left-hand feel. The AF200\'s 22 medium frets are finished with the Artstar Fret Edge Treatment which gives them a rounded surface and a glass-like polish for a liquid-smooth fingering action. The AF200 is completed with a range of design features to give you the authentic look of a vintage guitar, including classic abalone inlays, an ebony bridge with elegant AF Special tailpiece, a bone nut, and a tortoiseshell-coloured pickguard. Many other features also help enhance the professional playability of the AF200 including Sure Grip III control knobs and Gotoh tuners. The AF200 provides the aesthetics and the tones of a vintage guitar with the practicalities and reliability derived from modern construction methods and up-to-date hardware; this guitar will keep even the most discerning players happy.',
        price: 1799,
        inStock: 2,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/33/335306/1200/preview.jpg',
        type: 'ELECTRIC'
    }),

    products.push({
        instrument: 'guitar',
        brand: 'Taylor',
        model: '110e Dreadnought Electro Acoustic Guitar, Natural',
        features: ['Dreadnought Shape Accommodates a Range of Playing Styles', 'Taylor Expression System 2 Offers Natural Sounding Amplification', 'Solid Sitka Spruce Top Offers Crisp Articulation & Projection', 'Walnut Body Delivers Crisp Highs With Woody Low End', 'Includes Official Taylor Deluxe Gig Bag'],
        description: 'The Taylor 110e Dreadnought Electro Acoustic Guitar features the classic dreadnought shape crafted from sitka spruce and walnut, delivering definite tones that suit a wide variety of playing styles. This new 2017 model yields an incredibly balanced tone whilst still offering a powerful low end and snappy midrange, perfect for any level of player. Taylor have also incorporated their expression system to provide natural sounding amplification, making the guitar perfect for gigging and recording. For the mobile musician, the 110e Dreadnought also comes with a padded gig bag for storage and transportation.',
        price: 699,
        inStock: 15,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/24/242313/1200/preview.jpg',
        type: 'ELECTROACOUSTIC'
    }),

    products.push({
        instrument: 'guitar',
        brand: 'La Mancha',
        model: 'Esmeralda SM Classical Guitar',
        features: ["Classic 4/4", "Top: Solid German Spruce", "Back & Sides: Padouk", "Neck: Toona Kalantas With Carbon Reinforcement", "Spanish Heel Neck Joint"],
        description: 'The deluxe classical guitar by Gear4music offers outstanding quality at an unprecedented price. With its compact body and short scale length, the deluxe classical guitar is designed with comfort in mind for the advancing player. Despite the reduced dimensions, the guitar still produces a responsive, well balanced tone. An excellent starter instrument that will encourage guitarists of all ages to keep progressing.',
        price: 599,
        inStock: 25,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/38/383430/1200/preview_1.jpg',
        type: 'CLASSICAL'

    }),

    // BASSES

    products.push({
        instrument: 'bass',
        brand: 'Fender',
        model: 'Standard Precision, Black',
        features: [
            'Classic Fender Sound and Styling with Modern Features',
            'Highly Resonant Alder Body with a Black Finish',
            'Bolt-On Maple Neck with a Modern C Profile',
            'Standard Split Single-Coil Precision Bass Middle Pickup',
            '4-Saddle Vintage-Style Bridge with Single Groove Saddles',
        ],
        description: 'The Fender Standard Precision Bass guitar offers the legendary Fender tone with vintage styling and modern playability. This P-Bass features a standard split single-coil pickup, which combines with the resonant Alder body to produce the authentic and unmistakable Fender bass sound. Other features include a tinted Maple neck with a Maple fingerboard, a 4-saddle vintage-style bridge with single groove saddles, flat-top control knobs, shielded body cavities and a \'70s style headstock logo.',
        price: 667,
        inStock: 5,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/2/23926/1200/preview_1.jpg',
        type: 'ELECTRIC'
    }),

    products.push({
        instrument: 'bass',
        brand: 'Dean',
        model: 'Electro Acoustic Bass, Satin Natural',
        features: [
            'High Quality Dean Preamp',
            'Mahogany Body, Spruce Top',
            '24 Fret Rosewood Fingerboard',
            'Rosewood Bridge',
            'Die-Cast Tuners, Chrome Hardware'
        ],
        description: 'The Dean EABC CAW Electro Acoustic Bass is a jumbo cutaway electro acoustic bass which is constructed from a Mahogany body and Spruce top for a balanced and powerful tone. With a 34 inch scale length, 24 fret Rosewood fingerboard, Dean preamp, Rosewood bridge, die-cast tuners and chrome hardware the Dean EABC CAW bass is perfect for studio and live acoustic performances. The Dean EABC Electro Acoustic is constructed from a high quality Mahogany body to produce a dynamic and warm tone with plenty of middle range definition and clear high response. Additionally the Spruce top wood delivers bright and clear tone with compliments the Mahogany body perfectly to provide an extremely versatile and full tone.',
        price: 229,
        inStock: 35,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/14/142031/1200/preview.jpg',
        type: 'ACOUSTIC'

    }),

    products.push({
        instrument: 'bass',
        brand: 'Dean',
        model: 'Electro Acoustic Bass, Satin Natural',
        features:
            ['High Quality Dean Preamp',
                'Mahogany Body, Spruce Top',
                '24 Fret Rosewood Fingerboard',
                'Rosewood Bridge',
                'Die-Cast Tuners, Chrome Hardware'],


        description: 'The Dean EABC CAW Electro Acoustic Bass is a jumbo cutaway electro acoustic bass which is constructed from a Mahogany body and Spruce top for a balanced and powerful tone. With a 34 inch scale length, 24 fret Rosewood fingerboard, Dean preamp, Rosewood bridge, die-cast tuners and chrome hardware the Dean EABC CAW bass is perfect for studio and live acoustic performances. The Dean EABC Electro Acoustic is constructed from a high quality Mahogany body to produce a dynamic and warm tone with plenty of middle range definition and clear high response. Additionally the Spruce top wood delivers bright and clear tone with compliments the Mahogany body perfectly to provide an extremely versatile and full tone.',
        price: 229,
        inStock: 35,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/14/142031/1200/preview.jpg',
        type: 'ACOUSTIC'

    }),

    products.push({
        instrument: 'bass',
        brand: 'Dean',
        model: 'Exotica Supreme Cutaway Electro Acoustic Bass, Tobacco Sunburst',
        features: ['Spruce Top Offers Versatility & Crisp Articulation', 'Mahogany Body Delivers Rich Dark Warmth', 'Rosewood Fingerboard For Smooth & Energetic Play', 'Venetian Cutaway Enables Players To Reach Challenging Chords', 'Equipped With Dean Electronics For Amplified Sound'],
        description: 'The Dean Exotica Supreme Cutaway Electro Acoustic Bass, Tobacco Sunburst offers a traditional appearance blended with subtle, yet sophisticated decorative features and a stunning tobacco sunburst finish providing a superb tone to match. The Exotica Supreme Cutaway is constructed from a spruce top, mahogany body and neck, and a rosewood fingerboard and bridge. This mixture of timber will deliver a deep, full sound that can be found within bass guitars of a much higher cost. The Dean Exotica features a comfortable body shape, enabling players to hold it closer to the body and reach more challenging chords due to its Venetian cutaway. For amplified acoustic sound, the Dean Exotica features an on-board preamp with the added convenience of a built-in tuner. The affordable Dean Exotica Supreme Cutaway comes stage ready and ideal for the gigging musicians.',
        price: 209,
        inStock: 25,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/28/283238/1200/preview.jpg',
        type: 'ACOUSTIC'
    }),

    products.push({
        instrument: 'bass',
        brand: 'Rickenbacker',
        model: '4003S Bass Guitar, Jetglo',
        features: ['Through Body Maple Neck', 'Improved Dual Trussrod System', '20 Frets on a Rosewood Fingerboard', 'Solid Maple Body', 'Schaller Deluxe Machine Heads'],
        description: 'The Rickenbacker 4003S Bass Guitar takes inspiration from the traditional style of the 4001S models, prized by Paul McCartney and Chris Squire in the 60\'s. This updated model retains the classic appearance and comfortable form with rounded edges that some players prefer over the 4003. Features include a through body maple neck with an improved dual trussrod system, a solid maple body with a 20 fret rosewood fingerboard and Schaller Deluxe machine heads.',
        price: 1899,
        inStock: 5,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/36/369241/1200/preview.jpg',
        type: 'ELECTRIC'
    }),

    // KEYBOARDS

    products.push({
        instrument: 'keyboard',
        brand: 'Roland',
        model: 'FA-07 Music Workstation',
        features: ['76-Note, Velocity-Sensitive Keyboard Workstation', '16-Track Sequencer & Onboard Sampler', 'Rich, Diverse Sound Bank With Over 2000 Sounds', '16 Backlit Pads & Studio Effects Section', 'New Tone Remain & Master Control Functionality'],
        description: 'The Roland FA-07 Music Workstation is the latest in the renowned FA Music workstation series. The FA-07 Workstation boasts a 76-note velocity-sensitive keyboard with semi-weighted keys for fluid playability. The FA-07 is ideal for both stage and studio applications, retaining all the sounds and features from the FA-06 and FA-08 models. The system has been updated to Version 2.0 including new Tone Remain and Master Control functionality. The FA-07 Keyboard Workstation also boasts an integrated 16-track sequencer, a versatile sampler and seamless DAW integration. The intuitive and streamlined workflow is also complemented by the high-quality sound library that spans from pianos and strings, to cutting-edge synth sounds.',
        price: 1679,
        inStock: 3,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/26/268960/1200/preview.jpg',
        type: 'ELECTRIC'

    }),

    products.push({
        instrument: 'keyboard',
        brand: 'Minster',
        model: 'Upright Acoustic Piano, Gloss Black',
        features: ['120cm High Soundboard', 'Chromed Metal Parts', 'Balanced Key Bed and Hammer Weight', 'Contemporary Body Design', 'Beautiful and Diverse Tone'],
        description: 'The Minster Upright piano features a beautiful tone and stunning looks that makes it suitable for home, rehearsal and concert spaces. The keybed and hammer action is balanced and accurate, which is suitable for the most advanced piano players. The high quality strings create a diverse tone that is warm and delicate, as well as broad and bold at louder dynamics. The elegant gloss black finish looks the part in any venue, from the home to the concert stage.',
        price: 1899,
        inStock: 1,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/21/210372/1200/preview.jpg',
        type: 'ACOUSTIC'

    }),

    products.push({
        instrument: 'keyboard',
        brand: 'Casio',
        model: 'PX 760 Digital Piano',
        features: ['Fully customise your tone', 'Precise sensor hammer action', 'Play along with live orchestral recordings', 'Compact, minimalistic design', 'Beautiful and Diverse Tone'],
        description: 'Bring an orchestra into your home. The Casio Privia PX760 Digital Piano includes a Concert Play feature that allows you to enjoy the feeling of playing along to live orchestral recordings, and feeling as though you\'re part of the orchestra. Fully customise your tone with the new high-resolution AiR sound source (Acoustic Intelligent Resonator), enabling you to improve your overall sound. With the Tri-Sensor Hammer Action you can produce a sound continuously, assuring excellent playability when the same note is struck repeatedly.',
        price: 499,
        inStock: 7,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/11/112816/1200/preview.jpg',
        type: 'ELECTRIC'

    }),

    products.push({
        instrument: 'keyboard',
        brand: 'Casio',
        model: 'GP300 Grand Hybrid Digital Piano Satin Black',
        features: ['Authentic touch and feel thanks to grand piano action and keys', 'Six speaker array delivers genuine room filling sound', 'Carefully designed alongside C. Bechstein', 'Built-in USB, MIDI, and TRS connectivity', 'Includes five year Casio UK warranty'],
        description: 'Casio and C. Bechstein. They both know that the way a piano feels to play - it’s a deal breaker. So you’ll notice the subtle touches on the Casio GP-300 that make it a privilege to play. The 88 full sized keys are made from high grade Austrian Spruce. The very same you would find on the revered C. Bechstein concert grand pianos.',
        price: 999,
        inStock: 5,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/14/149828/1200/preview.jpg',
        type: 'ELECTROACOUSTIC'
    }),

    products.push({
        instrument: 'keyboard',
        brand: 'Nord',
        model: 'Electro 6 HP 73-Note Hammer Action Keyboard',
        features: ['73-Note Hammer Action Portable Keyboard', 'Electronic LED Drawbars', 'Range of New & Improved Features', 'Seamless Transitions When Switching Sounds or Programs', 'Split & Layer All 3 Sections'],
        description: 'The Nord Electro 6 HP 73-Note Hammer Action Keyboard is a performance keyboard, fully loaded with new and improved features that offer flexibility and versatile functionality. Included are a range of piano, organ, and sampled synth sounds, with a range of high-quality effects and tweakable parameters for sound shaping. New features include a new simplified, streamlined user interface, advanced split functionality, refined program section and more. The Electro 6 now features seamless transitions when switching between sounds or programs, meaning no waiting times when performing. The Nord Electro 6 features 3 sounds sections that include high-quality, unique sounds from the Nord Piano, Organ, and Sample libraries. The Nord Electro 6 brings you the most powerful and flexible Electro ever, combining a range of high-quality sounds in a portable package.',
        price: 1899,
        inStock: 2,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/38/385840/1200/preview.jpg',
        type: 'ELECTRIC'

    }),

    // DRUMS

    products.push({
        instrument: 'drums',
        brand: 'Yamaha',
        model: 'DTX402 Electronic Drum Kit',
        features: ['Perfect for beginners who want to learn in an exciting new way', 'Combine 287 drum and percussion sounds for your own unique voice', '10 built-in kits take your imagination through jazz, rock, pop and more', 'Discover how learning drums can now be a fun and rewarding game', '128 keyboard sounds'],
        description: 'Start your drumming journey today with the new Yamaha DTX402. With its own intuitive new learning system you will receive challenges and rewards that drive you further on the path to becoming the ultimate drummer. The new Touch app makes learning drums a fun and interactive game to master, taking you through various drumming games to the final stage, where you receive a certificate from Yamaha upon completion. Continue your journey from there with the 10 core drum kits and 287 drum and percussion sounds, mixing them together however you want to develop your own unique, signature style.',
        price: 447,
        inStock: 12,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/38/382099/1200/preview.jpg',
        type: 'ELECTRIC'

    }),

    products.push({
        instrument: 'drums',
        brand: 'Mapex',
        model: 'Tornado III Compact 18" Drum Kit, Black',
        features: ['Includes 2-Piece Cymbal Set and 200 Series Hardware', 'Compact Size Kit', 'Colour-Matched Wood Snare Included', '9-Ply Poplar Shell', 'Durable Black Wrap Finish'],
        description: 'The Mapex Tornado has long been considered the best entry level drum kit in terms of value for money and quality and now it\'s even better. Introducing the Mapex Tornado entry level drum kit, featuring everything you need to start drumming today. This compact kit is ideal for drummers who don\'t have space on their side and features quality basswood shells, along with quality cymbals and all the required hardware. You\'ll even receive a stool, kick pedal and a pair of sticks. Perfect for new beginners or experienced players on a budget.',
        price: 296,
        inStock: 20,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/15/159057/1200/preview.jpg',
        type: 'ACOUSTIC'

    }),

    products.push({
        instrument: 'drums',
        brand: 'Pearl',
        model: 'Roadshow 5 Piece Compact Drum Kit, Red Wine',
        features: ['Ideal for Beginners', 'Compact Jazz Size', '9-Ply Poplar Shells', 'Red Wine Finish', 'Cymbals Snare and Hardware Included'],
        description: 'The Pearl Roadshow Compact Drum Kit is a small 5 piece Jazz drum set perfect for beginners, but well suited to players of every level. Its small size makes it ideal as a space-saving practice kit, a starter kit for younger players, or simply as a kit for players of lighter styles. With cymbals, snare and hardware included, along with a drum throne, Maple sticks and a professional stick bag, this complete drum set offers everything you need to start playing straight away.',
        price: 479,
        inStock: 12,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/42/425066/1200/preview.jpg',
        type: 'ACOUSTIC'

    }),

    products.push({
        instrument: 'drums',
        brand: 'Gretsch',
        model: 'Energy 22" Drum Kit w/ Hardware & Paiste 101 Set, Black',
        features: ['Includes 3-Part Paiste 101 Cymbal Set', 'Includes 5-Part Hardware Pack and Drum Throne', '7-Ply Poplar Shells for Bright Attack & Protection', '1.6mm Triple Flanged Hoops & 30 Degree Bearing Angles', 'Gretsch Heads Made by Remo'],
        description: 'The Gretsch Energy 22" Drum Kit is a 5 piece kit featuring 7-ply poplar shells with an included 5-Part hardware pack and 3-part Paiste 101 cymbal set. The kit boasts high-quality Gretsch heads made by Remo, for a powerful drumming experience, whatever your chosen style or genre. Ideal for a range of different user abilities, the Gretsch Energy 22" Drum Kit is the perfect upgrade from a more basic kit or alternatively a great starter kit for a beginner or intermediate drummer. A choice of finishes are available, including Black, Wine Red, and Grey Steel so that you can choose a kit that suits you best.',
        price: 639,
        inStock: 5,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/21/215426/1200/preview.jpg',
        type: 'ACOUSTIC'

    }),

    products.push({
        instrument: 'drums',
        brand: 'Mapex',
        model: 'Storm 22" Complete Set, Camphor Wood Grain',
        features: ['Complete drumkit with hardware and cymbals', 'Poplar shells provide balanced low and high frequencies with enhanced warmth', 'SONIClear bearing edges make tuning much easier and tone more clear', 'Robust double-braced hardware with concave design for stability', 'Three tier adjustable boom stand'],
        description: 'The Mapex Storm Fusion kit is the complete set for beginner and intermediate players. The poplar shells all feature Mapex\'s SONIClear bearing edges, which are also featured on the high-end Mapex drumkits. This allows for much easier tuning with increased shell resonance and tonal clarity. A large 22" x 18" bass drum means huge, punchy beats that are perfect for heavier music.',
        price: 727,
        inStock: 13,
        imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/41/415595/1200/preview.jpg',
        type: 'ACOUSTIC'

    }),

    fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 4))


////////////////////////////////////////

    // products.push({
    //     instrument: 
    //     brand: 
    //     model: 
    //     features:
    //     description: ,
    //     price: ,
    //     inStock: ,
    //     imageUrl: ,
    //     type:

    // }),