import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { renderTransaction } from '../../rStore/actions/tabChangeActions';
import validate from './validate';
import { useDispatch } from 'react-redux';
import { transactionType } from '../../rStore/actions/transactionActions';

const theme = createMuiTheme({
    overrides: {
      MuiFormControlLabel: {
        root: {
          color: 'white'
        },
      },
    },
  });

const GRadio = withStyles({
    root: {
      color: "#74BD43",
      '&$checked': {
        color: "#74BD43",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

const renderTextField = (
    { input, label, meta: { touched, error }, ...custom },
  ) => (
    <TextField
      label={label}
      variant="filled"
      hintText={label}
      floatingLabelText={label}
      helperText={touched && error}
      {...input}
      {...custom}
      style={{
        backgroundColor: "white",
        width: "500px"
    }}
    InputProps={{
        style: {
            color: "black"
        }
    }}
    />
  );

const AddTransactionForm = props => {
    const { handleSubmit, pristine, submitting } = props
    const [value, setValue] = React.useState('DR');
    const dispatch = useDispatch();
    dispatch(transactionType(value))
    
    const handleClickCancel = (event) => {
        dispatch(renderTransaction())
    }

    const handleChange = (event) => {
        setValue(event.target.value);
      };

    return (
        <div>
            <div>
                <h1 style={{color:"white"}}>Add Transaction</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name="amount"
                            component= {renderTextField}
                            label="Amount"
                        />
                    </div>
                    <div>
                        <Field
                            name="description"
                            component= {renderTextField}
                            label="Description"
                        />
                    </div>
                    <div>
                    <ThemeProvider theme={theme}>
                        <FormControl component="fieldset">
                            <RadioGroup value={value} onChange={handleChange}>
                                <FormControlLabel value="DR" control={<GRadio />} label="Debit" />
                                <FormControlLabel value="CR" control={<GRadio />} label="Credit" />
                            </RadioGroup>
                        </FormControl>
                    </ThemeProvider>
                    </div>
                    <br/>
                    <div style={{padding: "5px"}}>
                        <button
                        type="submit"
                        className="submit-btn"
                        disabled={ pristine || submitting}
                        >
                        Submit
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button 
                        type="button" 
                        className="link-btn" 
                        onClick={handleClickCancel}
                        > 
                        Cancel 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default reduxForm({
    form: 'AddTransactionForm',
    validate
})(AddTransactionForm)
