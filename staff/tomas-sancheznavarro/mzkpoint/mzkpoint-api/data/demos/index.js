const fs = require('fs')
const path = require('path')

const products = []

// GUITARS

products.push({
    instrument: 'guitar',
    brand: 'Fender',
    model: 'Stratocaster American Special',
    keyFeatures: {
        title: 'Key Features',
        content: [
            'Highly Resonant and Lightweight Alder Body',
            'Two Texas Special Single-Coil Pickups and an Atomic Humbucker',
            'Maple Neck with a Modern C Profile',
            'Greasebucket Tone Circuit',
            '6-Saddle Vintage Style Synchronized Tremolo Bridge'
        ]
    },
    description: 'The Fender American Special HSS Stratocaster electric guitar delivers genuine U.S-made Fender quality into the hands of beginners and professionals alike. Combining the resonant Alder body with a Maple neck and Rosewood fingerboard, the American Special HSS Stratocaster provides a smooth and comfortable playing experience. The two single-coil Texas Special pickups with an Atomic Humbucker in a HSS configuration produce a bright and full tone that\'s ideal for everything from country and blues to rock, punk, jazz and more.',
    price: 847,
    inStock: 25,
    imageUrl: 'https://images.static-thomann.de/pics/prod/402337.jpg',
    type: 'ELECTRIC'
})

products.push({
    instrument: 'guitar',
    brand: 'Gibson',
    model: 'SG Faded 2018, Worn Bourbon',
    keyFeatures: {
        title: 'Key Features',
        content: [
            'Versatile 490R & 490T Humbuckers Offer Rich, Vintage Tones',
            'Iconic SG Shaped Mahogany Body Delivers Warm Characteristics',
            'Slim Taper Neck Provides Comfortable Playing Experience',
            'Tektoid Nut Increases Middle & Upper Harmonics',
            'Includes Gibson Softshell Case for Transportation'
        ]
    },
    description: 'The Gibson SG Faded Electric Guitar, Worn Bourbon (2018) provides players with the legendary SG performance with a worn-in aesthetic, creating the same feeling as a guitar that\'s seen many years of life. The lightweight mahogany body is finished in a stunning worn bourbon colour, delivering a beautiful look which reflect its warm, organic tones. The slim taper maple neck delivers an incredibly smooth performance, while the addition of a rosewood fingerboard helps warm the harsh tones of the maple for a beautiful tonality. The SG is also equipped with a set of 490 humbuckers, offering a stunning, vintage tone, with independent tone and volume control to dial in a range of powerful sounds. The guitar also features a tune-o-matic bridge, tektoid nut, and vintage-style keystone tuners to deliver incredible string stability and enhance sustain and resonance. Delivered with a softshell case, the Gibson SG Faded Guitar is perfect for players wanting high quality SG performance with a vintage aesthetic.',
    price: 649,
    inStock: 5,
    imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/36/367294/1200/preview.jpg',
    type: 'ELECTRIC'
})

products.push({
    instrument: 'guitar',
    brand: 'Fender',
    model: 'Fender American Original \'50s Telecaster MN, Butterscotch Blonde',
    keyFeatures: {
        title: 'Key Features',
        content: [
            'Pure Vintage \'52 Tele Pickups Delivers Powerfully Authentic Tones',
            'Iconic Telecaster Body For Signature Fender Style & Tone',
            'Perfect For Upper Fingerboard Shredding Due To Cutaway Profile',
            'Lacquer Finish Enables The Wood To Breath Naturally',
            'Butterscotch Blonde Finish Offers Eye-Catching & Authentic Look'
        ]
    },
    description: 'The Fender American Original \'50s Telecaster MN, Butterscotch Blonde recreates the sound and appearance of those 1950s Telecasters, combined with a modern feel for a classic Fender tone and style. Players who love the Telecaster\'s unique feel and style will truly appreciate the American Original Tele\'s tonal characteristics that take you soaring back to the 1950s. The Fender American Original Telecaster features Pure Vintage \'52 single-coil Tele pickups which were built to be as period-correct as possible to deliver a powerfully authentic sound and a vintage-styled fat warmth. With these pickups, players are able to achieve the classic sounds from the 50s decade, from rock and roll, to swing, rockabilly, and rhythm and blues. With the American Original\'s iconic Telecaster body, thick U shaped neck profile, and familiar 9.5" fingerboard radius, players can benefit from enhanced playability and the comfort that\'s on offer. The American Original also features a lacquer finish which allows the wood to breath naturally for added resonance, as well as helping the appearance to age in a distinctively appealing way. With all of these exceptional qualities, this is the reason why many legendary artists choose Fender.',
    price: 1590,
    inStock: 25,
    imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/17/170869/1200/preview.jpg',
    type: 'ELECTRIC'
})

