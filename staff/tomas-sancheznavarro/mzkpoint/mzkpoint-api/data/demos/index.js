const fs = require('fs')
const path = require('path')

const products = []

products.push({
    brand: 'Fender',
    model: 'Stratocaster',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat justo enim, ut blandit felis sagittis ut. Aliquam vehicula convallis nulla vitae hendrerit.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat justo enim, ut blandit felis sagittis ut. Aliquam vehicula convallis nulla vitae hendrerit. Sed vel mauris lacinia ante ultrices egestas. Sed sed risus nulla. Cras mi nunc, eleifend id interdum vel, iaculis vel nisi. Integer molestie neque sed tellus laoreet, eget venenatis nunc varius. Curabitur lobortis tellus at vehicula euismod. Mauris gravida mi quis justo semper placerat. Nullam quis tortor leo. Ut molestie urna non neque efficitur consequat. Ut lacinia, mi eu vehicula dignissim, quam risus sagittis nunc, nec imperdiet erat dolor vel lorem.',
    price: 590,
    stock: 25,
    imageUrl: 'https://images.static-thomann.de/pics/prod/402337.jpg',
    type: 'ELECTRIC'
})

products.push({
    brand: 'Gibson',
    model: 'SG',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat justo enim, ut blandit felis sagittis ut. Aliquam vehicula convallis nulla vitae hendrerit.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat justo enim, ut blandit felis sagittis ut. Aliquam vehicula convallis nulla vitae hendrerit. Sed vel mauris lacinia ante ultrices egestas. Sed sed risus nulla. Cras mi nunc, eleifend id interdum vel, iaculis vel nisi. Integer molestie neque sed tellus laoreet, eget venenatis nunc varius. Curabitur lobortis tellus at vehicula euismod. Mauris gravida mi quis justo semper placerat. Nullam quis tortor leo. Ut molestie urna non neque efficitur consequat. Ut lacinia, mi eu vehicula dignissim, quam risus sagittis nunc, nec imperdiet erat dolor vel lorem.',
    price: 790,
    stock: 15,
    imageUrl: 'https://images.static-thomann.de/pics/prod/402337.jpg',
    type: 'ELECTRIC'
})

products.push({
    brand: 'Fender',
    model: 'Stratocaster',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat justo enim, ut blandit felis sagittis ut. Aliquam vehicula convallis nulla vitae hendrerit.',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consequat justo enim, ut blandit felis sagittis ut. Aliquam vehicula convallis nulla vitae hendrerit. Sed vel mauris lacinia ante ultrices egestas. Sed sed risus nulla. Cras mi nunc, eleifend id interdum vel, iaculis vel nisi. Integer molestie neque sed tellus laoreet, eget venenatis nunc varius. Curabitur lobortis tellus at vehicula euismod. Mauris gravida mi quis justo semper placerat. Nullam quis tortor leo. Ut molestie urna non neque efficitur consequat. Ut lacinia, mi eu vehicula dignissim, quam risus sagittis nunc, nec imperdiet erat dolor vel lorem.',
    price: 590,
    stock: 25,
    imageUrl: 'https://images.musicstore.de/images/1600/gibson-sg-faded-2018-worn-bourbon_1_GIT0042731-000.jpg',
    type: 'ELECTRIC'
})

fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 4))