import React from 'react'
import {withRouter} from 'react-router-dom'

function InputUser(props) {

    const { type, name, helpText, labelText, value, submitted, handleChange, disabled } = props;
    if (props.disabled) {
        return (
            <div className={'form-group' + (submitted && !value ? ' has-error' : '')}>
                <label htmlFor={name}>{labelText}</label>
                <input type={type} disabled className="form-control" name={name} value={value} onChange={handleChange} />
                {submitted && !value &&
                    <div className="help-block">{helpText}</div>
                }
            </div>
        )
    }
    return (
        <div className={'form-group' + (submitted && !value ? ' has-error' : '')}>
            <label htmlFor={name}>{labelText}</label>
            <input type={type} className="form-control" name={name} value={value} onChange={handleChange} />
            {submitted && !value &&
                <div className="help-block">{helpText}</div>
            }
        </div>
    )
}

export default withRouter(InputUser)