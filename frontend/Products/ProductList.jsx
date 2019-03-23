import * as React from 'react'
import MaterialTable from 'material-table'

function ProductList(props) {
  return (
    <div>
      <MaterialTable
        columns={[
          { title: '#', field: '#' },
          { title: 'Name', field: 'name' },
          { title: 'Description', field: 'description', type: 'numeric' },
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
        ]}
        data={[
          { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
        ]}
        title="Selection Example"
        actions={[
          {
            icon: 'done_all',
            tooltip: 'Do',
            onClick: (event, rows) => {
              alert('You selected ' + rows.length + ' rows')
            },
          },
        ]}
      options={{
        selection: true,
      }}
      />
    </div>
  )
}

export default ProductList;