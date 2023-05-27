import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import './StripedColumns';
import { useEffect, useState ,useContext} from 'react';
import { MyContext } from '../context/MyContext';
import AlertBuy from './AlertBuy';

const mongoose = require('mongoose');

  
function StripedColumns() {

    


    const { user, setUser,cart, setCart} = useContext(MyContext);
    const [total, setTotal] = useState(0);

    let totalPerItem = 0;
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleCheckoutClick = () => {
        try {
            const data = {
                    user: user._id,
                    goods: cart.map((item) => ({
                    _idGoods: item._id,
                    tenSanPham: item.tenSanPham,
                    price: item.price,
                    sl: item.quantity,
                    })),
                    total: total,
                };
                console.log(data);

                fetch('http://localhost:5000/api/boughts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                    console.log(data.message); // Hiển thị thông báo từ máy chủ
                    setCart([]); // Xóa giỏ hàng sau khi lưu thành công
                    })
                    .catch((error) => {
                    console.error('Lỗi khi gửi yêu cầu POST:', error);
                    });
        } catch (error) {
            console.log('loi insert mongodb ');
        }
        
        
        setShowLoginModal(true);
    };

    useEffect(()=>{
        console.log("cart: run ",cart.quantity);

        let calculatedTotal = 0;

        cart.forEach((item, index) => {
            let totalPerItem = parseFloat(item.price * item.quantity);
            calculatedTotal += totalPerItem;
        });

        setTotal(calculatedTotal);

        {cart.map((item)=>{
            console.log("testL>>>>>>>>>>  ",item,total);
        })}

        
    },[cart,total]);

    const handleDelete = (index) => {
        const updatedCart = [...cart];
        const item = updatedCart[index];

        // Giảm số lượng sản phẩm đi 1
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            // Nếu số lượng là 1, xóa mục sản phẩm khỏi giỏ hàng
            updatedCart.splice(index, 1);
        }

        setCart(updatedCart);
    };
    return (
        <div>

            <Table striped="columns">
            <thead>
                <tr>
                <th>#</th>
                <th>Tên Sản Phẩm</th>
                <th>số lượng</th>
                <th>Giá</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                
                {cart.map((item,index)=>{
                    
                    totalPerItem += parseFloat(item.price * item.quantity);

                    return (
                        <tr key = {index}>
                            <td>{index+1}</td>
                            <td>{item.tenSanPham}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>
                                <button className="btn btn-link border-0" onClick={() => handleDelete(index)} >
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td colSpan={3}>Total: </td>
                    <td >{total}</td>
                    <td>vnd</td>
                </tr>
            </tbody>
            </Table>
                {total !== 0 ?
                    (
                        <Button variant="success" className="checkout-button" onClick={handleCheckoutClick}>
                            Thanh Toán 
                            <span>  <i class="fa-regular fa-circle-check"></i></span>
                        </Button>
                    ): (
                        <i>Bắt đầu mua sắm nào</i>
                    )
                }
                {/* <LoginModal onClose={() => setShowLoginModal(false)} /> */}
            {showLoginModal && (
                <AlertBuy onClose={() => setShowLoginModal(false)}/>
            )}
        </div>
    );
}

export default StripedColumns;