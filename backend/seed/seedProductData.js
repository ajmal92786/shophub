const mongoose = require("mongoose");
const { initializeDatabase } = require("../db/db.connect");
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const User = require("../models/user.model");

const seedUserData = async () => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      email: "ajmalbly27@gmail.com",
    });

    if (existingUser) return existingUser;

    // Create new static user
    const newUser = await User.create({
      name: "Mohd Ajmal Raza",
      email: "ajmalbly27@gmail.com",
      phone: "+919670786585",
    });

    return newUser;
  } catch (error) {
    console.error("Error in seeding user data:", error);
    throw error;
  }
};

seedUserData();

const seedProductData = async () => {
  try {
    await initializeDatabase();

    await Category.deleteMany(); // clears previous categories data
    await Product.deleteMany(); // clears previous products data

    const categoriesData = [
      {
        name: "Men",
        thumbnail:
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Women",
        thumbnail:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW4lMjBjbG90aGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Kids",
        thumbnail:
          "https://images.unsplash.com/photo-1601925240970-98447486fcdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkcyUyMGNsb3RoaW5nfGVufDB8fDB8fHww",
      },
      {
        name: "Winter Wear",
        thumbnail:
          "https://images.unsplash.com/photo-1457545195570-67f207084966?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8V2ludGVyJTIwV2VhciUyMGNsb3RoaW5nfGVufDB8fDB8fHww",
      },
      {
        name: "Electronics",
        thumbnail:
          "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Books",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1669652639356-f5cb1a086976?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ];

    // Insert categories
    const categories = await Category.insertMany(categoriesData);

    // Seed static user
    const defaultUser = await seedUserData();
    console.log("Static User Created:", defaultUser.email);

    const productsData = [
      // ---------------- MEN ----------------
      {
        title: "Classic Cotton Men's T-Shirt",
        price: 799,
        discountPercentage: 10,
        category: categories[0]._id,
        sizes: ["M", "L", "XL"],
        rating: 4.3,
        imageUrl:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        availableQuantity: 50,
        descriptionPoints: [
          "PREMIUM FABRIC: Made from ultra-soft, breathable cotton ensuring all-day comfort.",
          "TIMELESS DESIGN: Minimal and modern silhouette perfect for daily wear.",
          "ENDURING QUALITY: Durable stitching crafted to retain shape and texture wash after wash.",
          "VERSATILE STYLE: Ideal for work, casual outings, or lounge wear.",
          "SKIN-FRIENDLY: Gentle, irritation-free material suitable for all skin types.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Men's Slim Fit Denim Jeans",
        price: 1499,
        discountPercentage: 15,
        category: categories[0]._id,
        sizes: ["M", "L", "XL", "XXL"],
        rating: 4.4,
        imageUrl:
          "https://images.unsplash.com/photo-1605192554106-d549b1b975cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVuJTIwamVhbnN8ZW58MHx8MHx8fDA%3D",
        availableQuantity: 40,
        descriptionPoints: [
          "PREMIUM DENIM: Crafted from high-quality stretch denim for ultimate comfort.",
          "TAILORED SLIM FIT: Sharp silhouette that enhances your natural shape.",
          "FADE-RESISTANT WASH: Long-lasting color and texture even after multiple washes.",
          "EVERYDAY COMFORT: Flexible material designed for effortless movement.",
          "VERSATILE LOOK: Perfect for casual and semi-formal outfits.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Men's Bomber Jacket",
        price: 2499,
        discountPercentage: 20,
        category: categories[0]._id,
        sizes: ["M", "L", "XL"],
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
        availableQuantity: 25,
        descriptionPoints: [
          "STYLE REDEFINED: Elevate your look with timeless bomber aesthetics and modern flair.",
          "ALL-WEATHER READY: Wind-resistant and moisture-repellent exterior keeps you comfortable.",
          "ENHANCED COMFORT: Soft inner lining ensures a snug yet breathable fit.",
          "VERSATILE ESSENTIAL: Suitable for travel, parties, casual outings, and evening wear.",
          "PREMIUM BUILD: Designed with long-lasting zippers and durable stitching.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Men's Sports Running Shoes",
        price: 1999,
        discountPercentage: 12,
        category: categories[0]._id,
        sizes: ["M", "L", "XL"],
        rating: 4.6,
        imageUrl:
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
        availableQuantity: 35,
        descriptionPoints: [
          "ULTRA-LIGHTWEIGHT: Designed to feel feather-light for enhanced performance.",
          "SUPERIOR GRIP: Anti-skid sole offers excellent traction on all surfaces.",
          "BREATHABLE MATERIAL: Mesh upper ensures airflow to keep feet dry and fresh.",
          "ERGONOMIC SUPPORT: Cushioned sole reduces impact for maximum comfort.",
          "PERFORMANCE READY: Built for running, training, and everyday use.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Men’s Cotton Casual Shirt",
        price: 1299,
        discountPercentage: 10,
        category: categories[0]._id,
        sizes: ["M", "L", "XL", "XXL"],
        rating: 4.5,
        imageUrl:
          "https://images.pexels.com/photos/8498401/pexels-photo-8498401.jpeg",
        availableQuantity: 45,
        descriptionPoints: [
          "PREMIUM COTTON: Soft, breathable fabric for unmatched comfort.",
          "TAILORED FIT: Designed to enhance your look with a refined silhouette.",
          "EVERYDAY ELEGANCE: Perfect for office wear, casual outings, and events.",
          "DURABLE QUALITY: High-grade stitching ensures long-lasting wear.",
          "STYLE VERSATILITY: Works great when paired with jeans, chinos, or trousers.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },

      // ---------------- WOMEN ----------------
      {
        title: "Women's Floral Summer Dress",
        price: 1599,
        discountPercentage: 10,
        category: categories[1]._id,
        sizes: ["S", "M", "L"],
        rating: 4.5,
        imageUrl:
          "https://images.pexels.com/photos/10544108/pexels-photo-10544108.jpeg",
        availableQuantity: 30,
        descriptionPoints: [
          "ELEGANT DESIGN: Beautiful floral patterns crafted for a fresh summer look.",
          "FEATHER-LIGHT FABRIC: Soft and breathable material for warm weather comfort.",
          "FLATTERING FIT: Designed to enhance your natural silhouette effortlessly.",
          "PERFECT FOR ANY OCCASION: Ideal for brunch, vacations, and casual outings.",
          "PREMIUM STITCH: High-quality finishing ensures longevity and comfort.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Women's High-Waisted Jeans",
        price: 1699,
        discountPercentage: 15,
        category: categories[1]._id,
        sizes: ["S", "M", "L", "XL"],
        rating: 4.6,
        imageUrl:
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
        availableQuantity: 35,
        descriptionPoints: [
          "CURVE-FLATTERING FIT: High-rise waist enhances shape and adds definition.",
          "PREMIUM STRETCH DENIM: Offers flexibility without losing structure.",
          "EVERYDAY COMFORT: Soft, breathable fabric suitable for long wear.",
          "FADE-RESISTANT: Maintains color and fabric strength over time.",
          "STYLE ANYWHERE: Great for casual, semi-formal, and party looks.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Women's Winter Woolen Coat",
        price: 2799,
        discountPercentage: 20,
        category: categories[1]._id,
        sizes: ["S", "M", "L", "XL"],
        rating: 4.8,
        imageUrl:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        availableQuantity: 20,
        descriptionPoints: [
          "PREMIUM WOOL BLEND: Designed for warmth without bulk.",
          "CHIC ELEGANCE: Minimal yet stylish coat suitable for all winter outfits.",
          "COZY INNER LINING: Soft lining delivers maximum warmth and comfort.",
          "PERFECT FOR WINTERS: Ideal for office, travel, and evening outings.",
          "DURABLE BUILD: Quality craftsmanship ensures long-term wear.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Women's Stylish Handbag",
        price: 1899,
        discountPercentage: 18,
        category: categories[1]._id,
        sizes: ["M"],
        rating: 4.4,
        imageUrl:
          "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg",
        availableQuantity: 50,
        descriptionPoints: [
          "ELEGANT DESIGN: Modern, premium look suitable for all outfits.",
          "SPACIOUS INTERIOR: Designed to carry essentials without bulk.",
          "HIGH-QUALITY MATERIAL: Durable, long-lasting leather texture.",
          "EVERYDAY FUNCTIONALITY: Perfect for office, travel, and casual use.",
          "LUXURY FEEL: Lightweight yet rich in appearance and craftsmanship.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Women's Casual Sneakers",
        price: 1599,
        discountPercentage: 12,
        category: categories[1]._id,
        sizes: ["S", "M", "L"],
        rating: 4.6,
        imageUrl:
          "https://images.unsplash.com/photo-1519741497674-611481863552",
        availableQuantity: 40,
        descriptionPoints: [
          "MODERN LOOK: Sleek design that elevates casual outfits instantly.",
          "MAX COMFORT: Cushioned sole designed for all-day wear.",
          "BREATHABLE FABRIC: Keeps your feet cool and sweat-free.",
          "MULTI-USE: Suitable for casual outings, walks, and travel.",
          "ANTI-SKID SOLE: Enhanced grip for safe movement on all surfaces.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },

      // ---------------- KIDS ----------------
      {
        title: "Kids Cotton T-Shirt",
        price: 499,
        discountPercentage: 5,
        category: categories[2]._id,
        sizes: ["S", "M", "L"],
        rating: 4.4,
        imageUrl:
          "https://images.unsplash.com/photo-1691565564627-c519212b122f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8S2lkcyUyMENvdHRvbiUyMFQtU2hpcnR8ZW58MHx8MHx8fDA%3D",
        availableQuantity: 60,
        descriptionPoints: [
          "SOFT & SAFE: Gentle cotton fabric perfect for sensitive kid's skin.",
          "BRIGHT COLORS: Fun and long-lasting prints kids love.",
          "ALL-DAY COMFORT: Light and breathable for active play.",
          "DURABLE STITCHING: Built to handle daily wear and washing.",
          "EVERYDAY ESSENTIAL: Ideal for school, playtime, and casual outings.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Kids Denim Jeans",
        price: 799,
        discountPercentage: 10,
        category: categories[2]._id,
        sizes: ["S", "M", "L"],
        rating: 4.5,
        imageUrl:
          "https://images.pexels.com/photos/16976200/pexels-photo-16976200.jpeg",
        availableQuantity: 45,
        descriptionPoints: [
          "STRETCHABLE COMFORT: Soft denim designed for playful movement.",
          "HIGH DURABILITY: Strong stitching that withstands rough use.",
          "EVERYDAY STYLE: Suitable for school, outings, and play.",
          "SKIN-FRIENDLY: Safe, breathable fabric for all-day wear.",
          "EASY TO MAINTAIN: Retains shape and color after many washes.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Kids Winter Hoodie",
        price: 899,
        discountPercentage: 12,
        category: categories[2]._id,
        sizes: ["S", "M", "L"],
        rating: 4.7,
        imageUrl:
          "https://images.pexels.com/photos/3933888/pexels-photo-3933888.jpeg",
        availableQuantity: 35,
        descriptionPoints: [
          "SUPER COZY: Warm fleece interior perfect for winter.",
          "FUN & TRENDY: Cute prints that kids absolutely love.",
          "DURABLE QUALITY: Built to handle everyday wear and school use.",
          "PERFECT FIT: Comfortable, non-restrictive design for movement.",
          "WARM PROTECTION: Keeps kids safe from winter chills.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Kids Running Shoes",
        price: 1299,
        discountPercentage: 15,
        category: categories[2]._id,
        sizes: ["S", "M", "L"],
        rating: 4.6,
        imageUrl:
          "https://images.pexels.com/photos/5622419/pexels-photo-5622419.jpeg",
        availableQuantity: 50,
        descriptionPoints: [
          "HIGH COMFORT: Cushioning designed for active kids.",
          "ANTI-SLIP SOLE: Ensures safe running and playing.",
          "LIGHTWEIGHT BUILD: No heavy feeling during long hours of wear.",
          "BREATHABLE MATERIAL: Keeps feet sweat-free and fresh.",
          "EVERYDAY USE: Ideal for sports, school, and outdoor play.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Kids Printed Night Suit",
        price: 699,
        discountPercentage: 10,
        category: categories[2]._id,
        sizes: ["S", "M", "L"],
        rating: 4.5,
        imageUrl:
          "https://images.pexels.com/photos/10566190/pexels-photo-10566190.jpeg",
        availableQuantity: 55,
        descriptionPoints: [
          "ULTRA-SOFT: Cozy cotton perfect for a good night’s sleep.",
          "ADORABLE PRINTS: Cute designs that kids enjoy wearing.",
          "SAFE FOR SKIN: Hypoallergenic and breathable fabric.",
          "EASY WEAR: Stretchable and child-friendly fit.",
          "LONG-LASTING: Maintains softness and shape after multiple washes.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },

      // -------- WINTER WEAR --------
      {
        title: "Men's Thermal Fleece Hoodie",
        price: 2499,
        discountPercentage: 12,
        category: categories[3]._id,
        sizes: ["M", "L", "XL"],
        rating: 4.6,
        imageUrl:
          "https://images.pexels.com/photos/30086130/pexels-photo-30086130.jpeg",
        availableQuantity: 120,
        descriptionPoints: [
          "ULTIMATE WARMTH: Designed with dual-layer fleece fabric to lock in body heat even in extreme winter chills.",
          "BREATHABLE COMFORT: Moisture-wicking interior keeps you sweat-free while maintaining insulation.",
          "URBAN STYLE: Features a modern slim fit with a premium drawstring hood for a clean, stylish winter look.",
          "OUTDOOR READY: Wind-resistant exterior makes it perfect for biking, trekking, or daily commutes.",
          "EVERYDAY ESSENTIAL: Versatile enough to pair with joggers, denim, or activewear.",
        ],
        returnPolicy: { returnable: false, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Women's Long Puffer Jacket",
        price: 3999,
        discountPercentage: 18,
        category: categories[3]._id,
        sizes: ["S", "M", "L", "XL"],
        rating: 4.8,
        imageUrl:
          "https://images.pexels.com/photos/20732850/pexels-photo-20732850.jpeg",
        availableQuantity: 80,
        descriptionPoints: [
          "LUXE INSULATION: Filled with ultra-soft synthetic down to provide maximum warmth without extra weight.",
          "FULL-COVERAGE DESIGN: Long knee-length profile protects you from harsh winds and cold air.",
          "ALL-DAY COMFORT: Smooth, skin-friendly inner lining prevents irritation and enhances coziness.",
          "TRAVEL-FRIENDLY: Folds compactly without losing shape—ideal for trips and everyday winter outdoor plans.",
          "SLEEK & ELEGANT: Tailored silhouette that complements both casual and formal winter outfits.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: false,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Kids' Snow-Proof Quilted Jacket",
        price: 1799,
        discountPercentage: 10,
        category: categories[3]._id,
        sizes: ["S", "M", "L"],
        rating: 4.5,
        imageUrl:
          "https://images.pexels.com/photos/20008924/pexels-photo-20008924.jpeg",
        availableQuantity: 90,
        descriptionPoints: [
          "CHILD-SAFE WARMTH: Soft hypoallergenic padding ensures gentle and safe insulation for kids.",
          "WATER-REPELLENT: Special coated outer layer keeps your child dry during drizzle or snowfall.",
          "FLEXIBLE MOVEMENT: Lightweight build lets kids run, jump, and play freely without restriction.",
          "SOFT HOOD PROTECTION: Plush-lined hood shields against wind while adding extra comfort.",
          "FUN COLORS: Designed with vibrant kid-friendly patterns they’ll love wearing all winter.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Men's Woolen High-Neck Sweater",
        price: 1999,
        discountPercentage: 15,
        category: categories[3]._id,
        sizes: ["M", "L", "XL", "XXL"],
        rating: 4.7,
        imageUrl:
          "https://images.pexels.com/photos/6700120/pexels-photo-6700120.jpeg",
        availableQuantity: 110,
        descriptionPoints: [
          "PREMIUM WOOL BLEND: Crafted from soft, breathable wool fibers that offer natural insulation.",
          "CLASSIC HIGH-NECK FIT: Provides additional warmth around the neck while maintaining a timeless style.",
          "ALL-DAY WEAR: Lightweight yet warm, designed for comfortable long-hour usage.",
          "PERFECT FOR LAYERING: Pairs effortlessly with jackets, coats, and overcoats for a stylish winter look.",
          "DURABLE FABRIC: Anti-pilling and stretch-resistant material ensures long-term use.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Women's Fur-Lined Winter Cardigan",
        price: 2899,
        discountPercentage: 20,
        category: categories[3]._id,
        sizes: ["S", "M", "L"],
        rating: 4.9,
        imageUrl:
          "https://images.pexels.com/photos/19655855/pexels-photo-19655855.jpeg",
        availableQuantity: 100,
        descriptionPoints: [
          "ULTRA-SOFT FUR LINING: Plush faux-fur interior keeps you warm while feeling luxuriously soft.",
          "STYLISH OPEN FRONT: Modern flowy design that elevates casual and semi-formal winter outfits.",
          "BODY-WARMING FABRIC: Thick yet breathable knit ensures perfect temperature balance.",
          "COZY WINTER COMPANION: Ideal for home comfort, office wear, and chilly outdoor strolls.",
          "PREMIUM FINISH: High-quality stitching and textured knit provide an elegant winter vibe.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },

      // ---------- ELECTRONICS -------
      {
        title: "AeroBeat Wireless Bluetooth Headphones",
        price: 1999,
        discountPercentage: 18,
        category: categories[4]._id, // Electronics category
        sizes: [],
        rating: 4.4,
        imageUrl:
          "https://images.unsplash.com/photo-1579065560489-989b0cc394ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWUlMjBCbHVldG9vdGglMjBIZWFkcGhvbmVzJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        availableQuantity: 80,
        descriptionPoints: [
          "IMMERSIVE SOUND: Powerful bass and crystal-clear audio for music lovers.",
          "NOISE ISOLATION: Soft ear cushions designed for long listening sessions.",
          "FAST CHARGING: 10-minute quick charge gives 2 hours of playtime.",
          "UNIVERSAL COMPATIBILITY: Works with all Bluetooth-enabled devices.",
          "LIGHTWEIGHT DESIGN: Perfect for travel, workouts, and daily use.",
        ],
        returnPolicy: { returnable: true, returnDays: 7 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "FitPulse Pro Smartwatch",
        price: 2799,
        discountPercentage: 22,
        category: categories[4]._id,
        sizes: [],
        rating: 4.6,
        imageUrl:
          "https://images.unsplash.com/photo-1662220727289-27d6b2f10a82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZSUyMHNtYXJ0JTIwd2F0Y2glMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        availableQuantity: 65,
        descriptionPoints: [
          "HEALTH TRACKING: Monitors heart rate, sleep, calories, and steps.",
          "WATER RESISTANT: Suitable for workouts, swimming, and daily use.",
          "LONG BATTERY LIFE: Up to 10 days on a single charge.",
          "REAL-TIME NOTIFICATIONS: Get calls, messages, and app alerts instantly.",
          "CUSTOM WATCH FACES: Choose from multiple stylish designs.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "BassBlitz Portable Bluetooth Speaker",
        price: 1599,
        discountPercentage: 25,
        category: categories[4]._id,
        sizes: [],
        rating: 4.5,
        imageUrl:
          "https://images.unsplash.com/photo-1542193810-9007c21cd37e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGJsdXRvb3RoJTIwc3BlYWtlciUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        availableQuantity: 100,
        descriptionPoints: [
          "DEEP BASS: High-quality sound with enhanced bass technology.",
          "COMPACT & PORTABLE: Lightweight design perfect for travel and parties.",
          "DURABLE BUILD: Shock-resistant body for outdoor use.",
          "ALL-DAY PLAYTIME: Up to 12 hours of continuous playback.",
          "UNIVERSAL COMPATIBILITY: Works with phones, laptops, tablets, and more.",
        ],
        returnPolicy: { returnable: true, returnDays: 7 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },

      // ---------- BOOKS ----------
      {
        title: "The Silent Echoes",
        price: 499,
        discountPercentage: 15,
        category: categories[5]._id, // Books category
        sizes: [], // Not applicable for books
        rating: 4.7,
        imageUrl:
          "https://images.unsplash.com/photo-1630948197307-26e135c97118?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGJvb2slMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        availableQuantity: 120,
        descriptionPoints: [
          "A HEART-TOUCHING STORY: A deeply emotional fiction novel exploring human relationships.",
          "BEAUTIFUL NARRATIVE: Captivating writing style that keeps readers engaged.",
          "AWARD-WINNING AUTHOR: Written by a bestselling contemporary novelist.",
          "PERFECT GIFT: Ideal for literature lovers and fiction enthusiasts.",
          "PREMIUM PRINT: High-quality paper with a smooth matte finish.",
        ],
        returnPolicy: { returnable: true, returnDays: 7 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "Rise & Refocus",
        price: 350,
        discountPercentage: 20,
        category: categories[5]._id,
        sizes: [],
        rating: 4.5,
        imageUrl:
          "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
        availableQuantity: 200,
        descriptionPoints: [
          "BOOST PRODUCTIVITY: Practical steps to improve focus and discipline.",
          "BACKED BY RESEARCH: Contains proven self-improvement frameworks.",
          "EASY TO FOLLOW: Clear language with real-life examples.",
          "LIFE-CHANGING HABITS: Helps build consistent daily routines.",
          "MODERN DESIGN: Clean typography with durable binding.",
        ],
        returnPolicy: { returnable: true, returnDays: 7 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
      {
        title: "The Midnight Cipher",
        price: 599,
        discountPercentage: 12,
        category: categories[5]._id,
        sizes: [],
        rating: 4.6,
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1750360905805-5edd9a3ec8b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGZyZWUlMjBib29rJTIwaW1hZ2VzfGVufDB8fDB8fHww",
        availableQuantity: 90,
        descriptionPoints: [
          "GRIPPING THRILLER: A fast-paced mystery with unpredictable twists.",
          "INTENSE STORYLINE: Engages the reader from the very first chapter.",
          "CRITICALLY ACCLAIMED: Praised for its suspense and storytelling.",
          "IMMERSIVE WORLD: Richly detailed settings and characters.",
          "PREMIUM QUALITY: Strong paperback binding built to last.",
        ],
        returnPolicy: { returnable: true, returnDays: 10 },
        payOnDelivery: true,
        freeDelivery: true,
        securePayment: true,
      },
    ];

    // Insert products
    await Product.insertMany(productsData);

    console.log("Products inserted successfully!");
  } catch (error) {
    console.error("Error seeding product data:", error);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = { seedProductData };
