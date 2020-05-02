import React, { Component } from 'react';
import List from './List'
import '../styles/App.css';
import FilterForm from './FilterForm'

class App extends Component {
  state = {
    incSortId: false,
    incSortName: false,
    incSortCity: false,
    incSortSum: false,
    incSortAve: false,
    incSortLast: false,
    isLoaded: false,
    minMaxValues: {
      minSum: 0,
      maxSum: 0,
      minAve: 0,
      maxAve: 0,
      minLast: 0,
      maxLast: 0
    }
  }

  tableData = []
  displayData = []
  handleLoading = () => {

    fetch(`https://recruitment.hal.skygate.io/companies`)
      .then(response => response.json())
      .then(response => {
        let data = response
        function compare(a, b) {
          return a.id - b.id;
        }
        this.tableData = data.sort(compare)
        this.displayData = this.tableData
        //return data.sort(compare)
      }).then(res => {
        this.setState({
          incSortId: true
        })
      }).catch(err => console.log(err))

    for (let i = 1; i <= 300; i++) {
      fetch(`https://recruitment.hal.skygate.io/incomes/${i}`)
        .then(response => response.json())
        .then(response => {
          //console.log(response);
          let sumIncome = 0
          let averageIncome = 0
          let lastMonthIncome = 0
          for (let j = 0; j < response.incomes.length; j++) {
            //console.log(response.incomes[i].value);
            sumIncome += parseInt(response.incomes[j].value)
            let month = parseInt(response.incomes[j].date.substring(5, 7))
            if (month === 12) {
              lastMonthIncome += parseInt(response.incomes[j].value)
            }
          }

          averageIncome = sumIncome / response.incomes.length
          // console.log("sumIncome: " + sumIncome, "averageIncome: " + averageIncome, ' lastMonthIncome: ' + lastMonthIncome);
          this.tableData[i - 1] = {
            ...this.tableData[i - 1], ...{
              sumIncome: sumIncome,
              averageIncome: averageIncome,
              lastMonthIncome: lastMonthIncome
            }
          }
          this.displayData[i - 1] = this.tableData[i - 1]
        }
        ).then(res => {
          this.setState({})
        }).catch(err => console.log(err))
    }
    this.setState({
      isLoaded: false
    })
    //this.displayData = this.tableData
  }

  handleSort = column => e => {
    switch (column) {
      case 'id':
        if (this.state.incSortId) {
          let compare = (a, b) => { return b.id - a.id }
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortId: false
          })
        } else {
          let compare = (a, b) => { return a.id - b.id }
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortId: true
          })
        }

        break;
      case 'name':
        if (this.state.incSortName) {
          let compare = (a, b) => a.name.localeCompare(b.name)
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortName: false
          })
        } else {
          let compare = (a, b) => b.name.localeCompare(a.name)
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortName: true
          })
        }
        break;
      case 'city':
        if (this.state.incSortCity) {
          let compare = (a, b) => a.city.localeCompare(b.city)
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortCity: false
          })
        } else {
          let compare = (a, b) => b.city.localeCompare(a.city)
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortCity: true
          })
        }
        break;
      case 'sumIncome':
        if (this.state.incSortSum) {
          let compare = (a, b) => { return b.sumIncome - a.sumIncome }
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortSum: false
          })
        } else {
          let compare = (a, b) => { return a.sumIncome - b.sumIncome }
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortSum: true
          })
        }

        break;
      case 'aveIncome':
        if (this.state.incSortAve) {
          let compare = (a, b) => { return b.averageIncome - a.averageIncome }
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortAve: false
          })
        } else {
          let compare = (a, b) => { return a.averageIncome - b.averageIncome }
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortAve: true
          })
        }

        break;
      case 'lastIncome':
        if (this.state.incSortLast) {
          let compare = (a, b) => { return b.lastMonthIncome - a.lastMonthIncome }
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortLast: false
          })
        } else {
          let compare = (a, b) => { return a.lastMonthIncome - b.lastMonthIncome }
          this.displayData = this.tableData.sort(compare)
          this.setState({
            incSortLast: true
          })
          let a = "elo melo"
          return a
        }
        break;
      default: console.log("Something wrong");
    }
  }

  handleFind = (fromID = 0, toID = this.tableData.length, name = '', city = '', fromSum = this.state.minMaxValues.minSum, toSum = this.state.minMaxValues.maxSum,
    fromAve = this.state.minMaxValues.minAve, toAve = this.state.minMaxValues.maxAve,
    fromLast = this.state.minMaxValues.minLast, toLast = this.state.minMaxValues.maxLast) => e => {
      e.preventDefault()
      this.child.resetCurrentPageAfterUseFilter()
      // console.log(fromID, toID, name, city, fromSum, toSum, fromAve, toAve, fromLast, toLast);
      this.displayData = this.tableData.filter(function (value) {
        return value.id >= fromID && value.id <= toID &&
          value.name.includes(name) && value.city.includes(city) &&
          value.sumIncome >= fromSum && value.sumIncome <= toSum &&
          value.averageIncome >= fromAve && value.averageIncome <= toAve &&
          value.lastMonthIncome >= fromLast && value.lastMonthIncome <= toLast
      });
      //console.log('displaydata: ' + this.displayData);
      this.setState({
      })
    }



  handleLoad = () => {
    this.handleLoading()
    setTimeout(() => {
      this.handleMinMax()
      this.setState({
        isLoaded: true
      })
    }
      , 5000)
  }

  handleMinMax = () => {
    const tableData = this.tableData
    const minSum = parseInt(Math.min.apply(null, tableData.map(function (a) { if (a.sumIncome) { return a.sumIncome } else return null })))
    //console.log('minSum: ' + minSum);
    const maxSum = parseInt(Math.max.apply(null, this.tableData.map(function (a) { return a.sumIncome; })))
    const minAve = parseInt(Math.min.apply(null, this.tableData.map(function (a) { return a.averageIncome; })))
    const maxAve = parseInt(Math.max.apply(null, this.tableData.map(function (a) { return a.averageIncome; })))
    const minLast = parseInt(Math.min.apply(null, this.tableData.map(function (a) { return a.lastMonthIncome; })))
    const maxLast = parseInt(Math.max.apply(null, this.tableData.map(function (a) { return a.lastMonthIncome; })))
    this.setState({
      minMaxValues: {
        minSum, maxSum, minAve, maxAve, minLast, maxLast
      }
    })
  }

  handleReload = () => {
    localStorage.clear()
    window.location.reload(true);
  }



  componentDidMount() {
    this.handleLoad()
  }
  render() {
    return (
      <div>
        <button className="btnLoad" onClick={this.handleReload}>{this.state.isLoaded ? "Reload data" : "Loading data..."}</button>

        <FilterForm displayData={this.displayData} tableData={this.tableData} handleFind={this.handleFind} displayMinMax={this.state.minMaxValues} />

        <List tableData={this.displayData} displayData={this.displayData} handleSort={this.handleSort} stateValue={this.state} ref={(cd) => this.child = cd} />
      </div>
    );
  }
}

export default App;
