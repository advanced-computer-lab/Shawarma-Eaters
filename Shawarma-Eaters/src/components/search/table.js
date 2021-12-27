import React, { useMemo ,useEffect,useState} from 'react'

import { useTable, useFilters, useGlobalFilter,useSortBy } from 'react-table'
//import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import axios from 'axios';
import './table.css'

//import { Button} from 'react-bootstrap';

//import ExercisesList from '../exercises-list.component'
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

export const BasicTable = () => {

  const [flight, setflight] = useState([]);

  window.onload = function() {
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }
  }
  function LoadOnce() 
{ 
window.location.reload(); 
} 

  const fetchflight = async () => {
    const response = await axios
      .get("http://localhost:5000/flights/")
      .catch((err) => console.log(err));

    if (response) {
      const TableData = response.data;
      console.log(TableData);
      setflight(TableData);
    }
  };

  const deleteFlight =  (id)=>  
  {

    if(window.confirm('are you sure'))
    {
      axios.delete('http://localhost:5000/flights/'+id)
        .then(response => { console.log(response.data)});
        setflight( flight.filter(el => el._id !==id));
       
        // const flights = flight.filter(el => el._id !== "61a69956695c4f40cc03380d");
        // setflight = [...flights]; 
    }
  };


const flightColumns = useMemo(
  () =>
    flight[0]
      ? Object.keys(flight[0])
          .filter((key) => key !== "updatedAt" &&  key !== "createdAt" &&   key !== "dates" &&  key !== "__v" && key !== 'business_seats' &&   key !== 'economy_seats')  //key !== "_id" && 
          .map((key) => {
            let head = key;
            if(key == "arrival_times")
              head =  "Arrival"
            else if(key == "number_of_Economy_seats")
              head =  "Economy Seats"
            else if(key == "number_of_Business_class_seats")
              head =  "Business Seats"
            else if(key == "arrival_times")
              head =  "Arrival"
            else if(key == "departure")
              head =  "Departure"
            else if(key == "flight_number")
              head =  "Flight Number"
            

            if (key === "image")
              return {
                Header: key,
                accessor: key,
                Cell: ({ value }) => <img src={value} />,
                maxWidth: 600,
              };
              console.log(flight)
            return { Header: head, accessor: key,Filter:ColumnFilter,maxWidth: 500, minWidth: 190   , width: 400 };
          })
      : [],
  [flight]
);

const flightData = useMemo(() => [...flight], [flight]);

const editFlight =  ()=>  
  {
    setflight( [flight])  
  };

const tableHooks = (hooks) => {
  console.log('flight::::',flight)
  if(flight.lenght != 0)
  {
  hooks.visibleColumns.push((columns) => [
    ...columns,
    {
      id: "Edit     ",
      Header: "Actions",
      maxWidth: 500,maxWidth: 400, minWidth: 150, width: 300   //change column width
      ,Cell: ({ row }) => 
      (
        <div class = "bottDiv">
        
        {/* <a href={"/edit/"+row.values._id}>
          {console.log('hi1')} */}
          {console.log('id:::',row.values)}
        <button class = "EditButton" onClick={()=> window.location.href="/edit/"+row.values._id}>Edit</button>
        {setflight(flight)}
        
        {/* </a>   */}
        <button  class = "DeleteButton" onClick={()=>deleteFlight(row.values._id)}>Delete</button>
       

    </div>
        
      ),
    },
  ]);
}};
const tableInstance = useTable({columns : flightColumns,data : flightData},tableHooks,useGlobalFilter,useFilters);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    getToggleHideAllColumnsProps,
    allColumns,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = tableInstance

  const { globalFilter } = state

  useEffect(() => {
    fetchflight();
  }, []);

  
  // const handleDeleteClick = (contactId) => {
  //   const newContacts = [...contacts];

  //   const index = contacts.findIndex((contact) => contact.id === contactId);

  //   newContacts.splice(index, 1);

  //   setContacts(newContacts);
  // };
  //hidden
  if(flight.lenght != 0)
  {

  
  return (

    <>
    <div>
   

        <br />
      </div>
      <div className = 'BOX'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table style={{marginRight: 100 + 'em'}} class="primary-nav" {...getTableProps()} >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps({
                    style: { minWidth: column.minWidth, width: column.width },
                  })}
                >
                  <span>{column.render('Header')}</span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
          <tbody {...getTableBodyProps()} > 
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr class = "left" {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td  {...cell.getCellProps({
                      style: {
                        minWidth: cell.column.minWidth,
                        width: cell.column.width,
                      },
                    })}>{cell.render('Cell')}</td> 
                  })}
                </tr>
              
              )
            })}
          </tbody>
          {/* <tfoot>
            {footerGroups.map(footerGroup => (
              <tr {...footerGroup.getFooterGroupProps()}>
                {footerGroup.headers.map(column => (
                  <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </table>
      </div>
      <div >
 
 {allColumns.map(column => {console.log('column',column);if(column.Header == '_id')return(
   <div key={column.id}>
     <label>
       <input type='checkbox'  {...column.getToggleHiddenProps()} />{column.Header}
     </label>
   </div>
)})}
</div>
    </>
    
  )
}
else
{
  return(
    <>
    <div>

      <h1> There is no data OR There is no connection with the "server" </h1>
    </div>
    </>
  )
}

}

export default BasicTable;
