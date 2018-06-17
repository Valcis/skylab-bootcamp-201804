import React from 'react'
import {withRouter} from 'react-router-dom'

function Input(props) {

    const { type, name, helpText, labelText, value, placeholder, submitted, handleChange, disabled } = props;
    
    if (props.disabled) {
        return (
            <div>
                <label htmlFor={name}>{labelText}</label>
                <input type={type} id={name} disabled name={name} value={value} placeholder={placeholder} onChange={handleChange} />
                {submitted && !value &&
                    <div className="help-block">{helpText}</div>
                }
            </div>
        )
    }
    return (
        <div>
            <label htmlFor={name}>{labelText}</label>
            <input type={type} id={name} name={name} value={value} placeholder={placeholder} onChange={handleChange} />
            {submitted && !value &&
                <div>{helpText}</div>
            }
        </div>
    )
}

export default withRouter(Input)