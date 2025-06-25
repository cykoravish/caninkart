import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContactForm from "../components/contactForm";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  // Get thumbnails from product data or use fallback
  const thumbnails =
    product?.thumbnails ||
    (product?.image ? [product.image] : ["/placeholder.jpg"]);

  const [mainImage, setMainImage] = useState(product?.image || thumbnails[0]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product?.image) {
      setMainImage(product.image);
      setImageError(false); // Reset error state when product changes
    }
  }, [product]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleThumbnailClick = (img) => {
    setMainImage(img);
    setImageError(false); // Reset error state for new image
  };

  // Early return for no product
  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-xl">Product not found.</p>
        <button
          onClick={() => navigate("/product")}
          className="mt-4 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  // Thumbnail component to reduce duplication
  const Thumbnail = ({ img, index, className = "" }) => (
    <img
      key={index}
      src={img}
      onClick={() => handleThumbnailClick(img)}
      onError={handleImageError}
      className={`object-contain rounded-md cursor-pointer bg-white p-1 transition-all ${
        mainImage === img
          ? "ring-2 ring-orange-400"
          : "hover:ring-2 hover:ring-gray-400"
      } ${className}`}
      alt={`${product.name} thumbnail ${index + 1}`}
    />
  );

  return (
    <>
      <div className="bg-[#F1FFEF] flex flex-col p-4 sm:p-6 md:px-32 relative top-18 max-w-screen-2xl mx-auto">
        <button
          className="flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-orange-500 w-fit transition-colors mb-4"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-base" />
          BACK
        </button>

        {/* Main Product Display */}
        <div className="w-full max-w-6xl rounded-lg flex flex-col md:flex-row gap-6 my-8">
          {/* Desktop Sidebar Thumbnails */}
          <div
            className={`hidden md:flex md:flex-col gap-4 h-120 sticky top-24 ${
              thumbnails.length > 4 && "overflow-y-scroll pr-2 thumbnail-scroll"
            }`}
          >
            {thumbnails.map((img, index) => (
              <Thumbnail
                key={`desktop-${index}`}
                img={img}
                index={index}
                className="w-20 h-20 sm:w-32 sm:h-28"
              />
            ))}
          </div>

          {/* Main Image Section */}
          <div className="flex flex-col md:bg-white md:justify-center flex-1 gap-4 h-120 lg:sticky top-24 ">
            <div className="flex justify-center bg-white p-4 rounded relative overflow-hidden">
              {imageError ? (
                <div className="w-full max-w-xs sm:max-w-sm h-48 md:h-auto flex items-center justify-center bg-gray-100 rounded-md">
                  <span className="text-gray-500">Image not available</span>
                </div>
              ) : (
                <img
                  src={mainImage}
                  alt={`${product.name} - Main Product`}
                  onError={handleImageError}
                  className="w-full  object-fit rounded-md p-2"
                />
              )}
            </div>

            {/* Mobile Thumbnails */}
            <div className="flex md:hidden gap-3 overflow-x-auto py-2 px-3">
              {thumbnails.map((img, index) => (
                <Thumbnail
                  key={`mobile-${index}`}
                  img={img}
                  index={index}
                  className="w-20 h-20 sm:w-32 sm:h-28 flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          {product.id === 1 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>

              <p className="text-gray-700 font-semibold text-lg">
                H-Harness – Secure & Adjustable Control for Every Walk
              </p>

              <p className="text-gray-700">
                The H-Harness is a type of dog harness designed in the shape of
                the letter “H” when viewed from the side. It provides secure and
                comfortable control over your dog during walks or training
                sessions.
              </p>

              <p className="text-gray-700">
                Caninkart is a prominent Indian manufacturer of pet accessories,
                including H-harnesses for dogs. We emphasize quality, comfort,
                and affordability in our products. Our H-harnesses are designed
                with features like adjustable straps and secure lock buckles to
                ensure both safety and comfort for pets. These harnesses are
                available in 3 sizes and multiple colors, catering to different
                breeds and preferences.
              </p>

              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  🔹 Key Features of an H-Harness:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    Four Adjustable Loops – Two around the neck and another two
                    around the chest.
                  </li>
                  <li>
                    Connecting Strap – A strap runs along the back and under the
                    belly, forming the "H" shape.
                  </li>
                  <li>
                    Leash Attachment Point – On the back for no-pull control.
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  🐾 Benefits of Using an H-Harness:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    Even Pressure Distribution – Prevents choking and reduces
                    strain on the neck.
                  </li>
                  <li>
                    Secure Fit – Adjustable straps ensure a snug fit for dogs of
                    all sizes.
                  </li>
                  <li>
                    Better Control – Especially useful for energetic or
                    untrained dogs.
                  </li>
                  <li>
                    Comfortable for Long Use – Soft and breathable webbed strap
                    increase comfort.
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  ✅ Ideal For:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Daily walks</li>
                  <li>Training sessions</li>
                  <li>Dogs prone to pulling</li>
                  <li>Small to large breeds</li>
                </ul>
              </div>
            </div>
          )}
          {product.id === 2 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>

              <p className="text-gray-700 font-semibold text-lg">
                Easy-On Harness – Quick, Safe & Comfortable for Everyday Walks
              </p>

              <p className="text-gray-700">
                An Easy-on harness for dogs is designed for quick, hassle-free
                wear—perfect for squirmy pups or busy pet parents. If you're
                seeking an easy-on harness for your dog, Caninkart offers
                several options that combine comfort, safety, and convenience.
                Our harnesses are designed to be user-friendly, ensuring a
                hassle-free experience for both you and your pet.
              </p>

              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  ✅ Key Features of an Easy-On Dog Harness:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Step-in or overhead design – no complicated straps</li>
                  <li>Quick-release buckle – fast to clip on and off</li>
                  <li>Adjustable straps – ensures a snug and secure fit</li>
                  <li>Soft padding – comfortable for everyday wear</li>
                  <li>Back leash ring – for better control</li>
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  🐶 Ideal For:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Puppies and senior dogs</li>
                  <li>
                    Small to large breeds (like Shih-Tzu, Pomeranian, Beagle,
                    German Shepherd)
                  </li>
                  <li>Dogs that dislike traditional collars</li>
                </ul>
              </div>
            </div>
          )}

          {product.id === 3 && (
            <>
              <div className="space-y-4 text-left flex-1">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                  {product.name}
                </h1>

                <p className="text-gray-700 font-semibold text-lg">
                  Full Body Dog Harness – Secure, Comfortable & Supportive
                </p>

                <p className="text-gray-700">
                  Give your dog the ultimate comfort with our Full Body Dog
                  Harness. Designed for active pups, senior dogs, and pets in
                  recovery, this harness offers full-body support with evenly
                  distributed pressure to reduce strain on your dog’s neck and
                  spine. It features adjustable straps for a custom fit, soft
                  padding for all-day comfort, and a back-handle to assist with
                  lifting or guiding your dog safely. Whether you're hiking,
                  training, or helping your pet with mobility, this harness
                  ensures stability, comfort, and confidence in every step.
                </p>

                <p className="text-gray-700">
                  Caninkart is a prominent Indian manufacturer and exporter of
                  pet accessories, including full-body harnesses for dogs. We
                  are known for our commitment to quality, comfort, and
                  durability in our products. Caninkart’s harnesses are designed
                  to provide a secure and comfortable fit for dogs of various
                  sizes, with features such as adjustable straps and breathable
                  materials.
                </p>

                <div className="p-4 mt-6">
                  <h2 className="text-lg font-semibold mb-3 text-gray-800">
                    🐾 Benefits of Using a Full Body Harness:
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>
                      <strong>Even Pressure Distribution</strong> – Prevents
                      choking and reduces strain on the neck.
                    </li>
                    <li>
                      <strong>Secure Fit</strong> – Adjustable straps ensure a
                      snug fit for dogs of all sizes.
                    </li>
                    <li>
                      <strong>Better Control</strong> – Especially useful for
                      energetic or untrained dogs.
                    </li>
                    <li>
                      <strong>Comfortable for Long Use</strong> – Soft and
                      breathable webbed straps increase comfort.
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {product.id === 4 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>

              <p className="text-gray-700 font-semibold text-lg">
                Dog Chest Harness – Secure, Comfortable & Durable
              </p>

              <p className="text-gray-700">
                Caninkart has established itself as a leading manufacturer of
                dog harnesses in India, renowned for its commitment to quality,
                comfort, and innovation. Our products are designed to cater to a
                diverse range of dog breeds and sizes, ensuring a secure and
                comfortable fit for every pet.
              </p>

              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  🔹 Key Features of Caninkart Dog Harnesses:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Premium Quality and Durability</li>
                  <li>Innovative Designs for Comfort</li>
                  <li>Wide Range of Sizes</li>
                  <li>Trusted by Pet Owners</li>
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  🐾 Dog Chest Harness Features:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Full Chest Coverage – Reduces strain on the neck</li>
                  <li>No-Pull Design – Improves control during walks</li>
                  <li>Adjustable Straps – Customizable fit</li>
                  <li>Padded for Comfort – Prevents chafing</li>
                  <li>Durable Materials – Long-lasting use</li>
                  <li>Quick-Release Buckles – Easy on/off</li>
                  <li>Leash Attachment Point – For varied control options</li>
                  <li>Escape-Proof Fit – Prevents slipping out</li>
                </ul>
              </div>
            </div>
          )}
          {product.id === 5 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>

              <p className="text-gray-700 font-semibold text-lg">
                Cat Harness – Lightweight, Secure & Stylish
              </p>

              <p className="text-gray-700">
                Caninkart is a reputable Indian manufacturer of pet products,
                including cat harnesses. We are known for producing
                high-quality, durable, and affordable products designed with pet
                comfort and safety in mind.
              </p>

              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  🐾 Cat Harness Features:
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Escape-Proof Design – Prevents slipping out</li>
                  <li>Soft & Breathable Material – For maximum comfort</li>
                  <li>Durable Construction – Reinforced stitching</li>
                  <li>Quick-Release Buckles – Stress-free wear</li>
                  <li>
                    360° Control with Leash Ring – Even pressure distribution
                  </li>
                  <li>Padded Chest & Neck Area – Prevents choking</li>
                  <li>Stylish Designs – Cute colours and prints</li>
                  <li>Lightweight and Travel-Friendly – Great for trips</li>
                </ul>
              </div>
            </div>
          )}

          {product.id === 6 && (
            <div className="space-y-4 text-left flex-1">
              <h2 className="text-2xl font-semibold mb-4">Dog Collars</h2>
              <p className="mb-4">
                <strong>Caninkart</strong> is a prominent Indian manufacturer
                and exporter of pet accessories, including dog collars. We offer
                a diverse range of products designed to meet the needs of pets
                and their owners. Our dog collars are known for quality and
                affordability, featuring durable materials like{" "}
                <strong>Polyester</strong> and adjustable straps for comfort.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">
                Top Reasons Why a Dog Collar Is Important
              </h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Identification & Safety</strong>
                  <ul className="list-disc pl-6 mt-1">
                    <li>
                      Collars can hold ID tags with your dog’s name, your phone
                      number, and address.
                    </li>
                    <li>
                      If your dog gets lost, a collar increases the chances of a
                      safe return.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Control & Training</strong>
                  <ul className="list-disc pl-6 mt-1">
                    <li>
                      Collars allow easy attachment of a leash for walks and
                      training.
                    </li>
                    <li>
                      They help manage pulling, jumping, or other behavior in
                      public.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Legal Requirement</strong>
                  <p className="pl-6 mt-1">
                    In some areas, it’s mandatory for dogs to wear
                    identification while outside.
                  </p>
                </li>
                <li>
                  <strong>Fashion & Personality</strong>
                  <p className="pl-6 mt-1">
                    Collars come in various styles and materials, reflecting
                    your dog’s personality.
                  </p>
                </li>
              </ol>

              <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-600 rounded">
                <strong>✅ Bonus Tip:</strong> Always ensure the collar fits
                comfortably—not too tight or too loose. You should be able to
                slide two fingers under it easily.
              </div>
            </div>
          )}
          {product.id === 7 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>

              <p className="text-gray-700 font-semibold text-lg">
                Dog Collar Printed – Stylish, Functional & Safe
              </p>

              <p className="text-gray-700">
                A dog collar is essential for walks as it provides control,
                safety, and identification. Caninkart manufactures high-quality
                printed collars designed to be both practical and stylish.
              </p>

              <div className="space-y-2 text-gray-700">
                <h2 className="text-lg font-semibold text-gray-800">
                  🔹 Why Dog Collars Matter:
                </h2>
                <ul className="list-disc list-inside">
                  <li>
                    <strong>Control and Safety</strong> – Prevents dogs from
                    running into traffic or getting lost.
                  </li>
                  <li>
                    <strong>Identification</strong> – Holds ID tags for quick
                    recovery if lost.
                  </li>
                  <li>
                    <strong>Training Support</strong> – Helps with leash
                    training and behavior correction.
                  </li>
                  <li>
                    <strong>Legal Compliance</strong> – Required in many areas
                    during public walks.
                  </li>
                  <li>
                    <strong>Emergency Handling</strong> – Quick restraint in
                    critical situations.
                  </li>
                </ul>

                <h2 className="text-lg font-semibold text-gray-800 mt-4">
                  🐾 Why Choose Caninkart:
                </h2>
                <ul className="list-disc list-inside">
                  <li>
                    Superior Quality – Durable nylon and padded fabrics for
                    comfort
                  </li>
                  <li>Made in India – Ethical and sustainable practices</li>
                  <li>
                    Extensive Product Range – Find matching harnesses, leashes,
                    and more
                  </li>
                  <li>
                    Customer-Centric – Responsive support and fast shipping
                  </li>
                </ul>
              </div>
            </div>
          )}
          {product.id === 8 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>

              <p className="text-gray-700 font-semibold text-lg">
                Dog Leash – Durable, Comfortable & Affordable
              </p>

              <p className="text-gray-700">
                Caninkart has become a trusted name in India for dog leashes,
                delivering strength, comfort, and value in every product. Our
                leashes are built to handle everyday use with ease and style.
              </p>

              <div className="space-y-2 text-gray-700">
                <h2 className="text-lg font-semibold text-gray-800">
                  🛠️ Key Highlights:
                </h2>
                <ul className="list-disc list-inside">
                  <li>High-grade polyester – Durable and long-lasting</li>
                  <li>Padded handles – Soft, comfortable grip</li>
                  <li>
                    Secure metal hooks – Reliable leash-to-collar attachment
                  </li>
                </ul>

                <h2 className="text-lg font-semibold text-gray-800 mt-4">
                  🇮🇳 Made in India:
                </h2>
                <p>
                  Manufactured locally with strict quality control, our products
                  support local industries and promote ethical practices.
                </p>

                <h2 className="text-lg font-semibold text-gray-800 mt-4">
                  💰 Value for Money:
                </h2>
                <p>
                  Our pricing ensures affordability without compromising on
                  quality – making Caninkart leashes accessible to all pet
                  lovers.
                </p>
              </div>
            </div>
          )}
          {product.id === 9 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>

              <p className="text-gray-700 font-semibold text-lg">
                Printed Dog Leash – Fashion Meets Function
              </p>

              <p className="text-gray-700">
                Caninkart’s printed dog leashes bring a vibrant, personalized
                look to your walks while offering practical features that
                prioritize safety and durability.
              </p>

              <div className="space-y-2 text-gray-700">
                <h2 className="text-lg font-semibold text-gray-800">
                  🐾 Features:
                </h2>
                <ul className="list-disc list-inside">
                  <li>Stylish Printed Design – Eye-catching and fun</li>
                  <li>Durable Polyester – Built for daily use</li>
                  <li>Comfortable Padded Grip – For long, enjoyable walks</li>
                  <li>Heavy-Duty Metal Hook – Ensures a secure hold</li>
                  <li>Fade-Resistant – Prints remain vibrant after washes</li>
                  <li>
                    Lightweight & Strong – Easy to handle without compromising
                    strength
                  </li>
                  <li>
                    Multiple Lengths & Widths – Tailored for every dog size
                  </li>
                  <li>Matching Collars – Pair with coordinated accessories</li>
                  <li>Easy to Clean – Quick-drying and washable</li>
                  <li>
                    Custom Branding Option – Available for bulk orders or
                    promotional gifts
                  </li>
                </ul>
              </div>
            </div>
          )}

          {product.id === 10 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>

              <p className="text-gray-700 font-semibold text-lg">
                Pumpkin Shaped Cat Hut – Cozy, Cute, and Perfect for Feline
                Comfort
              </p>

              <p className="text-gray-700">
                Give your furry friend the ultimate cozy hideaway with our
                Pumpkin Shaped Cat Hut – a charming and functional pet bed that
                combines whimsical design with unmatched comfort. Thoughtfully
                designed for cats and small dogs, this hut offers a safe and
                stylish space where your pet can relax, nap, or simply enjoy
                some quiet time.
              </p>

              <p className="text-gray-700">
                Crafted in an adorable pumpkin shape, this cat hut adds a
                playful and decorative touch to any room, blending easily into
                modern, minimalist, or seasonal décor. The round and spacious
                design mimics a natural den-like environment, offering your pet
                a sense of security and warmth. Whether your cat is curling up
                for a nap or seeking shelter from a noisy household, this hut
                provides the perfect refuge.
              </p>

              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  • Soft, Durable & Pet-Friendly Materials
                </h2>
                <p className="text-gray-700">
                  Made with premium fabric, the Pumpkin Cat Hut is both soft to
                  the touch and gentle on your pet’s skin. The interior is
                  padded with cozy polyfill that supports restful sleep and
                  maintains its shape after extended use. The outer shell is
                  sturdy yet flexible, allowing the hut to retain its unique
                  shape while still being lightweight and easy to move around
                  your home.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  • Comfort Meets Convenience
                </h2>
                <p className="text-gray-700">
                  This cat hut is designed with your convenience in mind. The
                  removable inner cushion makes cleaning hassle-free, and the
                  entire hut can be spot cleaned with ease. Its lightweight
                  build ensures portability, so your pet can enjoy their cozy
                  corner in the living room, bedroom, or even while traveling.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  • Ideal for Cats and Puppies
                </h2>
                <p className="text-gray-700">
                  Available in multiple colors and suitable for kittens, adult
                  cats, and puppies, this pumpkin hut is a versatile choice for
                  pet owners who want something functional yet visually
                  appealing.
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Why Pet Parents Love It:
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Whimsical pumpkin design</li>
                  <li>Provides a secure and private retreat for pets</li>
                  <li>Cushioned and warm for all-season comfort</li>
                  <li>Easy to clean and move</li>
                  <li>Perfect gift for pet lovers or festive pet setups</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-orange-100 border-l-4 border-orange-500 rounded">
                <strong>Treat your pet</strong> to the luxury of comfort and
                cuteness with the Pumpkin Shaped Cat Hut – where every nap feels
                like a warm hug inside a pumpkin.
              </div>
            </div>
          )}
          {product.id === 11 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🐾 Caninkart Formal Dog Tuxedo – Wedding & Party Wear
              </p>
              <p className="text-gray-700">
                Dress your furry friend in style with our premium Dog Tuxedo,
                perfect for weddings, birthdays, and special occasions. This
                elegant tuxedo ensures your dog looks dapper and distinguished.
              </p>
              <div className="space-y-2 text-gray-700">
                <h2 className="text-lg font-semibold text-gray-800">
                  🎩 Product Highlights:
                </h2>
                <ul className="list-disc list-inside">
                  <li>
                    Classic tuxedo design with lapels, shirt front & bow tie
                  </li>
                  <li>Step-in style with snap closures – easy to wear</li>
                  <li>Soft, breathable fabric for all-day comfort</li>
                  <li>Tailored fit for small to large breeds</li>
                  <li>Photo-ready for memorable moments</li>
                </ul>
                <h2 className="text-lg font-semibold text-gray-800">
                  🐶 Ideal For:
                </h2>
                <ul className="list-disc list-inside">
                  <li>Weddings & parties</li>
                  <li>Holiday photos & family portraits</li>
                  <li>Costume contests & social media shoots</li>
                </ul>
              </div>
            </div>
          )}
          {product.id === 12 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🎀 Stylish Bow Tie for Dogs – Weddings & Parties
              </p>
              <p className="text-gray-700">
                Turn heads at every celebration with this elegant dog bowtie,
                perfect for special occasions like weddings and birthdays.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Premium fabric – soft, breathable & gentle on fur</li>
                <li>Classic bow shape in tuxedo-inspired or festive prints</li>
                <li>Adjustable strap – secure and comfy for most breeds</li>
                <li>Ideal for weddings, parties, and photoshoots</li>
                <li>Photo-perfect for adorable moments</li>
              </ul>
              <p className="text-gray-700">
                Available Sizes: S, M, L – Fits puppies to large breeds. Easy to
                wear and guaranteed to impress!
              </p>
            </div>
          )}
          {product.id === 13 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🧣 Stylish Dog & Cat Bandanas by Caninkart
              </p>
              <p className="text-gray-700">
                Add flair to your pet’s look with premium-quality bandanas
                perfect for birthdays, casual outings, festivals, and
                photoshoots.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Soft, breathable fabric – gentle on skin and fur</li>
                <li>Lightweight, adjustable, and hassle-free</li>
                <li>Available in various prints and patterns</li>
                <li>Suitable for small to large dog breeds</li>
              </ul>
              <p className="text-gray-700">
                <strong>Why Choose Caninkart?</strong> Trusted by pet parents
                nationwide, our bandanas combine fashion, comfort, and
                durability at an affordable price.
              </p>
              <div className="mt-2">
                <h2 className="font-semibold text-gray-800">📸 Wedding Tip:</h2>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Coordinate colors with the wedding palette</li>
                  <li>Practice beforehand for comfort</li>
                  <li>Ask the photographer to include your dog in candids</li>
                </ul>
              </div>
            </div>
          )}
          {product.id === 14 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🛏️ Printed Dog Mat – Stylish Comfort for Your Furry Friend!
              </p>
              <p className="text-gray-700">
                Caninkart’s printed dog mat offers daily comfort with stylish
                flair. Perfect for homes, crates, travel, or outdoor use.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Attractive pet-friendly prints</li>
                <li>Soft padded breathable fabric</li>
                <li>Non-slip base for safety</li>
                <li>Machine-washable & quick-drying</li>
                <li>Multiple uses – floors, sofas, crates, car seats</li>
              </ul>
              <p className="text-gray-700">
                <strong>Available Sizes:</strong> Small | Medium | Large – for
                all breeds.
              </p>
              <div className="mt-2">
                <h2 className="font-semibold text-gray-800">
                  🌟 Why Caninkart?
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Premium-grade materials and craftsmanship</li>
                  <li>Vibrant printed designs to match home decor</li>
                  <li>Washable, odor-resistant, and long-lasting</li>
                  <li>Orthopedic polyfill support – great for senior dogs</li>
                  <li>Customization and bulk export options available</li>
                </ul>
              </div>
            </div>
          )}
          {product.id === 15 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🐾 Luxurious Dog Fur Mat – Ultra-Soft, Cozy & Washable
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Super-soft fur for maximum warmth and comfort</li>
                <li>
                  Versatile use – ideal for floors, sofas, crates, or travel
                </li>
                <li>Machine-washable for easy maintenance</li>
                <li>Non-slip bottom keeps mat securely in place</li>
                <li>Made with non-toxic, skin-friendly materials</li>
              </ul>
              <p className="text-gray-700">
                Give your pet the luxury they deserve with the Caninkart Fur Mat
                – blending elegance and coziness. Lightweight and portable, it’s
                perfect for at-home or on-the-go relaxation.
              </p>
              <p className="text-gray-700">
                <strong>Why Choose Caninkart?</strong> We combine safety, style,
                and softness with every product – trusted by pet parents for
                premium comfort and durability.
              </p>
            </div>
          )}
          {product.id === 16 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🛏️ Pattern Lounger – Luxurious Comfort for Your Canine Companion
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Polyfill cushioning supports joints and muscles</li>
                <li>Velvet-touch fabric – soft and breathable</li>
                <li>Modern design complements any home decor</li>
                <li>Removable, washable cover for easy cleaning</li>
              </ul>
              <p className="text-gray-700">
                Perfect for all dog breeds – from small Chihuahuas to large
                Golden Retrievers – our Pattern Lounger transforms every nap
                into a pampered retreat.
              </p>
              <p className="text-gray-700">
                <strong>Why Caninkart?</strong> We're known for premium-quality
                dog beds made with safe materials and thoughtful craftsmanship
                to ensure unmatched comfort and durability.
              </p>
            </div>
          )}
          {product.id === 17 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                ✨ Premium Embroidered Dog Bed – Where Comfort Meets
                Craftsmanship
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Elegant embroidery adds a touch of luxury</li>
                <li>Polyfill cushion offers joint and muscle support</li>
                <li>Durable, easy-to-clean, stylish outer fabric</li>
                <li>Gentle on skin and fur – perfect for all breeds</li>
              </ul>
              <p className="text-gray-700">
                This dog bed isn’t just functional—it’s a centerpiece of your
                pet’s comfort space and your home aesthetic. A statement of love
                for your furry family member.
              </p>
              <p className="text-gray-700">
                <strong>Made in India by Caninkart</strong> – A trusted
                manufacturer and exporter of high-quality pet accessories, built
                with care and commitment.
              </p>
            </div>
          )}
          {product.id === 18 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🛏 Ultra-Soft Dog Fur Bed – Cozy Comfort for Your Pet
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Available in 3 sizes – fits small to large breeds</li>
                <li>Multiple color options to match your home</li>
                <li>Supportive polyfill for optimal comfort and durability</li>
                <li>Removable, washable cover for easy maintenance</li>
              </ul>
              <p className="text-gray-700">
                Whether it’s nap time or bedtime, this fur lounger offers a cozy
                haven for your dog’s relaxation. Crafted from high-quality
                materials, it ensures your pet feels safe, secure, and pampered.
              </p>
              <p className="text-gray-700">
                <strong>Made by Caninkart</strong> – a leading Indian pet
                accessories brand committed to comfort, quality, and happy pets.
              </p>
            </div>
          )}
          {product.id === 19 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🎨 Dog Printed Lounger Bed – Soft, Stylish, and Snuggly!
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Vibrant, eye-catching printed designs</li>
                <li>Ultra-soft, durable fabric with high-density polyfill</li>
                <li>Supportive raised sides for head and neck rest</li>
                <li>Removable, washable cover for easy upkeep</li>
                <li>Available in Small, Medium, and Large sizes</li>
                <li>Multiple trendy color variants available</li>
              </ul>
              <p className="text-gray-700">
                Our printed loungers offer ergonomic comfort and charming
                aesthetics to enhance both pet happiness and your home style.
              </p>
              <p className="text-gray-700">
                <strong>Why Choose Caninkart?</strong> As India’s most preferred
                manufacturer of printed dog beds, Caninkart delivers premium
                quality, stylish variety, and trusted craftsmanship tailored for
                pets and pet parents alike.
              </p>
            </div>
          )}

          {product.id === 20 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🐶 Premium Dog Mattress – Supportive Sleep for All Breeds
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Supports joints, hips, and muscles – ideal for older dogs
                </li>
                <li>Enhances sleep quality with soft, secure cushioning</li>
                <li>Removable and washable covers for better hygiene</li>
                <li>Breathable materials for all-season comfort</li>
                <li>Defines personal space for better sleep behavior</li>
                <li>Improves long-term posture and joint health</li>
              </ul>
              <p className="text-gray-700">
                Whether for growing puppies or senior companions, Caninkart
                mattresses provide the foundation for better rest and recovery.
              </p>
              <p className="text-gray-700">
                <strong>Why Caninkart?</strong> Trusted across India for
                quality, comfort, and pet-first design, Caninkart offers premium
                dog mattresses with safe materials, customizable sizes, and a
                commitment to craftsmanship.
              </p>
            </div>
          )}
          {product.id === 21 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🛏 Cozy Round-Shaped Dog Bed – Soft, Supportive & Stylish
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Round design promotes natural curl-up sleeping posture</li>
                <li>Made with breathable, ultra-soft pet-safe fabric</li>
                <li>Filled with fluffy polyfiber for extra coziness</li>
                <li>Non-slip base keeps the bed stable on all floor types</li>
                <li>Machine-washable for everyday convenience</li>
                <li>Perfect for dogs, cats, and puppies of all breeds</li>
              </ul>
              <p className="text-gray-700">
                This stylish round bed from <strong>Caninkart</strong> provides
                a comfortable, warm retreat for your pet while adding elegance
                to your home décor. Trusted by pet parents across India.
              </p>
            </div>
          )}
          {product.id === 22 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🐌 Snail-Shaped Cat Hut – Whimsical Comfort for Your Feline
                Friend
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Unique snail-inspired design adds playful charm to your space
                </li>
                <li>
                  Crafted from soft, pet-safe materials with sturdy stitching
                </li>
                <li>Keeps pets warm in winter and cool in summer</li>
                <li>Includes removable inner cushion for easy cleaning</li>
                <li>Ideal for cats, kittens, and small dogs like chihuahuas</li>
                <li>Available in multiple sizes and fun colors</li>
              </ul>
              <p className="text-gray-700">
                Designed by <strong>Caninkart</strong>, India’s leading pet
                accessories brand, this hut offers privacy and style in a
                single, cozy product.
              </p>
            </div>
          )}

          {product.id === 23 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>

              <p className="text-gray-700 font-semibold text-lg">
                Pumpkin Shaped Cat Hut – Cozy, Cute, and Perfect for Feline
                Comfort
              </p>

              <p className="text-gray-700">
                Give your furry friend the ultimate cozy hideaway with our
                Pumpkin Shaped Cat Hut – a charming and functional pet bed that
                combines whimsical design with unmatched comfort. Thoughtfully
                designed for cats and small dogs, this hut offers a safe and
                stylish space where your pet can relax, nap, or simply enjoy
                some quiet time.
              </p>

              <p className="text-gray-700">
                Crafted in an adorable pumpkin shape, this cat hut adds a
                playful and decorative touch to any room, blending easily into
                modern, minimalist, or seasonal décor. The round and spacious
                design mimics a natural den-like environment, offering your pet
                a sense of security and warmth. Whether your cat is curling up
                for a nap or seeking shelter from a noisy household, this hut
                provides the perfect refuge.
              </p>

              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  • Soft, Durable & Pet-Friendly Materials
                </h2>
                <p className="text-gray-700">
                  Made with premium fabric, the Pumpkin Cat Hut is both soft to
                  the touch and gentle on your pet’s skin. The interior is
                  padded with cozy polyfill that supports restful sleep and
                  maintains its shape after extended use. The outer shell is
                  sturdy yet flexible, allowing the hut to retain its unique
                  shape while still being lightweight and easy to move around
                  your home.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  • Comfort Meets Convenience
                </h2>
                <p className="text-gray-700">
                  This cat hut is designed with your convenience in mind. The
                  removable inner cushion makes cleaning hassle-free, and the
                  entire hut can be spot cleaned with ease. Its lightweight
                  build ensures portability, so your pet can enjoy their cozy
                  corner in the living room, bedroom, or even while traveling.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  • Ideal for Cats and Puppies
                </h2>
                <p className="text-gray-700">
                  Available in multiple colors and suitable for kittens, adult
                  cats, and puppies, this pumpkin hut is a versatile choice for
                  pet owners who want something functional yet visually
                  appealing.
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Why Pet Parents Love It:
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Whimsical pumpkin design</li>
                  <li>Provides a secure and private retreat for pets</li>
                  <li>Cushioned and warm for all-season comfort</li>
                  <li>Easy to clean and move</li>
                  <li>Perfect gift for pet lovers or festive pet setups</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-orange-100 border-l-4 border-orange-500 rounded">
                <strong>Treat your pet</strong> to the luxury of comfort and
                cuteness with the Pumpkin Shaped Cat Hut – where every nap feels
                like a warm hug inside a pumpkin.
              </div>
            </div>
          )}
          {product.id === 24 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🐛 Caterpillar Hut – Cozy Hideaway for Cats, Puppies & Small
                Dogs
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Charming caterpillar shape adds whimsy to your pet’s corner
                </li>
                <li>
                  Soft, breathable fabric with supportive polyfill interior
                </li>
                <li>
                  Enclosed design offers a den-like feel for added security
                </li>
                <li>
                  Removable, washable inner cushion for hassle-free cleaning
                </li>
                <li>Portable and lightweight for home or travel use</li>
                <li>Perfect for small pets like kittens, cats, and puppies</li>
              </ul>
              <p className="text-gray-700">
                Crafted with love by <strong>Caninkart</strong>, the Caterpillar
                Hut is a warm and whimsical spot where pets feel safe, loved,
                and stylishly snuggled.
              </p>
            </div>
          )}
          {product.id === 25 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🏠 Caninkart Cave Bed – Cartoon Design for Cozy Hideaways
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Cone-shaped structure mimics a natural den</li>
                <li>Ideal for cats, puppies, and small breed dogs</li>
                <li>Soft, durable fabric with ultra-cushioned interiors</li>
                <li>Removable cushion for easy cleaning</li>
                <li>Lightweight, foldable, and travel-friendly</li>
                <li>Stylish and space-saving addition to any room</li>
              </ul>
              <p className="text-gray-700">
                Crafted by <strong>Caninkart</strong>, this charming cone-shaped
                cave bed offers your pet a secure, warm place to snuggle, relax,
                and recharge. Perfect for all-season comfort and modern homes.
              </p>
            </div>
          )}
          {product.id === 26 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🎄 X-mas Cave Bed – Festive and Functional Comfort by Caninkart
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Holiday-inspired cave bed with subtle Christmas detailing
                </li>
                <li>Soft, padded interior with high-density polyfill</li>
                <li>Enclosed design offers warmth and a sense of security</li>
                <li>Sturdy structure retains shape over time</li>
                <li>Lightweight and portable for indoor use or travel</li>
                <li>Easy to clean with surface-washable fabric</li>
              </ul>
              <p className="text-gray-700">
                Celebrate year-round comfort with{" "}
                <strong>Caninkart’s X-mas Cave Bed</strong>. A holiday gift and
                everyday retreat rolled into one for your cat or small dog.
              </p>
            </div>
          )}
          {product.id === 27 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🐾 Grey Cave Bed – Modern Comfort for Cats & Small Dogs
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Den-style enclosed design offers privacy and calm</li>
                <li>
                  Soft, breathable fabric with a removable, padded cushion
                </li>
                <li>Non-slip base keeps the bed in place on any surface</li>
                <li>Elegant grey color matches contemporary home decor</li>
                <li>
                  Crafted for small pets including cats, Chihuahuas, and Shih
                  Tzus
                </li>
                <li>Durable stitching for long-lasting use</li>
              </ul>
              <p className="text-gray-700">
                Manufactured with care by <strong>Caninkart</strong>, the Grey
                Cave Bed is the ideal retreat for pets who love snuggling in
                style and peace.
              </p>
            </div>
          )}
          {product.id === 28 && (
            <div className="space-y-4 text-left flex-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 w-full">
                {product.name}
              </h1>
              <p className="text-gray-700 font-semibold text-lg">
                🖼️ Printed Cave Bed – Stylish & Snug Hideaway by Caninkart
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Attractive printed fabric adds charm to any home</li>
                <li>Soft interior cushion offers plush comfort for pets</li>
                <li>Semi-enclosed design promotes a sense of security</li>
                <li>
                  Durable yet lightweight – easy to reposition or travel with
                </li>
                <li>
                  Removable inner cushion for easy washing and maintenance
                </li>
                <li>Ideal for cats and small breed dogs</li>
              </ul>
              <p className="text-gray-700">
                The <strong>Caninkart Printed Cave Bed</strong> isn’t just a
                place for your pet to nap—it’s a cozy, stylish sanctuary that
                brings beauty to your space and comfort to your companion.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-18">
        <ContactForm />
      </div>
    </>
  );
};

export default ProductDetail;
