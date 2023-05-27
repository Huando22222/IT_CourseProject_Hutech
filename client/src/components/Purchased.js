import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import './Purchased.css';
import PurchasedTab from './purchasedTab/PurchasedTab';
import AddGoods from './purchasedTab/AddGoods';
import { MyContext } from './context/MyContext';
import { useState , useEffect,useContext  } from 'react';
function Purchased(){
    const [key, setKey] = useState('purchased');
    const { user} = useContext(MyContext);
    return (
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        >
            <Tab eventKey="purchased" title="Lịch sử mua hàng">
                <PurchasedTab/>
            </Tab>
            {user && user.admin === "true" (
                <Tab eventKey="addGoods" title="thêm sản phẩm">
                    <AddGoods/>
                </Tab>
            )}
            <Tab eventKey="contact" title="Contact" disabled>
                Tab content for Contact
            </Tab>
        </Tabs>
    );
}

export default Purchased;