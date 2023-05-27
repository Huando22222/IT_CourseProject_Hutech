// import React from 'react';
import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {

    const [isFooterVisible, setIsFooterVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
        const isScrolledToBottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight;
        setIsFooterVisible(!isScrolledToBottom);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className="footer">
            <div className="content noidung">
                <div className="col-sm-9 footer-left">
                    <div><b>TRƯỜNG ĐẠI HỌC CÔNG NGHỆ TP.HCM (HUTECH)</b></div>
                    <div><b className="truso">Sai Gon Campus:</b> 475A Điện Biên Phủ, P.25, Q.Bình Thạnh, TP.HCM</div>
                    <div className="coso"><b>Ung Van Khiem Campus:</b> 31/36 Ung Văn Khiêm, P.25, Q.Bình Thạnh, TP.HCM</div>
                    <div className="coso"><b>Thu Duc Campus:</b> Khu Công nghệ cao TP.HCM, Xa lộ Hà Nội, P.Hiệp Phú, TP.Thủ Đức, TP.HCM</div>
                    <div className="coso"><b>Hitech Park Campus:</b> Khu Công nghệ cao TP.HCM, Đường D1, P.Long Thạnh Mỹ, TP.Thủ Đức, TP.HCM</div>
                    <div><b>Điện thoại:</b> (028) 5445 7777 - <b>Fax:</b> (028) 5445 4444 - <b>Email:</b> hutech@hutech.edu.vn</div>
                </div>
                <div data-includehtml="https://www.hutech.edu.vn/page/html/social.txt">
                    <div className="col-sm-3 footer-right">
                        <a href="//www.hutech.edu.vn/">Trang Chủ</a> | <a href="//www.hutech.edu.vn/homepage/lien-he/so-do-den-truong">Sơ Đồ</a> | <a href="//www.hutech.edu.vn/homepage/dong-gop-y-kien">Liên Hệ</a>
                        <br />
                        <a href="https://zalo.me/84421131520127076" target="_blank">
                            <img className="icon-lien-he-zalo" src="https://www.hutech.edu.vn/images/img_blank.gif" alt="Zalo" />
                        </a>
                        <a href="https://www.instagram.com/hutechuniversity/" target="_blank">
                            <img className="icon-lien-he-instagram" src="https://www.hutech.edu.vn/images/img_blank.gif" alt="Instagram" />
                        </a>
                        <a href="https://www.tiktok.com/@hutechuniversity" target="_blank">
                            <img className="icon-lien-he-tiktok" src="https://www.hutech.edu.vn/images/img_blank.gif" alt="TikTok" />
                        </a>
                        <a href="https://www.facebook.com/hutechuniversity" target="_blank">
                            <img className="icon-lien-he-facebook" src="https://www.hutech.edu.vn/images/img_blank.gif" alt="Facebook" />
                        </a>
                        <a href="https://twitter.com/hutechvietnam" target="_blank">
                            <img className="icon-lien-he-twice" src="https://www.hutech.edu.vn/images/img_blank.gif" alt="Twitter" />
                        </a>
                        <a href="https://www.youtube.com/c/HUTECHChannel" target="_blank">
                            <img className="icon-lien-he-youtube" src="https://www.hutech.edu.vn/images/img_blank.gif" alt="YouTube" />
                        </a>

                        <br />Bản quyền <span style={{ fontSize: 'small' }}><a href="https://www.hutech.edu.vn/admin"><strong>©</strong></a></span>
                        <span id="namfooter">2023</span>
                        <a rel="author" href="https://plus.google.com/u/0/+hutech">HUTECH</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;