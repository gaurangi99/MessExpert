import React from 'react';

function TableComponent() {
  const horizontalHeadings = ['BreakFast', 'Lunch', 'Snack','Dinner'];
  const verticalHeadings = ['WeekDays', 'Weekends'];
  const rowData = [
    ["7.30-9.30 A.M", "12.30-2.30 P.M", "4.30-5.30 P.M","7.30-9.30"],
    ["8.00-10.00 A.M", "1.00-3.00 P.M", "5.00-6.00 P.M","8.00-10.00"]
  ];

  return (
    <div className="container">
            <div className="py-4">
    <table className='table border shadow'>
      <thead>
        <tr>
          <th></th>
          {horizontalHeadings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {verticalHeadings.map((heading, index) => (
          <tr key={index}>
            <th>{heading}</th>
            {rowData[index].map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
  );
}

export default TableComponent;
