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




const flightColumns = useMemo(
  () =>
    flight[0]
      ? Object.keys(flight[0])
          .filter((key) => key !== "updatedAt" &&  key !== "createdAt" &&  key !== "_id" &&  key !== "dates" &&  key !== "__v")
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

            return { Header: head, accessor: key,Filter:ColumnFilter,maxWidth: 500, minWidth: 190   , width: 400 };
          })
      : [],
  [flight]
);

const flightData = useMemo(() => [...flight], [flight]);

const tableHooks = (hooks) => {
  hooks.visibleColumns.push((columns) => [
    ...columns,
    {
      id: "Edit     ",
      Header: "Actions",
      maxWidth: 500,maxWidth: 400, minWidth: 150, width: 300   //change column width
      ,Cell: ({ row }) => 
      (
        <div class = "bottDiv">
          
        <button class = "EditButton" onClick={() => alert("Editing: ")}>   Edit      </button>
        <button  class = "DeleteButton" onClick={() => alert("Deleting: ")}>Delete</button>

    </div>
        
      ),
    },
  ]);
};
const tableInstance = useTable({columns : flightColumns,data : flightData},tableHooks,useGlobalFilter,useFilters);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
  
  return (
    
    <>
      <div className = 'BOX'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table style={{marginRight: 100 + 'em'}} class="primary-nav" {...getTableProps()}>
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
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr class = "left" {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    console.log(cell.row.values,"nnnnnn")
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
    </>
  )
}

export default BasicTable;
