import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router'

import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';


const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION (
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String      
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

class CreateItem extends Component {

    state = {
        title: 'Bike',
        description: 'Its fun!',
        image: '',
        largeImage: '',
        price: 250.50
    };

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value): value;
        this.setState({ [name]: val });
    }

    uploadFile = async e => {
        console.log('uploading file');
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'webos_tutorial');

        const res = await fetch
        ('https://api.cloudinary.com/v1_1/amoghranadive/image/upload', {
            method: 'POST',
            body: data
        });

        const file = await res.json();
        console.log(file);
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        });
    };

    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (
                    <Form onSubmit = {async e => {
                        // stop the form from submitting
                        e.preventDefault();

                        // call the mutation
                        const res = await createItem();

                        // take them to teh single item page.
                        Router.push({
                            pathname: '/item',
                            query: { id: res.data.createItem.id }
                        })
                    }}>
                        <Error error={ error } />
                        <fieldset disabled={loading} aria-busy= {loading}>

                            <label htmlFor="file">
                                Image
                                <input 
                                    type="file" 
                                    id="file" 
                                    name="file" 
                                    placeholder="Upload an image" 
                                    required
                                    onChange={this.uploadFile}
                                    />
                                {this.state.image && <img src={this.state.image} alt="Upload preview"/>}   
                            </label>

                            <label htmlFor="title">
                                Title
                                <input 
                                    type="text" 
                                    id="title" 
                                    name="title" 
                                    placeholder="Title" 
                                    value={this.state.title} 
                                    onChange={this.handleChange}
                                    required />
                            </label>

                            <label htmlFor="price">
                                Price
                                <input 
                                    type="number" 
                                    id="price" 
                                    name="price" 
                                    placeholder="Price" 
                                    value={this.state.price} 
                                    onChange={this.handleChange}
                                    required />
                            </label>

                            <label htmlFor="description">
                            Description
                                <input 
                                    id="description" 
                                    name="description" 
                                    placeholder="Enter a description" 
                                    value={this.state.description} 
                                    onChange={this.handleChange}
                                    required />
                            </label>

                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }

}

export default CreateItem;
export { CREATE_ITEM_MUTATION };