import Alert from 'react-bootstrap/Alert';

import './AlertBuy.css';
import { useEffect, useState ,useContext} from 'react';
import { MyContext } from '../context/MyContext';
function AlertBuy() {
    const { user } = useContext(MyContext);

    return (
        <div>
            {user ? (
                <Alert key="success" variant="success" className='alert'>
                    Mua hàng thành công !
                    <br />
                    <i>cảm ơn đã tin tưởng ủng hộ  </i> 
                    <i class="fa-solid fa-poo"></i>
                    {/* <Alert.Link href="#">an example link</Alert.Link>*/}
                </Alert>
            ):(
                <Alert key="danger" variant="danger" className='alert'>
                    <i>Bạn phải đăng nhập trước khi thanh toán</i> 
                </Alert>
            )}
        </div>
    );
}

export default AlertBuy;