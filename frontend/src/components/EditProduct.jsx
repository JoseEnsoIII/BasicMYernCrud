import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

// Define a centered form styled component with border and border-radius
const CenteredForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; 
    width: 100%;
    border: 1px solid #ccc; /* Add border */
    border-radius: 8px; /* Add border-radius */
    padding: 20px; /* Add padding */
`;

const EditProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/products/${id}`, {
            title: title,
            price: price
        });
        navigate('/');
    }

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setTitle(response.data.title);
        setPrice(response.data.price);
    }

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half">
                    <CenteredForm>
                        <form onSubmit={updateProduct}>
                            <div className="field">
                                <label className="label">Title</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label className="label">Price</label>
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <button className="button is-primary">Update</button>
                            </div>
                        </form>
                    </CenteredForm>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;
