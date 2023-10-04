import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Pagination from 'react-bootstrap/Pagination';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaPeopleArrows, FaGasPump, FaStopwatch20, FaQuestionCircle, FaHeart } from "react-icons/fa";
import "./Products.css";
import Dropdown from 'react-bootstrap/Dropdown';

function Products() {
    const { page } = useParams();
    const itemsPerPage = 6;
    const currentPage = page ? parseInt(page) : 1;

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProducts = ProductList.filter((product) =>
        product.product_name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    //paggination


    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = queryString.parse(location.search);

    const handlePageClick = (pageNumber) => {
        navigate(`/${pageNumber}`);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                className="paggination-item"
                onClick={() => handlePageClick(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    const goToPrevPage = () => {
        if (currentPage > 1) {
            handlePageClick(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            handlePageClick(currentPage + 1);
        }
    };


    return (
        <div className="product-container">
            <div className="navbar">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="search-bar"
                    />
                </div>

                <Dropdown className="dropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Relevence
                    </Dropdown.Toggle>
                </Dropdown>
                <Dropdown className="dropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Brand
                    </Dropdown.Toggle>

                </Dropdown>

            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
                {filteredProducts.slice(startIdx, endIdx).map((product, id) => (
                    <Col key={id} className="product-card-col">
                        <Card className="product-card">
                            <Card.Img variant="top" className="product-card-image" src={product.product_image} />
                            <Card.Body>
                                <div className="card-title">
                                    <Card.Title>{product.product_name}</Card.Title>
                                    <p>2020</p>
                                </div>
                                <Card.Text>
                                    <div className="feature-line">
                                        <div className="icon-box">
                                            <FaPeopleArrows />
                                            <p>{product.Specifications.people}</p>
                                        </div>
                                        <div className="icon-box">
                                            <FaGasPump />
                                            <p>{product.Specifications.fuel}</p>
                                        </div>
                                    </div>
                                    <div className="feature-line">
                                        <div className="icon-box">
                                            <FaStopwatch20 />
                                            <p>{product.Specifications.milage}</p>
                                        </div>
                                        <div className="icon-box">
                                            <FaQuestionCircle />
                                            <p>{product.Specifications.type}</p>
                                        </div>
                                    </div>

                                </Card.Text>
                                <hr />
                                <div className="product-footer">
                                    <div className="Price">
                                        <h4>${product.price}</h4>
                                        <p>/month</p>
                                    </div>
                                    <div className="love-icon-button">
                                        <div className="heart-icon">
                                            <FaHeart />
                                        </div>
                                        <button className="btn btn-details">View More</button>
                                    </div>

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className='paggination-container'>
                <Pagination>
                    <Pagination.First className='paggination-item' onClick={() => handlePageClick(1)} />
                    <Pagination.Prev className='paggination-item' onClick={goToPrevPage} />
                    {pageNumbers}
                    <Pagination.Next className='paggination-item' onClick={goToNextPage} />
                    <Pagination.Last className='paggination-item' onClick={() => handlePageClick(totalPages)} />
                </Pagination>
            </div>
        </div>
    );
}

export default Products;
