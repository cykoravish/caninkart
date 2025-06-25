import { Link } from 'react-router-dom';
const CountryCard = ({ country, states }) => {

  return (
    <div className="bg-[#EFF1F3] rounded-2xl p-6 shadow-md w-64">
      <Link to={`/dashboard/state/${country.name}/${country._id}`}>
        <h3 className="font-semibold text-lg">{country.name}</h3>
        <div className="text-sm mt-2 space-y-1">
          <div className="flex justify-between">
            <span className="text-orange-400">● <span className="text-[#777676]">State</span></span>
            {/* <p>{states.length}</p> */}
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400">● <span className="text-[#777676]">Districts</span></span>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default CountryCard;
