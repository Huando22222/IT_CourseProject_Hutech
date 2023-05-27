import Carousel from 'react-bootstrap/Carousel';

function SlideShow() {

  // const imgStyle = {
  //   height: '300px',
  //   // width: '100%',
  //   // objectFit: 'cover',
  // };

  // const divStyle = {
  //   border: '2px solid red',
  //   height: '100px',
  //   width: '100%',
  //   // marginLeft: '200px',
  //   // textAlign: 'center',
  // };

  const imgMap = [
    {
      src: 'https://cdn.tgdd.vn/bachhoaxanh/banners/5599/lifebouy-25052023154319.png',
    },
    {
      src: 'https://cdn.tgdd.vn/bachhoaxanh/banners/5599/pho-mai-bo-sua-chua-chi-tu-20500d-04052023174318.jpg',
    },
    {
      src: 'https://cdn.tgdd.vn/bachhoaxanh/banners/5599/socola-giam-20-1205202310227.jpg',
    },
  ];
  return (
    <div >
      <Carousel >
        {imgMap.map(({src})=>(
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={src}
              // style={{ objectFit: 'cover', height: '250px' }}
            />
            <Carousel.Caption>
              {/* <h3>slide label</h3> */}
              {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default SlideShow;