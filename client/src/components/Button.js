import React from 'react';
class Button extends React.Component{

    render(){
        const {label, className, onClick} = this.props;
            return(
                <button
                className={className}
                aria-current="page"
                onClick = {onClick}
                > {label}</button>
            );


    }

}
export default Button;