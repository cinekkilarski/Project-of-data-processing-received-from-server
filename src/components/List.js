import React, { Component } from 'react';
import '../styles/List.css'

class List extends Component {
    state = {
        currentPage: 1,
        elementsPerPage: 50
    }

    resetCurrentPageAfterUseFilter = () => {
        this.setState({
            currentPage: 1
        });
    }

    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    paginationEdgeSub = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    }
    paginationEdgeAdd = () => {
        const indexOfLastPage = Math.ceil(this.props.displayData.length / this.state.elementsPerPage);
        if (this.state.currentPage < indexOfLastPage) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    }

    render() {
        const displayData = this.props.displayData
        const { currentPage, elementsPerPage } = this.state;
        const indexOfLast = currentPage * elementsPerPage;
        const indexOfFirst = indexOfLast - elementsPerPage;
        const currentDisplayData = displayData.slice(indexOfFirst, indexOfLast);

        let results = currentDisplayData.map(result => (
            <tr colSpan={result.id} key={result.id}>
                <td> {result.id} </td>
                <td> {result.name} </td>
                <td> {result.city} </td>
                <td> {result.sumIncome} </td>
                <td> {result.averageIncome} </td>
                <td> {result.lastMonthIncome} </td>
            </tr>
        ))

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(displayData.length / elementsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <div key={number}>
                    <button className={this.state.currentPage === number ? "pagiButton currentPage" : "pagiButton"}
                        key={number}
                        id={number}
                        onClick={this.handleClick} > {number}</button>
                </div>
            );
        });

        return (
            <div >
                <table>
                    <thead>
                        <tr >
                            <th> Id  <button className="btn" onClick={this.props.handleSort("id")} >Sort {this.props.stateValue.incSortId ? <i className="fa fa-angle-double-down"></i> : <i className="fa fa-angle-double-up"></i>}</button></th>

                            <th> Name <button className="btn" onClick={this.props.handleSort("name")} >Sort {this.props.stateValue.incSortName ? <i className="fa fa-angle-double-down"></i> : <i className="fa fa-angle-double-up"></i>}</button></th>

                            <th> City  <button className="btn" onClick={this.props.handleSort("city")} >Sort {this.props.stateValue.incSortCity ? <i className="fa fa-angle-double-down"></i> : <i className="fa fa-angle-double-up"></i>}</button></th>

                            <th> Sum of Income <button className="btn" onClick={this.props.handleSort("sumIncome")} >Sort {this.props.stateValue.incSortSum ? <i className="fa fa-angle-double-down"></i> : <i className="fa fa-angle-double-up"></i>}</button></th>

                            <th> Average Income <button className="btn" onClick={this.props.handleSort("aveIncome")} >Sort {this.props.stateValue.incSortAve ? <i className="fa fa-angle-double-down"></i> : <i className="fa fa-angle-double-up"></i>}</button></th>

                            <th> Last Month Income <button className="btn" onClick={this.props.handleSort("lastIncome")} >Sort {this.props.stateValue.incSortLast ? <i className="fa fa-angle-double-down"></i> : <i className="fa fa-angle-double-up"></i>}</button></th>
                        </tr>

                        {results}</thead>
                </table>
                <div className="footer">
                    <button className="fa fa-angle-double-left pagiButton" onClick={this.paginationEdgeSub}>
                    </button>
                    {renderPageNumbers}
                    <button className="fa fa-angle-double-right pagiButton" onClick={this.paginationEdgeAdd}>
                    </button>
                </div>
            </div>
        )
    }
}
export default List;