products.push({
    instrument: 'guitar',
    brand: 'Gretsch',
    model: 'G2420T Streamliner Hollow Body with Bigsby',
    keyFeatures: {
        title: 'Key Features',
        content: [
            'Broad-Tron Humbucking Pickups Deliver High Output',
            'Fast Playing 12\"Radius Rosewood Fingerboard',
            'Vintage “Big Block” Inlays and Electro-style Control Knobs',
            'Bigsby Tailpiece Offers Pitch Bending Effects & Sustain',
            'Classic F Holes Offer Traditional Look & Acoustic Projection'
        ]

    },
    description: 'The Fender American Original \'50s Telecaster MN, Butterscotch Blonde recreates the sound and appearance of those 1950s Telecasters, combined with a modern feel for a classic Fender tone and style. Players who love the Telecaster\'s unique feel and style will truly appreciate the American Original Tele\'s tonal characteristics that take you soaring back to the 1950s. The Fender American Original Telecaster features Pure Vintage \'52 single-coil Tele pickups which were built to be as period-correct as possible to deliver a powerfully authentic sound and a vintage-styled fat warmth. With these pickups, players are able to achieve the classic sounds from the 50s decade, from rock and roll, to swing, rockabilly, and rhythm and blues. With the American Original\'s iconic Telecaster body, thick U shaped neck profile, and familiar 9.5" fingerboard radius, players can benefit from enhanced playability and the comfort that\'s on offer. The American Original also features a lacquer finish which allows the wood to breath naturally for added resonance, as well as helping the appearance to age in a distinctively appealing way. With all of these exceptional qualities, this is the reason why many legendary artists choose Fender.',
    price: 790,
    inStock: 12,
    imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/23/236294/1200/preview.jpg',
    type: 'ELECTRIC'
})

products.push({
    instrument: 'guitar',
    brand: 'Ibanez',
    model: 'AF200 Artstar Prestige 2018, Brown Sunburst',
    keyFeatures: {
        title: 'Key Features',
        content: [
            'Super 58 Pickups for Vintage-Inspired Sounds',
            'Spruce Top Hollow Body Gives Airy & Resonant Tonality',
            'Flamed Maple Body & Abalone Inlays for Classy Aesthetic',
            'Quality Gotoh Tuners, Bone Nut, & Ebony Bridge',
            'Hardshell Case Included'
        ]
    },
    description: 'The Ibanez AF200 Artstar Prestige 2018 in Brown Sunburst is a hollow body guitar designed to take you back to the sounds and the styles of a by-gone era. It combines the design features of a vintage guitar with Ibanez\'s own Super 58 pickups for a vintage-inspired bite and smooth sound, depending on your control adjustments. The hollow body gives a lovely warmth and resonance; it is crafted from spruce and flamed maple for a quick response to every input from the player. A mahogany/maple neck is glued into the body to give optimum vibration transfer and a wonderfully ergonomic left-hand feel. The AF200\'s 22 medium frets are finished with the Artstar Fret Edge Treatment which gives them a rounded surface and a glass-like polish for a liquid-smooth fingering action. The AF200 is completed with a range of design features to give you the authentic look of a vintage guitar, including classic abalone inlays, an ebony bridge with elegant AF Special tailpiece, a bone nut, and a tortoiseshell-coloured pickguard. Many other features also help enhance the professional playability of the AF200 including Sure Grip III control knobs and Gotoh tuners. The AF200 provides the aesthetics and the tones of a vintage guitar with the practicalities and reliability derived from modern construction methods and up-to-date hardware; this guitar will keep even the most discerning players happy.',
    price: 1799,
    inStock: 2,
    imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/33/335306/1200/preview.jpg',
    type: 'ELECTRIC'
}),

// BASSES

products.push({
    instrument: 'bass',
    brand: 'Fender',
    model: 'Standard Precision, Black',
    keyFeatures: {
        title: 'Key Features',
        content: [
            'Classic Fender Sound and Styling with Modern Features',
            'Highly Resonant Alder Body with a Black Finish',
            'Bolt-On Maple Neck with a Modern C Profile',
            'Standard Split Single-Coil Precision Bass Middle Pickup',
            '4-Saddle Vintage-Style Bridge with Single Groove Saddles',
        ]
    },
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
     keyFeatures: {
         title: 'Key Features',
         content: [
 'High Quality Dean Preamp'
 'Mahogany Body, Spruce Top'
 '24 Fret Rosewood Fingerboard
 'Rosewood Bridge'
 'Die-Cast Tuners, Chrome Hardware'

         ]
     },
     description: 'The Dean EABC CAW Electro Acoustic Bass is a jumbo cutaway electro acoustic bass which is constructed from a Mahogany body and Spruce top for a balanced and powerful tone. With a 34 inch scale length, 24 fret Rosewood fingerboard, Dean preamp, Rosewood bridge, die-cast tuners and chrome hardware the Dean EABC CAW bass is perfect for studio and live acoustic performances. The Dean EABC Electro Acoustic is constructed from a high quality Mahogany body to produce a dynamic and warm tone with plenty of middle range definition and clear high response. Additionally the Spruce top wood delivers bright and clear tone with compliments the Mahogany body perfectly to provide an extremely versatile and full tone.',
     price: 229,
     inStock: 35,
    imageUrl: 'https://d1aeri3ty3izns.cloudfront.net/media/14/142031/1200/preview.jpg',
 type: 'ACOUSTIC'

}),



fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 4))