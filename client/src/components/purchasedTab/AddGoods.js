import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Placeholder from 'react-bootstrap/Placeholder';

import { useState } from 'react';
import './AddGoods.css';

function AddGoods() {
    const [validated, setValidated] = useState(false);
    const [tenSanPham, setTenSanPham] = useState('');
    const [price, setPrice] = useState('');
    const [nguonHinhAnh, setNguonHinhAnh] = useState('');
    const [selectedOption, setSelectedOption] = useState('1');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.stopPropagation();
        }
        setValidated(true);

        // Thực hiện các xử lý với thông tin lấy được từ form
        const isFormFilled =
            tenSanPham.trim() !== '' &&
            price.trim() !== '' &&
            nguonHinhAnh.trim() !== '';

        if (isFormFilled) {
        console.log('Tên sản phẩm:', tenSanPham);
        console.log('Price:', price);
        console.log('Nguồn hình ảnh:', nguonHinhAnh);
        console.log('Lựa chọn:', selectedOption);

        try {
            const data = {
            tenSanPham: tenSanPham,
            price: price,
            img: nguonHinhAnh,
            loai: selectedOption,
            };
            console.log(data);

            fetch('http://localhost:5000/api/addGoods', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message); // Hiển thị thông báo từ máy chủ
                // Set giá trị form về rỗng sau khi insert thành công
                setTenSanPham('');
                setPrice('');
                setNguonHinhAnh('');
                setSelectedOption('thịt - trứng - cá');
            })
            .catch((error) => {
                console.error('Lỗi khi gửi yêu cầu POST:', error);
            });
        } catch (error) {
            console.log('Lỗi insert vào MongoDB:', error);
        }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Form noValidate validated={validated}>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            name="validationCustom01"
                            placeholder="Tên sản phẩm"
                            value={tenSanPham}
                            onChange={(e) => setTenSanPham(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="validationCustom02">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            name="validationCustom02"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="validationCustom04">
                            <Form.Label>Nguồn hình ảnh</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            name="validationCustom04"
                            placeholder="http://"
                            value={nguonHinhAnh}
                            onChange={(e) => setNguonHinhAnh(e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        </Row>

                        <Row className="mb-3">
                        <Col>
                            <Form.Label>Loại</Form.Label>
                            <Form.Select
                            name="formSelect"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            >
                            <option value="thịt - trứng - cá">thịt - trứng - cá</option>
                            <option value="rau">rau</option>
                            <option value="gạo - bột - đồ khô">
                                gạo - bột - đồ khô
                            </option>
                            </Form.Select>
                        </Col>
                        </Row>

                        <Button onClick={handleFormSubmit}>Submit form</Button>
                    </Form>
                    </div>

                    <div className="col-md-6">
                    <Card className="card" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={nguonHinhAnh} />
                        <Card.Body>
                        <Card.Title className="cardTitle">{tenSanPham}</Card.Title>
                        <Card.Text className="cardText">
                        {price}
                        </Card.Text>
                        
                        <Card.Body >
                            <Button variant="outline-primary" disabled>
                                buy
                                <i class="fa-solid fa-cart-shopping"></i>
                                {/* <AiOutlineShoppingCart></AiOutlineShoppingCart> */}
                            </Button>{' '}
                        </Card.Body>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AddGoods;
