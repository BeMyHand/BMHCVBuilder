import React from 'react';

import classes from './Form.css';

const Form = props => <div className={classes["cv-form"]}>{props.children}</div>;

export default Form;