import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

import "./PurchasedTab.css";
import { MyContext } from '../context/MyContext';
import { useState , useEffect,useContext  } from 'react';
function PurchasedTab(){
    const { user,cart ,boughts ,setBoughts} = useContext(MyContext);
    

    useEffect(()=>{
        if(user){
            let idUser=user._id;
            let allowed = user.admin;
        
            const showPurchased = async () => {
        
                try {
                    const response = await fetch('http://localhost:5000/api/showPurchased', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ idUser,allowed }),
                    });
                    // debugger;
                    if (response.ok) {
                        const data = await response.json();

                        setBoughts(data.boughts);
                        // console.log('DA CO DATA');
                        // console.log(data.boughts[0].total);
                    
                    
                        // for (const bought of data.boughts) {
                        //     console.log('------------------------------------');
                        //     console.log('ID:', bought._id);
                        //     console.log('User:', bought.user);
                        //     console.log('Total:', bought.total);
                        //     console.log('Goods:');
                        //     for (const good of bought.goods) {
                        //       console.log('  ---');
                        //       console.log('  ID Goods:', good._idGoods);
                        //       console.log('  Ten San Pham:', good.tenSanPham);
                        //       console.log('  Price:', good.price);
                        //       console.log('  SL:', good.sl);
                        //     }
                        // }
                
                    } else {
                        console.log('false show purchased ');
                    }
                } catch (error) {
                    console.log('false show purchased (chua vao try)');
                }
            }
            showPurchased();
        }
        
        
    }, [cart ]);

    return (
        <div>
            <div>
                {user? (
                    <div>
                        {boughts.map((bought) => (
                            <div key={bought._id}>
                                <Table responsive="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>tên sản phẩm</th>
                                            <th>số lượng</th>
                                            <th>giá</th>
                                            <th>tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bought.goods.map((good,index) => (
                                            <tr key={good._idGoods}>
                                                <td>{index+1}</td>
                                                <td>{good.tenSanPham}</td>
                                                <td>{good.sl}</td>
                                                <td>{good.price}</td>
                                                <td>{good.sl * good.price }</td>
                                            </tr>
                                        ))}

                                            
                                        
                                        <tr>
                                            <td colSpan={3}></td>
                                            <td >tổng giá (vnd)</td>
                                            <td>{bought.total}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                
                            </div>
                        ))}
                    </div>    
                ):(
                    <div className='emptyPurchased'>
                        <i>
                            bạn chưa có đơn hàng nào. 
                            <span> 
                                <Link
                                to="/market"
                                >
                                    Ra chợ nào
                                </Link> 
                            </span>
                        </i>
                    </div>
                )}
            </div>

        </div>
    )
}

export default PurchasedTab;