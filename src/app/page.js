'use client'; 

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useContext, useState, useRef } from "react";
import { Context } from "@/components/context-provider/component";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Home() {
  const { clientDB, dispatch } = useContext(Context);
  const router = useRouter();
  const [ allProducts, setAllProducts ] = useState();
  const [ slideShowPics, setSlideShowPics ] = useState();
  const [ slideShowText, setSlideShowText ] = useState([
    '', ''
  ]);
  const slideShow = useRef();
  const [slideShowLeftPosition, setSlideShowLeftPosition] = useState(3750);
  const chevronLeft = useRef();
  const chevronRight = useRef();

  const getAllProducts = async () => {
    const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/home`);
    const data = await res.json();
    console.log('data', data);


    if (data.success) {
      setAllProducts(data.products);

      const preSlideShowPics = [];
      
      while (preSlideShowPics.length < 6) {
        preSlideShowPics.push(data.products[parseInt(Math.random() * (data.products.length - 1))].main_image.url);
      }

      console.log('preSlideShowPics', preSlideShowPics);

      setSlideShowPics(preSlideShowPics);
    }
    
  };

  const slideToRight = () => {
    if (slideShowLeftPosition > -3750) {
      setSlideShowLeftPosition(slideShowLeftPosition - 1500);
    }
  };

  const slideToLeft = () => {
    if (slideShowLeftPosition < 3750) {
      setSlideShowLeftPosition(slideShowLeftPosition + 1500);
    }
  };

  useEffect(() => {
    console.log('slideShowLeftPosition', slideShowLeftPosition);

    if (slideShowLeftPosition === 3750) {
      chevronLeft.current.style.color = 'rgba(18, 25, 33, 1)';
    } else {
      chevronLeft.current.style.color = '#fff';
    }

    if (slideShowLeftPosition === -3750) {
      chevronRight.current.style.color = 'rgba(18, 25, 33, 1)';
    } else {
      chevronRight.current.style.color = '#fff';
    }

    slideShow.current.style.left = `${slideShowLeftPosition}px`;
  }, [slideShowLeftPosition]);

  useEffect(() => {
    clientDB.seller && router.push('/frontend/sellers/see-my-products');
  }, [clientDB]);

  useEffect(() => {
    getAllProducts();
  }, []);
  
  return (
    <div className={styles.home}>
      <ChevronLeft size={60} className={styles.chevronLeft} onClick={slideToLeft} ref={chevronLeft}/>
      <ChevronRight size={60} className={styles.chevronRight} onClick={slideToRight} ref={chevronRight}/>
      <section className={styles.backgroundSlideshow} ref={slideShow}>

        {
          slideShowPics &&

           <>
            <div className={styles.slideElement}>
              <div>
                <h1>New Year, now you</h1>
                <p>Shop deals</p>
              </div>
              <Image
                src={slideShowPics[0]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>

            <div className={styles.slideElement}>
              <div>
                <h1>Just in: new gifts</h1>
                <h1>for the holidays</h1>
              </div>
              <Image
                src={slideShowPics[1]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>

            <div className={styles.slideElement}>
              <div>
                <h1>Shop Books</h1>
                <p>explore titles</p>
              </div>
              <Image
                src={slideShowPics[2]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>

            <div className={styles.slideElement}>
              <div>
                <h1>Beauty products</h1>
                <p>Explore top sellers</p>
              </div>
              <Image
                src={slideShowPics[3]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>

            <div className={styles.slideElement}>
              <div>
                <h1>Kitchen favorites</h1>
                <p>under $50</p>
              </div>
              <Image
                src={slideShowPics[4]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>

            <div className={styles.slideElement}>
              <div>
                <h1>New arrivals in Toys</h1>
              </div>
              <Image
                src={slideShowPics[5]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>
           </>

        }


      </section>
      <section className={styles.adverts}></section>
    </div>
  );
}
