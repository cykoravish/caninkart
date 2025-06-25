import React, { useEffect } from "react";
import lab1 from '../assets/dogb1.png'; // Ensure the image exists at this path
import { FaPaw } from "react-icons/fa";
import dog1 from "../assets/breedspics/Labrador.png"
import dog2 from "../assets/breedspics/German shepherd.png"
import dog3 from "../assets/breedspics/Golden retrievar.png"
import dog4 from "../assets/breedspics/Beagle.png"
import dog5 from "../assets/breedspics/Pug.png"
import dog6 from "../assets/breedspics/Chihuahua.png"
import dog7 from "../assets/breedspics/Cocker spaniel.png"
import dog8 from "../assets/breedspics/Shihtzu.png"
import dog9 from "../assets/breedspics/Daschund.png"
import dog10 from "../assets/breedspics/Great Dane.png"
import dog11 from "../assets/breedspics/pahari.jpg"

const dogs = [
  {
    number: "01",
    breed: "Labrador",
    image: dog1,
    description: `Labradors are some of the most popular dogs around the world. Labradors are known for their loving and friendly personalities, intelligence, and loyalty. They are often used as service dogs, therapy dogs, and for companionship. Labradors are incredibly intelligent, making them great for training and teaching tricks. Labrador comes in three different colors – white, black, and chocolate – and have a unique double coat which sheds seasonally. Labrador is also one of the most popular breeds in India.`,
  },
  {
    number: "02",
    breed: "German Shepherd",
    image: dog2,
    description: `German Shepherds are known for their courage, confidence, and intelligence. Originally bred for herding, they are now widely used in police and military roles. They are very loyal and protective of their families, making them excellent guard dogs.`,
  },
  {
    number: "03",
    breed: "Golden Retriever",
    image: dog3,
    description: `Golden Retrievers are friendly, intelligent, and devoted dogs. They are extremely social and love to be around people. These dogs are also excellent swimmers and are often used in search and rescue operations.`,
  },
  {
    number: "04",
    breed: "Beagle",
    image: dog4,
    description: `Beagles are small hounds known for their keen sense of smell and tracking instincts. They are playful, curious, and great with children, making them ideal family pets. Beagles are vocal and love outdoor activities.`,
  },
  {
    number: "05",
    breed: "Pug",
    image: dog5,
    description: `Pugs are small dogs with a big personality. Known for their wrinkled face and curled tail, they are playful, affectionate, and charming. Pugs thrive on human companionship and adapt well to apartment living.`,
  },
  {
    number: "06",
    breed: "Chihuahua",
    image: dog6,
    description: `The Chihuahua is the smallest dog breed in the world, but don't let its size fool you—this little pup has a huge personality! Known for their lively, alert, and fiercely loyal nature, Chihuahuas make excellent companions for individuals and families alike..`,
  },
  {
    number: "07",
    breed: "Cocker spaniel",
    image: dog7,
    description: `The Cocker Spaniel is a beloved breed known for its silky coat, soulful eyes, and sweet temperament. Originally bred as a hunting dog, the Cocker Spaniel has become a cherished family companion thanks to its affectionate nature and friendly disposition.`,
  },
  {
    number: "08",
    breed: "Shih Tzu",
    image: dog8,
    description: `Shih Tzus are small, affectionate, and friendly lap dogs. Originally bred for royalty, they have a luxurious coat and a sweet personality. Shih Tzus are great for families and are especially good with kids.`,
  },
  {
    number: "09",
    breed: "Daschund",
    image: dog9,
    description: `The Dachshund, often lovingly called the “sausage dog” or “wiener dog,” is famous for its long body, short legs, and bold personality. Originally bred in Germany to hunt badgers, this small hound has a big spirit and isn’t afraid to show it.`,
  },
  {
    number: "10",
    breed: "Great Dance",
    image: dog10,
    description: `Dalmatians are easily recognizable by their spotted coat. They are energetic, outgoing, and great for active families. Historically used as carriage dogs, Dalmatians require regular exercise and love being around people.`,
  },
  {
    number: "11",
    breed: "Indian Pariah Dog",
    image: dog11,
    description: `The Indian Pariah Dog is an indigenous breed known for its resilience, intelligence, and loyalty. They are extremely adaptable, low maintenance, and have been companions to humans for thousands of years.`,
  },
];

const DogSection = ({ number, image, description, reverse , bread }) => (
  <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center md:items-start lg:gap-20 gap-4 p-4`}>
    {/* Image Section */}
    <div className="w-full md:w-1/3">
      <img src={image} alt="Labrador" className="w-full h-auto object-cover rounded-xl shadow-md" />
    </div>

    {/* Text Section */}
    <div className=" flex flex-col md:flex-row gap-4 md:gap-6">
      <h1 className="text-4xl md:text-5xl font-bold text-[#CDDCEA] ">{number}</h1>
      <div className="space-y-4 px-4 border-l-2 border-[#CDDCEA]">
        <h2 className="text-2xl md:text-4xl font-semibold  text-black  ">{bread}</h2>
        <p className="font-[Poppins] text-black leading-relaxed whitespace-pre-line text-sm md:text-base max-w-lg">
          {description}
        </p>
      </div>
    </div>
  </div>
);




function App() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div className="bg-[#f9f5f3] text-gray-800 font-sans px-4 py-10 mt-16 max-w-screen-2xl mx-auto">
      <h2 className="text-center text-orange-500 flex justify-center items-center gap-2 text-lg font-semibold mb-10">
        <FaPaw/>  KNOW ABOUT DOG BREEDS
      </h2>
      <div className="max-w-7xl mx-auto space-y-14">
        {dogs.map((dog, idx) => (
          <DogSection
            key={idx}
            number={dog.number}
            image={dog.image}
            description={dog.description}
            bread={dog.breed}
            reverse={idx % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
