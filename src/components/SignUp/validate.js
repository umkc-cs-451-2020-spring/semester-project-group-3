export default function(values) {
    const errors = {};
    const requiredFields = [
      'accountID',
      'email',
      'password',
      'confirmedPword',
      'balance'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    });
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (
        values.password !== values.confirmedPword
      ) {
        errors.confirmedPword = 'Passwords do not match';
      }
    if (
        values.balance && !/^[0-9]{1,6}$/i.test(values.balance)
        ) {
        errors.balance = 'Balance must be a positive number';
        }
      if (
        values.accountID && !/^[0-9]{9}$/i.test(values.accountID)
        ) {
        errors.accountID = 'Must be a 9 digits number';
        }
    return errors;
  }