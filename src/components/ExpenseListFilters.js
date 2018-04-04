import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

//we nee to pass onChange because otherwise value will be a static value.
//we have access to dispatch from the component below.
//when we pass the value and onchange to forms inputs and selects, the documentation calls this "controlled input"


export class ExpenseListFilters extends React.Component {
    state = {
      calendarFocused: null
    };

    onDatesChange = ({ startDate, endDate }) => {
      this.props.setStartDate(startDate);
      this.props.setEndDate(endDate);
      console.log(this.props); // access to dispatch and filters
    };

    onFocusedChange = (calendarFocused) => {
      this.setState(() => ({ calendarFocused }));
      console.log(this.props); // access to dispatch and filters
    };

    onTextChange = (e) => {
      this.props.setTextFilter(e.target.value);
    };

    onSelectChange = (e) => {
      if (e.target.value === 'date') {
        this.props.sortByDate();
      } else if (e.target.value === 'amount'){
        this.props.sortByAmount();
      }
    };

  render() {
    return(
      <div>
        <input
          type="text"
          value={this.props.filters.text} // we changed to a class based component, so we need to use this.props instead of props.
          onChange={this.onTextChange}/>
        <select
          value={this.props.filters.sortBy}
          onChange={this.onSelectChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate = {this.props.filters.startDate}
          endDate = {this.props.filters.endDate}
          onDatesChange = {this.onDatesChange}
          focusedInput = {this.state.calendarFocused}
          onFocusChange = {this.onFocusedChange}
          showClearDates = {true}
          numberOfMonths = {1}
          isOutsideRange = {() => false}
        />

      </div>
    );
  }
}


const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate:  () => dispatch(sortByDate()),
  sortByAmount: () =>  dispatch(sortByAmount())
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);




// {/* MY SOLUTION */}
//     {/* <select onChange={(e) => {
//       const value = e.target.value;
//       value === 'date' ? props.dispatch(sortByDate()) : props.dispatch(sortByAmount());
//     }}>
//       <option value="date">Date</option>
//       <option value="amount">Amount</option>
//     </select>
