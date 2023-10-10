import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AddProductContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 20px;
  margin: 20px; /* Add margin */
`;

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/products',{
            title: title,
            price: price
        });
        navigate("/");
    }

    return (
        <CenteredContainer>
            <AddProductContainer>
                <form onSubmit={ saveProduct }>
                    <div className="field">
                        <label className="label">Title</label>
                        <input 
                            className="input"
                            type="text"
                            placeholder="Title"
                            value={ title }
                            onChange={ (e) => setTitle(e.target.value) }
                        />
                    </div>

                    <div className="field">
                        <label className="label">Price</label>
                        <input 
                            className="input"
                            type="text"
                            placeholder="Price"
                            value={ price }
                            onChange={ (e) => setPrice(e.target.value) }
                        />
                    </div>

                    <div className="field">
                        <button className="button is-primary">Save</button>
                    </div>
                </form>
            </AddProductContainer>
        </CenteredContainer>
    )
}

export default AddProduct;
