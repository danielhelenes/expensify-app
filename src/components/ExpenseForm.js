import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


// const date = new Date(); we are not going to use this because the API is super complicated. never use it!(date object in Javascript)


export default class ExpenseForm extends React.Component { //cannot log (?)

  constructor(props) { //this props come from the components that use this component - addexpense and editExpense!!!
    super(props);

    this.state = {
        description: props.expense ? props.expense.description : '',
        note: props.expense ? props.expense.note : '',
        amount: props.expense ? (props.expense.amount /100).toString() : '',
        createdAt: props.expense ? moment(props.expense.createdAt) : moment(), //calling the now moment.
        calendarFocused: false,
        error: ''
    };
  };


  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description })) // this is the same of description: description.
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(()=> ({ note })) // this is the same of description: description.
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { //regex expression from regex101.com
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) { //if to prevent the user to cler the date value. if there is a createdAt, do that:
      this.setState(() => ({ createdAt }))

    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  };

  onSubmit = (e) => {
    const a = this.props;
    console.log(a);
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      //set error state = please provide description and Amount
      this.setState(() => ({ error: 'Please provide a description and amount' }));
    } else {
      //clear the error.
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10)*100, // 10 means the base we are working on(?) - 100 is because we are working in cents
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        >
        </textarea>
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    )
  }
}
