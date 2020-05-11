import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    };

    //this.displayModal = this.displayModal.bind(this);
  }


  callCustomerService() {

    const url = 'https://onboardingapplication.azurewebsites.net/customers/'

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          data: result,
        })
      })
  }

  componentDidMount() {
    this.callCustomerService();
  }

  //displayModal() {
  //  window.location = '/addcustomer';
  //}

  render() {

    const { data } = this.state;

    const TableHeader = () => {
      return (
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Business Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Purpose</TableCell>
            <TableCell>RM Team</TableCell>
            <TableCell>PEP</TableCell>
            <TableCell>Annual TurnOver</TableCell>
            <TableCell>Estimate TurnOver</TableCell>
          </TableRow>
        </TableHead>
      )
    }

    const result = data.map(row => (
      <TableRow key={row._id}>
        <TableCell>{row.custName}</TableCell>
        <TableCell>{row.businessType}</TableCell>
        <TableCell>{row.Status}</TableCell>
        <TableCell>{row.Purpose}</TableCell>
        <TableCell>{row.RMTeam}</TableCell>
        <TableCell>{row.PEP}</TableCell>
        <TableCell>{row.AnnualTurnOver}</TableCell>
        <TableCell>{row.EstimateTurnOver}</TableCell>
      </TableRow >
    ))

    return (
      <div style={{ width:"80%", marginLeft:"10%"}}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHeader />
            <TableBody>
              {result}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    );
  }

}

export default HomePage;