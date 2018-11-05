import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
            title
        }
    }
`;

class DeleteItem extends Component {

    updateLocalCache = (cache, payload) => {
        // manually update the cache on the client, so that it matches the server

        // 1. Read the cache
        const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
        console.log(data, payload);

        // 2. Filter teh deleted items out
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);

        // 3. put the items back
        cache.writeQuery({ query: ALL_ITEMS_QUERY, data});
    }

    render() {
        return (
            <Mutation 
                mutation={DELETE_ITEM_MUTATION} 
                variables={{id: this.props.id}}
                update={this.updateLocalCache}
            >
                {(deleteItem, { error }) => (
                    <button onClick={function confirmDelete() {
                        if (confirm('Are you sure you want to delete this item?')) {
                            deleteItem();             
                        }
                    }}>{this.props.children}</button>
                )}                
            </Mutation>
        )
    }
}

export default DeleteItem;