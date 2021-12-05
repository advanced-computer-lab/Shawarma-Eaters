import React,{Component} from "react";

class Items extends Component{
     
    render()
    {
        const {items} = this.props;
        const theItems = items.map( (item) =>
        {
            return (
                <div>
                    <p>{item.bookingNumber}<button>delete</button></p>
                </div>
            )
        })
        return(
            <div>
                {theItems}
            </div>
        )
    }
}
export default Items;