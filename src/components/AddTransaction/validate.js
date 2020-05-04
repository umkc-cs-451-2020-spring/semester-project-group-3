export default function(values) {
    const errors = {};
    const requiredFields = [
      'amount',
      'description'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    });
    if (
      values.amount &&
      !/^[0-9]+(\.[0-9]{1,2})?$/i.test(values.amount)
    ) {
      errors.amount = 'Please enter a valid amount';
    }
    return errors;
  }