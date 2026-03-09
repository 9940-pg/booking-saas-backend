const db = require("./models");

const seedDatabase = async () => {
  try {

    await db.sequelize.sync({ force: true });
    console.log("Database reset.");

    // =============================
    // OCCASIONS
    // =============================

    const birthday = await db.Occasion.create({
      name: "Birthday",
      slug: "birthday",
      image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/birthday.png"
    });

    const anniversary = await db.Occasion.create({
      name: "Anniversary",
      slug: "anniversary",
      image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/anniversary.png"
    });

   

    const proposal = await db.Occasion.create({
      name: "Proposal",
      slug: "proposal",
      image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/loveproposal.png"
    });

    const farewell = await db.Occasion.create({
      name: "Farewell",
      slug: "farewell",
      image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/farewell.png"
    });

   

    const brideToBe = await db.Occasion.create({
  name: "Bride To Be",
  slug: "bride-to-be",
  image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/bridetobe.png"
});

const groomToBe = await db.Occasion.create({
  name: "Groom To Be",
  slug: "groom-to-be",
  image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/groomtobe.png"
});

const momToBe = await db.Occasion.create({
  name: "Mom To Be",
  slug: "mom-to-be",
  image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/momtobe.png"
});

const casualDate = await db.Occasion.create({
  name: "Casual Date",
  slug: "casual-date",
  image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/casualdate.png"
});

const weddingProposal = await db.Occasion.create({
  name: "Wedding Proposal",
  slug: "wedding-proposal",
  image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/weddingproposal.png"
});

const babyShower = await db.Occasion.create({
  name: "Baby Shower",
  slug: "baby-shower",
  image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/babyshower.png"
});

const congratulations = await db.Occasion.create({
  name: "Congratulations",
  slug: "congratulations",
  image: "https://bnbtplstorageaccount.blob.core.windows.net/addons/decoration/congratulations.png"
});

    // =============================
    // OCCASION FIELDS
    // (ONE NAME FIELD PER OCCASION)
    // =============================

    await db.OccasionField.bulkCreate([

      {
        occasionId: birthday.id,
        label: "Name of the Birthday Person",
        type: "text",
        maxLength: 20
      },

      {
        occasionId: anniversary.id,
        label: "Couple Name",
        type: "text",
        maxLength: 25
      },

      

      {
        occasionId: proposal.id,
        label: "Partner Name",
        type: "text",
        maxLength: 20
      },

      {
        occasionId: farewell.id,
        label: "Person Name",
        type: "text",
        maxLength: 20
      },

      
      {
  occasionId: brideToBe.id,
  label: "Bride Name",
  type: "text",
  maxLength: 25
},
{
  occasionId: groomToBe.id,
  label: "Groom Name",
  type: "text",
  maxLength: 25
},
{
  occasionId: momToBe.id,
  label: "Mom Name",
  type: "text",
  maxLength: 25
},
{
  occasionId: babyShower.id,
  label: "Baby Name",
  type: "text",
  maxLength: 20
},
{
  occasionId: weddingProposal.id,
  label: "Partner Name",
  type: "text",
  maxLength: 20
},
{
  occasionId: casualDate.id,
  label: "Your Partner Name",
  type: "text",
  maxLength: 20
},
{
  occasionId: congratulations.id,
  label: "Person Name",
  type: "text",
  maxLength: 20
}

      

    ]);

    // =============================
    // FIELD GROUPS
    // =============================

    const premiumCakesGroup = await db.FieldGroup.create({
  name: "Premium Cakes",
  slug: "premium-cakes",
  occasionSlug: null, // available for all occasions
  description: "Select premium cakes",
  isActive: true,
  displayOrder: 1,
});

const regularCakesGroup = await db.FieldGroup.create({
  name: "Regular Cakes",
  slug: "regular-cakes",
  occasionSlug: null, // available for all occasions
  description: "Select regular cakes",
  isActive: true,
  displayOrder: 2,
});

    const decorationBirthdayGroup = await db.FieldGroup.create({
      name: "Birthday Decoration",
      slug: "decoration-birthday",
      occasionSlug: "birthday",
      description: "Decoration options",
      isActive: true,
      displayOrder: 3,
    });

    const roseGroup = await db.FieldGroup.create({
      name: "Rose Arrangements",
      slug: "rose",
      occasionSlug: "anniversary",
      description: "Select rose options",
      isActive: true,
      displayOrder: 1,
    });

    const decorationAnniversaryGroup = await db.FieldGroup.create({
      name: "Anniversary Decoration",
      slug: "decoration-anniversary",
      occasionSlug: "anniversary",
      description: "Decoration options",
      isActive: true,
      displayOrder: 2,
    });

    const photographyGroup = await db.FieldGroup.create({
      name: "Photography",
      slug: "photography",
      occasionSlug: "wedding",
      description: "Photography packages",
      isActive: true,
      displayOrder: 1,
    });

    const extraDecorationGroup = await db.FieldGroup.create({
  name: "Extra Decorations",
  slug: "extra-decorations",
  occasionSlug: null,
  description: "Additional decoration addons",
  isActive: true,
  displayOrder: 4,
});

const rosesGroup = await db.FieldGroup.create({
  name: "Roses",
  slug: "roses",
  occasionSlug: null,
  description: "Rose arrangements",
  isActive: true,
  displayOrder: 5,
});

const photographyAddonGroup = await db.FieldGroup.create({
  name: "Photography Addons",
  slug: "photography-addon",
  occasionSlug: null,
  description: "Photography services",
  isActive: true,
  displayOrder: 6,
});

   // =============================
// PREMIUM CAKES
// =============================

await db.Field.bulkCreate([
  {
    groupId: premiumCakesGroup.id,
    label: "Premium Cake Selection",
    fieldName: "premium_cake_type",
    fieldType: "radio",
    options: JSON.stringify([
      { id:"p1", label:"Pinata", price:850, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/Pinata%20Cake%20850.jpg" },
      { id:"p2", label:"Magenta", price:1200, weight:"1kg", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/specialcakes/Magenta%201kg%201200.jpg" },
      { id:"p3", label:"Frozen", price:1200, weight:"1kg", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/specialcakes/Frozen%20Cake%201kg%201200.jpg" },
      { id:"p4", label:"Eternal", price:1200, weight:"1kg", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/specialcakes/Eternal%20Cake%201kg%201200.jpg" },
      { id:"p5", label:"Blue Skies", price:1200, weight:"1kg", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/specialcakes/Blue%20Skies%201kg%201200.jpg" },
      { id:"p6", label:"Lavish", price:1200, weight:"1kg", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/specialcakes/Lavish%20Cake%201kg%201200.jpg" },
      { id:"p7", label:"Mocha Melt", price:1600, weight:"1kg", eggless:false, img:"https://bnbtplstorageaccount.blob.core.windows.net/specialcakes/Mocha%20Melt%201kg%201600.jpg" },
      { id:"p8", label:"Rose Drop", price:1350, weight:"1kg", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/specialcakes/RoseDrop.png" },
      { id:"p9", label:"Rose Drop 2", price:1350, weight:"1kg", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/specialcakes/RoseDrop2.png" },
      { id:"p10", label:"Tokyo", price:1500, weight:"1kg", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/specialcakes/tokyo.png" },
      { id:"p11", label:"Wills Cake", price:3200, weight:"2.5kg", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/specialcakes/Wills%20Cake%202.5kg%203200.jpg" }
    ]),
    isActive: true,
    displayOrder: 1
  }
]);

   // =============================
// STANDARD CAKES
// =============================

await db.Field.bulkCreate([
  {
    groupId: regularCakesGroup.id,
    label: "Standard Cake Selection",
    fieldName: "standard_cake_type",
    fieldType: "radio",
    options: JSON.stringify([
      { id:"s1", label:"Vanilla", price:699, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/vanillacake.jpg" },
      { id:"s2", label:"Strawberry", price:699, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/strawberrycake.jpg" },
      { id:"s3", label:"Butterscotch", price:749, weight:"500gm", eggless:false, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/butterscotchcake.jpg" },
      { id:"s4", label:"Pineapple", price:699, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/pineapplecake.jpg" },
      { id:"s5", label:"Mango Crush", price:799, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/mangocrushcake.png" },
      { id:"s6", label:"Chocolate", price:799, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/chocolatecake.jpg" },
      { id:"s7", label:"Dark Chocolate", price:849, weight:"500gm", eggless:false, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/darkchoclatecake.jpg" },
      { id:"s8", label:"Black Forest", price:699, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/blackforestcake.jpg" },
      { id:"s9", label:"White Forest", price:699, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/whiteforestcake.jpg" },
      { id:"s10", label:"Choco Chips", price:749, weight:"500gm", eggless:false, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/chocochipscake.jpg" },
      { id:"s11", label:"Blueberry", price:799, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/blueberrycake.jpg" },
      { id:"s12", label:"Dry Fruit", price:899, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/dryfruitcake.jpg" },
      { id:"s13", label:"Almond Crunch", price:899, weight:"500gm", eggless:true, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/almondcrunchcake.jpeg" },
      { id:"s14", label:"Chocolate Truffle", price:899, weight:"500gm", eggless:false, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/chocolatetrufflecake.png" },
      { id:"s15", label:"Chocolate Coffee", price:949, weight:"500gm", eggless:false, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/cakes/choclatecoffeecake.jpg" }
    ]),
    isActive: true,
    displayOrder: 1
  }
]);

    // =============================
    // DECORATION
    // =============================

   await db.Field.create({
  groupId: extraDecorationGroup.id,
  label: "Extra Decorations",
  fieldName: "extra_decorations",
  fieldType: "checkbox",
  options: JSON.stringify([
    { id:"fog", label:"Fog Effect", price:499, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/misc/fogeffect.png" },
    { id:"photoclippings16", label:"Photo Clippings (16 Pics)", price:499, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/misc/photoclippings.jpg" },
    { id:"coldfire2", label:"Cold Fire (2 pieces)", price:750, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/misc/cold_fire.webp" },
    { id:"coldfire4", label:"Cold Fire (4 pieces)", price:1500, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/misc/cold_fire.webp" },
    { id:"candlepath", label:"Candle Path", price:250, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/misc/Candle%20Path%20(Rs%20300).png" },
    { id:"partyprops", label:"Party Props", price:199, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/misc/partyprops.jpg" },
    { id:"lednumbers", label:"LED Numbers", price:99, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/misc/lednumbers.jpg" },
    { id:"hbdletters", label:"HBD Letters", price:99, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/misc/hbdletters.jpg" }
  ]),
  isActive: true,
  displayOrder: 1
});

  await db.Field.create({
  groupId: rosesGroup.id,
  label: "Rose Addons",
  fieldName: "rose_addons",
  fieldType: "checkbox",
  options: JSON.stringify([
    { id:"singlerose", label:"Single Rose", price:49, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/roses/singleflower.jpg" },
    { id:"rosebouquet", label:"Rose Bouquet", price:349, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/roses/rosebouquet.png" }
  ]),
  isActive: true,
  displayOrder: 1
});

   await db.Field.create({
  groupId: photographyAddonGroup.id,
  label: "Photography Addons",
  fieldName: "photography_addons",
  fieldType: "checkbox",
  options: JSON.stringify([
    { id:"photo20", label:"Photography - 20 pics", price:299, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/photography/photo20.jpeg" },
    { id:"photo50", label:"Photography - 50 pics", price:499, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/photography/photo50.jpeg" },
    { id:"photo75", label:"Photography - 75 pics", price:699, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/photography/photo75.jpeg" },
    { id:"photo100", label:"Photography - 100 pics", price:999, img:"https://bnbtplstorageaccount.blob.core.windows.net/addons/photography/photo100.jpeg" }
  ]),
  isActive: true,
  displayOrder: 1
});

    console.log("Seeding completed successfully!");
    process.exit(0);

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();