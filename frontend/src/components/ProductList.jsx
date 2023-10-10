import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ProductListContainer = styled.div`
  width: 80%;
  text-align: center;
`;

const Button = styled(Link)`
  display: block;
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
`;
const Button1 = styled(Link)`
  display: block;
  margin-top: 20px;
  background-color: #fff;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px 12px;
    border-bottom: 1px solid #ccc;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:nth-child(odd) {
    background-color: #fff;
  }

  .button.is-small {
    margin-right: 10px;
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    getProducts();
  };

  return (
    <Container>
      <ProductListContainer>
        <h1>Product List</h1>
        <Button to="/add">Add New</Button>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td><Button1>
                  <Link to={`/edit/${product.id}`} className="button is-small is-info">
                    <FaEdit /> 
                  </Link>
                  <button onClick={() => deleteProduct(product.id)} className="button is-small is-danger">
                    <FaTrash /> 
                  </button></Button1>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ProductListContainer>
    </Container>
  );
};

export default ProductList;
