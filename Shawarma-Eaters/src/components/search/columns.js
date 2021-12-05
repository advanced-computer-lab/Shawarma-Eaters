import React from 'react';


export const COLUMNS = [
    {
      Header: 'Id',
      accessor: 'id',
     
    },
    {
      Header: 'First Name',
      Footer: 'First Name',
      accessor: 'first_name',
      sticky: 'left'
    },
    {
      Header: 'Last Name',
      Footer: 'Last Name',
      accessor: 'last_name',
      sticky: 'left'
    },
    {
      Header: 'Country',
      accessor: 'country'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    {
      Header: 'Email',
      width: "200",

      accessor: 'email'
    },
    
    {
        Header: "Actions",
        width: "200",
        
        Cell: row => (
          <div class = "bottDiv">
              <button  class = "EditButton" onClick>Edit</button>
              <button  class = "DeleteButton" onClick>Delete</button>
  
          </div>
      )
    }
    
    // {
    //     Header: 'SE',
    //     accessor: 'date_of_birth'
    //   }
  ]
  