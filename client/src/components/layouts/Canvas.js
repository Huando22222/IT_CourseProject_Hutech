import { useEffect, useState ,useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import StripedColumns from '../action/StripedColumns';

import { MyContext } from '../context/MyContext';

function Canvas({ name, ...props }) {
    const [show, setShow] = useState(false);
    const { cart, setCart } = useContext(MyContext);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    useEffect(()=>{
        console.log("cart Canvas: ",cart);
    },[cart]);

    let numberOfItems=0;
    
    return (
        <>
            {cart.length !=0 && (
                <Button variant="primary" className="btn btn-primary position-relative me-2" onClick={toggleShow} >
                    <span className="position-absolute top-0 end-90 translate-middle badge rounded-pill bg-danger">
                        {cart.map((item)=>{
                            numberOfItems += item.quantity;
                        })}
                        {numberOfItems}
                        <span className="visually-hidden">unread messages</span>
                    </span> 
                    {name}
                </Button>
            )}
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Giỏ Hàng của bạn</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <StripedColumns/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Canvas;