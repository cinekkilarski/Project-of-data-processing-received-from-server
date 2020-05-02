import React, { Component } from 'react';
import '../styles/FilterForm.css'
class FilterForm extends Component {
    state = {
        fromID: '',
        toID: '',
        name: '',
        city: '',
        fromSum: '',
        toSum: '',
        fromAve: '',
        toAve: '',
        fromLast: '',
        toLast: '',
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        //console.log(name);
        this.setState({
            [name]: e.target.value
        })
    }

    render() {
        const { fromID, toID, name, city, fromSum, toSum, fromAve, toAve, fromLast, toLast } = this.state
        const { minSum, maxSum, minAve, maxAve, minLast, maxLast } = this.props.displayMinMax

        return (
            <div className="container">

                <form onSubmit={this.props.handleFind(fromID || undefined, toID || undefined, name || undefined, city || undefined, fromSum || undefined, toSum || undefined, fromAve || undefined, toAve || undefined, fromLast || undefined, toLast || undefined)} noValidate >

                    <div >
                        <button className="btnFind" onClick={this.props.handleFind()}>Display <br />
                         All Elements <br />(Reset Filter)</button>
                        <div className="numberInput">
                            <label >ID</label> <br />
                            <input type="number" name="fromID" placeholder="from" value={fromID} onChange={this.handleInputChange} />
                            <input type="number" name="toID" placeholder="to" value={toID} onChange={this.handleInputChange} />
                        </div>

                        <div className="textInput">
                            <div className="form-group form-inline">
                                <br />
                                <label > Name </label>
                                <input type="text" name="name" placeholder="Name" value={name} onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group form-inline">
                                <label >City<input className="correct" name="city" type="text" placeholder="City" value={city} onChange={this.handleInputChange} /></label>
                            </div>
                        </div>

                        <div className="numberInput">
                            <label >Sum of Income</label> <br />
                            <input type="number" name="fromSum" placeholder={minSum ? `from ${minSum}` : 'from'}
                                value={fromSum} onChange={this.handleInputChange} />

                            <input type="number" name="toSum" placeholder={maxSum ? `to ${maxSum}` : 'to'} value={toSum} onChange={this.handleInputChange} />
                        </div>

                        <div className="numberInput">
                            <label >Average Income</label> <br />
                            <input type="number" name="fromAve" placeholder={minAve ? `from ${minAve}` : 'from'} value={fromAve} onChange={this.handleInputChange} />

                            <input type="number" name="toAve" placeholder={maxAve ? `to ${maxAve}` : 'to'} value={toAve} onChange={this.handleInputChange} />
                        </div>
                        <div className="numberInput">
                            <label >	Last Month Income</label> <br />
                            <input type="number" name="fromLast" placeholder={minLast ? `from ${minLast}` : 'from 0'} value={fromLast} onChange={this.handleInputChange} />

                            <input type="number" name="toLast" placeholder={maxLast ? `to ${maxLast}` : 'to'} value={toLast} onChange={this.handleInputChange} />
                        </div>
                        <button className="btnFind">Find</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FilterForm;