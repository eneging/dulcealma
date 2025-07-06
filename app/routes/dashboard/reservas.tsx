

function reservas() {

 const reservations = [
    { id: 101, guest: 'Maria Garcia', date: '2025-07-01', time: '18:00', status: 'Confirmed' },
    { id: 102, guest: 'Carlos Lopez', date: '2025-07-05', time: '20:30', status: 'Pending' },
    { id: 103, guest: 'Ana Martinez', date: '2025-07-10', time: '19:00', status: 'Confirmed' },
  ];


  return (
     <div className="bg-white   rounded-lg shadow-md">
      <div className="px-[30vw] py-[10vh]">


         <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Reservations </h2>
      <ul className="divide-y divide-gray-200">
        {reservations.map(res => (
          <li key={res.id} className="py-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-800">{res.guest}</p>
              <p className="text-sm text-gray-500">{res.date} at {res.time}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              res.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {res.status}
            </span>
          </li>
        ))}
      </ul>
      </div>
     
    </div>
  )
}

export default reservas