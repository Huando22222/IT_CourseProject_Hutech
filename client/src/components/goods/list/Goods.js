import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import { useState , useEffect,useContext  } from 'react';
import Button from 'react-bootstrap/Button';


import Footer from '../../layouts/Footer';
import './Goods.css'
import { MyContext } from '../../context/MyContext';

function Goods(props) {

    const [goods, setGoods] = useState([]);
    const { cart, setCart } = useContext(MyContext);
    const { searchValue} = useContext(MyContext);

    useEffect(()=>{
        let typeOfGoods=props.selectedEventKey;
        const showGoods = async () => {
            let _id;
            let tenSanPham;
            let img;
            let loai;
            let price;

            try {
                const response = await fetch('http://localhost:5000/api/showGoods', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ typeOfGoods ,searchValue}),
                });
                // debugger;
                if (response.ok) {
                    const data = await response.json();
                    setGoods(data.goods);

                    _id = data.goods._id;
                    tenSanPham= data.goods.tenSanPham;
                    img= data.goods.img;
                    loai= data.goods.loai;
                    price= data.goods.price;
            
                } else {
                    console.log('false show goods');
                }
            } catch (error) {
                console.log('false show goods (chua vao try)');
            }
        }
        showGoods();
    }, [props.selectedEventKey,searchValue]);


    const handleBuy = (item) => {

        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((cartItem) => cartItem._id === item._id);
        
            if (existingItemIndex !== -1) {
              // Item đã tồn tại trong cart, tăng số lượng
              const updatedCart = [...prevCart];
              updatedCart[existingItemIndex].quantity += 1;
              return updatedCart;
            } else {
              // Item chưa tồn tại trong cart, thêm vào với số lượng là 1
              return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    useEffect(()=>{
    }, [cart]);

    return (
        <div>
        <Row xs={1} md={4} className="g-4">
            {/* <h1>{props.selectedEventKey}</h1> */}
            {goods.map((item ) => (
                <Col key={item._id}>
                    <Card border="info"  className="card">
                        <Card.Img variant="top" src={item.img} />
                        <Card.Body>
                            <Card.Title className="cardTitle">
                                {item.tenSanPham}
                            </Card.Title>
                            <Card.Text className="cardText">
                                {item.price}
                            </Card.Text>
                        </Card.Body>

                        <Card.Body >
                            <Button variant="outline-primary" onClick={() => handleBuy(item)}>
                                buy
                                <i class="fa-solid fa-cart-shopping"></i>
                                {/* <AiOutlineShoppingCart></AiOutlineShoppingCart> */}
                            </Button>{' '}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        <Footer/>
        </div>
    );
}

export default Goods;