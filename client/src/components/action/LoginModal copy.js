import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'; //global importing boostrap 
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import React, { useState ,useEffect,useContext} from 'react';
import { useSearchParams } from "react-router-dom";

import { MyContext } from '../context/MyContext';

function LoginModal() {
    const [show, setShow] = useState(false);
    // const [btnLogin, setBtnLogin] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }
    // const [user, setUser] = useState({});
    const { user, setUser } = useContext(MyContext);

    const [loggedInFlag, setLoggedInFlag] = useState(false);
    /////////////////////////////////////////////////////////////////
    let [searchParams] = useSearchParams();
	const emailURL = searchParams.get("email");
	const fullnameURL = searchParams.get("fullname");
	const secretURL = searchParams.get("secret");
	// const googleId = searchParams.get("googleId");
    ////////////////////////////////////////////////////////////////
	let email ;
	let fullname ;
	let secret ;
	let googleId ;
    let _id;
    let pic;
	useEffect(() => {
		if (emailURL && fullnameURL && secretURL) {

        const handleLoginGG = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ emailURL, fullnameURL,secretURL }),
                });
                
                // debugger;
                if (response.ok) {
                    const data = await response.json();
                    // Xử lý thành công, lưu thông tin người dùng vào state hoặc local storage
                    console.log('Đăng nhập thành công GG:', data);
                    console.log('Đăng nhập thành công data.user GG:', data.user);
                    console.log('user GG:', user);
                    // localStorage.setItem('user', JSON.stringify(data));
                    console.log("localStorage before: ",localStorage);
                    email= data.user.email;
                    fullname = data.user.fullname;
                    secret = data.user.secret;
                    googleId = data.user.googleId;
                    _id = data.user._id;
                    pic = data.user.pic;
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            email,
                            fullname,
                            secret,
                            googleId,
                            identity,
                            _id,
                            pic,
                        })
                    );

                    localStorage.setItem("loggedIn", "true");
                    setLoggedInFlag(true);

                    console.log("localStorage after GG: ",localStorage);
                } else {
                    const errorMessage = await response.json();
                    setError(errorMessage.error);
                    console.log('Sai thông tin đăng nhập');
                }
            } catch (error) {
                setError('Đã xảy ra lỗi');
            }
        }

        handleLoginGG();
		}
	}, []);


    useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("user")));
        localStorage.removeItem("loggedIn");
	}, [loggedInFlag]);
    /////////////////////////////////////////////////////////////////
    

    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(identity);
        //debugger;
        try {
            console.log("da vao try: ",identity);
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identity, password }),
                
            });
            
            // debugger;
            if (response.ok) {
                const data = await response.json();
                // Xử lý thành công, lưu thông tin người dùng vào state hoặc local storage
                console.log('Đăng nhập thành công:', data);
                // Cập nhật thông tin người dùng vào props.user
                // setUser(data.user);
                console.log('Đăng nhập thành công data.user:', data.user);
                console.log('user:', user);
                // localStorage.setItem('user', JSON.stringify(data));
                console.log("localStorage before: ",localStorage);
                email= data.user.email;
                fullname = data.user.fullname;
	            secret = data.user.secret;
	            googleId = data.user.googleId;
                _id = data.user._id;
                pic = data.user.pic;
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        email,
                        fullname,
                        secret,
                        googleId,
                        identity,
                        _id,
                        pic,
                    })
                );

                localStorage.setItem("loggedIn", "true");
                setLoggedInFlag(true);

                console.log("localStorage after: ",localStorage);
            } else {
                const errorMessage = await response.json();
                setError(errorMessage.error);
                console.log('Sai thông tin đăng nhập');
            }
        } catch (error) {
            setError('Đã xảy ra lỗi');
        }
    };

    /////////////////////////////////////////////////////////////////

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");
        setLoggedInFlag(false);
        window.localStorage.clear();
        window.location.href = "./";
    };

    return (
        <>
            {!user && (
                <Button variant="primary" onClick={handleShow}>
                    Đăng nhập
                </Button>
                )
            }

            {user && (
                <Button variant="warning" onClick={handleShow}>
                    Đăng Xuất
                </Button>
                )
            }
            

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tài Khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user && (
                        <div>
                            <h3>{user.fullname}</h3>
                        </div>
                    )}
                    {!user  && (
                        <div>
                            <>
                                <Form onSubmit={handleLogin}>
                                    <FloatingLabel controlId="floatingInput" label="Your HUTECH's Identity" className="mb-3">
                                        <Form.Control
                                        type="text"
                                        placeholder="name@example.com"
                                        value={identity}
                                        onChange={(e) => setIdentity(e.target.value)}
                                        />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingPassword" label="Password">
                                        <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FloatingLabel>
                                    {error && <p>{error}</p>}
                                    <Button variant="primary" type="submit">
                                        Đăng nhập
                                    </Button>
                                </Form>
                            </>
                            <form action="http://localhost:5000/auth/google">
                                
                                <Button
                                    colorScheme="red"
                                    variant="solid"
                                    w={"100%"}
                                    type="submit"
                                    // style={{textAlign: "center"}}
                                >
                                    Google 
                                    <span>   
                                        <i class="fa-brands fa-google-plus-g"></i>
                                    </span>
                                </Button>
                            </form>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                    {user&& (
                        <Button variant="primary" onClick={logOut}>Bạn muốn đăng xuất!</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LoginModal;