import { useLocation } from 'react-router-dom';

const ContactmsgForm = () => {
  const location = useLocation();
  const message = location.state?.message;

  console.log('Received Message:', message);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Message</h2>
      <p className="whitespace-pre-wrap text-gray-700">
        {message || "No message passed."}
      </p>
    </div>
  );
};
export default ContactmsgForm;