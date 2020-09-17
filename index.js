import Papa from 'papaparse'
const  ctx = document.getElementById('myChart')
const files = [
  './assets/csv/PM_S598958A_2020_0.csv',
  './assets/csv/PM_S598958A_2020_1.csv',
  './assets/csv/PM_S598958A_2020_2.csv',
  './assets/csv/PM_S598958A_2020_3.csv'
]
const allData = []
const fetchList = []

files.forEach(function(url, i) {
  fetchList.push(
    fetch(url)
      .then(resp => resp.text())
      .then(response => allData.push(Papa.parse(response, { header: true })))
  )
})

Promise
  .all(fetchList)
  .then(resp => {
    const giveFormat = arr => {
      return arr.map(d => { 
          d.y = d.Quantity
          d.x = d["Net Amount"]
          return d
        })
    }
    const myChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Elbow 0',
            borderColor: 'red',
            backgroundColor: 'red',
            data: giveFormat(allData[0].data)
          },
          {
            label: 'Elbow 1',
            borderColor: 'blue',
            backgroundColor: 'blue',
            data: giveFormat(allData[1].data)
          },
          {
            label: 'Elbow 2',
            borderColor: 'green',
            backgroundColor: 'green',
            data: giveFormat(allData[2].data)
          },
          {
            label: 'Elbow 3',
            borderColor: 'black',
            backgroundColor: 'black',
            data: giveFormat(allData[3].data)
          }
        ]
      },
      options: {
        maintainAspectRatio: false
      }
    })
  });

// fetch('./assets/csv/PM_S598958A_2020_0.csv')
//   .then(response => response.text())
//   .then(response  => {
//     // console.log('response  2', response )
//     // console.log('response', response)
//     var data = Papa.parse(response, { header: true })
//     console.log('data', data)
//   })



