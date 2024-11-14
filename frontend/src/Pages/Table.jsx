import React from 'react';


const TableWithScrolling = () => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
            <th>Header 4</th>
            <th>Header 5</th>
            <th>Header 6</th>
            <th>Header 7</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td>
            <td>Row 1, Cell 4</td>
            <td>Row 1, Cell 5</td>
            <td>Row 1, Cell 6</td>
            <td>Row 1, Cell 7</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
            <td>Row 2, Cell 3</td>
            <td>Row 2, Cell 4</td>
            <td>Row 2, Cell 5</td>
            <td>Row 2, Cell 6</td>
            <td>Row 2, Cell 7</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithScrolling;
