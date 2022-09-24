const {
  User,
  Product,
  Cart
  } = require('./');
  const client = require("./client")


async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop all tables...")
    await client.query(`
      DROP TABLE IF EXISTS cart_products;
      DROP TABLE IF EXISTS shopping_cart;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `)

    console.log("Finished dropping all tables!")

    // build tables in correct order

    console.log("Starting to create tables...")

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
        
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        released INTEGER NOT NULL,
        description TEXT NOT NULL,
        type VARCHAR(255) NOT NULL,
        format VARCHAR(255) NOT NULL,
        creator VARCHAR(255) NOT NULL,
        genre VARCHAR(255) NOT NULL,
        "isPhysical" BOOLEAN DEFAULT true,
        price INTEGER NOT NULL,
        "imageURL" TEXT NOT NULL   
      );

      CREATE TABLE shopping_cart (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES users (id),
        "isPaid" BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE cart_products (
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER NOT NULL REFERENCES shopping_cart (id),
        "productId" INTEGER NOT NULL REFERENCES products (id),
        quantity INTEGER DEFAULT 1

      );
    `)
    console.log("Finished creating tables!")
  } catch (error) {
    console.log("Error while creating Tables!")
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("Creating initial users...")
    
    const user1 = await User.createUser("admin", "NabooIsGreat1", "Admin", "admin@gmail.com", "texas", true)
    const user2 = await User.createUser("chris", "Gigabyte1", "chris", "chris@gmail.com", "dallas, tx")
    const user3 = await User.createUser("malka", "Rowlett1", "malka", "malka@gmail.com", "Rowlett, TX")
    const user4 = await User.createUser("jake", "DoAKickflip", "jake", "jake@gmail.com", "Tulsa, OK")
    const user5 = await User.createUser("shelby", "DanceDanceRevolution", "shelby", "shelby@gmail.com", "Jacksonville, FL")

    console.log("Initial users created!")
    console.log("Creating initial products...")

    const product1 = await Product.createProduct("Star Wars: The Phantom Menace", 1999, "The first part of the epic 6 part science-fiction franchise", "Movie", "DVD", "George Lucas", "Science-Fiction", false, 12, "https://m.media-amazon.com/images/I/91NrqPMwWqL._AC_UY436_FMwebp_QL65_.jpg")
    const product2 = await Product.createProduct("Danger on Naboo", 2000, "A fiction story based off the acclaimed science-fiction franchise", "Book", "Soft-Cover", "A.L. Singer", "Science-Fiction", false, 6, "https://images-na.ssl-images-amazon.com/images/I/41k7YTzutiL._SY298_BO1,204,203,200_.jpg")
    const product3 = await Product.createProduct("The Essential Book of Vegan Bakes", 2010, "A vegan baking cookbook", "Book", "Soft Cover", "Holly Jade", "Non-Fiction", true, 13, "https://images-na.ssl-images-amazon.com/images/I/61r0vB5doAL.jpg")
    const product4 = await Product.createProduct("Eyes of the Void", 1987, "A science fiction book", "Book", "Audiobook", "Adrian Tchaikovsky", "Science-Fiction", false, 5, "https://m.media-amazon.com/images/I/51O1u7FL5rL.jpg")
    const product5 = await Product.createProduct("Mad Max: Fury Road", 2015, "The newest Mad Max Film", "Movie", "Digital Download", "George Miller", "Action", false, 5, "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg")
    const product6 = await Product.createProduct("1984", 1961, "A fiction book", "Book", "Audiobook", "George Orwell", "Fiction", false, 8, "https://images-na.ssl-images-amazon.com/images/I/41aM4xOZxaL._SX277_BO1,204,203,200_.jpg")
    const product7 = await Product.createProduct("Hotel For Dogs", 2017, "A family movie", "Movie", "DVD", "Thor Freudenthal", "Family", false, 5, "https://m.media-amazon.com/images/I/91fiOsfwa4L._SY500_.jpg")
    const product8 = await Product.createProduct("Dune", 1965, "A science fiction book", "Book", "Soft-Cover", "Frank Herbert", "Science-Fiction", false, 12, "https://images-na.ssl-images-amazon.com/images/I/41rxoi1jMQL._SX331_BO1,204,203,200_.jpg")
    const product10 = await Product.createProduct("The Lord of the Rings: The Return of the King", 2004, "A medieval fantasy movie", "Movie", "DVD", "Peter Jackson", "Fantasy", false, 12, "https://m.media-amazon.com/images/I/51GQCHPB26L.jpg")
    const product11 = await Product.createProduct("A Brief Time In History", 1998, "A non-fiction science book", "Book", "Audiobook", "Stephen Hawking", "Science", false, 5, "https://images-na.ssl-images-amazon.com/images/I/51+GySc8ExL._SX333_BO1,204,203,200_.jpg")
    const product12 = await Product.createProduct("Elf", 2003, "A Holiday Classic", "Movie", "DVD", "Jon Favreau", "Holiday", false, 10, "https://m.media-amazon.com/images/I/81rY53-51QL._AC_UY436_FMwebp_QL65_.jpg")
    const product13 = await Product.createProduct("The Diary of a Young Girl", 1947, "A historical memoir", "Book", "Soft-Cover", "Anne Frank", "Auto-Biography", false, 10, "https://images-na.ssl-images-amazon.com/images/I/51EPqZ9kFnL._SX309_BO1,204,203,200_.jpg")
    const product14 = await Product.createProduct("Law Abiding Citizen", 2010, "A rated-R action film", "Movie", "DVD", "F. Gary Gray", "Action", false, 8, "https://m.media-amazon.com/images/I/51nXnInoo+L._AC_UY436_FMwebp_QL65_.jpg")
    const product15 = await Product.createProduct("Great Expectations", 1861, "A classic novel", "Book", "Audiobook", "Charles Dickens", "Fiction", false, 5, "https://images-na.ssl-images-amazon.com/images/I/51i715XqsYL._AC_SX368_.jpg")
    const product16 = await Product.createProduct("Nope", 2022, "A modern-day horror film", "Movie", "DVD", "Jordan Peele", "Horror", false, 18, "https://m.media-amazon.com/images/I/7128xN7QSFL._SY500_.jpg")
    const product17 = await Product.createProduct("Guns, Germs, and Steel: The Fates of Human Societies", 1997, "A historical non-fiction", "Book", "Soft-Cover", "Jared Diamond", "History", false, 12, "https://images-na.ssl-images-amazon.com/images/I/51lVEXYsw0L._SX327_BO1,204,203,200_.jpg")
    const product18 = await Product.createProduct("Elvis", 2022, "A musical biopic", "Movie", "DVD", "Baz Luhrmann", "Drama", false, 15, "https://m.media-amazon.com/images/I/81s2f7lABVL._SY500_.jpg")
    const product19 = await Product.createProduct("The Shining", 1977, "A classic horror novel", "Book", "Audiobook", "Stephen King", "Horror", false, 8, "https://images-na.ssl-images-amazon.com/images/I/51jSPyJ8v2L._SX302_BO1,204,203,200_.jpg")
    const product20 = await Product.createProduct("The Royal Tenenbaums", 2001, "A quirky dark-comedy", "Movie", "DVD", "Wes Anderson", "Comedy", false, 15, "https://m.media-amazon.com/images/I/510QoLsUHCL.jpg")
    const product21 = await Product.createProduct("A Wrinkle In Time", 1962, "A science fiction fantasy book", "Book", "Soft-Cover", "Madeleine L'Engle", "Fantasy", false, 8, "https://images-na.ssl-images-amazon.com/images/I/414KmDe2xWL._SX308_BO1,204,203,200_.jpg")
    const product22 = await Product.createProduct("The Flintstones", 1994, "A remake of the classic tv-sitcom", "Movie", "DVD", "Brian Levant", "Comedy", false, 8, "https://m.media-amazon.com/images/I/91KXvD9ibKL._AC_UY436_FMwebp_QL65_.jpg")
    const product23 = await Product.createProduct("Moby Dick", 1851, "A classic fiction novel", "Book", "Audiobook", "Herman Melville", "Fiction", false, 9, "https://m.media-amazon.com/images/I/81HBvFY7sjL._AC_UL640_FMwebp_QL65_.jpg")
    const product24 = await Product.createProduct("3:10 To Yuma", 2007, "A remake of the classic western film", "Movie", "DVD", "James Mangold", "Western", false, 8, "https://m.media-amazon.com/images/I/91cytfa7pLL._AC_UY436_FMwebp_QL65_.jpg")
    const product25 = await Product.createProduct("Othello", 1603, "the classic Shakespeare tradgic play", "Book", "Soft-Cover", "William Shakespeare", "Tragedy", false, 6, "https://m.media-amazon.com/images/I/81z-FysnL4L._AC_UY436_FMwebp_QL65_.jpg")
    const product26 = await Product.createProduct("Moneyball", 2011, "An american sports drama", "Movie", "DVD", "Bennett Miller", "Drama", false, 10, "https://m.media-amazon.com/images/I/81fmxICcC1L._AC_UY436_FMwebp_QL65_.jpg")
    const product27 = await Product.createProduct("A Confederacy of Dunces", 1987, "An absurdist fiction set in New Orleans", "Book", "Audiobook", "John Kennedy Toole", "Fiction", false, 10, "https://images-na.ssl-images-amazon.com/images/I/51GWPeG58-L._SX316_BO1,204,203,200_.jpg")
    const product28 = await Product.createProduct("Ben-Hur", 1959, "A classic drama set in Roman era Jerusalem", "Movie", "DVD", "William Wyler", "Drama", false, 8, "https://m.media-amazon.com/images/I/91DTZYmpcUL._AC_UY436_FMwebp_QL65_.jpg")
    const product29 = await Product.createProduct("Magnolia Table", 2018, "A recipe book inspired by a passion for family", "Book", "Soft-Cover", "Joanna Gaines", "Cookbook", false, 20, "https://images-na.ssl-images-amazon.com/images/I/51iDWMHbdhL._SX400_BO1,204,203,200_.jpg")
    const product30 = await Product.createProduct("Step Brothers", 2008, "A hilarious comedy with Will Ferrell and John C. Reilly", "Movie", "DVD", "Adam McKay", "Comedy", false, 10, "https://m.media-amazon.com/images/I/71t13rjsnAL._AC_UY436_FMwebp_QL65_.jpg")
    const product31 = await Product.createProduct("Path Lit by Lightning: The Life of Jim Thorpe", 2022, "A biography on a sports icon", "Book", "Audiobook", "David Maraniss", "Biography", false, 18, "https://images-na.ssl-images-amazon.com/images/I/41Xe-+KzpRL._SX327_BO1,204,203,200_.jpg")
    const product32 = await Product.createProduct("Stop Making Sense", 1984, "The classic concert film by the Talking Heads", "Movie", "DVD", "Jonathan Demme", "Musical", false, 15, "https://m.media-amazon.com/images/I/91qVj0wX60L._AC_UY436_FMwebp_QL65_.jpg")
    const product33 = await Product.createProduct("A Farewell to Arms", 1929, "The classic drama set during World War 1", "Book", "Soft-Cover", "Ernest Hemingway", "fiction", false, 8, "https://images-na.ssl-images-amazon.com/images/I/41mxgAl2EfL._SX326_BO1,204,203,200_.jpg")
    const product34 = await Product.createProduct("Crank", 2006, "A fast-paced action movie", "Movie", "DVD", "Mark Neveldine", "Action", false, 8, "https://m.media-amazon.com/images/I/91N4hTNo7WL._AC_UY436_FMwebp_QL65_.jpg")
    const product35 = await Product.createProduct("The Hobbit", 1937, "The classic fantasy novel", "Book", "Audiobook", "J. R. Tolkien", "fantasy", false, 10, "https://images-na.ssl-images-amazon.com/images/I/51p3WTQUhhL._SX328_BO1,204,203,200_.jpg")
    const product36 = await Product.createProduct("Solo: A Star Wars Story", 2018, "An orgin story for bad boy of Star Wars", "Movie", "DVD", "Ron Howard", "Science-Fiction", false, 10, "https://m.media-amazon.com/images/I/91q6D3DyR+L._AC_UY436_FMwebp_QL65_.jpg")
    const product37 = await Product.createProduct("The Handmaaid's Tale", 1998, "A devastating novel based in an alternate reality", "Book", "Audiobook", "Margaret Atwood", "Fiction", false, 15, "https://images-na.ssl-images-amazon.com/images/I/41p0u2G9hbL._SX322_BO1,204,203,200_.jpg")
    const product38 = await Product.createProduct("The Prince", 1513, "A policitcal commentary on renaissance Italy", "Book", "Soft-Cover", "Niccolo Machiavelli", "Politics", false, 7, "https://m.media-amazon.com/images/I/51KV9QHeUBL._AC_UY436_FMwebp_QL65_.jpg")
    const product39 = await Product.createProduct("13 Going On 30", 2004, "A lighthearted comedy about being a child stuck in an adults body", "Movie", "DVD", "Gary Winick", "Comedy", false, 10, "https://m.media-amazon.com/images/I/71kCfg62ylL._AC_UY436_FMwebp_QL65_.jpg")
    const product40 = await Product.createProduct("Forgotten Civilization: New Discoveries on the Solar-Induced Dark Age", 2012, "A theoretical work revealing how solar outbursts caused the end of the last ice age", "Book", "audiobook", "Dr. Robert Schoch", "Science", false, 15, "https://m.media-amazon.com/images/I/610muxmg8tL.jpg")
    const product41 = await Product.createProduct("Who Framed Roger Rabbit?", 1988, "A comedic crime noir set in a reality where cartoons are real", "Movie", "DVD", "Robert Zemeckis", "Comedy", false, 8, "https://m.media-amazon.com/images/I/91F-OSirhPL._AC_UY436_FMwebp_QL65_.jpg")
    const product42 = await Product.createProduct("Mama Mia", 2008, "The broadway hit come to the big screen with all your ABBA favorites and an All-Star cast", "Movie", "DVD", "Phyllida Lloyd", "Musical", false, 10, "https://m.media-amazon.com/images/I/81m5Gl7H+gL._AC_UY436_FMwebp_QL65_.jpg")
    const product43 = await Product.createProduct("Amelia Bedelia Audio Collection", 2002, "A collection of the classic childrens favorite", "Book", "Audiobook", "Peggy Parish", "Childrens", false, 12, "https://m.media-amazon.com/images/I/51qZ6hMy21L.jpg")
    const product44 = await Product.createProduct("Vice", 2018, "A political satire about the 46th Vice President Dick Cheney", "Movie", "DVD", "Adam McKay", "Comedy", false, 15, "https://m.media-amazon.com/images/I/71PU1bDybML._AC_UY436_FMwebp_QL65_.jpg")
    const product45 = await Product.createProduct("The Canterbury Tales", 1387, "This historical classic highlights life during the dark ages", "Book", "Soft-Cover", "Geoffrey Chaucer", "Fiction", false, 8, "https://m.media-amazon.com/images/I/91Yq7gGLYDL._AC_UY436_FMwebp_QL65_.jpg")
    const product46 = await Product.createProduct("The Thing", 1982, "A science fiction film about a mutating alien in Antarctica", "Movie", "DVD", "John Carpenter", "Horror", false, 12, "https://m.media-amazon.com/images/I/81fuvhQ6u+L._AC_UY436_FMwebp_QL65_.jpg")
    const product47 = await Product.createProduct("The Phantom Tollbooth", 1961, "A children's fantasy adventure book", "Book", "Audiobook", "Norton Juster", "Childrens", false, 9, "https://m.media-amazon.com/images/I/81vK2fb1ugL._AC_UY436_FMwebp_QL65_.jpg")
    const product48 = await Product.createProduct("Agora", 2010, "A historical drama the school of Alexandrian scholar Hypatia", "Movie", "DVD", "Alejandro Amenabar", "Drama", false, 5, "https://m.media-amazon.com/images/I/91yNbH4PHYL._AC_UY436_FMwebp_QL65_.jpg")
    const product49 = await Product.createProduct("Eloquent JavaScript, 3rd Edition: A Modern Introduction to Programming", 2018, "An educational manual on the basics of JavaScript", "Book", "Soft-Cover", "Marijn Haverbeke", "Educational", false, 20, "https://m.media-amazon.com/images/I/91asIC1fRwL._AC_UY436_FMwebp_QL65_.jpg")
    const product50 = await Product.createProduct("Ghostbusters", 1984, "A science fiction classic about ghosts in New York City", "Movie", "DVD", "Ivan Reitman", "Comedy", false, 10, "https://m.media-amazon.com/images/I/81KlK5b7JFS._AC_UY436_FMwebp_QL65_.jpg")


    console.log("Finished creating initial products!")
    console.log("Creating shopping carts...")

    const cart1 = await Cart.createUserCart(3)
    const cart2 = await Cart.createUserCart(4)

    console.log("Finished creating carts!")
    console.log("Adding products to carts...")

    const cartProduct1 = await Cart.addProductToCart(1, 1)
    const cartProduct2 = await Cart.addProductToCart(1, 2)
    const cartProduct3 = await Cart.addProductToCart(1, 3)
    const cartProduct4 = await Cart.addProductToCart(2, 4)
    const cartProduct5 = await Cart.addProductToCart(2, 5)

    console.log("Finished adding products to carts!")
    console.log("Checking user carts...")

    const checkCart1 = await Cart.getUserCart(3)
    const checkCart2 = await Cart.getUserCart(4)

    console.log("Finished checking users carts!")

    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
