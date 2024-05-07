import React, {useState}from "react";
import GenericSelect from "./Components/select.jsx"
import TailwindDatePicker from "./Components/datePicker.jsx";
import DataTable from 'react-data-table-component';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { format } from 'date-fns';


const data = []

const options = [
  {value: "+57", label: "Colombia"},
  {value: "+53", label: "Ecuador"},
]

const columns = [
	{
		name: 'Origen',
		selector: row => row.origin,
		sortable: true,
	},
	{
		name: 'Destino',
		selector: row => row.destination,
		sortable: true,
	},
  {
		name: 'Fecha Viaje',
		selector: row => row.date_flight,
		sortable: true,
	},
];


function App() {
  
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tickets, setTickets] = useState([]); // Inicializamos una lista vacía para los tickets

  {/*Origen*/}
  const handleOriginChange = (option) => {
    setSelectedOrigin(option);
  };
  
  {/*Destino*/}
  const handleDestinationChange = (option) => {
    setSelectedDestination(option);
  };

  {/*Fecha*/}
  const handleDateChange = (date) => {
    console.log(format(date, 'dd-MM-yyyy'));
    setSelectedDate(format(date, 'dd-MM-yyyy'))  
  };

  {/*Accion*/}
  const handleButtonChange = (event) => {
    let ticket = {
      origin: selectedOrigin?.label,
      destination: selectedDestination?.label,
      date_flight: selectedDate
    }
    setTickets([...tickets, ticket]);
    console.log(tickets);
  };
  

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-center font-bold text-3xl mb-4 font-sans"> {/* Roboto para el título */}
            Compra de tickets
          </div>
          <div className="mt-20">

            <GenericSelect
              options={options}
              placeholder={'Origen'}
              onChange={handleOriginChange}
            />
          </div>
          <div className="mt-20">
            <GenericSelect
              options={options}
              placeholder={'Destino'}
              onChange={handleDestinationChange}
            />
          </div>

          <div className="mt-20">
            <div className="relative">
              <TailwindDatePicker 
                placeholder={"Fecha de vuelo"}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleButtonChange}
              form="ticket"
            >
              Guardar
            </button>
          </div>

        </div>
        <div className="flex justify-center mt-6">
          <DataTable
            columns={columns}
            data={tickets}
            highlightOnHover
          />
    
        </div>
      </div>
    </>
  )
}

export default App
