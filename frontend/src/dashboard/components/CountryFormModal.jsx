import { useState } from 'react';

// List of country names (you can expand this or fetch from an API)
const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
  'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso',
  'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile',
  'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
  'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia',
  'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
  'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
  'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
  'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia',
  'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
  'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
  'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan',
  'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste',
  'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
  'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

const CountryFormModal = ({ isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({ name: '' });
  const [suggestions, setSuggestions] = useState([]);

  // Handle input change and provide suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, name: value });

    // Filter countries based on input (case-insensitive)
    if (value.length > 0) {
      const filtered = countries
        .filter((country) =>
          country.toLowerCase().startsWith(value.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (country) => {
    setForm({ ...form, name: country });
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleSubmit = async () => {
    // Validate that the input matches a country name exactly
    if (!form.name || !countries.includes(form.name)) {
      return alert("Please enter a valid country name");
    }
    await onSave(form);
    setForm({ name: '' });
    setSuggestions([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-8 w-96 space-y-4 shadow-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter the Country Name"
            value={form.name}
            onChange={handleInputChange}
            className="border p-2 bg-gray-200 rounded-lg w-full"
          />
          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
              {suggestions.map((country, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(country)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-between">
          <button onClick={onClose} className="border px-6 py-2 rounded-full">
            Discard
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded-full"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryFormModal;