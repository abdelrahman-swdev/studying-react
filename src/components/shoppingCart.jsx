import React, { Component } from 'react';
import Product from './product';

class ShoppingCart extends Component {
    state = { 
        products : [
            {id: 1, name: 'Burger', price: 50, count: 0},
            {id: 2, name: 'Cola', price: 10, count: 0},
            {id: 3, name: 'Fries', price: 15, count: 0}
        ]
    } 

    deleteHandler = (id) => {
        // clone state
        // edit state
        const products = this.state.products.filter(p => p.id !== id);
        // set state
        this.setState(
            {products}
        );
    }

    increaseCountHandler = (id) => {
        
        // clone state
        const products = [...this.state.products];
        // const index = products.indexOf(p => p.id === id);
        // products[index] = {...products[index]};

        // edit state
        products.find(p => p.id === id).count ++;

        //set state
        this.setState({products});
    }

    resetHandler = () => {
        // clone state
        const products = [...this.state.products];

        // edit state
        products.map(p => {
            p.count = 0;
            return p;
        });
        // products.forEach((p) => {
        //     p.count = 0;
        // });

        //set state
        this.setState({products});
    } 

    render() { 
        return (
            <React.Fragment>
                <h1>Shopping Cart</h1>
                {this.state.products.map(p => 
                    <Product key={p.id} 
                        product={p} 
                        onDelete = {this.deleteHandler}
                        onPlus = {this.increaseCountHandler}/>
                )}
                <button 
                    onClick={this.resetHandler}
                    className="btn btn-sm btn-dark m-2">
                    Reset
                </button>
            </React.Fragment>
        );
    }
}
 
export default ShoppingCart;